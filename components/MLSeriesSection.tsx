import { getMLSeries } from "@/lib/series-loader";
import Link from "next/link";
import type { SeriesMetadata } from "@/types/content";

export async function MLSeriesSection() {
  let mlSeries: SeriesMetadata[] = [];

  try {
    mlSeries = await getMLSeries();
  } catch (error) {
    console.error('[ML Series Section] Failed to load ML series:', error);
  }

  if (mlSeries.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] font-mono">ML 系列教程</h2>
        <span className="text-sm text-[var(--text-muted)] font-mono">{mlSeries.length} 个系列</span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mlSeries.map((series) => (
          <Link
            key={series.id}
            href={`/series/${series.id}`}
            className="card p-5 group hover:border-[var(--border-medium)] transition-all"
          >
            <div className="flex items-start gap-3">
              {series.emoji && (
                <div className="text-3xl flex-shrink-0">{series.emoji}</div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--border-medium)] transition-colors font-mono text-sm">
                  {series.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-2">
                  {series.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                  <span>{series.totalEpisodes} 期</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
