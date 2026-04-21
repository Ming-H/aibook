'use client';

import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-28 md:pt-40 md:pb-36">
      {/* Background dot grid */}
      <div className="absolute inset-0 grid-pattern-fine opacity-60" />
      {/* Radial gradient mask - fade grid at edges */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, var(--background-primary) 100%)',
        }}
      />

      {/* Primary orb */}
      <div
        className="orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-gradient-start) 0%, var(--color-gradient-mid) 30%, transparent 70%)',
          opacity: 0.12,
        }}
      />
      {/* Secondary orb */}
      <div
        className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-gradient-end) 0%, transparent 70%)',
          opacity: 0.06,
          animation: 'orbFloat 10s ease-in-out infinite reverse',
        }}
      />

      <div className="relative mx-auto max-w-section px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-in-down mb-10">
            <span className="tag-brand tag text-xs px-3.5 py-1">
              <span className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              AI Engineering & Agent Development
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] leading-[1.05] mb-8 animate-text-reveal"
          >
            用 AI 重新定义
            <br />
            <span className="gradient-text-animated">业务效率</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-12 animate-fade-in-up"
            style={{ animationDelay: '0.15s', opacity: 0 }}
          >
            帮助企业设计、开发和部署 AI 应用与 Agent 系统。
            <br className="hidden sm:block" />
            从战略规划到落地交付，端到端的 AI 解决方案。
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            <Link href="/contact" className="btn-primary px-10 py-3.5 text-[15px] rounded-xl">
              <span className="relative z-10">免费咨询</span>
            </Link>
            <Link href="/cases" className="btn-secondary px-10 py-3.5 text-[15px] rounded-xl">
              查看案例
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
