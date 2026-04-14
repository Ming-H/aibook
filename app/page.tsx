import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/content-loader";
import { getAllTools } from "@/lib/tools-loader";
import { SocialLinks } from "@/components/SocialLinks";

export const revalidate = 3600;

export const metadata = {
  title: "DevFox AI — AI 技术 · 工具 · 投资",
  description: "DevFox AI 个人知识网站，分享 AI 技术文章、开源工具和投资理财思考。",
};

export default async function HomePage() {
  const blogPosts = await getAllPosts("blog");
  const investingPosts = await getAllPosts("investing");
  const tools = getAllTools();

  return (
    <div className="max-w-[680px] mx-auto px-5 sm:px-8">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--background-secondary)] border border-[var(--border-default)] mx-auto mb-6 overflow-hidden">
          <Image src="/avatar.png" alt="DevFox AI" width={80} height={80} className="rounded-full" />
        </div>
        <h1 className="text-2xl font-semibold mb-3 tracking-tight">DevFox AI</h1>
        <p className="text-sm text-[var(--text-tertiary)] mb-6 tracking-wide">
          独立开发者 · AI 技术 · 投资
        </p>
        <div className="flex justify-center">
          <SocialLinks />
        </div>
      </section>

      {/* Latest Posts */}
      <section className="pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-medium tracking-widest uppercase text-[var(--text-muted)]">最新文章</h2>
          <Link href="/blog" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
            全部 →
          </Link>
        </div>
        {blogPosts.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">暂无文章。</p>
        ) : (
          <div className="space-y-0">
            {blogPosts.slice(0, 5).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block py-4 border-b border-[var(--border-subtle)] group"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {post.title}
                  </h3>
                  <time className="text-xs text-[var(--text-muted)] whitespace-nowrap flex-shrink-0">
                    {post.date}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Investing */}
      {investingPosts.length > 0 && (
        <section className="pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-medium tracking-widest uppercase text-[var(--text-muted)]">投资笔记</h2>
            <Link href="/investing" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
              全部 →
            </Link>
          </div>
          <div className="space-y-0">
            {investingPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/investing/${post.slug}`}
                className="block py-4 border-b border-[var(--border-subtle)] group"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {post.title}
                  </h3>
                  <time className="text-xs text-[var(--text-muted)] whitespace-nowrap flex-shrink-0">
                    {post.date}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Daily + Tools */}
      <section className="pb-16 grid sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xs font-medium tracking-widest uppercase text-[var(--text-muted)] mb-4">AI 日报</h2>
          <p className="text-sm text-[var(--text-tertiary)] mb-4">每日 AI 行业动态速览</p>
          <Link href="/daily" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            查看日报 →
          </Link>
        </div>
        {tools.length > 0 && (
          <div>
            <h2 className="text-xs font-medium tracking-widest uppercase text-[var(--text-muted)] mb-4">工具 & 项目</h2>
            <div className="space-y-3">
              {tools.slice(0, 3).map((tool) => (
                <a
                  key={tool.slug}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                >
                  <span className="text-base">{tool.icon}</span>
                  {tool.title}
                </a>
              ))}
            </div>
            <Link href="/tools" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mt-4 inline-block">
              查看全部 →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
