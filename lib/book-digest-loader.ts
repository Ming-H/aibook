/**
 * 图书简报数据加载器
 * 从 book-digest 仓库的 output/json/ 目录加载图书数据
 */

import { Octokit } from "@octokit/rest";
import type {
  BookDigest,
  BookDigestMetadata,
  BookCategory,
  Difficulty,
} from "../types/book-digest";
import {
  getCategoryInfo,
  getDifficultyLabel,
} from "../types/book-digest";

// 清理环境变量中的换行符和空格
const cleanEnv = (value: string | undefined): string | undefined => {
  return value?.trim().replace(/\n/g, '');
};

// 环境变量验证
const bookDigestRepo = cleanEnv(process.env.BOOK_DIGEST_REPO);
const githubToken = cleanEnv(process.env.GITHUB_TOKEN);

console.log('[Book Digest] Environment check:');
console.log('[Book Digest] - BOOK_DIGEST_REPO:', bookDigestRepo);
console.log('[Book Digest] - GITHUB_TOKEN exists:', !!githubToken);

if (!bookDigestRepo) {
  console.warn('[Book Digest] BOOK_DIGEST_REPO is not defined, book digest feature will be disabled');
}

if (!githubToken) {
  throw new Error("GITHUB_TOKEN is not defined in environment variables");
}

// 初始化 Octokit 实例
export const octokit = new Octokit({
  auth: githubToken,
});

// 解析仓库所有者和名称
const [owner, repo] = bookDigestRepo?.split("/") || ["", ""];

/**
 * 缓存已加载的图书数据
 */
const bookCache = new Map<string, BookDigest>();
const metadataCache = new Map<string, BookDigestMetadata[]>();

/**
 * 清除缓存
 */
export function clearBookDigestCache(): void {
  bookCache.clear();
  metadataCache.clear();
}

/**
 * 列出所有 JSON 文件
 * 从 output/json/ 目录下读取
 */
export async function listBookDigestFiles(): Promise<string[]> {
  if (!owner || !repo) {
    console.warn('[Book Digest] Repository not configured');
    return [];
  }

  const allFiles: string[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: "output/json",
        per_page: 100,
        page,
      });

      if (Array.isArray(data)) {
        const files = data
          .filter((item) => item.type === "file" && item.name.endsWith(".json"))
          .map((item) => item.name);

        allFiles.push(...files);
        hasMore = data.length === 100;
        page++;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error("[Book Digest] Failed to list book digest files:", error);
      hasMore = false;
    }
  }

  return allFiles.sort();
}

/**
 * 获取图书 JSON 文件内容
 * 从 output/json/{filename} 读取
 */
export async function getBookDigestContent(filename: string): Promise<BookDigest | null> {
  if (!owner || !repo) {
    return null;
  }

  const cacheKey = filename;

  // 检查缓存
  if (bookCache.has(cacheKey)) {
    return bookCache.get(cacheKey)!;
  }

  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `output/json/${filename}`,
    });

    if ("content" in data && data.type === "file") {
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      const bookDigest: BookDigest = JSON.parse(content);

      // 缓存结果
      bookCache.set(cacheKey, bookDigest);

      return bookDigest;
    }

    return null;
  } catch (error) {
    console.error(`[Book Digest] Failed to fetch book digest ${filename}:`, error);
    return null;
  }
}

/**
 * 获取所有图书的元数据
 */
export async function getAllBookDigestsMetadata(): Promise<BookDigestMetadata[]> {
  // 检查缓存
  if (metadataCache.has("all")) {
    return metadataCache.get("all")!;
  }

  const files = await listBookDigestFiles();
  const allMetadata: BookDigestMetadata[] = [];

  for (const filename of files) {
    try {
      const bookDigest = await getBookDigestContent(filename);
      if (bookDigest) {
        const metadata = transformToMetadata(bookDigest);
        allMetadata.push(metadata);
      }
    } catch (error) {
      console.error(`[Book Digest] Failed to load book digest ${filename}:`, error);
    }
  }

  // 按创建时间降序排序
  allMetadata.sort((a, b) => {
    const dateA = new Date(a.id.split('-').pop() || '0');
    const dateB = new Date(b.id.split('-').pop() || '0');
    return dateB.getTime() - dateA.getTime();
  });

  // 缓存结果
  metadataCache.set("all", allMetadata);

  return allMetadata;
}

