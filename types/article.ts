/**
 * 文章相关类型定义
 */

import type { ArticleMetadata, Article } from "./content";

/**
 * 文章列表项 - 用于列表展示
 */
export interface ArticleListItem {
  id: string;
  title: string;
  emoji?: string;
  slug: string;
  date: string;
  formattedDate: string;
  excerpt?: string;
  readTime: number;
  tags: string[];
  platform: string;
}

/**
 * 文章详情 - 完整文章信息
 */
export interface ArticleDetail extends Article {
  relatedArticles?: ArticleMetadata[];
  seoMetadata?: SEOMetadata;
}

/**
 * SEO 元数据
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * 阅读设置
 */
export interface ReadingSettings {
  fontSize: "small" | "medium" | "large" | "xlarge";
  fontFamily: "sans" | "serif" | "mono";
  lineHeight: "tight" | "normal" | "relaxed";
  theme: "dark" | "light" | "auto";
}

/**
 * 目录项
 */
export interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}

/**
 * 文章统计信息
 */
export interface ArticleStats {
  totalArticles: number;
  totalWords: number;
  totalReadTime: number;
  dates: number;
  tags: Record<string, number>;
}
