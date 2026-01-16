import { getArticlesGroupedByDate } from "@/lib/content-loader";
import { formatDate } from "@/lib/fs-utils";
import { getAllSeries, getTotalEpisodes } from "@/lib/series-loader";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function HomePage() {
  const groupedArticles = await getArticlesGroupedByDate();
  const allSeries = await getAllSeries();
  const totalEpisodes = await getTotalEpisodes();

  const totalArticles = groupedArticles.reduce((acc, g) => acc + g.articles.length, 0);

  return (
    <div className="min-h-screen bg-[var(--background-primary)] bg-noise">
      {/* 动态背景层 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-grid opacity-40" />

        {/* 动态光晕 */}
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
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
            animationDelay: '3s',
            filter: 'blur(80px)'
          }}
        />

        {/* 粒子效果 */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[var(--color-brand)] animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: 0.3 + Math.random() * 0.4
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section - 超视觉冲击 */}
      <section className="relative px-6 py-32 md:py-40">
        <div className="relative mx-auto max-w-7xl">
          {/* 顶部徽章 - 脉冲效果 */}
          <div className="mb-10 flex justify-center animate-fade-in-down">
            <div className="inline-flex items-center gap-3 rounded-full glass-card px-8 py-4 pulse-ring">
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
                探索 AI 技术前沿
              </span>
            </div>
          </div>

          {/* 主标题 - 3D 效果 */}
          <div className="text-center animate-fade-in-up">
            <h1 className="mb-8 text-7xl md:text-9xl font-black tracking-tight" style={{
              fontFamily: 'var(--font-display)',
              lineHeight: 'var(--leading-tight)'
            }}>
              <span className="block animate-gradient bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-purple)] to-[var(--color-pink)] bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%' }}>
                AI 技术
              </span>
              <span className="block mt-4 text-[var(--text-primary)]" style={{ fontSize: '0.6em' }}>
                每日热点
              </span>
            </h1>

            <p className="mb-16 max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed text-[var(--text-secondary)]">
              深入探索最新的人工智能技术、模型和框架
              <br className="hidden md:block" />
              与前沿科技同行，见证 AI 时代
            </p>

            {/* 统计卡片 - 3D 悬浮效果 */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="group card-3d-interactive rounded-3xl glass-card px-10 py-6 animate-fade-in-up hover-glow" style={{ animationDelay: '0.1s' }}>
                <div className="text-6xl md:text-7xl font-black text-[var(--text-primary)] group-hover:text-[var(--color-brand)] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  {totalArticles}
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-2 uppercase tracking-wider">篇文章</div>
              </div>

              <div className="group card-3d-interactive rounded-3xl glass-card px-10 py-6 animate-fade-in-up hover-glow" style={{ animationDelay: '0.2s' }}>
                <div className="text-6xl md:text-7xl font-black text-[var(--text-primary)] group-hover:text-[var(--color-purple)] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  {groupedArticles.length}
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-2 uppercase tracking-wider">天内容</div>
              </div>

              <Link href="/series" className="group card-3d-interactive rounded-3xl holographic border border-[var(--border-default)] px-10 py-6 animate-fade-in-up hover-glow" style={{ animationDelay: '0.3s' }}>
                <div className="text-6xl md:text-7xl font-black text-[var(--text-primary)] group-hover:text-[var(--color-pink)] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  {allSeries.length}
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-2 uppercase tracking-wider">个系列</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 文章列表 - 沉浸式体验 */}
      <section className="relative px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          {groupedArticles.length === 0 ? (
            <div className="flex min-h-[500px] items-center justify-center rounded-3xl glass-card">
              <div className="text-center">
                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-[var(--background-tertiary)]">
                  <svg className="h-12 w-12 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-xl text-[var(--text-tertiary)]">暂无文章内容</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">请稍后再来查看</p>
              </div>
            </div>
          ) : (
            <div className="space-y-24">
              {groupedArticles.map((group, groupIndex) => (
                <div key={group.date} className="space-y-12 animate-fade-in-up" style={{ animationDelay: `${groupIndex * 0.1}s` }}>
                  {/* 日期分组标题 - 全息效果 */}
                  <div className="flex items-center gap-8">
                    <div className="flex-shrink-0 relative">
                      <div className="absolute inset-0 rounded-3xl animate-gradient bg-[var(--gradient-primary)] opacity-20 blur-xl" />
                      <div className="relative rounded-3xl bg-[var(--gradient-primary)] p-8 text-center glow-brand">
                        <div className="text-7xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                          {group.date.slice(6, 8)}
                        </div>
                        <div className="text-sm text-white/90 font-semibold tracking-wider">
                          {group.date.slice(4, 6)}月
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {formatDate(group.date)}
                      </h2>
                      <p className="mt-2 text-base text-[var(--text-muted)]">
                        {group.articles.length} 篇精选内容 · 深度解读
                      </p>
                    </div>

                    <div className="flex-1 h-px bg-gradient-to-r from-[var(--border-default)] to-transparent" />
                  </div>

                  {/* 文章卡片网格 - 3D 效果 */}
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {group.articles.map((article, articleIndex) => {
                      // 从 fullPath 提取 articleDir (格式: "20260114_133012_标题/filename.md")
                      const articleDir = article.fullPath?.split("/")[0] || article.date;
                      return (
                        <Link
                          key={`${article.date}-${article.slug}`}
                          href={`/articles/${articleDir}/${article.slug}`}
                          className="group block animate-fade-in-up"
                          style={{ animationDelay: `${(groupIndex * 0.05) + (articleIndex * 0.03)}s` }}
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
                            {/* 标签 */}
                            {article.tags && article.tags.length > 0 && (
                              <div className="mb-6 flex flex-wrap gap-2">
                                {article.tags.slice(0, 3).map((tag, tagIndex) => (
                                  <span
                                    key={tag}
                                    className="rounded-full bg-[var(--gradient-primary-soft)] border border-[var(--border-subtle)] px-4 py-2 text-xs font-bold text-[var(--text-brand)] tracking-wide uppercase stagger-enter"
                                    style={{ animationDelay: `${tagIndex * 0.05}s` }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* 标题 */}
                            <h3 className="mb-5 text-2xl font-bold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--color-brand)] transition-colors duration-300 leading-tight"
                              style={{ fontFamily: 'var(--font-heading)' }}>
                              {article.emoji && <span className="mr-2 inline-block group-hover:animate-bounce">{article.emoji}</span>}
                              {article.title}
                            </h3>

                            {/* 摘要 */}
                            {article.excerpt && (
                              <p className="mb-8 line-clamp-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                                {article.excerpt}
                              </p>
                            )}

                            {/* 底部信息 */}
                            <div className="flex items-center justify-between pt-6 border-t border-[var(--border-subtle)]">
                              <div className="flex items-center gap-6 text-xs text-[var(--text-muted)]">
                                <span className="flex items-center gap-2">
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {article.readTime} 分钟
                                </span>
                                {article.wordCount && (
                                  <span className="flex items-center gap-2">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {article.wordCount} 字
                                  </span>
                                )}
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
                              background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(102, 126, 234, 0.15), transparent 50%)'
                            }}
                          />
                        </article>
                      </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 底部 CTA - 全息效果 */}
      <section className="relative px-6 pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl holographic border border-[var(--border-default)] p-16 text-center glass-card animate-fade-in-up">
            {/* 装饰背景 - 动态光束 */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)',
                  filter: 'blur(80px)',
                  animation: 'float 6s ease-in-out infinite'
                }}
              />
              <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                  filter: 'blur(80px)',
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '3s'
                }}
              />
            </div>

            {/* 内容 */}
            <div className="relative">
              <h2 className="mb-6 text-5xl md:text-6xl font-black text-[var(--text-primary)] animate-fade-in-up" style={{ fontFamily: 'var(--font-display)' }}>
                保持学习
                <span className="block text-3xl md:text-4xl mt-2" style={{
                  background: 'var(--gradient-text-neon)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  持续进化
                </span>
              </h2>
              <p className="mb-12 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                持续关注最新的 AI 技术动态<br className="hidden md:block" />
                不断提升自己的技术能力，在 AI 时代保持领先
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <Link
                  href="/archive"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--gradient-primary)] px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover-glow-brand-strong animate-fade-in-up"
                  style={{ animationDelay: '0.1s' }}
                >
                  浏览归档
                  <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                {allSeries.length > 0 && (
                  <Link
                    href="/series"
                    className="group inline-flex items-center gap-3 rounded-full glass-card border border-[var(--border-default)] px-10 py-5 text-lg font-bold text-[var(--text-primary)] transition-all hover:bg-[var(--background-tertiary)] hover:border-[var(--border-medium)] hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: '0.2s' }}
                  >
                    探索系列
                    <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
