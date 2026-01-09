import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content-loader";

/**
 * 动态生成网站地图
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 获取所有文章
  const articles = await getAllArticles();

  // 生成文章页面条目
  const blogPosts = articles.map((article) => ({
    url: `https://www.aibook.website/articles/${article.date}/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://www.aibook.website",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: "https://www.aibook.website/archive",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...blogPosts,
  ];
}
