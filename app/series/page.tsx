import { getAllSeries, getTotalEpisodes } from "@/lib/series-loader";
import Link from "next/link";
import type { SeriesMetadata } from "@/types/content";

// 强制动态渲染
export const dynamic = "force-dynamic";

export default async function SeriesPage() {
  let allSeries: SeriesMetadata[] = [];
  let totalEpisodes = 0;

  try {
    allSeries = await getAllSeries();
  } catch (error) {
    console.error('[Series Page] Failed to load series:', error);
  }

  try {
    totalEpisodes = await getTotalEpisodes();
  } catch (error) {
    console.error('[Series Page] Failed to load episodes:', error);
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* Header */}
      <div className="border-b-2 border-[var(--border-subtle)]">
        <div className="px-6 py-4">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] font-mono">
              系列学习
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Stats */}
          <div className="flex gap-6 mb-12">
            <div className="card px-6 py-4">
              <div className="text-3xl font-bold text-[var(--text-primary)] font-mono mb-1">
                {allSeries.length}
              </div>
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                个系列
              </div>
            </div>
            <div className="card px-6 py-4">
              <div className="text-3xl font-bold text-[var(--text-primary)] font-mono mb-1">
                {totalEpisodes}
              </div>
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                期内容
              </div>
            </div>
          </div>

          {/* Series Grid */}
          {allSeries.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-[var(--text-secondary)]">暂无系列内容</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {allSeries.map((series) => (
                <Link
                  key={series.id}
                  href={`/series/${series.id}`}
                  className="card-interactive card p-6 group"
                >
                  {/* Series emoji */}
                  {series.emoji && (
                    <div className="mb-4 text-4xl">
                      {series.emoji}
                    </div>
                  )}

                  {/* Series number */}
                  <div className="mb-3">
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      系列 {String(series.order).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-mono group-hover:text-[var(--border-medium)] transition-colors leading-tight">
                    {series.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-6">
                    {series.description}
                  </p>

                  {/* Tags */}
                  {series.tags && series.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {series.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="tag font-mono text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {series.totalEpisodes} 期
                    </div>
                    <div className="flex items-center gap-1 text-sm font-mono text-[var(--text-primary)] group-hover:translate-x-1 transition-transform">
                      <span>查看</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
