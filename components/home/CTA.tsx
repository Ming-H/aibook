'use client';

import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-24 md:py-36 bg-[var(--background-secondary)]">
      <div className="mx-auto max-w-section px-5 sm:px-8">
        <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center border border-[var(--border-default)]">
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              background: 'linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-mid), var(--color-gradient-end))',
            }}
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-pattern opacity-40" />
          {/* Glow orb */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none orb-pulse"
            style={{
              background: 'radial-gradient(circle, var(--color-gradient-start) 0%, transparent 60%)',
              opacity: 0.15,
            }}
          />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] mb-6 leading-tight">
              开始你的 <span className="gradient-text-animated">AI 之旅</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed">
              无论你是想探索 AI 的可能性，还是有明确的项目需求，都欢迎聊聊。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary px-10 py-3.5 text-[15px] rounded-xl inline-flex items-center gap-2.5"
              >
                <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="relative z-10">免费咨询</span>
              </Link>
              <Link
                href="https://github.com/Ming-H"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-10 py-3.5 text-[15px] rounded-xl inline-flex items-center gap-2.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
