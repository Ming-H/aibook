import { getAllDailyEntries, getLatestDailyEntry } from "@/lib/daily-loader";
import { parseMarkdown } from "@/lib/markdown-parser";
import Link from "next/link";

// 强制动态渲染，禁用所有缓存
export const dynamic = "force-dynamic";
export const revalidate = 0;

// 格式化日期显示
function formatDate(dateStr: string): string {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const date = new Date(`${year}-${month}-${day}`);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };

  return date.toLocaleDateString('zh-CN', options);
}

// 提取内容摘要
function extractExcerpt(content: string, maxLength = 200): string {
  // 移除 markdown 语法
  let clean = content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^[-*+]\s/gm, '')
    .replace(/^\d+\.\s/gm, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (clean.length > maxLength) {
    return clean.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
  }
  return clean;
}

// 提取关键指标
function extractMetrics(content: string): { count?: number, categories?: string[] } {
  const countMatch = content.match(/本期精选\s*(\d+)\s*个/);
  const count = countMatch ? parseInt(countMatch[1]) : undefined;

  const categories: string[] = [];
  if (content.includes('📈')) categories.push('行业动态');
  if (content.includes('🎓')) categories.push('学术突破');
  if (content.includes('🔬')) categories.push('技术创新');
  if (content.includes('🛠️')) categories.push('AI工具');
  if (content.includes('💡')) categories.push('核心洞察');
  if (content.includes('📰')) categories.push('深度观察');

  return { count, categories: categories.slice(0, 4) };
}

