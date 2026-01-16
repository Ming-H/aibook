/**
 * 内容加载器 - 负责从 GitHub API 加载和解析所有文章内容
 */

import {
  listDataDates,
  listArticlesForDate,
  getArticleContent,
} from "./github-api";
import {
  extractMetadataFromDirname,
  extractMetadataFromFilename,
  generateSlug,
  formatDate,
} from "./fs-utils";
import {
  parseMarkdown,
  extractTagsFromFrontmatter,
  extractWordCountFromFrontmatter,
  extractReadTimeFromFrontmatter,
} from "./markdown-parser";
import type { ArticleMetadata, Article, ArticleByDate } from "../types/content";

/**
 * 缓存已加载的文章
 */
const articleCache = new Map<string, Article>();
const metadataCache = new Map<string, ArticleMetadata | ArticleMetadata[]>();

/**
 * 清除缓存
 */
export function clearCache(): void {
  articleCache.clear();
  metadataCache.clear();
}

/**
 * 获取所有文章的元数据
 */
export async function getAllArticles(): Promise<ArticleMetadata[]> {
  // 检查缓存
  if (metadataCache.has("all")) {
    return metadataCache.get("all")! as ArticleMetadata[];
  }

  const allMetadata: ArticleMetadata[] = [];
  const dates = await listDataDates();

  for (const date of dates) {
    const articles = await getArticlesByDate(date);
    allMetadata.push(...articles);
  }

  // 按日期降序排序
  allMetadata.sort((a, b) => b.date.localeCompare(a.date));

  // 缓存结果
  metadataCache.set("all", allMetadata);

  return allMetadata;
}

/**
 * 获取指定日期的文章元数据
 */
export async function getArticlesByDate(date: string): Promise<ArticleMetadata[]> {
  const cacheKey = `date:${date}`;

  // 检查缓存
  if (metadataCache.has(cacheKey)) {
    return metadataCache.get(cacheKey)! as ArticleMetadata[];
  }

  const files = await listArticlesForDate(date);
  const articles: ArticleMetadata[] = [];

  for (const filename of files) {
    try {
      const metadata = await getArticleMetadata(date, filename);
      articles.push(metadata);
    } catch (error) {
      console.error(`加载文章失败: ${date}/${filename}`, error);
    }
  }

  // 缓存结果
  metadataCache.set(cacheKey, articles);

  return articles;
}

/**
 * 获取按日期分组的文章列表
 */
export async function getArticlesGroupedByDate(): Promise<ArticleByDate[]> {
  const articleDirs = await listDataDates();
  const grouped: ArticleByDate[] = [];

  for (const articleDir of articleDirs) {
    const articles = await getArticlesByDate(articleDir);
    if (articles.length > 0 && articles[0]) {
      // 使用文章中的日期（从目录名提取的）作为分组键
      const date = articles[0].date;
      grouped.push({ date, articles });
    }
  }

  return grouped;
}

/**
 * 获取文章元数据
 */
export async function getArticleMetadata(articleDir: string, filename: string): Promise<ArticleMetadata> {
  const cacheKey = `${articleDir}:${filename}`;

  // 检查缓存
  if (metadataCache.has(cacheKey)) {
    return metadataCache.get(cacheKey)! as ArticleMetadata;
  }

  // 从 GitHub API 读取文件内容
  const { content } = await getArticleContent(articleDir, filename);

  // 解析 Markdown
  const parsed = await parseMarkdown(content);

  // 从目录名提取基本信息（新格式）
  const dirMeta = extractMetadataFromDirname(articleDir);

  // 从 frontmatter 提取额外信息
  const tags = extractTagsFromFrontmatter(parsed.frontmatter);
  const wordCount = extractWordCountFromFrontmatter(parsed.frontmatter) || parsed.wordCount;
  const readTime = extractReadTimeFromFrontmatter(parsed.frontmatter) || parsed.readTime;

  // 提取标题
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : dirMeta.title;

  // 生成 slug
  const slug = generateSlug(title);

  // 生成摘要（取第一段）
  const excerptMatch = content.match(/^#\s+.+$\n+(.+)$/m);
  const excerpt = excerptMatch ? excerptMatch[1].trim().slice(0, 200) + "..." : undefined;

  const metadata: ArticleMetadata = {
    slug,
    title,
    emoji: dirMeta.emoji || undefined,
    platform: dirMeta.platform,
    modelName: dirMeta.modelName,
    date: dirMeta.date,
    timestamp: dirMeta.timestamp,
    fullPath: `${articleDir}/${filename}`,
    excerpt,
    wordCount,
    tags,
    readTime,
    publishedAt: new Date(`${dirMeta.date.slice(0, 4)}-${dirMeta.date.slice(4, 6)}-${dirMeta.date.slice(6, 8)}`),
  };

  // 缓存结果
  metadataCache.set(cacheKey, metadata);

  return metadata;
}

/**
 * 获取完整的文章内容
 */
export async function getArticle(articleDir: string, slug: string): Promise<Article | null> {
  const cacheKey = `article:${articleDir}:${slug}`;

  // 检查缓存
  if (articleCache.has(cacheKey)) {
    return articleCache.get(cacheKey)!;
  }

  // 查找匹配的文章
  const articles = await getArticlesByDate(articleDir);
  const articleMetadata = articles.find((a) => a.slug === slug);

  if (!articleMetadata) {
    return null;
  }

  // 从 GitHub API 读取内容
  const filename = articleMetadata.fullPath.split("/").pop()!;
  const { content } = await getArticleContent(articleDir, filename);
  const parsed = await parseMarkdown(content);

  const article: Article = {
    ...articleMetadata,
    content,
    htmlContent: parsed.html,
    headings: parsed.headings,
  };

  // 缓存结果
  articleCache.set(cacheKey, article);

  return article;
}

/**
 * 获取所有日期列表
 */
export async function getAllDates(): Promise<string[]> {
  return await listDataDates();
}

/**
 * 获取相关文章
 */
export async function getRelatedArticles(currentArticle: Article, limit = 5): Promise<ArticleMetadata[]> {
  const allArticles = await getAllArticles();

  // 过滤掉当前文章
  const otherArticles = allArticles.filter((a) => a.slug !== currentArticle.slug);

  // 根据标签匹配度排序
  const scored = otherArticles.map((article) => {
    const commonTags = article.tags?.filter((tag) => currentArticle.tags?.includes(tag)) || [];
    const score = commonTags.length * 2 + (article.date === currentArticle.date ? 1 : 0);
    return { article, score };
  });

  // 按分数排序并取前 N 个
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.article);
}

/**
 * 搜索文章
 */
export async function searchArticles(query: string): Promise<ArticleMetadata[]> {
  const allArticles = await getAllArticles();
  const lowerQuery = query.toLowerCase();

  return allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      article.excerpt?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 按标签筛选文章
 */
export async function getArticlesByTag(tag: string): Promise<ArticleMetadata[]> {
  const allArticles = await getAllArticles();

  return allArticles.filter((article) =>
    article.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * 获取所有标签
 */
export async function getAllTags(): Promise<string[]> {
  const allArticles = await getAllArticles();
  const tagSet = new Set<string>();

  for (const article of allArticles) {
    if (article.tags) {
      article.tags.forEach((tag) => tagSet.add(tag));
    }
  }

  return Array.from(tagSet).sort();
}
