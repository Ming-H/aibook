import { getAllDailyEntries, getLatestDailyEntry } from "@/lib/daily-loader";
import { parseMarkdown } from "@/lib/markdown-parser";
import Link from "next/link";

// 临时改为 SSR 以加快构建速度
export const dynamic = "force-dynamic";
// export const revalidate = 3600;

export default async function DailyPage() {
  const entries = await getAllDailyEntries();
  const latestEntry = await getLatestDailyEntry();

  return (
    <div className="min-h-screen bg-[var(--background-primary)] bg-noise">
      {/* 动态背景层 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
            animationDelay: '0s',
            filter: 'blur(80px)'
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            animationDelay: '1.5s',
            filter: 'blur(80px)'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-3 rounded-full glass-card px-8 py-4 pulse-ring mb-8">
              <div className="relative flex h-3 w-3">
                <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon-cyan)] opacity-75" />
                <div className="relative inline-flex h-3 w-3 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
              </div>
              <span className="text-sm font-semibold tracking-wide" style={{
                background: 'var(--gradient-text-neon)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                每日更新
              </span>
            </div>

            <h1 className="mb-6 text-6xl md:text-8xl font-black tracking-tight" style={{
              fontFamily: 'var(--font-display)',
              lineHeight: 'var(--leading-tight)'
            }}>
              <span className="block animate-gradient bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-purple)] to-[var(--color-pink)] bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%' }}>
                今日热点
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-[var(--text-secondary)]">
              汇聚最新的 AI 技术动态，每天为你精选行业前沿资讯
            </p>
          </div>
        </div>
      </section>

      {/* Latest Entry */}
      {latestEntry && (
        <section className="relative px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--gradient-primary)] px-6 py-2 text-sm font-bold text-white shadow-lg">
                <span className="relative flex h-2 w-2">
                  <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <div className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                最新一期
              </div>
            </div>

            <div className="relative rounded-3xl glass-card border border-[var(--border-default)] p-8 md:p-12 hover-glow">
              <Link href={`/daily/${latestEntry.date}`} className="block">
                <h2 className="mb-6 text-3xl md:text-4xl font-black text-[var(--text-primary)] hover:text-[var(--color-brand)] transition-colors">
                  {latestEntry.title}
                </h2>

                <div className="prose prose-lg prose-invert prose-slate max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: latestEntry.content.slice(0, 500) + "..." }} />
                </div>

                <div className="mt-8 flex items-center gap-4 text-[var(--text-muted)]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{latestEntry.date}</span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Historical Entries */}
      {entries.length > 1 && (
        <section className="relative px-6 pb-32">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-4xl font-black text-[var(--text-primary)]">历史归档</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entries.slice(1).map((entry, index) => (
                <Link
                  key={entry.date}
                  href={`/daily/${entry.date}`}
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative h-full rounded-2xl glass-card border border-[var(--border-default)] p-6 transition-all duration-300 hover:border-[var(--border-strong)] hover-glow">
                    <div className="mb-4 text-sm font-bold text-[var(--color-brand)]">
                      {entry.date}
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--color-brand)] transition-colors line-clamp-2">
                      {entry.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                      <span>查看详情</span>
                      <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
