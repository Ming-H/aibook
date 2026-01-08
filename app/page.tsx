import { getArticlesGroupedByDate } from "@/lib/content-loader";
import { formatDate } from "@/lib/fs-utils";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function HomePage() {
  const groupedArticles = await getArticlesGroupedByDate();

  return (
    <div className="min-h-screen">
      {/* Hero Section - 极简现代设计 */}
      <section className="relative overflow-hidden px-6 py-32 md:py-48">
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />

        {/* 动态装饰元素 */}
        <div className="absolute top-20 right-20 h-72 w-72 animate-pulse rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute bottom-20 left-20 h-96 w-96 animate-pulse rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-500/10" style={{ animationDelay: "1s" }} />

        <div className="relative mx-auto max-w-5xl text-center">
          {/* 标签 */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 text-sm backdrop-blur-sm dark:bg-slate-800/50 dark:text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            探索 AI 的无限可能
          </div>

          {/* 主标题 */}
          <h1 className="mb-8 text-5xl font-bold tracking-tight text-slate-900 md:text-7xl lg:text-8xl dark:text-white">
            AI 技术
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}热点
            </span>
          </h1>

          {/* 副标题 */}
          <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-600 md:text-xl dark:text-slate-400">
            深入探索前沿人工智能技术，了解最新模型、框架与应用
          </p>

          {/* 统计信息 */}
          {groupedArticles.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>{groupedArticles.length} 天内容</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span>{groupedArticles.reduce((acc, g) => acc + g.articles.length, 0)} 篇文章</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 文章列表 - 极简卡片设计 */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          {groupedArticles.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <svg className="h-8 w-8 text-slate-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400">暂无文章内容</p>
              </div>
            </div>
          ) : (
            <div className="space-y-24">
              {groupedArticles.map((group, groupIndex) => (
                <div key={group.date} className="space-y-8">
                  {/* 日期标题 */}
                  <div className="flex items-center gap-6">
                    <div className="text-7xl font-bold text-slate-200 dark:text-slate-800">
                      {group.date.slice(6, 8)}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                        {formatDate(group.date)}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {group.articles.length} 篇文章
                      </p>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800" />
                  </div>

                  {/* 文章网格 */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {group.articles.map((article, articleIndex) => (
                      <Link
                        key={`${article.date}-${article.slug}`}
                        href={`/articles/${article.date}/${article.slug}`}
                        className="group"
                      >
                        <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:shadow-blue-500/5"
                          style={{
                            animation: `fadeInUp 0.6s ease-out ${groupIndex * 0.1 + articleIndex * 0.05}s both`
                          }}
                        >
                          {/* 文章标签 */}
                          {article.tags && article.tags.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                              {article.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 text-xs font-medium text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* 标题 */}
                          <h3 className="mb-4 text-xl font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
                            {article.emoji && <span className="mr-2">{article.emoji}</span>}
                            {article.title}
                          </h3>

                          {/* 摘要 */}
                          {article.excerpt && (
                            <p className="mb-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                              {article.excerpt}
                            </p>
                          )}

                          {/* 元信息 */}
                          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {article.readTime} 分钟
                            </span>
                            {article.wordCount && (
                              <>
                                <span>·</span>
                                <span>{article.wordCount} 字</span>
                              </>
                            )}
                          </div>

                          {/* 悬停效果 - 渐变边框 */}
                          <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5" />
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 底部 CTA */}
      {groupedArticles.length > 0 && (
        <section className="px-6 pb-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-3xl border border-slate-200 bg-white/50 p-12 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
              <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
                保持学习
              </h2>
              <p className="mb-8 text-slate-600 dark:text-slate-400">
                持续关注最新的 AI 技术动态，不断提升自己的技术能力
              </p>
              <Link
                href="/archive"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                浏览归档
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
