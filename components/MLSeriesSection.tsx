/**
 * ML 系列板块组件 - 极客风格
 * 展示机器学习相关系列
 */

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

  // ML系列emoji映射
  const mlEmojis: Record<string, string> = {
    "ml_series_1": "🎯",
    "ml_series_2": "🧠",
    "ml_series_3": "👁️",
    "ml_series_4": "💬",
    "ml_series_5": "🎮",
    "ml_series_6": "📊",
    "ml_series_7": "⚡",
    "ml_series_8": "🔬",
    "ml_series_9": "🔧",
    "ml_series_10": "🚀",
  };

  // 获取系列对应的emoji
  const getSeriesEmoji = (seriesId: string): string => {
    for (const [key, emoji] of Object.entries(mlEmojis)) {
      if (seriesId.includes(key)) {
        return emoji;
      }
    }
    return "📚";
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2 font-mono">
            ML 系列教程
          </h2>
          <p className="text-[var(--text-secondary)]">
            机器学习基础 · 深度学习 · 计算机视觉 · NLP · 强化学习
          </p>
        </div>
        <div className="hidden sm:block card px-4 py-2">
          <span className="text-2xl font-bold text-[var(--text-primary)] mr-2 font-mono">{mlSeries.length}</span>
          <span className="text-sm text-[var(--text-muted)] font-mono">个系列</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {mlSeries.map((series) => (
          <Link
            key={series.id}
            href={`/series/${series.id}`}
            className="card-interactive card p-5 group"
          >
            {/* 序号 */}
            <div className="mb-3 flex items-center justify-between">
              <div className="text-3xl">{series.emoji || getSeriesEmoji(series.id)}</div>
              <span className="tag text-xs font-mono">
                {String(series.order).padStart(2, '0')}
              </span>
            </div>

            {/* 标题 */}
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--text-primary)] transition-colors font-mono line-clamp-2">
              {series.title}
            </h3>

            {/* 描述 */}
            <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2">
              {series.description}
            </p>

            {/* 底部信息 */}
            <div className="flex items-center justify-between pt-3 border-t-2 border-[var(--border-subtle)]">
              <span className="text-xs text-[var(--text-muted)] font-mono">{series.totalEpisodes} 期</span>
              <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
