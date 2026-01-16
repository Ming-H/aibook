import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content-loader";
import { getAllSeries, getSeriesWithEpisodes } from "@/lib/series-loader";

/**
 * 动态生成网站地图
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 获取所有文章
  const articles = await getAllArticles();

  // 生成文章页面条目
  const blogPosts = articles.map((article) => {
    // 将 YYYYMMDD 转换为 YYYY-MM-DD
    const year = article.date.slice(0, 4);
    const month = article.date.slice(4, 6);
    const day = article.date.slice(6, 8);
    const dateStr = `${year}-${month}-${day}`;

    // 从 fullPath 提取 articleDir (格式: "20260114_133012_标题/filename.md")
    const articleDir = article.fullPath?.split("/")[0] || article.date;

    return {
      url: `https://www.devfoxai.cn/articles/${articleDir}/${article.slug}`,
      lastModified: new Date(dateStr),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  // 获取所有系列
  const allSeries = await getAllSeries();

  // 生成系列页面条目
  const seriesPages = await Promise.all(
    allSeries.map(async (series) => {
      const seriesData = await getSeriesWithEpisodes(series.id);
      const episodes = seriesData?.episodes || [];

      return [
        {
          url: `https://www.devfoxai.cn/series`,
          lastModified: new Date(),
          changeFrequency: "daily" as const,
          priority: 0.9,
        },
        {
          url: `https://www.devfoxai.cn/series/${series.id}`,
          lastModified: series.updatedAt ? new Date(series.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        },
        ...episodes.map((episode) => ({
          url: `https://www.devfoxai.cn/series/${series.id}/${episode.episodeNumber}`,
          lastModified: episode.publishedAt ? new Date(episode.publishedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      ];
    })
  ).then((results) => results.flat());

  return [
    {
      url: "https://www.devfoxai.cn",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: "https://www.devfoxai.cn/archive",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...blogPosts,
    ...seriesPages,
  ];
}
