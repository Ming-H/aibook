import { getAllArticles, getAllDates } from "@/lib/content-loader";
import { formatDate } from "@/lib/fs-utils";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function ArchivePage() {
  const allArticles = await getAllArticles();
  const dates = await getAllDates();

  // Build monthly grouping
  const monthlyGroups = new Map<string, typeof allArticles>();
  for (const date of dates) {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const key = `${year}年${month}月`;

    if (!monthlyGroups.has(key)) {
      monthlyGroups.set(key, []);
    }

    const articlesForDate = allArticles.filter((a) => a.date === date);
    monthlyGroups.get(key)?.push(...articlesForDate);
  }

  const sortedMonths = Array.from(monthlyGroups.entries()).sort().reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* 页面头部 */}
      <section className="relative px-6 py-24">
        <div className="relative mx-auto max-w-6xl text-center">
          <h1 className="mb-6 text-6xl md:text-7xl font-black tracking-tight text-white">
            文章归档
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-slate-400">
            共 {allArticles.length} 篇文章，跨越 {dates.length} 天的探索之旅
          </p>

          {/* 统计卡片 */}
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="group rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105">
              <div className="text-5xl font-black text-white group-hover:text-blue-400 transition-colors mb-2">
                {allArticles.length}
              </div>
              <div className="text-sm text-slate-400">篇文章</div>
            </div>

            <div className="group rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105">
              <div className="text-5xl font-black text-white group-hover:text-purple-400 transition-colors mb-2">
                {dates.length}
              </div>
              <div className="text-sm text-slate-400">个发布日</div>
            </div>

            <div className="group rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105">
              <div className="text-5xl font-black text-white group-hover:text-pink-400 transition-colors mb-2">
                {sortedMonths.length}
              </div>
              <div className="text-sm text-slate-400">个月份</div>
            </div>
          </div>
        </div>
      </section>

      {/* 按月份分组 */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-16">
            {sortedMonths.map(([month, articles]) => (
              <div key={month}>
                {/* 月份标题 */}
                <div className="mb-8 flex items-center gap-6">
                  <div className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 px-8 py-4 shadow-2xl shadow-blue-500/25">
                    <div className="text-2xl font-black text-white">
                      {month.replace('年', ' ').replace('月', '')}
                    </div>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                {/* 文章列表 */}
                <div className="space-y-4">
                  {articles.map((article) => (
                    <Link
                      key={`${article.date}-${article.slug}`}
                      href={`/articles/${article.date}/${article.slug}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01]">
                        {/* 顶部装饰条 */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-start justify-between gap-6 p-8">
                          <div className="flex-1 min-w-0">
                            {/* 标题 */}
                            <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                              {article.emoji && <span className="mr-2">{article.emoji}</span>}
                              {article.title}
                            </h3>

                            {/* 元信息 */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                              <span className="flex items-center gap-2">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(article.date)}
                              </span>
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
                              {article.tags && article.tags.length > 0 && (
                                <div className="flex gap-2">
                                  {article.tags.slice(0, 2).map((tag) => (
                                    <span key={tag} className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 箭头图标 */}
                          <div className="flex-shrink-0 rounded-full bg-white/5 p-3 opacity-0 group-hover:opacity-100 transition-opacity group-hover:scale-110">
                            <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
