import Link from "next/link";
import Image from "next/image";

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
      </div>

      {/* Hero Section - 个人品牌展示 */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="relative mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 左侧 - 个人介绍 */}
            <div className="text-center lg:text-left">
              {/* 头像 */}
              <div className="mb-8 inline-block">
                <div className="relative w-32 h-32 mx-auto lg:mx-0 rounded-full overflow-hidden ring-4 ring-purple-500/30 shadow-2xl">
                  <img
                    src="/avatar.png"
                    alt="极客狐DevFox"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 名字和头衔 */}
              <h1 className="mb-4 text-5xl md:text-6xl font-black tracking-tight" style={{
                fontFamily: 'var(--font-display)',
                lineHeight: 'var(--leading-tight)'
              }}>
                <span className="block animate-gradient bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-purple)] to-[var(--color-pink)] bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% 200%' }}>
                  极客狐DevFox
                </span>
              </h1>

              <div className="mb-6 space-y-2">
                <p className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                  AI 工程师 / 独立开发者 / 技术作者
                </p>
                <p className="text-lg text-[var(--text-secondary)]">
                  专注 AI 领域探索与实践，构建智能产品，分享技术见解
                </p>
              </div>

              {/* 核心标签 */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                {['AI/LLM', '全栈开发', '技术写作', '产品构建'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA 按钮组 */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/projects"
                  className="px-8 py-4 rounded-xl font-bold text-white shadow-2xl hover:shadow-glow-brand transition-all duration-300 hover:scale-105"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  查看作品
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-xl font-bold border-2 border-[var(--border-medium)] hover:bg-[var(--background-elevated)] transition-all duration-300"
                >
                  联系我
                </Link>
              </div>

              {/* 社交链接 */}
              <div className="mt-8 flex gap-4 justify-center lg:justify-start">
                <a
                  href="https://github.com/devfoxaicn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--background-secondary)] hover:bg-[var(--background-elevated)] transition-colors"
                >
                  <svg className="w-6 h-6 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://dinq.me/devfoxai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--background-secondary)] hover:bg-[var(--background-elevated)] transition-colors"
                >
                  <svg className="w-6 h-6 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/MingFire520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--background-secondary)] hover:bg-[var(--background-elevated)] transition-colors"
                >
                  <svg className="w-6 h-6 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* 右侧 - 核心成果展示 */}
            <div className="space-y-6">
              {/* 统计卡片 */}
              <div className="glass-card rounded-2xl p-6 border border-[var(--border-subtle)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">核心成果</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-[var(--background-tertiary)] rounded-xl">
                    <div className="text-3xl font-bold text-purple-400 mb-1">10+</div>
                    <div className="text-sm text-[var(--text-secondary)]">开源项目</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--background-tertiary)] rounded-xl">
                    <div className="text-3xl font-bold text-blue-400 mb-1">50+</div>
                    <div className="text-sm text-[var(--text-secondary)]">技术文章</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--background-tertiary)] rounded-xl">
                    <div className="text-3xl font-bold text-green-400 mb-1">2</div>
                    <div className="text-sm text-[var(--text-secondary)]">AI 产品</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--background-tertiary)] rounded-xl">
                    <div className="text-3xl font-bold text-pink-400 mb-1">1.1K</div>
                    <div className="text-sm text-[var(--text-secondary)]">社交关注</div>
                  </div>
                </div>
              </div>

              {/* 技术栈 */}
              <div className="glass-card rounded-2xl p-6 border border-[var(--border-subtle)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">技术栈</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'TypeScript', 'Next.js', 'React', 'LLM', 'AI/ML', 'PostgreSQL', 'Vercel'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--background-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 精选作品 */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
                精选作品
              </h2>
              <p className="text-[var(--text-secondary)]">
                部分开源项目和产品展示
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              查看全部
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* aibook */}
            <Link
              href="https://github.com/devfoxaicn/aibook"
              target="_blank"
              rel="noopener noreferrer"
              className="group card-3d-interactive relative overflow-hidden rounded-2xl glass-card border border-[var(--border-default)] p-6 transition-all duration-500 hover:border-[var(--border-strong)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-2xl">
                🤖
              </div>
              <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
                AI Hot Tech
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                AI 技术热点展示平台，每日呈现最新的 AI 技术话题和深度文章
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-md">Next.js</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md">TypeScript</span>
              </div>
            </Link>

            {/* content-forge-ai */}
            <Link
              href="https://github.com/devfoxaicn/content-forge-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group card-3d-interactive relative overflow-hidden rounded-2xl glass-card border border-[var(--border-default)] p-6 transition-all duration-500 hover:border-[var(--border-strong)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-2xl">
                🔧
              </div>
              <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">
                Content Forge AI
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                AI 内容生成工具，专注于 demos 和实用工具开发
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md">Python</span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-md">Kotlin</span>
              </div>
            </Link>

            {/* 智能出题 */}
            <Link
              href="/quiz-generator"
              className="group card-3d-interactive relative overflow-hidden rounded-2xl glass-card border border-[var(--border-default)] p-6 transition-all duration-500 hover:border-[var(--border-strong)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-2xl">
                ✨
              </div>
              <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)] group-hover:text-green-400 transition-colors">
                智能出题系统
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                基于 GLM-4.7 的智能题目生成，支持多种题型和导出格式
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md">AI</span>
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-md">Education</span>
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              查看全部作品
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 最新文章 */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
                最新文章
              </h2>
              <p className="text-[var(--text-secondary)]">
                分享 AI 技术见解和学习心得
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              查看博客
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 文章卡片 1 */}
            <Link href="/daily" className="group card-3d-interactive relative overflow-hidden rounded-2xl glass-card border border-[var(--border-default)] p-6 transition-all duration-500 hover:border-[var(--border-strong)]">
              <div className="mb-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span>📅</span>
                <span>每日更新</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
                今日 AI 热点
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                每天 20+ 条 AI 行业动态，涵盖学术突破、技术创新、产品发布等前沿资讯
              </p>
            </Link>

            {/* 文章卡片 2 */}
            <Link href="/series" className="group card-3d-interactive relative overflow-hidden rounded-2xl glass-card border border-[var(--border-default)] p-6 transition-all duration-500 hover:border-[var(--border-strong)]">
              <div className="mb-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span>📚</span>
                <span>系列教程</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)] group-hover:text-blue-400 transition-colors">
                LLM 深度学习系列
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                系统化学习大语言模型，包含原理基础、RAG 技术、Agent 开发等内容
              </p>
            </Link>

            {/* 文章卡片 3 */}
            <Link href="/archive" className="group card-3d-interactive relative overflow-hidden rounded-2xl glass-card border border-[var(--border-default)] p-6 transition-all duration-500 hover:border-[var(--border-strong)]">
              <div className="mb-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span>📁</span>
                <span>文章归档</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)] group-hover:text-green-400 transition-colors">
                历史文章浏览
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                浏览所有历史文章，按日期、标签分类整理，快速找到你需要的内容
              </p>
            </Link>
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              查看全部文章
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card rounded-3xl p-12 text-center border border-[var(--border-subtle)]">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              让我们一起构建未来
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              无论是技术交流、项目合作，还是产品咨询，欢迎随时联系我
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-bold text-white shadow-2xl hover:shadow-glow-brand transition-all duration-300 hover:scale-105"
                style={{ background: 'var(--gradient-primary)' }}
              >
                开始合作
              </Link>
              <Link
                href="https://github.com/devfoxaicn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-bold border-2 border-[var(--border-medium)] hover:bg-[var(--background-elevated)] transition-all duration-300"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
