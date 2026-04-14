import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/content-loader";
import { getAllTools } from "@/lib/tools-loader";
import { getAllGalleryItems } from "@/lib/gallery-loader";
import { getAllPrompts } from "@/lib/prompts-loader";
import { SocialLinks } from "@/components/SocialLinks";

export const revalidate = 3600;

export const metadata = {
  title: "DevFox AI — AI 技术 · 画廊 · 提示词 · 投资",
  description: "DevFox AI 个人知识网站，AI 技术博客、AI 画廊、提示词库、开源工具和投资思考。",
};

export default async function HomePage() {
  const blogPosts = await getAllPosts("blog");
  const investingPosts = await getAllPosts("investing");
  const tools = getAllTools();
  const galleryItems = getAllGalleryItems();
  const prompts = getAllPrompts();

  return (
    <div className="max-w-[720px] mx-auto px-5 sm:px-8">
      {/* Hero */}
      <section className="py-16 md:py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-[var(--background-secondary)] border border-[var(--border-default)] mx-auto mb-6 overflow-hidden">
          <Image src="/avatar.png" alt="DevFox AI" width={80} height={80} className="rounded-full" />
        </div>
        <h1 className="text-2xl font-semibold mb-3 tracking-tight">DevFox AI</h1>
        <p className="text-sm text-[var(--text-tertiary)] mb-6">独立开发者 · AI 技术 · 投资</p>
        <div className="flex justify-center">
          <SocialLinks />
        </div>
      </section>

      {/* Latest Posts */}
      <section className="pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs tracking-widest uppercase text-[var(--text-muted)]">最新文章</h2>
          <Link href="/blog" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
            全部 →
          </Link>
        </div>
        {blogPosts.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">暂无文章。</p>
        ) : (
          <div>
            {blogPosts.slice(0, 5).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block py-4 border-b border-[var(--border-subtle)] group"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {post.title}
                  </span>
                  <time className="text-xs text-[var(--text-muted)] whitespace-nowrap flex-shrink-0">{post.date}</time>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* AI Gallery */}
      {galleryItems.length > 0 && (
        <section className="pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs tracking-widest uppercase text-[var(--text-muted)]">AI 画廊</h2>
            <Link href="/gallery" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
              全部 →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {galleryItems.slice(0, 6).map((item) => (
              <div
                key={item.slug}
                className="aspect-[4/3] bg-[var(--background-secondary)] border border-[var(--border-default)] rounded flex items-center justify-center text-xs text-[var(--text-muted)] p-2 text-center"
              >
                {item.title}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Prompts */}
      {prompts.length > 0 && (
        <section className="pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs tracking-widest uppercase text-[var(--text-muted)]">热门提示词</h2>
            <Link href="/prompts" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
              全部 →
            </Link>
          </div>
          <div>
            {prompts.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href="/prompts"
                className="block py-4 border-b border-[var(--border-subtle)] group"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {p.title}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{p.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Tools */}
      {tools.length > 0 && (
        <section className="pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs tracking-widest uppercase text-[var(--text-muted)]">工具 & 项目</h2>
            <Link href="/tools" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
              全部 →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tools.slice(0, 6).map((tool) => (
              <a
                key={tool.slug}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-3 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <span>{tool.icon}</span>
                <span className="truncate">{tool.title}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
