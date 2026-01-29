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
      {/* Hero Section - 大胆留白，突出重点 */}
      <section className="px-6 py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
            DevFox AI
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            独立开发者的 AI 实验室
          </p>
          <p className="text-base text-[var(--text-tertiary)] max-w-xl mx-auto mb-12">
            探索 AI 技术的实用边界，为创造者构建高效工具
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="btn-primary px-10 py-4 font-mono text-base"
            >
              探索工具集
            </Link>
            <Link
              href="/about"
              className="btn-secondary px-10 py-4 font-mono text-base"
            >
              关于主理人
            </Link>
          </div>
        </div>
      </section>

      {/* 核心产品 - 突出重点项目 */}
      <section className="px-6 py-16 md:py-20 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 font-mono">
              核心产品
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              精心打造的 AI 工具与创意平台
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Pixel Factory', desc: '像素艺术编辑器', href: '/projects', icon: '🎨', color: 'from-purple-500 to-pink-500' },
              { title: '提示词库', desc: 'AI 灵感集合', href: '/prompts', icon: '💡', color: 'from-yellow-500 to-orange-500' },
              { title: '测题生成', desc: '智能出题系统', href: '/quiz-generator', icon: '✨', color: 'from-blue-500 to-cyan-500' },
              { title: '创意工坊', desc: 'AI 图像生成', href: '/creative-workshop', icon: '🎨', color: 'from-green-500 to-emerald-500' },
            ].map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-[var(--background-primary)] p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${product.color} text-3xl shadow-lg`}>
                    {product.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-mono">
                    {product.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {product.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 内容中心 - 简洁明了 */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 font-mono">
              内容中心
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              AI 洞察、教程与行业动态
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: '每日热点', desc: '20+ 条 AI 行业动态', href: '/daily', icon: '🔥' },
              { title: '系列学习', desc: '系统化学习路径', href: '/series', icon: '📚' },
              { title: '书籍摘要', desc: '精选知识精华', href: '/book-digest', icon: '📖' },
              { title: '技术博客', desc: '深度技术文章', href: '/blog', icon: '📝' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group card p-6 text-center"
              >
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 font-mono group-hover:text-[var(--color-accent)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-20 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 font-mono">
            开始探索
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
            开启您的 AI 工具与资源探索之旅
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="btn-primary px-10 py-4 font-mono text-base"
            >
              查看全部产品
            </Link>
            <Link
              href="/about"
              className="btn-secondary px-10 py-4 font-mono text-base"
            >
              了解更多
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - 简洁 */}
      <footer className="border-t border-[var(--border-subtle)] px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-sm text-[var(--text-muted)] mb-3 font-mono">联系邮箱</p>
              <button
                onClick={handleEmailCopy}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--background-tertiary)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--border-subtle)]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                1518246548@qq.com
                {emailCopied ? (
                  <span className="text-xs font-medium text-[var(--color-accent)]">已复制</span>
                ) : (
                  <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="https://github.com/Ming-H"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2 font-mono"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
              <a
                href="https://x.com/MingFire520"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2 font-mono"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </a>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              © {new Date().getFullYear()} DevFox AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
