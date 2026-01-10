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

// 系列相关类型定义
export interface SeriesMetadata {
  id: string;
  title: string;
  description: string;
  emoji?: string;
  cover?: string;
  order: number;
  totalEpisodes: number;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SeriesEpisode {
  episodeNumber: number;
  title: string;
  slug: string;
  excerpt?: string;
  wordCount?: number;
  readTime?: number;
  tags?: string[];
  publishedAt?: string;
}

export interface SeriesWithEpisodes extends SeriesMetadata {
  episodes: SeriesEpisode[];
}

export interface SeriesArticleMetadata {
  seriesId: string;
  seriesTitle: string;
  episodeNumber: number;
  article: ArticleMetadata;
}
