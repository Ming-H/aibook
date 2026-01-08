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
    <div className="min-h-screen px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        {/* 页面头部 */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-slate-900 md:text-6xl dark:text-white">
            文章归档
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            共 {allArticles.length} 篇文章，跨越 {dates.length} 天的探索之旅
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{allArticles.length}</div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">篇文章</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">{dates.length}</div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">个发布日</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">{sortedMonths.length}</div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">个月份</div>
          </div>
        </div>

        {/* 按月份分组 */}
        <div className="space-y-16">
          {sortedMonths.map(([month, articles], monthIndex) => (
            <div key={month}>
              {/* 月份标题 */}
              <div className="mb-8 flex items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{month}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800" />
              </div>

              {/* 文章列表 */}
              <div className="space-y-3">
                {articles.map((article, articleIndex) => (
                  <Link
                    key={`${article.date}-${article.slug}`}
                    href={`/articles/${article.date}/${article.slug}`}
                    className="group block"
                  >
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-200 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:shadow-blue-500/5 dark:hover:border-slate-700">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                            {article.emoji && <span className="mr-2">{article.emoji}</span>}
                            {article.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1.5">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(article.date)}
                            </span>
                            <span>·</span>
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
                            {article.tags && article.tags.length > 0 && (
                              <>
                                <span>·</span>
                                <div className="flex gap-2">
                                  {article.tags.slice(0, 2).map((tag) => (
                                    <span key={tag} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>
  );
}
