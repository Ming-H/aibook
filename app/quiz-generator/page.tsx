/**
 * 智能出题首页 - 超现代设计
 * 功能介绍和入口页面
 */

import Link from 'next/link';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function QuizGeneratorPage() {
  return (
    <div className="min-h-screen bg-[var(--background-primary)] bg-noise">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animationDelay: '1s'
          }}
        />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-32 sm:px-8 lg:px-12">
          <div className="text-center">
            {/* 顶部徽章 */}
            <div className="mb-10 flex justify-center animate-fade-in-down">
              <div className="inline-flex items-center gap-3 rounded-full glass-card px-6 py-3 pulse-ring">
                <div className="relative flex h-2 w-2">
                  <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon-cyan)] opacity-75" />
                  <div className="relative inline-flex h-2 w-2 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
                </div>
                <span className="text-sm font-bold tracking-wide" style={{
                  background: 'var(--gradient-text-neon)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  基于 GLM-4.7 大模型
                </span>
              </div>
            </div>

            {/* 标题 */}
            <h1 className="mb-8 text-6xl sm:text-7xl lg:text-8xl font-black animate-fade-in-up" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="block animate-gradient bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-purple)] to-[var(--color-pink)] bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%' }}>
                智能出题系统
              </span>
              <span className="block mt-4 text-[var(--text-primary)]" style={{ fontSize: '0.5em' }}>
                AI 驱动的专业工具
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-16 max-w-3xl mx-auto leading-relaxed">
              为教师打造的智能出题工具，让 AI 帮助您节省时间，专注于教学本身
            </p>

            {/* CTA 按钮 - 霓虹效果 */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
              <Link
                href="/quiz-generator/create"
                className="group relative px-10 py-5 bg-[var(--gradient-primary)] text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover-glow-brand-strong hover:shadow-3d-xl"
              >
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  <span>开始出题</span>
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/quiz-generator/history"
                className="group px-10 py-5 glass-card border border-[var(--border-default)] text-[var(--text-primary)] font-bold rounded-2xl hover:border-[var(--border-strong)] transition-all duration-300 hover:scale-105 hover-glow flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>历史记录</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 3D 卡片 */}
      <section className="max-w-7xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            核心功能
          </h2>
          <p className="text-lg text-[var(--text-muted)]">
            强大的功能，简单的操作
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 - 智能生成 */}
          <div className="card-3d-interactive group p-8 glass-card border border-[var(--border-default)] rounded-3xl transition-all duration-500 hover:border-[var(--border-strong)] hover-glow animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 mb-6 rounded-2xl bg-[var(--gradient-primary)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>智能生成</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              基于 GLM-4.7 大模型，根据学科、年级、知识点自动生成高质量试卷
            </p>
          </div>

          {/* Feature 2 - 多种题型 */}
          <div className="card-3d-interactive group p-8 glass-card border border-[var(--border-default)] rounded-3xl transition-all duration-500 hover:border-[var(--border-strong)] hover-glow animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 mb-6 rounded-2xl bg-[var(--gradient-neon-purple)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>多种题型</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              支持选择题、填空题、简答题等多种题型，灵活配置数量和分值
            </p>
          </div>

          {/* Feature 3 - 灵活配置 */}
          <div className="card-3d-interactive group p-8 glass-card border border-[var(--border-default)] rounded-3xl transition-all duration-500 hover:border-[var(--border-strong)] hover-glow animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-16 mb-6 rounded-2xl bg-[var(--gradient-neon-blue)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>灵活配置</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              自定义难度等级、知识点标签、题目数量等，满足不同教学需求
            </p>
          </div>

          {/* Feature 4 - 重新生成 */}
          <div className="card-3d-interactive group p-8 glass-card border border-[var(--border-default)] rounded-3xl transition-all duration-500 hover:border-[var(--border-strong)] hover-glow animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 mb-6 rounded-2xl bg-[var(--gradient-neon-pink)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>重新生成</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              不满意的题目可以一键重新生成，直到符合要求为止
            </p>
          </div>

          {/* Feature 5 - 实时预览 */}
          <div className="card-3d-interactive group p-8 glass-card border border-[var(--border-default)] rounded-3xl transition-all duration-500 hover:border-[var(--border-strong)] hover-glow animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="w-16 h-16 mb-6 rounded-2xl bg-[var(--gradient-neon-green)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>实时预览</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              生成后可立即预览试卷内容，支持单题编辑和调整
            </p>
          </div>

          {/* Feature 6 - 多格式导出 */}
          <div className="card-3d-interactive group p-8 glass-card border border-[var(--border-default)] rounded-3xl transition-all duration-500 hover:border-[var(--border-strong)] hover-glow animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="w-16 h-16 mb-6 rounded-2xl bg-[var(--gradient-gold)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>多格式导出</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              支持 JSON、纯文本、Markdown 等多种格式导出，方便后续使用
            </p>
          </div>
        </div>
      </section>

      {/* How it works - 时间轴 */}
      <section className="max-w-6xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            使用流程
          </h2>
          <p className="text-lg text-[var(--text-muted)]">
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
            <div key={item.step} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
                    style={{ background: item.color }}
                  />
                  <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-4 glow-brand"
                    style={{
                      background: item.color,
                      fontFamily: 'var(--font-display)'
                    }}
                  >
                    {item.icon}
                  </div>
                </div>
                <div className="text-sm font-bold text-[var(--text-muted)] mb-3 tracking-widest">{item.step}</div>
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
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

      {/* CTA Section - 全息效果 */}
      <section className="max-w-6xl mx-auto px-6 pb-32 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl p-16 text-center holographic border border-[var(--border-default)] glass-card animate-fade-in-up">
          {/* 背景装饰 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full animate-float"
              style={{
                background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)',
                filter: 'blur(80px)'
              }}
            />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full animate-float"
              style={{
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                filter: 'blur(80px)',
                animationDelay: '2s'
              }}
            />
          </div>

          <div className="relative">
            <h2 className="mb-6 text-4xl md:text-5xl font-black text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              开始创建您的第一份智能试卷
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              让 AI 为您节省出题时间，专注于教学本身
              <br />
              提升工作效率，释放更多创造力
            </p>
            <Link
              href="/quiz-generator/create"
              className="group inline-flex items-center gap-3 px-12 py-6 bg-[var(--gradient-primary)] text-white text-lg font-bold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover-glow-brand-strong hover:shadow-3d-xl"
            >
              立即开始
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
