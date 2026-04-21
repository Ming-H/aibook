'use client';

import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-32">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      {/* Gradient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-gradient-start) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-section px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-in-down mb-8">
            <span className="tag-brand tag">
              AI Engineering & Agent Development
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
            用 AI 重新定义
            <br />
            <span className="gradient-text">业务效率</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            帮助企业设计、开发和部署 AI 应用与 Agent 系统。
            <br className="hidden sm:block" />
            从战略规划到落地交付，端到端的 AI 解决方案。
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link href="/contact" className="btn-primary px-8 py-3 text-base">
              免费咨询
            </Link>
            <Link href="/cases" className="btn-secondary px-8 py-3 text-base">
              查看案例
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
