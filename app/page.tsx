import { getArticlesGroupedByDate } from "@/lib/content-loader";
import { formatDate } from "@/lib/fs-utils";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function HomePage() {
  const groupedArticles = await getArticlesGroupedByDate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="relative mx-auto max-w-6xl">
          {/* 顶部徽章 */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 px-6 py-3 backdrop-blur-xl">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75" />
                <div className="relative w-2 h-2 bg-blue-400 rounded-full" />
              </div>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                探索 AI 技术前沿
              </span>
            </div>
          </div>

          {/* 主标题 */}
          <div className="text-center">
            <h1 className="mb-6 text-6xl md:text-8xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI 技术
              </span>
              <br />
              <span className="text-white/90">每日热点</span>
            </h1>

            <p className="mb-12 max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed">
              深入探索最新的人工智能技术、模型和框架
              <br />
              与前沿科技同行
            </p>

            {/* 统计卡片 */}
            {groupedArticles.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="group rounded-2xl bg-white/5 border border-white/10 px-8 py-4 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105">
                  <div className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors">
                    {groupedArticles.reduce((acc, g) => acc + g.articles.length, 0)}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">篇文章</div>
                </div>

                <div className="group rounded-2xl bg-white/5 border border-white/10 px-8 py-4 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105">
                  <div className="text-4xl font-black text-white group-hover:text-purple-400 transition-colors">
                    {groupedArticles.length}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">天内容</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 文章列表 */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          {groupedArticles.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="text-center">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                  <svg className="h-10 w-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-lg text-slate-400">暂无文章内容</p>
              </div>
            </div>
          ) : (
            <div className="space-y-20">
              {groupedArticles.map((group, groupIndex) => (
                <div key={group.date} className="space-y-10">
                  {/* 日期分组标题 */}
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 px-6 py-4 text-center shadow-2xl shadow-blue-500/25">
                      <div className="text-5xl font-black text-white">
                        {group.date.slice(6, 8)}
                      </div>
                      <div className="text-xs text-white/80">
                        {group.date.slice(4, 6)}月
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white">
                        {formatDate(group.date)}
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {group.articles.length} 篇文章 · 精选内容
                      </p>
                    </div>

                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  {/* 文章卡片网格 */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {group.articles.map((article, articleIndex) => (
                      <Link
                        key={`${article.date}-${article.slug}`}
                        href={`/articles/${article.date}/${article.slug}`}
                        className="group block"
                      >
                        <article className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
                          {/* 顶部装饰条 */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                          {/* 内容 */}
                          <div className="p-8">
                            {/* 标签 */}
                            {article.tags && article.tags.length > 0 && (
                              <div className="mb-5 flex flex-wrap gap-2">
                                {article.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 px-4 py-1.5 text-xs font-semibold text-blue-400"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* 标题 */}
                            <h3 className="mb-4 text-2xl font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors leading-tight">
                              {article.emoji && <span className="mr-2">{article.emoji}</span>}
                              {article.title}
                            </h3>

                            {/* 摘要 */}
                            {article.excerpt && (
                              <p className="mb-6 line-clamp-3 text-sm text-slate-400 leading-relaxed">
                                {article.excerpt}
                              </p>
                            )}

                            {/* 底部信息 */}
                            <div className="flex items-center justify-between pt-6 border-t border-white/10">
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1.5">
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {article.readTime} 分钟
                                </span>
                                {article.wordCount && (
                                  <span className="flex items-center gap-1.5">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {article.wordCount} 字
                                  </span>
                                )}
                              </div>

                              <div className="flex-shrink-0 rounded-full bg-white/5 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* 悬停发光效果 */}
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
        <section className="relative px-6 pb-24">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-12 text-center backdrop-blur-xl">
              {/* 装饰背景 */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

              {/* 内容 */}
              <div className="relative">
                <h2 className="mb-4 text-4xl font-black text-white">
                  保持学习
                </h2>
                <p className="mb-8 text-lg text-slate-400">
                  持续关注最新的 AI 技术动态<br />
                  不断提升自己的技术能力
                </p>
                <Link
                  href="/archive"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105"
                >
                  浏览归档
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
