'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
            <div className="space-y-3 animate-fade-in-up stagger-3">
              {/* WeChat */}
              <div className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#07C160]/10 text-[#07C160] flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zM14.033 13.4c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium mb-0.5">微信</div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-[var(--color-accent-text)] bg-[var(--color-accent-soft)] px-2 py-0.5 rounded-md font-mono">randforest0102</code>
                    <button
                      onClick={() => navigator.clipboard?.writeText('randforest0102')}
                      className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                      title="复制微信号"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* X / Twitter */}
              <div className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent-text)] flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium mb-0.5">X (Twitter)</div>
                  <a
                    href="https://x.com/MingFire520"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-accent-text)] hover:underline inline-flex items-center gap-1"
                  >
                    @MingFire520
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent-text)] flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium mb-0.5">GitHub</div>
                  <a
                    href="https://github.com/Ming-H"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-accent-text)] hover:underline inline-flex items-center gap-1"
                  >
                    @Ming-H
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent-text)] flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium mb-0.5">Email</div>
                  <span className="text-sm text-[var(--text-tertiary)]">通过右侧表单联系</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-3">
            <div className="card p-8 animate-fade-in-up stagger-2">
              <h2 className="text-lg font-semibold mb-1">发送消息</h2>
              <p className="text-sm text-[var(--text-tertiary)] mb-6">填写以下信息，我会尽快回复你</p>

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
