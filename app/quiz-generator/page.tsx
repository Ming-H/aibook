/**
 * 智能出题首页 - 超现代设计
 * 功能介绍和入口页面
 */

import Link from 'next/link';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function QuizGeneratorPage() {
  return (
    <div className="page-surface">

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] surface-soft px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                基于 GLM-4.7 大模型
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--text-primary)]">
              智能出题系统
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              AI 驱动的专业出题工具
            </p>
            <p className="mt-6 text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              为教师打造的智能出题工具，让 AI 帮助您节省时间，专注于教学本身。
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/quiz-generator/create" className="btn-primary px-8 py-3 text-base">
                开始出题
              </Link>
              <Link href="/quiz-generator/history" className="btn-secondary px-8 py-3 text-base flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                历史记录
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 3D 卡片 */}
      <section className="max-w-7xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-[var(--text-primary)]">
            核心功能
          </h2>
          <p className="text-[var(--text-secondary)]">
            强大的功能，简单的操作
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 - 智能生成 */}
          <div className="card p-8" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 mb-5 rounded-2xl bg-[var(--background-tertiary)] flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">智能生成</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              基于 GLM-4.7 大模型，根据学科、年级、知识点自动生成高质量试卷
            </p>
          </div>

          {/* Feature 2 - 多种题型 */}
          <div className="card p-8" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 mb-5 rounded-2xl bg-[var(--background-tertiary)] flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">多种题型</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              支持选择题、填空题、简答题等多种题型，灵活配置数量和分值
            </p>
          </div>

          {/* Feature 3 - 灵活配置 */}
          <div className="card p-8" style={{ animationDelay: '0.3s' }}>
            <div className="w-14 h-14 mb-5 rounded-2xl bg-[var(--background-tertiary)] flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">灵活配置</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              自定义难度等级、知识点标签、题目数量等，满足不同教学需求
            </p>
          </div>

          {/* Feature 4 - 重新生成 */}
          <div className="card p-8" style={{ animationDelay: '0.4s' }}>
            <div className="w-14 h-14 mb-5 rounded-2xl bg-[var(--background-tertiary)] flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">重新生成</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              不满意的题目可以一键重新生成，直到符合要求为止
            </p>
          </div>

          {/* Feature 5 - 实时预览 */}
          <div className="card p-8" style={{ animationDelay: '0.5s' }}>
            <div className="w-14 h-14 mb-5 rounded-2xl bg-[var(--background-tertiary)] flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">实时预览</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              生成后可立即预览试卷内容，支持单题编辑和调整
            </p>
          </div>

          {/* Feature 6 - 多格式导出 */}
          <div className="card p-8" style={{ animationDelay: '0.6s' }}>
            <div className="w-14 h-14 mb-5 rounded-2xl bg-[var(--background-tertiary)] flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">多格式导出</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              支持 JSON、纯文本、Markdown 等多种格式导出，方便后续使用
            </p>
          </div>
        </div>
      </section>

      {/* How it works - 时间轴 */}
      <section className="max-w-6xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-[var(--text-primary)]">
            使用流程
          </h2>
          <p className="text-[var(--text-secondary)]">
            简单四步，快速生成
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', icon: '⚙️', title: '配置参数', desc: '选择学科、年级、知识点和难度', color: 'var(--gradient-neon-blue)' },
            { step: '02', icon: '📝', title: '设置题型', desc: '配置各题型数量和分值', color: 'var(--gradient-neon-purple)' },
            { step: '03', icon: '✨', title: '生成试卷', desc: 'AI 智能生成高质量试卷', color: 'var(--gradient-neon-pink)' },
            { step: '04', icon: '📥', title: '预览导出', desc: '预览编辑后导出使用', color: 'var(--gradient-neon-green)' },
          ].map((item, index) => (
            <div key={item.step} className="relative">
              <div className="card p-6 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-[var(--background-tertiary)] text-[var(--color-accent)] mx-auto">
                  {item.icon}
                </div>
                <div className="text-xs font-semibold text-[var(--text-muted)] mb-2 tracking-widest">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Arrow */}
              {item.step !== '04' && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[var(--border-default)] to-transparent" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32 sm:px-8 lg:px-12">
        <div className="card p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)]">
            开始创建您的第一份智能试卷
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            让 AI 为您节省出题时间，专注于教学本身，提升工作效率。
          </p>
          <Link
            href="/quiz-generator/create"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base mt-8"
          >
            立即开始
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
