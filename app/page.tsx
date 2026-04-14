import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/content-loader";
import { getAllTools } from "@/lib/tools-loader";
import { SocialLinks } from "@/components/SocialLinks";

export const revalidate = 3600;

export const metadata = {
  title: "DevFox — AI · 投资 · 开源",
  description: "独立开发者，专注于 AI 技术与投资研究。",
};

export default async function HomePage() {
  const blogPosts = await getAllPosts("blog");
  const investingPosts = await getAllPosts("investing");
  const tools = getAllTools();

  const allPosts = [...blogPosts, ...investingPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return (
    <div className="max-w-[720px] mx-auto px-5 sm:px-8">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--background-secondary)] mx-auto mb-6 overflow-hidden"
          style={{ boxShadow: '0px 0px 0px 1px var(--border-default)' }}
        >
          <Image src="/avatar.png" alt="DevFox" width={64} height={64} className="rounded-full" />
        </div>
        <h1 className="text-2xl font-semibold mb-2 tracking-tight">DevFox</h1>
        <p className="text-[14px] text-[var(--text-tertiary)] mb-6">独立开发者 · AI · 投资</p>
        <div className="flex justify-center">
          <SocialLinks />
        </div>
      </section>

      {/* Recent Posts */}
      <section className="pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] font-medium">Recent Posts</h2>
          <Link href="/blog" className="text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
            全部 →
          </Link>
        </div>
        {allPosts.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">暂无文章。</p>
        ) : (
          <div>
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.tags?.includes('投资') ? 'investing' : 'blog'}/${post.slug}`}
                className="block py-4 group"
                style={{ boxShadow: '0 calc(-1 * var(--border-default)) 0 0 var(--border-subtle)' }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[15px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors leading-snug">
                    {post.title}
                  </span>
                  <time className="text-[12px] text-[var(--text-muted)] whitespace-nowrap flex-shrink-0 tabular-nums">
                    {post.date}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Projects */}
      {tools.length > 0 && (
        <section className="pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] font-medium">Projects</h2>
            <Link href="/projects" className="text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
              全部 →
            </Link>
          </div>
          <div className="space-y-0">
            {tools.slice(0, 6).map((tool) => (
              <a
                key={tool.slug}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{tool.icon}</span>
                  <div>
                    <span className="text-[14px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {tool.title}
                    </span>
                    <p className="text-[12px] text-[var(--text-muted)] mt-0.5">{tool.description}</p>
                  </div>
                </div>
                <span className="text-[var(--text-muted)] text-[12px] ml-4">→</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Links */}
      <section className="pb-16">
        <h2 className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] font-medium mb-6">Links</h2>
        <div className="space-y-0">
          <a
            href="https://Ming-H.github.io/ai-insights/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-4 group"
          >
            <div>
              <span className="text-[14px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                AI Insights
              </span>
              <p className="text-[12px] text-[var(--text-muted)] mt-0.5">每日 AI 行业动态速览</p>
            </div>
            <span className="text-[var(--text-muted)] text-[12px]">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
