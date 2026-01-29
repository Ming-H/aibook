/**
 * 博客页面 - 极客风格
 * 内容聚合：AI热点 + LLM系列 + ML系列
 */

import Link from "next/link";
import { getLLMSeries } from "@/lib/series-loader";
import { MLSeriesSection } from "@/components/MLSeriesSection";
import type { SeriesMetadata } from "@/types/content";

// 强制动态渲染
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  // 获取LLM系列数据
  let llmSeries: SeriesMetadata[] = [];
  try {
    llmSeries = await getLLMSeries();
  } catch (error) {
    console.error('[Blog Page] Failed to load LLM series:', error);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background-primary)] bg-dot-matrix py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4 font-mono border-b-4 border-[var(--border-medium)] inline-block pb-2">
            BLOG
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            探索 AI 技术前沿 · 系统化学习路径 · 实战项目经验
          </p>
        </div>

        {/* 统计数据 */}
        <section className="flex justify-center gap-4">
            <div className="card px-6 py-3 text-center">
              <div className="text-2xl font-bold text-[var(--text-primary)] mb-1 font-mono">{llmSeries.length}+</div>
              <div className="text-xs text-[var(--text-muted)] font-mono">LLM系列</div>
            </div>
            <div className="card px-6 py-3 text-center">
              <div className="text-2xl font-bold text-[var(--text-primary)] mb-1 font-mono">5</div>
              <div className="text-xs text-[var(--text-muted)] font-mono">ML系列</div>
            </div>
            <div className="card px-6 py-3 text-center">
              <div className="text-2xl font-bold text-[var(--text-primary)] mb-1 font-mono">20+</div>
              <div className="text-xs text-[var(--text-muted)] font-mono">每日热点</div>
            </div>
          </div>
        </section>

        {/* 主要内容区 - 三列布局 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* AI 热点 */}
          <Link
            href="/daily"
            className="card-interactive card p-6 group"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md border-2 border-[var(--border-subtle)] bg-[var(--background-tertiary)] text-3xl">
              🔥
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-mono">
              今日 AI 热点
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              每天 20+ 条 AI 行业动态，涵盖学术突破、技术创新、产品发布等前沿资讯
            </p>
            <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-mono font-semibold">
              <span>浏览热点</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>

          {/* LLM 系列 */}
          <Link
            href="/series"
            className="card-interactive card p-6 group"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md border-2 border-[var(--border-subtle)] bg-[var(--background-tertiary)] text-3xl">
              📚
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-mono">
              LLM 系列教程
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              系统化学习大语言模型，包含原理基础、RAG 技术、Agent 开发等 10 大系列
            </p>
            <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-mono font-semibold">
              <span>查看系列</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>

          {/* 文章归档 */}
          <Link
            href="/archive"
            className="card-interactive card p-6 group"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md border-2 border-[var(--border-subtle)] bg-[var(--background-tertiary)] text-3xl">
              📁
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-mono">
              文章归档
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              浏览所有历史文章，按日期、标签分类整理，支持搜索功能
            </p>
            <div className="flex items-center gap-2 text-sm text-[var(--text-primary)] font-mono font-semibold">
              <span>查看文章</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        </div>

        {/* ML 系列教程 */}
        <MLSeriesSection />

        {/* LLM 系列精选 */}
        {llmSeries.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2 font-mono">
                  LLM 系列精选
                </h2>
                <p className="text-[var(--text-secondary)]">
                  从基础到精通的系统化学习路径
                </p>
              </div>
              <Link
                href="/series"
                className="hidden md:flex items-center gap-2 px-6 py-3 rounded-md font-mono text-[var(--text-primary)] border-2 border-[var(--border-subtle)] hover:bg-[var(--background-tertiary)] hover:border-[var(--border-default)] transition-all duration-200"
              >
                查看全部
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {llmSeries.slice(0, 8).map((series) => (
                <Link
                  key={series.id}
                  href={`/series/${series.id}`}
                  className="card-interactive card p-5 group"
                >
                  {/* 序号 */}
                  <div className="mb-3 flex items-center justify-between">
                    {series.emoji && (
                      <div className="text-3xl">{series.emoji}</div>
                    )}
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
        )}

        {/* 更多资源 */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 font-mono">
            更多资源
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/prompts"
              className="card p-5 text-center group"
            >
              <div className="text-4xl mb-3">💡</div>
              <h4 className="font-bold text-[var(--text-primary)] mb-1 font-mono group-hover:text-[var(--text-primary)]">
                提示词库
              </h4>
              <p className="text-xs text-[var(--text-muted)] font-mono">AI 灵感</p>
            </Link>

            <Link
              href="/products"
              className="card p-5 text-center group"
            >
              <div className="text-4xl mb-3">🚀</div>
              <h4 className="font-bold text-[var(--text-primary)] mb-1 font-mono group-hover:text-[var(--text-primary)]">
                产品展示
              </h4>
              <p className="text-xs text-[var(--text-muted)] font-mono">作品集</p>
            </Link>

            <Link
              href="/quiz-generator"
              className="card p-5 text-center group"
            >
              <div className="text-4xl mb-3">✨</div>
              <h4 className="font-bold text-[var(--text-primary)] mb-1 font-mono group-hover:text-[var(--text-primary)]">
                智能出题
              </h4>
              <p className="text-xs text-[var(--text-muted)] font-mono">AI 工具</p>
            </Link>

            <a
              href="https://github.com/devfoxaicn"
              target="_blank"
              rel="noopener noreferrer"
              className="card p-5 text-center group"
            >
              <div className="text-4xl mb-3">⌨</div>
              <h4 className="font-bold text-[var(--text-primary)] mb-1 font-mono group-hover:text-[var(--text-primary)]">
                GitHub
              </h4>
              <p className="text-xs text-[var(--text-muted)] font-mono">开源项目</p>
            </a>
          </div>
        </section>

        {/* 底部 CTA */}
        <section className="card p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 font-mono">
            开始你的 AI 学习之旅
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            系统化学习路径 + 实战项目经验 + 前沿技术洞察
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/series"
              className="btn-primary px-8 py-4 inline-flex items-center gap-2 font-mono"
            >
              <span>浏览 LLM 系列</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="https://github.com/devfoxaicn"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-8 py-4 font-mono"
            >
              GitHub 主页
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
