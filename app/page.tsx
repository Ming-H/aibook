'use client';

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailCopy = async () => {
    await navigator.clipboard.writeText('1518246548@qq.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background-primary)]">
      {/* Hero Section - Apple Style */}
      <section className="relative px-6 py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            {/* Hero Title - with Gradient Animation */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-8 leading-[1.05]">
              <span className="animate-gradient-text">DevFox AI</span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 font-normal text-[var(--text-secondary)]">
                独立开发者的 AI 实验室
              </span>
            </h1>

            {/* Subtitle - Clean & Simple */}
            <p className="text-xl md:text-2xl lg:text-3xl text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed font-normal">
              探索 AI 技术的实用边界
              <br />
              <span className="text-lg md:text-xl lg:text-2xl">为创造者构建高效工具</span>
            </p>

            {/* CTA Buttons - Apple Style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/products"
                className="group relative px-8 py-4 bg-[var(--text-primary)] text-[var(--background-primary)] rounded-full font-medium text-lg transition-all hover:scale-105 hover:shadow-lg"
              >
                探索工具集
                <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 text-[var(--text-primary)] border-2 border-[var(--border-default)] rounded-full font-medium text-lg transition-all hover:border-[var(--border-medium)] hover:bg-[var(--background-secondary)]"
              >
                了解主理人
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - 精选实验室作品 */}
      <section className="relative px-6 py-24 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight">
              精选实验室作品
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-normal">
              探索我们的核心项目与创新工具
            </p>
          </div>

          {/* Featured Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pixel Factory */}
            <Link
              href="/projects"
              className="group bg-white dark:bg-[var(--background-primary)] rounded-3xl p-10 md:p-12 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-5xl md:text-6xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    🎨
                  </div>
                </div>
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-[var(--background-secondary)] rounded-full text-xs font-medium mb-4 text-[var(--text-secondary)]">
                    创意工具
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all">
                    Pixel Factory
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed font-normal">
                    在线像素艺术编辑器和生成工具，支持像素画创作、动画制作和资源导出
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Canvas', 'Vite'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-[var(--background-secondary)] rounded-full text-xs font-medium text-[var(--text-secondary)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* 提示词灵感库 */}
            <Link
              href="/prompts"
              className="group bg-white dark:bg-[var(--background-primary)] rounded-3xl p-10 md:p-12 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-5xl md:text-6xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    💡
                  </div>
                </div>
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-[var(--background-secondary)] rounded-full text-xs font-medium mb-4 text-[var(--text-secondary)]">
                    ⭐ 精选推荐
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                    提示词灵感库
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed font-normal">
                    精心策划的 AI 提示词收藏。浏览数百个专业设计的提示词，涵盖写作、编码、设计等领域
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['创意写作', '代码生成', '设计提示'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-[var(--background-secondary)] rounded-full text-xs font-medium text-[var(--text-secondary)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Showcase - Minimal Cards */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight">
              AI 工具集
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-normal">
              为创造者打造的智能工具
            </p>
          </div>

          {/* Product Grid - Clean Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '✨',
                title: '测题生成器',
                desc: '基于 GLM-4.7 的 AI 测题工具',
                tags: ['GLM-4.7', '教育'],
                href: '/quiz-generator',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: '🎨',
                title: '创意工坊',
                desc: 'AI 图像生成，用文字创作视觉作品',
                tags: ['ModelScope', 'AI 艺术'],
                href: '/creative-workshop',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: '🖼️',
                title: '图片工具',
                desc: '纯前端图片处理，浏览器中优化',
                tags: ['Canvas API', '无需服务器'],
                href: '/image-tools',
                gradient: 'from-orange-500 to-red-500',
              },
            ].map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group bg-white dark:bg-[var(--background-primary)] rounded-3xl p-10 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background-tertiary)] text-5xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {product.icon}
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                  {product.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed font-normal">
                  {product.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[var(--background-secondary)] rounded-full text-xs font-medium text-[var(--text-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content Hub - Minimal Grid */}
      <section className="relative px-6 py-24 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight">
              内容中心
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-normal">
              探索 AI 洞察、教程和行业动态
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔥',
                title: '每日 AI 热点',
                desc: '每日 20+ 条 AI 行业动态',
                href: '/daily',
              },
              {
                icon: '📚',
                title: '系列学习',
                desc: '结构化学习路径，10+ 系列内容',
                href: '/series',
              },
              {
                icon: '📖',
                title: '书籍摘要',
                desc: '精选书籍摘要，技术商业前沿',
                href: '/book-digest',
              },
              {
                icon: '📁',
                title: '内容归档',
                desc: '浏览所有历史内容',
                href: '/archive',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white dark:bg-[var(--background-primary)] rounded-3xl p-8 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section - Clean Layout */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                最新内容
              </h2>
              <p className="text-xl text-[var(--text-secondary)] font-normal">
                每日更新的 AI 洞察和教程
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[var(--text-primary)] transition-all hover:bg-[var(--background-secondary)]"
            >
              查看全部
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m-4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📝',
                title: '所有文章',
                desc: 'AI 技术文章和教程的完整合集',
                href: '/blog',
              },
              {
                icon: '🏢',
                title: '项目展示',
                desc: '开源项目和产品展示',
                href: '/projects',
              },
              {
                icon: '🛒',
                title: '产品服务',
                desc: '优质 AI 工具和服务',
                href: '/products',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white dark:bg-[var(--background-primary)] rounded-3xl p-10 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] font-normal">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Clean & Direct */}
      <section className="relative px-6 py-32 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[var(--text-primary)] mb-8 tracking-tight">
            准备好了吗？
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto font-normal">
            开启您的 AI 工具与资源探索之旅
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/prompts"
              className="group px-10 py-5 bg-[var(--text-primary)] text-[var(--background-primary)] rounded-full font-semibold text-xl transition-all hover:scale-105 hover:shadow-xl"
            >
              立即开始
              <svg className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="px-10 py-5 text-[var(--text-primary)] rounded-full font-semibold text-xl transition-all hover:bg-[var(--background-primary)]"
            >
              关于创作者
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - with Email Copy Functionality */}
      <footer className="relative px-6 py-16 border-t-2 border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl">
          {/* Email Copy Section - Centered */}
          <div className="flex flex-col items-center justify-center mb-12">
            <p className="text-sm text-[var(--text-muted)] mb-4 font-normal">
              联系邮箱
            </p>
            <button
              onClick={handleEmailCopy}
              className="group flex items-center gap-3 px-8 py-4 bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)] rounded-full transition-all hover:scale-105"
            >
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-[var(--text-primary)] font-medium">
                1518246548@qq.com
              </span>
              <svg className={`w-5 h-5 transition-all ${emailCopied ? 'text-green-500 scale-110' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {emailCopied && (
                <span className="text-green-500 text-sm font-medium">已复制!</span>
              )}
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-8 mb-8">
            <a
              href="https://github.com/Ming-H"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Ming-H</span>
            </a>
            <a
              href="https://x.com/MingFire520"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm font-medium">MingFire520</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-[var(--text-muted)] font-normal">
            <p>© {new Date().getFullYear()} DevFox AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
