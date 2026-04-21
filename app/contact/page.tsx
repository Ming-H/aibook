'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // In production, this would send to an API endpoint
    // For now, show success state
    setSubmitted(true);
  }

  return (
    <div className="pt-20 pb-20 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-section px-5 sm:px-8">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Left: Info */}
          <div className="md:col-span-2">
            <div className="animate-fade-in-down mb-6">
              <span className="tag tag-brand">Contact</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-fade-in-up">
              联系我
            </h1>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8 animate-fade-in-up stagger-2">
              无论你有明确的项目需求，还是想探索 AI 的可能性，都欢迎联系我。
            </p>

            {/* Contact methods */}
            <div className="space-y-4 animate-fade-in-up stagger-3">
              <div className="card p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">GitHub</div>
                  <a
                    href="https://github.com/Ming-H"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-accent-text)] hover:underline"
                  >
                    @Ming-H
                  </a>
                </div>
              </div>

              <div className="card p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">AI Insights</div>
                  <a
                    href="https://ming-h.github.io/ai-insights/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-accent-text)] hover:underline"
                  >
                    ming-h.github.io/ai-insights
                  </a>
                </div>
              </div>

              <div className="card p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <span className="text-sm text-[var(--text-tertiary)]">通过表单联系</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-3">
            <div className="card p-8 animate-fade-in-up stagger-2">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">感谢你的留言！</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    我会尽快回复你。
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-[var(--color-accent-text)] hover:underline"
                  >
                    发送新消息
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">姓名</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="你的名字"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">邮箱</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">需求类型</label>
                    <select
                      name="type"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
                    >
                      <option value="ai-app">AI 落地应用 & Agent 开发</option>
                      <option value="training">AI 培训 & 咨询</option>
                      <option value="other">其他合作</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">需求描述</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="简单描述你的需求、预算和时间预期..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary px-8 py-3 text-base w-full sm:w-auto">
                    发送消息
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
