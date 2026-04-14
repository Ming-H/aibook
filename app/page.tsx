import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/content-loader";
import { getAllTools } from "@/lib/tools-loader";
import { SocialLinks } from "@/components/SocialLinks";
import { ArticleCard } from "@/components/ArticleCard";

export const revalidate = 3600;

export const metadata = {
  title: "极客狐 DevFox — AI 技术 · 工具 · 投资",
  description: "极客狐 DevFox 的个人知识网站，分享 AI 技术文章、开源工具和投资理财思考。",
};

export default async function HomePage() {
  const blogPosts = await getAllPosts("blog");
  const tools = getAllTools();

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6">
      {/* Hero */}
      <section className="py-16 md:py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-[var(--background-secondary)] border border-[var(--border-color)] mx-auto mb-6 overflow-hidden flex items-center justify-center">
          <Image src="/avatar.png" alt="极客狐 DevFox" width={96} height={96} className="rounded-full" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">极客狐 DevFox</h1>
        <p className="text-lg text-[var(--text-secondary)] mb-6">
          独立开发者 · AI 技术探索者 · 投资爱好者
        </p>
        <div className="flex justify-center">
          <SocialLinks />
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link href="/blog" className="text-sm text-[var(--accent-color)] hover:underline">
            查看全部 →
          </Link>
        </div>
        {blogPosts.length === 0 ? (
          <p className="text-[var(--text-secondary)]">暂无文章，敬请期待。</p>
        ) : (
          <div className="space-y-4">
            {blogPosts.slice(0, 3).map((post) => (
              <ArticleCard
                key={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                readingTime={post.readingTime}
                tags={post.tags}
                href={`/blog/${post.slug}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* AI Daily */}
      <section className="py-10 border-t border-[var(--border-color)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">AI 日报</h2>
          <Link href="/daily" className="text-sm text-[var(--accent-color)] hover:underline">
            查看全部 →
          </Link>
        </div>
        <p className="text-[var(--text-secondary)]">
          每日 AI 行业动态速览，涵盖学术突破、技术创新、产品发布等前沿资讯。
        </p>
      </section>

      {/* Tools */}
      {tools.length > 0 && (
        <section className="py-10 border-t border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">工具 & 项目</h2>
            <Link href="/tools" className="text-sm text-[var(--accent-color)] hover:underline">
              查看全部 →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {tools.slice(0, 4).map((tool) => (
              <a
                key={tool.slug}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors"
              >
                <div className="text-2xl mb-2">{tool.icon}</div>
                <h3 className="font-semibold mb-1">{tool.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
