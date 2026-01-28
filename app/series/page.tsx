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
    <div className="min-h-screen bg-white dark:bg-[var(--background-primary)]">
      {/* Header */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-2 font-mono">
            系列学习
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            系统化学习大语言模型，包含原理基础、RAG 技术、Agent 开发等 10 大系列
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 pb-8 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-[var(--text-primary)] mb-2 font-mono">
                {allSeries.length}
              </div>
              <div className="text-sm text-[var(--text-secondary)] font-mono">
                个系列
              </div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold text-[var(--text-primary)] mb-2 font-mono">
                {totalEpisodes}
              </div>
              <div className="text-sm text-[var(--text-secondary)] font-mono">
                期内容
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {allSeries.length === 0 ? (
            <div className="card p-16 text-center">
              <p className="text-[var(--text-secondary)] font-mono">暂无系列内容</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allSeries.map((series) => (
                <Link
                  key={series.id}
                  href={`/series/${series.id}`}
                  className="card-interactive card p-6 group"
                >
                  {/* Emoji Icon */}
                  {series.emoji && (
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md border-2 border-[var(--border-subtle)] bg-[var(--background-tertiary)] text-3xl">
                      {series.emoji}
                    </div>
                  )}

                  {/* Series Number */}
                  <div className="mb-3">
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      系列 {String(series.order).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-mono group-hover:text-[var(--border-medium)] transition-colors leading-snug">
                    {series.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-4">
                    {series.description}
                  </p>

                  {/* Tags */}
                  {series.tags && series.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
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
                    <svg className="w-4 h-4 text-[var(--text-primary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
