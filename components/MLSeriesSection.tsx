/**
 * ML 系列板块组件
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

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white mb-2">ML 系列教程</h2>
          <p className="text-slate-400">机器学习基础 · 深度学习 · 计算机视觉 · NLP · 强化学习</p>
        </div>
        <div className="hidden sm:block px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
          <span className="text-2xl font-bold text-purple-400">{mlSeries.length}</span>
          <span className="text-xs text-purple-300 ml-2">个系列</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
        {mlSeries.map((series) => (
          <Link
            key={series.id}
            href={`/series/${series.id}`}
            className="group"
          >
            <div className="relative p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:-translate-y-1 h-full">
              {/* 序号 */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <span className="text-sm font-bold text-purple-400">{String(series.order).padStart(2, '0')}</span>
              </div>

              {/* Emoji */}
              {series.emoji && (
                <div className="text-4xl mb-4">{series.emoji}</div>
              )}

              {/* 标题 */}
              <h3 className="font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                {series.title}
              </h3>

              {/* 描述 */}
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                {series.description}
              </p>

              {/* 底部信息 */}
              <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
                <span className="text-xs text-slate-500 font-mono">{series.totalEpisodes} 期</span>
                <svg className="w-4 h-4 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