/**
 * 根据 slug 获取图书简报详情
 */
export async function getBookDigestBySlug(slug: string): Promise<BookDigest | null> {
  const allMetadata = await getAllBookDigestsMetadata();
  const book = allMetadata.find((b) => b.slug === slug);

  if (!book) {
    return null;
  }

  // 通过 id 查找对应的 JSON 文件
  const filename = `${book.id}.json`;
  return await getBookDigestContent(filename);
}

/**
 * 转换为元数据格式
 */
function transformToMetadata(book: BookDigest): BookDigestMetadata {
  const categoryInfo = getCategoryInfo(book.basicInfo.category);

  return {
    id: book.id,
    slug: book.slug,
    title: book.basicInfo.title,
    authors: book.basicInfo.authors,
    category: book.basicInfo.category,
    categoryLabel: categoryInfo.label,
    categoryEmoji: categoryInfo.emoji,
    rating: book.basicInfo.rating,
    difficulty: book.basicInfo.difficulty,
    difficultyLabel: getDifficultyLabel(book.basicInfo.difficulty),
    readTime: book.basicInfo.readTime,
    emoji: book.metadata.emoji,
    tags: book.basicInfo.tags,
    coverImage: book.metadata.images.cover,
    publishYear: book.basicInfo.publishYear,
    summary: book.summary.mainMessage,
  };
}

/**
 * 根据分类筛选图书
 */
export async function getBookDigestsByCategory(category: BookCategory): Promise<BookDigestMetadata[]> {
  const allBooks = await getAllBookDigestsMetadata();
  return allBooks.filter((book) => book.category === category);
}

/**
 * 根据难度筛选图书
 */
export async function getBookDigestsByDifficulty(difficulty: Difficulty): Promise<BookDigestMetadata[]> {
  const allBooks = await getAllBookDigestsMetadata();
  return allBooks.filter((book) => book.difficulty === difficulty);
}

/**
 * 根据标签筛选图书
 */
export async function getBookDigestsByTag(tag: string): Promise<BookDigestMetadata[]> {
  const allBooks = await getAllBookDigestsMetadata();
  return allBooks.filter((book) =>
    book.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * 搜索图书
 */
export async function searchBookDigests(query: string): Promise<BookDigestMetadata[]> {
  const allBooks = await getAllBookDigestsMetadata();
  const lowerQuery = query.toLowerCase();

  return allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.authors.some((author) => author.toLowerCase().includes(lowerQuery)) ||
      book.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      book.summary.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 获取所有标签
 */
export async function getAllBookDigestTags(): Promise<string[]> {
  const allBooks = await getAllBookDigestsMetadata();
  const tagSet = new Set<string>();

  for (const book of allBooks) {
    book.tags.forEach((tag) => tagSet.add(tag));
  }

  return Array.from(tagSet).sort();
}

/**
 * 获取相关图书（基于标签和分类）
 */
export async function getRelatedBookDigests(
  currentBook: BookDigest,
  limit = 4
): Promise<BookDigestMetadata[]> {
  const allBooks = await getAllBookDigestsMetadata();

  // 过滤掉当前图书
  const otherBooks = allBooks.filter((b) => b.slug !== currentBook.slug);

  // 根据标签匹配度和分类匹配度排序
  const scored = otherBooks.map((book) => {
    const commonTags = book.tags.filter((tag) =>
      currentBook.basicInfo.tags.includes(tag)
    );
    const sameCategory = book.category === currentBook.basicInfo.category ? 1 : 0;
    const score = commonTags.length * 2 + sameCategory;
    return { book, score };
  });

  // 按分数排序并取前 N 个
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.book);
}

/**
 * 获取图书统计信息
 */
export async function getBookDigestStats() {
  const allBooks = await getAllBookDigestsMetadata();

  const categoryStats: Record<string, number> = {};
  const difficultyStats: Record<string, number> = {};

  for (const book of allBooks) {
    // 统计分类
    categoryStats[book.categoryLabel] = (categoryStats[book.categoryLabel] || 0) + 1;

    // 统计难度
    difficultyStats[book.difficultyLabel] = (difficultyStats[book.difficultyLabel] || 0) + 1;
  }

  return {
    totalBooks: allBooks.length,
    categoryStats,
    difficultyStats,
  };
}
