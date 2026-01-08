/**
 * 文件系统工具 - 用于读取 content-forge-ai 生成的文章
 */

import { readdirSync, readFileSync, existsSync, statSync } from "fs";
import { join } from "path";

// 内容来源路径
const CONTENT_BASE_PATH = "/Users/z/Documents/work/content-forge-ai/data";

/**
 * 获取所有有内容的日期列表
 */
export function listArticleDates(): string[] {
  const dates: string[] = [];

  if (!existsSync(CONTENT_BASE_PATH)) {
    return dates;
  }

  const entries = readdirSync(CONTENT_BASE_PATH, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && /^\d{8}$/.test(entry.name)) {
      const longformPath = join(CONTENT_BASE_PATH, entry.name, "longform");
      if (existsSync(longformPath)) {
        dates.push(entry.name);
      }
    }
  }

  // 按日期降序排序
  return dates.sort().reverse();
}

/**
 * 获取指定日期的文章文件列表
 */
export function listArticlesForDate(date: string): string[] {
  const longformPath = join(CONTENT_BASE_PATH, date, "longform");

  if (!existsSync(longformPath)) {
    return [];
  }

  const files = readdirSync(longformPath);
  // 过滤 .md 文件并按时间戳排序
  return files
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse();
}

/**
 * 读取文章文件内容
 */
export function readArticleFile(date: string, filename: string): string {
  const filePath = join(CONTENT_BASE_PATH, date, "longform", filename);

  if (!existsSync(filePath)) {
    throw new Error(`文章文件不存在: ${filePath}`);
  }

  return readFileSync(filePath, "utf-8");
}

/**
 * 从文件名提取元数据
 * 文件名格式: article_{emoji}_{platform}_{model_name}_{YYYYMMDD}_{HHMMSS}.md
 */
export function extractMetadataFromFilename(filename: string): {
  emoji: string | null;
  platform: string;
  modelName: string;
  date: string;
  timestamp: string;
} {
  // 移除 .md 扩展名
  const nameWithoutExt = filename.replace(/\.md$/, "");

  // 按下划线分割
  const parts = nameWithoutExt.split("_");

  // 至少需要: article, emoji, platform, date, timestamp
  if (parts.length < 5 || parts[0] !== "article") {
    throw new Error(`无效的文件名格式: ${filename}`);
  }

  // 解析各个部分
  // parts[0] = "article"
  // parts[1] = emoji
  // parts[2] = platform
  // parts[3..n-3] = model name (可能包含多个部分)
  // parts[n-2] = date (YYYYMMDD)
  // parts[n-1] = timestamp (HHMMSS)

  const emoji = parts[1] || null;
  const platform = parts[2] || "";

  // 日期和时间戳总是在最后两个位置
  const date = parts[parts.length - 2] || "";
  const timestamp = parts[parts.length - 1] || "";

  // 模型名称是中间的所有部分
  const modelNameParts = parts.slice(3, parts.length - 2);
  const modelName = modelNameParts.join("_");

  return {
    emoji,
    platform,
    modelName,
    date,
    timestamp,
  };
}

/**
 * 生成 URL slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // 移除特殊字符
    .replace(/\s+/g, "-") // 空格替换为连字符
    .replace(/-+/g, "-") // 多个连字符合并为一个
    .replace(/^-+|-+$/g, ""); // 移除首尾连字符
}

/**
 * 从标题生成 Emoji（如果没有）
 */
export function extractEmojiFromTitle(title: string): string | undefined {
  const emojiMatch = title.match(/^(\p{Emoji}+)\s+/u);
  return emojiMatch ? emojiMatch[1] : undefined;
}

/**
 * 格式化日期显示
 */
export function formatDate(dateStr: string): string {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  const date = new Date(`${year}-${month}-${day}`);

  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 获取文章文件完整路径
 */
export function getArticleFullPath(date: string, filename: string): string {
  return join(CONTENT_BASE_PATH, date, "longform", filename);
}

/**
 * 检查文章是否存在
 */
export function articleExists(date: string, filename: string): boolean {
  const filePath = join(CONTENT_BASE_PATH, date, "longform", filename);
  return existsSync(filePath);
}
