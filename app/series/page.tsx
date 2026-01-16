import { getAllSeries, getTotalEpisodes } from "@/lib/series-loader";
import Link from "next/link";
import type { SeriesMetadata } from "@/types/content";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function SeriesPage() {
  let allSeries: SeriesMetadata[] = [];
  let totalEpisodes = 0;

  try {
    allSeries = await getAllSeries();
    console.log('[Series Page] Loaded series:', allSeries.length);
  } catch (error) {
    console.error('[Series Page] Failed to load series:', error);
  }

  try {
    totalEpisodes = await getTotalEpisodes();
    console.log('[Series Page] Total episodes:', totalEpisodes);
  } catch (error) {
    console.error('[Series Page] Failed to load episodes:', error);
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] bg-noise">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animationDelay: '0.5s'
          }}
        />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-32 md:py-40">
        <div className="relative mx-auto max-w-7xl">
          {/* 顶部徽章 */}
          <div className="mb-10 flex justify-center animate-fade-in-down">
            <div className="inline-flex items-center gap-3 rounded-full glass-card px-8 py-4 pulse-ring">
              <div className="relative flex h-3 w-3">
                <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon-pink)] opacity-75" />
                <div className="relative inline-flex h-3 w-3 rounded-full bg-[var(--neon-pink)] animate-pulse" />
              </div>
              <span className="text-sm font-bold tracking-wide" style={{
                background: 'var(--gradient-text-fire)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                精选系列内容
              </span>
            </div>
          </div>

          {/* 主标题 */}
          <div className="text-center animate-fade-in-up">
            <h1 className="mb-8 text-7xl md:text-9xl font-black tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="block animate-gradient bg-gradient-to-r from-[var(--color-purple)] via-[var(--color-pink)] to-[var(--color-orange)] bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%' }}>
                探索系列
              </span>
              <span className="block mt-4 text-[var(--text-primary)]" style={{ fontSize: '0.6em' }}>
                专题内容
              </span>
            </h1>

            <p className="mb-16 max-w-3xl mx-auto text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed">
              {allSeries.length} 个精心策划的系列，{totalEpisodes} 期深度内容
              <br className="hidden md:block" />
              系统化学习 AI 技术知识
            </p>

            {/* 统计卡片 */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="card-3d-interactive group rounded-3xl glass-card px-10 py-6 animate-fade-in-up hover-glow" style={{ animationDelay: '0.1s' }}>
                <div className="text-6xl md:text-7xl font-black text-[var(--text-primary)] group-hover:text-[var(--color-purple)] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  {allSeries.length}
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-2 uppercase tracking-wider">个系列</div>
              </div>

              <div className="card-3d-interactive group rounded-3xl glass-card px-10 py-6 animate-fade-in-up hover-glow" style={{ animationDelay: '0.2s' }}>
                <div className="text-6xl md:text-7xl font-black text-[var(--text-primary)] group-hover:text-[var(--color-pink)] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  {totalEpisodes}
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-2 uppercase tracking-wider">期内容</div>
              </div>

              <div className="card-3d-interactive group rounded-3xl holographic border border-[var(--border-default)] px-10 py-6 animate-fade-in-up hover-glow" style={{ animationDelay: '0.3s' }}>
                <div className="text-6xl md:text-7xl font-black text-[var(--text-primary)] group-hover:text-[var(--color-orange)] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  {Math.round(totalEpisodes / allSeries.length)}
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-2 uppercase tracking-wider">平均期数</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 系列列表 - 沉浸式卡片 */}
      <section className="relative px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          {allSeries.length === 0 ? (
            <div className="flex min-h-[500px] items-center justify-center rounded-3xl glass-card">
              <div className="text-center">
                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-[var(--background-tertiary)]">
                  <svg className="h-12 w-12 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-xl text-[var(--text-tertiary)]">暂无系列内容</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">敬请期待</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allSeries.map((series, index) => (
                <Link
                  key={series.id}
                  href={`/series/${series.id}`}
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <article className="card-3d-interactive relative h-full overflow-hidden rounded-3xl glass-card border border-[var(--border-default)] transition-all duration-500 hover:border-[var(--border-strong)] hover-glow">
                    {/* 顶部装饰条 - 霓虹效果 */}
                    <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'var(--gradient-aurora)',
                        backgroundSize: '200% 200%',
                        animation: 'gradientShift 3s ease infinite'
                      }}
                    />

                    {/* 内容 */}
                    <div className="p-8">
                      {/* 系列 emoji */}
                      {series.emoji && (
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--gradient-primary-soft)] border border-[var(--border-subtle)] text-5xl shadow-lg group-hover:scale-110 transition-transform">
                          {series.emoji}
                        </div>
                      )}

                      {/* 系列编号 */}
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-subtle)] px-5 py-2">
                        <span className="text-xs font-black tracking-widest" style={{ color: 'var(--color-brand)' }}>
                          系列 {String(series.order).padStart(2, '0')}
                        </span>
                      </div>

                      {/* 标题 */}
                      <h3 className="mb-4 text-2xl font-bold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--color-purple)] transition-colors duration-300 leading-tight"
                        style={{ fontFamily: 'var(--font-heading)' }}>
                        {series.title}
                      </h3>

                      {/* 描述 */}
                      <p className="mb-6 line-clamp-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                        {series.description}
                      </p>

                      {/* 标签 */}
                      {series.tags && series.tags.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2">
                          {series.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-[var(--gradient-primary-soft)] border border-[var(--border-subtle)] px-4 py-2 text-xs font-bold text-[var(--text-brand)] tracking-wide uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 底部信息 */}
                      <div className="flex items-center justify-between pt-6 border-t border-[var(--border-subtle)]">
                        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                          <span className="flex items-center gap-2">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            {series.totalEpisodes} 期
                          </span>
                        </div>

                        <div className="flex-shrink-0 rounded-full bg-[var(--background-tertiary)] p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--gradient-primary)]">
                          <svg className="h-4 w-4 text-[var(--text-muted)] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* 悬停发光效果 */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 50%)'
                      }}
                    />
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 底部 CTA - 全息效果 */}
      {allSeries.length > 0 && (
        <section className="relative px-6 pb-32">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl p-16 text-center holographic border border-[var(--border-default)] glass-card animate-fade-in-up">
              {/* 装饰背景 */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full animate-float"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                    filter: 'blur(80px)'
                  }}
                />
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full animate-float"
                  style={{
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    animationDelay: '3s'
                  }}
                />
              </div>

              {/* 内容 */}
              <div className="relative">
                <h2 className="mb-6 text-5xl md:text-6xl font-black text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  系统化学习
                </h2>
                <p className="mb-12 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                  从基础到进阶，循序渐进
                  <br className="hidden md:block" />
                  打造完整的 AI 技术知识体系
                </p>
                <Link
                  href="/"
                  className="group inline-flex items-center gap-3 px-12 py-6 bg-[var(--gradient-primary)] text-white text-lg font-bold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover-glow-brand-strong hover:shadow-3d-xl"
                >
                  返回首页
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
