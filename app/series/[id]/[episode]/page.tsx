import { getAllSeries, getSeriesEpisode, getSeriesWithEpisodes } from "@/lib/series-loader";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function generateStaticParams() {
  // 返回空数组，使用 fallback 在运行时生成页面
  // 这样可以避免构建时超时
  return [];
}

export default async function SeriesEpisodePage({
  params,
}: {
  params: Promise<{ id: string; episode: string }>;
}) {
  const { id, episode } = await params;
  const episodeNumber = parseInt(episode, 10);
  const data = await getSeriesEpisode(id, episodeNumber);

  if (!data) {
    notFound();
  }

  const { article, seriesInfo } = data;
  const seriesData = await getSeriesWithEpisodes(id);

  if (!seriesData) {
    notFound();
  }

  const currentEpisodeIndex = seriesData.episodes.findIndex((e) => e.episodeNumber === episodeNumber);
  const prevEpisode = currentEpisodeIndex > 0 ? seriesData.episodes[currentEpisodeIndex - 1] : null;
  const nextEpisode = currentEpisodeIndex < seriesData.episodes.length - 1 ? seriesData.episodes[currentEpisodeIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* 面包屑导航 */}
      <div className="relative px-6 pt-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 text-sm">
            <Link
              href="/series"
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              系列列表
            </Link>
            <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href={`/series/${id}`}
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              {seriesInfo.title}
            </Link>
            <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-purple-400 font-semibold">第 {episodeNumber} 期</span>
          </div>
        </div>
      </div>

      {/* 文章头部 */}
      <section className="relative px-6 py-12">
        <div className="relative mx-auto max-w-4xl">
          {/* 期数标识 */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-4xl font-black text-white shadow-2xl shadow-purple-500/30">
              {String(episodeNumber).padStart(2, '0')}
            </div>
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-500/30 px-4 py-1.5">
                <span className="text-xs font-bold text-purple-300">
                  系列 {String(seriesInfo.order).padStart(2, '0')} · 第 {episodeNumber} 期
                </span>
              </div>
              <div className="text-lg text-slate-400">{seriesInfo.title}</div>
            </div>
          </div>

          {/* 标题 */}
          <h1 className="mb-6 text-4xl md:text-5xl font-black text-white leading-tight">
            {article.title}
          </h1>

          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            {article.readTime && (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.readTime} 分钟阅读
              </span>
            )}
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
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 文章内容 */}
      <section className="relative px-6 pb-24">
        <div className="relative mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            {/* 内容区域 */}
            <div className="prose prose-invert prose-lg max-w-none p-8 md:p-12">
              <div
                dangerouslySetInnerHTML={{
                  __html: article.htmlContent || '',
                }}
                className="text-slate-300 leading-relaxed"
              />
            </div>

            {/* 底部渐变遮罩 */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 文章导航 */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {prevEpisode && (
              <Link
                href={`/series/${id}/${prevEpisode.episodeNumber}`}
                className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-black text-white group-hover:scale-110 transition-transform">
                    {String(prevEpisode.episodeNumber).padStart(2, '0')}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500 mb-1">上一期</div>
                  <div className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                    {prevEpisode.title}
                  </div>
                </div>
              </Link>
            )}

            {nextEpisode && (
              <Link
                href={`/series/${id}/${nextEpisode.episodeNumber}`}
                className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 md:text-right"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500 mb-1">下一期</div>
                  <div className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                    {nextEpisode.title}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-black text-white group-hover:scale-110 transition-transform">
                    {String(nextEpisode.episodeNumber).padStart(2, '0')}
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* 返回系列按钮 */}
          <div className="mt-8 text-center">
            <Link
              href={`/series/${id}`}
              className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-semibold text-slate-400 backdrop-blur-xl transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              查看全部 {seriesInfo.totalEpisodes} 期内容
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
