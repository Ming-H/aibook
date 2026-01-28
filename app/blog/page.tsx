/**
 * 博客页面 - 编辑杂志风格
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
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* 装饰性背景元素 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section - 大胆的排版 */}
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                BLOG
              </h1>
              <p className="text-xl text-slate-400 font-light max-w-xl">
                探索 AI 技术前沿 · 系统化学习路径 · 实战项目经验
              </p>
            </div>
            <div className="flex gap-3">
              <div className="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700/50">
                <div className="text-2xl font-bold text-cyan-400">10+</div>
                <div className="text-xs text-slate-500">LLM系列</div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700/50">
                <div className="text-2xl font-bold text-purple-400">5</div>
                <div className="text-xs text-slate-500">ML系列</div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700/50">
                <div className="text-2xl font-bold text-pink-400">20+</div>
                <div className="text-xs text-slate-500">每日热点</div>
              </div>
            </div>
          </div>

          {/* 装饰线 */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </section>

        {/* 主要内容区域 - 非对称布局 */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          {/* AI 热点 - 大卡片 */}
          <div className="lg:col-span-7">
            <Link
              href="/daily"
              className="group block h-full"
            >
              <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300">
                {/* 背景装饰 */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
                <div className="absolute top-8 right-8 text-9xl opacity-10 group-hover:scale-110 transition-transform duration-500">🔥</div>

                {/* 内容 */}
                <div className="relative p-10 h-full flex flex-col">
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-sm font-semibold">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </span>
                      每日更新
                    </span>
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-black mb-4 text-white group-hover:text-orange-300 transition-colors">
                    今日 AI 热点
                  </h2>

                  <p className="text-lg text-slate-300 mb-8 leading-relaxed flex-1">
                    每天 20+ 条 AI 行业动态，涵盖学术突破、技术创新、产品发布等前沿资讯。
                    <br /><br />
                    从 OpenAI 最新模型到开源社区项目，从学术论文解读到行业报告分析，
                    让你随时掌握 AI 领域的最新发展脉搏。
                  </p>

                  <div className="flex items-center gap-3 text-orange-300 font-semibold">
                    <span>浏览热点</span>
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* LLM 系列教程 - 垂直排列 */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link
              href="/series"
              className="group flex-1"
            >
              <div className="relative h-full min-h-[180px] rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 p-8">
                <div className="absolute top-6 right-6 text-7xl opacity-10 group-hover:scale-110 transition-transform duration-500">📚</div>

                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">LLM 系列</span>
                    <span className="text-3xl font-black text-cyan-400">{llmSeries.length}</span>
                  </div>

                  <h3 className="text-2xl font-black mb-3 text-white group-hover:text-cyan-300 transition-colors">
                    大语言模型
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    原理基础 · RAG 技术 · Agent 开发<br />
                    提示工程 · 模型部署 · 多模态前沿
                  </p>

                  <div className="flex items-center gap-2 text-cyan-300 text-sm font-semibold">
                    <span>查看系列</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* 快速导航卡片 */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/archive" className="group">
                <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all">
                  <div className="text-3xl mb-3">📁</div>
                  <h4 className="font-bold text-white mb-1 group-hover:text-slate-300">文章归档</h4>
                  <p className="text-xs text-slate-500">50+ 文章</p>
                </div>
              </Link>

              <Link href="/prompts" className="group">
                <div className="p-6 rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all">
                  <div className="text-3xl mb-3">💡</div>
                  <h4 className="font-bold text-white mb-1 group-hover:text-slate-300">提示词库</h4>
                  <p className="text-xs text-slate-500">AI 灵感</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ML 系列教程 - 完整板块 */}
        <MLSeriesSection />

        {/* LLM 系列预览 - 精选系列 */}
        {llmSeries.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-white mb-2">LLM 系列精选</h2>
                <p className="text-slate-400">从基础到精通的系统化学习路径</p>
              </div>
              <Link
                href="/series"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:border-cyan-400/50 transition-all"
              >
                <span className="text-cyan-300 font-semibold">查看全部</span>
                <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {llmSeries.slice(0, 8).map((series, index) => (
                <Link
                  key={series.id}
                  href={`/series/${series.id}`}
                  className="group"
                >
                  <div className="relative p-6 rounded-xl bg-slate-800/30 backdrop-blur border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                    {/* 序号 */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-cyan-400">{String(series.order).padStart(2, '0')}</span>
                    </div>

                    {/* Emoji */}
                    {series.emoji && (
                      <div className="text-4xl mb-4">{series.emoji}</div>
                    )}

                    {/* 标题 */}
                    <h3 className="font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {series.title}
                    </h3>

                    {/* 描述 */}
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                      {series.description}
                    </p>

                    {/* 底部信息 */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <span className="text-xs text-slate-500 font-mono">{series.totalEpisodes} 期</span>
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 底部 CTA */}
        <section className="relative rounded-2xl overflow-hidden p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20" />
          <div className="relative">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-3xl font-black text-white mb-4">
              开始你的 AI 学习之旅
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              系统化学习路径 + 实战项目经验 + 前沿技术洞察
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/series"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
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
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-800 text-white font-bold border border-slate-700 hover:bg-slate-700 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
