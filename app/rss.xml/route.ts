import { getAllPosts } from "@/lib/content-loader";
import { getAllTools } from "@/lib/tools-loader";

export const dynamic = "force-static";

export async function GET() {
  const blogPosts = await getAllPosts("blog");
  const investingPosts = await getAllPosts("investing");
  const tools = getAllTools();

  const items = [
    ...blogPosts.map((post) => ({
      title: post.title,
      link: `https://devfox.ai/blog/${post.slug}`,
      description: post.excerpt,
      pubDate: new Date(post.date).toUTCString(),
      category: "Blog",
    })),
    ...investingPosts.map((post) => ({
      title: post.title,
      link: `https://devfox.ai/investing/${post.slug}`,
      description: post.excerpt,
      pubDate: new Date(post.date).toUTCString(),
      category: "投资",
    })),
    ...tools.map((tool) => ({
      title: `工具: ${tool.title}`,
      link: tool.url,
      description: tool.description,
      pubDate: new Date().toUTCString(),
      category: "工具",
    })),
  ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>极客狐 DevFox</title>
    <link>https://devfox.ai</link>
    <description>AI 技术 · 工具 · 投资</description>
    <language>zh-CN</language>
    <atom:link href="https://devfox.ai/rss.xml" rel="self" type="application/rss+xml"/>
    ${items
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <category>${item.category}</category>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