export default async function DailyPage() {
  const entries = await getAllDailyEntries();
  const latestEntry = await getLatestDailyEntry();
  const latestMetrics = latestEntry ? extractMetrics(latestEntry.content) : { count: undefined, categories: [] };
  const latestExcerpt = latestEntry ? extractExcerpt(latestEntry.content, 180) : '';

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Primary gradient orb */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.12) 0%, transparent 65%)',
            animationDelay: '0s',
            filter: 'blur(100px)'
          }}
        />

        {/* Secondary gradient orb */}
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 65%)',
            animationDelay: '2s',
            filter: 'blur(100px)'
          }}
        />

        {/* Accent gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 65%)',
            animationDelay: '4s',
            filter: 'blur(100px)'
          }}
        />
      </div>

      {/* Hero Section - Redesigned */}
      <section className="relative px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="relative mx-auto max-w-7xl">
          {/* Date Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-card border border-[var(--border-subtle)] shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[var(--neon-cyan)] animate-ping opacity-20" />
                <div className="relative w-2.5 h-2.5 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
              </div>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {latestEntry ? formatDate(latestEntry.date) : '加载中...'}
              </span>
              <div className="h-4 w-px bg-[var(--border-default)]" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">每日更新</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center">
            <h1 className="mb-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                lineHeight: '0.95',
                letterSpacing: '-0.03em'
              }}
            >
              <span className="block mb-2">
                <span className="inline-block bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-purple)] to-[var(--color-pink)] bg-clip-text text-transparent animate-gradient"
                  style={{ backgroundSize: '200% 200%' }}>
                  今日
                </span>
              </span>
              <span className="block">
                <span className="inline-block bg-gradient-to-r from-[var(--color-purple)] via-[var(--color-pink)] to-[var(--color-brand)] bg-clip-text text-transparent animate-gradient"
                  style={{ backgroundSize: '200% 200%', animationDelay: '0.5s' }}>
                  AI 热点
                </span>
              </span>
            </h1>

            {/* Subtitle with metrics */}
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed">
                汇聚全球顶尖 AI 技术动态，每天为你精选前沿资讯
              </p>

              {latestMetrics.count && (
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-subtle)]">
                    <span className="text-2xl font-black bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-purple)] bg-clip-text text-transparent">
                      {latestMetrics.count}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">条前沿动态</span>
                  </div>

                  {latestMetrics.categories?.map((cat, i) => (
                    <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-subtle)]">
                      <span className="text-lg">{cat === '行业动态' ? '📈' : cat === '学术突破' ? '🎓' : cat === '技术创新' ? '🔬' : '🛠️'}</span>
                      <span className="text-sm text-[var(--text-secondary)]">{cat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Entry - Completely Redesigned */}
      {latestEntry && (
        <section className="relative px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-[var(--gradient-primary)] blur-xl opacity-50 animate-pulse" />
                  <div className="relative px-5 py-2.5 rounded-xl bg-[var(--gradient-primary)]">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-30" />
                        <div className="relative w-2 h-2 rounded-full bg-white" />
                      </div>
                      <span className="text-sm font-bold text-white tracking-wide">最新发布</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Card */}
            <Link href={`/daily/${latestEntry.date}`} className="block group">
              <div className="relative rounded-3xl overflow-hidden glass-card border border-[var(--border-default)] hover:border-[var(--color-brand)] transition-all duration-500 hover-glow">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand)]/5 via-transparent to-[var(--color-purple)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative p-8 md:p-12 lg:p-16">
                  {/* Date label */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-subtle)]">
                      <svg className="w-4 h-4 text-[var(--color-brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {formatDate(latestEntry.date)}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] leading-tight group-hover:text-[var(--color-brand)] transition-colors duration-300"
                    style={{
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {latestEntry.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mb-8 text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-4xl">
                    {latestExcerpt}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--gradient-primary)] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <span>阅读完整内容</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>刚刚发布</span>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-gradient-to-br from-[var(--color-brand)]/10 to-[var(--color-purple)]/10 blur-2xl group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--color-purple)]/10 to-[var(--color-pink)]/10 blur-2xl group-hover:scale-150 transition-transform duration-500 delay-100" />
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Historical Entries - Grid Layout */}
      {entries.length > 1 && (
        <section className="relative px-6 pb-32">
          <div className="mx-auto max-w-7xl">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-3"
                  style={{
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  历史归档
                </h2>
                <p className="text-lg text-[var(--text-secondary)]">
                  浏览往期 AI 热点资讯
                </p>
              </div>

              {entries.length > 4 && (
                <div className="hidden md:block text-sm text-[var(--text-muted)]">
                  共 {entries.length - 1} 期内容
                </div>
              )}
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {entries.slice(1).map((entry, index) => {
                const metrics = extractMetrics(entry.content);
                const excerpt = extractExcerpt(entry.content, 120);

                return (
                  <Link
                    key={entry.date}
                    href={`/daily/${entry.date}`}
                    className="group block"
                  >
                    <div className="relative h-full rounded-2xl glass-card border border-[var(--border-default)] p-6 transition-all duration-300 hover:border-[var(--border-strong)] hover-glow overflow-hidden">
                      {/* Hover gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand)]/0 via-transparent to-[var(--color-purple)]/0 group-hover:from-[var(--color-brand)]/5 group-hover:to-[var(--color-purple)]/5 transition-all duration-500" />

                      {/* Content */}
                      <div className="relative">
                        {/* Date badge */}
                        <div className="mb-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)]">
                            <svg className="w-3.5 h-3.5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-semibold text-[var(--text-primary)]">
                              {entry.date.slice(0, 4)}-{entry.date.slice(4, 6)}-{entry.date.slice(6, 8)}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--color-brand)] transition-colors line-clamp-2"
                          style={{
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '-0.01em'
                          }}
                        >
                          {entry.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="mb-4 text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                          {excerpt}
                        </p>

                        {/* Metrics */}
                        {metrics.count && (
                          <div className="mb-4 flex items-center gap-2">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--background-tertiary)]">
                              <span className="text-xs font-bold text-[var(--color-brand)]">
                                {metrics.count}
                              </span>
                              <span className="text-xs text-[var(--text-muted)]">条</span>
                            </div>

                            {metrics.categories?.slice(0, 2).map((cat, i) => (
                              <div key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--background-tertiary)]">
                                <span className="text-xs">
                                  {cat === '行业动态' ? '📈' : cat === '学术突破' ? '🎓' : cat === '技术创新' ? '🔬' : '🛠️'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-brand)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>查看详情</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--color-brand)]/10 to-transparent rounded-bl-full" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Load More indicator */}
            {entries.length > 4 && (
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border border-[var(--border-subtle)] text-sm text-[var(--text-muted)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span>往期内容持续更新中</span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
