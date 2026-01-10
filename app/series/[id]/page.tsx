import { getAllSeries, getSeriesWithEpisodes } from "@/lib/series-loader";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  const allSeries = await getAllSeries();

  return allSeries.map((series) => ({
    id: series.id,
  }));
}

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seriesData = await getSeriesWithEpisodes(id);

  if (!seriesData) {
    notFound();
  }

  // 获取所有系列用于导航
  const allSeries = await getAllSeries();
  const currentIndex = allSeries.findIndex((s) => s.id === id);
  const prevSeries = currentIndex > 0 ? allSeries[currentIndex - 1] : null;
  const nextSeries = currentIndex < allSeries.length - 1 ? allSeries[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* 返回导航 */}
      <div className="relative px-6 pt-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/series"
            className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-6 py-3 text-sm font-semibold text-slate-400 backdrop-blur-xl transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回系列列表
          </Link>
        </div>
      </div>

      {/* 系列头部 */}
      <section className="relative px-6 py-12">
        <div className="relative mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-12 backdrop-blur-xl">
            {/* 装饰背景 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />

            {/* 内容 */}
            <div className="relative">
              {/* 系列 emoji 和编号 */}
              <div className="mb-6 flex items-center gap-6">
                {seriesData.emoji && (
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-5xl shadow-2xl shadow-purple-500/20">
                    {seriesData.emoji}
                  </div>
                )}
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-500/30 px-4 py-2">
                    <span className="text-sm font-bold text-purple-300">SERIES {String(seriesData.order).padStart(2, '0')}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white">
                    {seriesData.title}
                  </h1>
                </div>
              </div>

              {/* 描述 */}
              <p className="mb-8 text-lg text-slate-300 leading-relaxed max-w-3xl">
                {seriesData.description}
              </p>

              {/* 统计和标签 */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="text-sm font-semibold">{seriesData.totalEpisodes} 期内容</span>
                  </div>
                </div>

                {seriesData.tags && seriesData.tags.length > 0 && (
                  <div className="flex gap-2">
                    {seriesData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 text-sm font-semibold text-purple-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 集数列表 */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold text-white">全部集数</h2>

          {seriesData.episodes.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <p className="text-lg text-slate-400">暂无内容</p>
            </div>
          ) : (
            <div className="space-y-4">
              {seriesData.episodes.map((episode) => (
                <Link
                  key={`${seriesData.id}-${episode.episodeNumber}`}
                  href={`/series/${seriesData.id}/${episode.episodeNumber}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01]">
                    {/* 顶部装饰条 */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-start gap-6 p-8">
                      {/* 期数标识 */}
                      <div className="flex-shrink-0">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-2xl font-black text-white shadow-xl shadow-purple-500/20 group-hover:scale-110 transition-transform">
                          {String(episode.episodeNumber).padStart(2, '0')}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* 标题 */}
                        <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                          {episode.title}
                        </h3>

                        {/* 摘要 */}
                        {episode.excerpt && (
                          <p className="mb-4 line-clamp-2 text-sm text-slate-400">
                            {episode.excerpt}
                          </p>
                        )}

                        {/* 元信息 */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                          {episode.readTime && (
                            <span className="flex items-center gap-2">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {episode.readTime} 分钟
                            </span>
                          )}
                          {episode.wordCount && (
                            <span className="flex items-center gap-2">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {episode.wordCount} 字
                            </span>
                          )}
                          {episode.tags && episode.tags.length > 0 && (
                            <div className="flex gap-2">
                              {episode.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 箭头图标 */}
                      <div className="flex-shrink-0 rounded-full bg-white/5 p-3 opacity-0 group-hover:opacity-100 transition-opacity group-hover:scale-110">
                        <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 系列导航 */}
      {(prevSeries || nextSeries) && (
        <section className="relative px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2">
              {prevSeries && (
                <Link
                  href={`/series/${prevSeries.id}`}
                  className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20"
                >
                  <div className="flex-shrink-0 rounded-full bg-white/5 p-3 group-hover:bg-white/10 transition-colors">
                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500 mb-1">上一个系列</div>
                    <div className="font-semibold text-white group-hover:text-purple-400 transition-colors truncate">
                      {prevSeries.emoji && <span className="mr-2">{prevSeries.emoji}</span>}
                      {prevSeries.title}
                    </div>
                  </div>
                </Link>
              )}

              {nextSeries && (
                <Link
                  href={`/series/${nextSeries.id}`}
                  className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20"
                >
                  <div className="flex-1 min-w-0 text-right">
                    <div className="text-xs text-slate-500 mb-1">下一个系列</div>
                    <div className="font-semibold text-white group-hover:text-purple-400 transition-colors truncate">
                      {nextSeries.title}
                      {nextSeries.emoji && <span className="ml-2">{nextSeries.emoji}</span>}
                    </div>
                  </div>
                  <div className="flex-shrink-0 rounded-full bg-white/5 p-3 group-hover:bg-white/10 transition-colors">
                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
