import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background-primary)] bg-noise">
      {/* 动态背景层 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
            animationDelay: '0s',
            filter: 'blur(80px)'
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            animationDelay: '1.5s',
            filter: 'blur(80px)'
          }}
        />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
            animationDelay: '3s',
            filter: 'blur(80px)'
          }}
        />

        {/* 粒子效果 */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[var(--color-brand)] animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: 0.3 + Math.random() * 0.4
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 inline-flex items-center justify-center h-24 w-24 rounded-3xl shadow-2xl animate-fade-in-down"
              style={{
                background: 'var(--gradient-primary)',
                animation: 'pulseGlow 3s ease-in-out infinite'
              }}
            >
              <span className="text-6xl">🤖</span>
            </div>

            {/* 主标题 */}
            <h1 className="mb-6 text-6xl md:text-8xl font-black tracking-tight" style={{
              fontFamily: 'var(--font-display)',
              lineHeight: 'var(--leading-tight)'
            }}>
              <span className="block animate-gradient bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-purple)] to-[var(--color-pink)] bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%' }}>
                AI Hot Tech
              </span>
            </h1>

            {/* 副标题 */}
            <p className="mb-12 max-w-2xl mx-auto text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed">
              探索人工智能技术前沿，每天更新热点资讯
              <br />
              深入学习 LLM 系列教程
            </p>
          </div>
        </div>
      </section>

      {/* 内容区块 */}
      <section className="relative px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* 今日热点 */}
            <Link
              href="/daily"
              className="group card-3d-interactive relative overflow-hidden rounded-3xl glass-card border border-[var(--border-default)] p-8 transition-all duration-500 hover:border-[var(--border-strong)] hover-glow"
            >
              {/* 背景渐变 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: 'var(--gradient-primary)' }}
              />

              {/* 顶部装饰条 */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'var(--gradient-primary)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite'
                }}
              />

              {/* 内容 */}
              <div className="relative">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 text-4xl">
                  🔥
                </div>

                {/* 标题 */}
                <h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                  今日热点
                </h3>

                {/* 描述 */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  每天 20+ 条 AI 行业动态，涵盖学术突破、技术创新、产品发布等前沿资讯
                </p>

                {/* 箭头 */}
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[var(--color-brand)]">
                  <span>查看最新</span>
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* LLM 系列 */}
            <Link
              href="/series"
              className="group card-3d-interactive relative overflow-hidden rounded-3xl glass-card border border-[var(--border-default)] p-8 transition-all duration-500 hover:border-[var(--border-strong)] hover-glow"
            >
              {/* 背景渐变 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: 'var(--gradient-primary)' }}
              />

              {/* 顶部装饰条 */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'var(--gradient-primary)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite'
                }}
              />

              {/* 内容 */}
              <div className="relative">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-4xl">
                  📚
                </div>

                {/* 标题 */}
                <h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--color-purple)] transition-colors">
                  LLM 系列
                </h3>

                {/* 描述 */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  系统化学习大语言模型，包含原理基础、RAG 技术、Agent 开发等 10 大系列
                </p>

                {/* 箭头 */}
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[var(--color-purple)]">
                  <span>开始学习</span>
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* 智能出题 */}
            <Link
              href="/quiz-generator"
              className="group card-3d-interactive relative overflow-hidden rounded-3xl glass-card border border-[var(--border-default)] p-8 transition-all duration-500 hover:border-[var(--border-strong)] hover-glow"
            >
              {/* 背景渐变 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: 'var(--gradient-primary)' }}
              />

              {/* 顶部装饰条 */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'var(--gradient-primary)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite'
                }}
              />

              {/* 内容 */}
              <div className="relative">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-4xl">
                  ✨
                </div>

                {/* 标题 */}
                <h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--color-cyan)] transition-colors">
                  智能出题
                </h3>

                {/* 描述 */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  AI 驱动的智能题目生成，支持选择题、填空题、简答题等多种题型
                </p>

                {/* 箭头 */}
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[var(--color-cyan)]">
                  <span>立即体验</span>
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* 文章归档 */}
            <Link
              href="/archive"
              className="group card-3d-interactive relative overflow-hidden rounded-3xl glass-card border border-[var(--border-default)] p-8 transition-all duration-500 hover:border-[var(--border-strong)] hover-glow"
            >
              {/* 背景渐变 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: 'var(--gradient-primary)' }}
              />

              {/* 顶部装饰条 */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'var(--gradient-primary)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite'
                }}
              />

              {/* 内容 */}
              <div className="relative">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-4xl">
                  📁
                </div>

                {/* 标题 */}
                <h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--color-green)] transition-colors">
                  文章归档
                </h3>

                {/* 描述 */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  浏览所有历史文章，按日期、标签分类整理，快速找到你需要的内容
                </p>

                {/* 箭头 */}
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[var(--color-green)]">
                  <span>浏览归档</span>
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* 统计信息 */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-8 rounded-full glass-card px-12 py-6">
              <div className="text-center">
                <div className="text-3xl font-black text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  10+
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-1">LLM 系列</div>
              </div>
              <div className="w-px h-12 bg-[var(--border-default)]" />
              <div className="text-center">
                <div className="text-3xl font-black text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  100+
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-1">精选文章</div>
              </div>
              <div className="w-px h-12 bg-[var(--border-default)]" />
              <div className="text-center">
                <div className="text-3xl font-black text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                  每日
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-1">热点更新</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
