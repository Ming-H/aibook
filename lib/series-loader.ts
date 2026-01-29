/**
 * 系列内容加载器 - 负责从 GitHub API 加载和解析所有系列内容
 * 数据结构: series_1/episode_001/longform/*.md
 */

import {
  listSeries,
  listEpisodesForSeries,
  getEpisodeArticleContent,
  getEpisodeMetadata,
  getSeriesMetadata,
} from "./github-api";
import {
  parseMarkdown,
  extractTagsFromFrontmatter,
  extractWordCountFromFrontmatter,
  extractReadTimeFromFrontmatter,
} from "./markdown-parser";
import { generateSlug } from "./fs-utils";
import type {
  SeriesMetadata,
  SeriesEpisode,
  SeriesWithEpisodes,
  Article,
} from "../types/content";

/**
 * 缓存已加载的系列数据
 */
const seriesCache = new Map<string, SeriesWithEpisodes>();
const seriesListCache = new Map<string, SeriesMetadata[]>();
const episodeCache = new Map<string, { article: Article; seriesInfo: SeriesMetadata }>();

/**
 * 清除缓存
 */
export function clearSeriesCache(): void {
  seriesCache.clear();
  seriesListCache.clear();
  episodeCache.clear();
}

/**
 * 从 episode ID 提取期数
 * episode_001 -> 1
 */
