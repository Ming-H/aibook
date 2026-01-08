/**
 * 内容类型定义
 */

export interface ArticleMetadata {
  slug: string;
  title: string;
  emoji?: string;
  platform: string;
  modelName: string;
  date: string;        // YYYYMMDD
  timestamp: string;   // HHMMSS
  fullPath: string;
  excerpt?: string;
  wordCount?: number;
  tags?: string[];
  readTime?: number;   // 阅读时间（分钟）
  publishedAt?: Date;
}

export interface Article extends ArticleMetadata {
  content: string;
  htmlContent?: string;
  headings?: Heading[];
}

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export interface ArticleByDate {
  date: string;
  articles: ArticleMetadata[];
}

export interface ContentSource {
  basePath: string;
  relativePath: string;
  fullPath: string;
}

export interface ParsedArticle {
  metadata: ArticleMetadata;
  content: string;
  frontmatter?: Record<string, any>;
}
