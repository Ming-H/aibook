/**
 * 文件系统工具 - 用于处理文件名和日期格式化等工具函数
 */

/**
 * 从目录名提取元数据（新格式）
 * 目录名格式: YYYYMMDD_HHMMSS_标题
 */
export function extractMetadataFromDirname(dirname: string): {
  emoji: string | null;
  platform: string;
  modelName: string;
  date: string;
  timestamp: string;
  title: string;
} {
  // 匹配格式: YYYYMMDD_HHMMSS_标题
  const match = dirname.match(/^(\d{8})_(\d{6})_(.+)$/);

  if (!match) {
    throw new Error(`无效的目录名格式: ${dirname}`);
  }

  const [, date, timestamp, title] = match;

  return {
    emoji: "📝", // 默认 emoji
    platform: "custom",
    modelName: title,
    date,
    timestamp,
    title,
  };
}

/**
 * 从文件名提取元数据（旧格式，保留兼容性）
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