function extractEpisodeNumber(episodeId: string): number {
  const match = episodeId.match(/episode_(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * 从 series ID 提取序号
 * series_1 -> 1, ml_series_1 -> 1
 * 支持嵌套路径如 LLM_series/series_1_llm_foundation
 */
function extractSeriesNumber(seriesId: string): number {
  // 尝试匹配 series_数字 或 ml_series_数字
  const seriesMatch = seriesId.match(/(?:ml_)?series_(\d+)/);
  return seriesMatch ? parseInt(seriesMatch[1], 10) : 0;
}

/**
 * 获取所有系列的元数据列表
 */
export async function getAllSeries(): Promise<SeriesMetadata[]> {
  // 检查缓存
  if (seriesListCache.has("all")) {
    console.log('[getAllSeries] Returning cached series');
    return seriesListCache.get("all")!;
  }

  console.log('[getAllSeries] Fetching series from GitHub...');
  const seriesIds = await listSeries();
  console.log('[getAllSeries] Found series IDs:', seriesIds);

  const seriesList: SeriesMetadata[] = [];

  for (const seriesId of seriesIds) {
    try {
      console.log(`[getAllSeries] Loading series: ${seriesId}`);
      const metadata = await getSeriesInfo(seriesId);
      if (metadata) {
        console.log(`[getAllSeries] Successfully loaded: ${metadata.title}`);
        seriesList.push(metadata);
      } else {
        console.warn(`[getAllSeries] No metadata found for: ${seriesId}`);
      }
    } catch (error) {
      console.error(`[getAllSeries] Failed to load series ${seriesId}:`, error);
    }
  }

  // 按顺序排序
  seriesList.sort((a, b) => a.order - b.order);

  // 缓存结果
  seriesListCache.set("all", seriesList);

  console.log(`[getAllSeries] Returning ${seriesList.length} series`);
  return seriesList;
}

/**
 * 获取LLM系列（过滤掉ML系列）
 */
export async function getLLMSeries(): Promise<SeriesMetadata[]> {
  const allSeries = await getAllSeries();
  return allSeries.filter(series => !series.id.startsWith('ML_series/'));
}

/**
 * 获取ML系列（只返回ML系列）
 * 过滤掉404和不完整的系列
 */
export async function getMLSeries(): Promise<SeriesMetadata[]> {
  const allSeries = await getAllSeries();
  const mlSeries = allSeries.filter(series => series.id.startsWith('ML_series/'));

  // 过滤掉无效的系列（没有episodes的）
  const validMLSeries = mlSeries.filter(series => series.totalEpisodes > 0);

  console.log(`[getMLSeries] Found ${mlSeries.length} ML series, ${validMLSeries.length} valid`);
  return validMLSeries;
}

/**
 * 获取指定系列的信息
 */
export async function getSeriesInfo(seriesId: string): Promise<SeriesMetadata | null> {
  const metadata = await getSeriesMetadata(seriesId);
  const episodes = await listEpisodesForSeries(seriesId);

  if (episodes.length === 0) {
    return null;
  }

  const order = extractSeriesNumber(seriesId);
  const seriesInfo = metadata?.series_info || {};

  // 系列默认 emoji 映射
  const defaultEmojis: Record<string, string> = {
    "series_1_llm_foundation": "🧠",
    "series_2_rag_technique": "🔍",
  };

  return {
    id: seriesId,
    title: seriesInfo.name || metadata?.series_title || metadata?.title || `系列 ${order}`,
    description: seriesInfo.description || metadata?.series_description || metadata?.description || `包含 ${episodes.length} 期内容`,
    emoji: metadata?.series_emoji || metadata?.emoji || seriesInfo.emoji || defaultEmojis[seriesId] || "📚",
    cover: metadata?.cover,
    order,
    totalEpisodes: episodes.length,
    tags: seriesInfo.tags || metadata?.tags,
    createdAt: metadata?.created_at,
    updatedAt: metadata?.updated_at,
  };
}

/**
 * 获取指定系列的完整信息（包含所有集数）
 */
export async function getSeriesWithEpisodes(seriesId: string): Promise<SeriesWithEpisodes | null> {
  const cacheKey = seriesId;

  // 检查缓存
  if (seriesCache.has(cacheKey)) {
    return seriesCache.get(cacheKey)!;
  }

  // 获取系列基本信息
  const seriesInfo = await getSeriesInfo(seriesId);
  if (!seriesInfo) {
    return null;
  }

  // 获取所有 episode 目录
  const episodeIds = await listEpisodesForSeries(seriesId);
  const episodes: SeriesEpisode[] = [];

  for (const episodeId of episodeIds) {
    try {
      // 获取 episode 元数据和内容
      const episodeMetadata = await getEpisodeMetadata(seriesId, episodeId);
      const articleData = await getEpisodeArticleContent(seriesId, episodeId);

      if (!articleData) {
        console.warn(`无法获取 ${seriesId}/${episodeId} 的文章内容`);
        continue;
      }

      const episodeNumber = extractEpisodeNumber(episodeId);
      const { content } = articleData;
      const parsed = await parseMarkdown(content);

      // 提取标题 - 优先使用 metadata 中的标题
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title =
        episodeMetadata?.article_title ||
        episodeMetadata?.title ||
        titleMatch?.[1]?.trim() ||
        `第 ${episodeNumber} 期`;

      // 提取摘要
      const excerptMatch = content.match(/^#\s+.+$\n+(.+)$/m);
      const excerpt = excerptMatch
        ? excerptMatch[1].trim().slice(0, 200) + "..."
        : episodeMetadata?.excerpt;

      // 从 frontmatter 或 metadata 提取额外信息
      const tags = episodeMetadata?.tags || extractTagsFromFrontmatter(parsed.frontmatter);
      const wordCount = episodeMetadata?.word_count || extractWordCountFromFrontmatter(parsed.frontmatter) || parsed.wordCount;
      const readTime = episodeMetadata?.read_time || extractReadTimeFromFrontmatter(parsed.frontmatter) || parsed.readTime;

      episodes.push({
        episodeNumber,
        title,
        slug: episodeMetadata?.slug || generateSlug(title),
        excerpt,
        wordCount,
        readTime,
        tags,
        publishedAt: episodeMetadata?.published_at || parsed.frontmatter?.date,
      });
    } catch (error) {
      console.error(`加载系列episode失败: ${seriesId}/${episodeId}`, error);
    }
  }

  // 按期数排序
  episodes.sort((a, b) => a.episodeNumber - b.episodeNumber);

  const seriesWithEpisodes: SeriesWithEpisodes = {
    ...seriesInfo,
    episodes,
  };

  // 缓存结果
  seriesCache.set(cacheKey, seriesWithEpisodes);

  return seriesWithEpisodes;
}

/**
 * 获取指定系列指定集数的文章内容
 */
export async function getSeriesEpisode(
  seriesId: string,
  episodeNumber: number
): Promise<{ article: Article; seriesInfo: SeriesMetadata } | null> {
  const cacheKey = `${seriesId}:${episodeNumber}`;

  // 检查缓存
  if (episodeCache.has(cacheKey)) {
    return episodeCache.get(cacheKey)!;
  }

  const seriesData = await getSeriesWithEpisodes(seriesId);
  if (!seriesData) {
    return null;
  }

  const episode = seriesData.episodes.find((e) => e.episodeNumber === episodeNumber);
  if (!episode) {
    return null;
  }

  // 查找对应的 episode ID
  const episodeIds = await listEpisodesForSeries(seriesId);
  const episodeId = episodeIds.find((id) => extractEpisodeNumber(id) === episodeNumber);

  if (!episodeId) {
    return null;
  }

  // 获取文章内容
  const articleData = await getEpisodeArticleContent(seriesId, episodeId);
  if (!articleData) {
    return null;
  }

  const { content } = articleData;
  const parsed = await parseMarkdown(content);

  const article: Article = {
    slug: episode.slug,
    title: episode.title,
    content,
    htmlContent: parsed.html,
    headings: parsed.headings,
    wordCount: episode.wordCount,
    readTime: episode.readTime,
    tags: episode.tags,
    excerpt: episode.excerpt,
    emoji: seriesData.emoji,
    platform: "",
    modelName: "",
    date: seriesId,
    timestamp: String(episodeNumber),
    fullPath: `series/${seriesId}/${episodeId}`,
  };

  const result = {
    article,
    seriesInfo: {
      id: seriesData.id,
      title: seriesData.title,
      description: seriesData.description,
      emoji: seriesData.emoji,
      cover: seriesData.cover,
      order: seriesData.order,
      totalEpisodes: seriesData.totalEpisodes,
      tags: seriesData.tags,
      createdAt: seriesData.createdAt,
      updatedAt: seriesData.updatedAt,
    },
  };

  // 缓存结果
  episodeCache.set(cacheKey, result);

  return result;
}

/**
 * 获取所有系列的总期数
 */
export async function getTotalEpisodes(): Promise<number> {
  const allSeries = await getAllSeries();
  return allSeries.reduce((total, series) => total + series.totalEpisodes, 0);
}

/**
 * 根据标签筛选系列
 */
export async function getSeriesByTag(tag: string): Promise<SeriesMetadata[]> {
  const allSeries = await getAllSeries();

  return allSeries.filter((series) =>
    series.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * 搜索系列
 */
export async function searchSeries(query: string): Promise<SeriesMetadata[]> {
  const allSeries = await getAllSeries();
  const lowerQuery = query.toLowerCase();

  return allSeries.filter(
    (series) =>
      series.title.toLowerCase().includes(lowerQuery) ||
      series.description.toLowerCase().includes(lowerQuery) ||
      series.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * 获取所有标签
 */
export async function getAllSeriesTags(): Promise<string[]> {
  const allSeries = await getAllSeries();
  const tagSet = new Set<string>();

  for (const series of allSeries) {
    if (series.tags) {
      series.tags.forEach((tag) => tagSet.add(tag));
    }
  }

  return Array.from(tagSet).sort();
}
