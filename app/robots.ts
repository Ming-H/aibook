import { MetadataRoute } from "next";

/**
 * 动态生成 robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.aibook.website/sitemap.xml",
  };
}
