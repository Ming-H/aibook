'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

const contactCards = [
  {
    label: 'WeChat',
    title: 'randforest0102',
    description: '最快的沟通方式，适合直接聊项目需求和合作节奏。',
  },
  {
    label: 'GitHub',
    title: 'github.com/Ming-H',
    description: '查看公开项目、代码风格和持续输出。',
    href: 'https://github.com/Ming-H',
  },
  {
    label: 'AI Insights',
    title: '内容与技术输出',
    description: '适合先了解我的长期思考、写作和项目背景。',
    href: 'https://ming-h.github.io/ai-insights/',
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="page-shell px-5 pb-24 pt-24 sm:px-8 md:pb-32 md:pt-28">
      <div className="mx-auto max-w-section">
        <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr]">
          <section className="max-w-3xl">
            <span className="eyebrow animate-fade-in-down">Contact</span>
            <h1 className="section-heading mt-8 animate-text-reveal">
              如果你已经准备认真做官网，
              <br />
              现在就可以开始联系。
            </h1>
            <p
              className="section-copy mt-8 max-w-2xl animate-fade-in-up"
              style={{ animationDelay: '0.15s', opacity: 0 }}
            >
              无论你是想重做个人官网、整理 AI Agent 项目表达，还是推进一个更完整的自动化产品，我都建议先把需求和目标讲清楚。
            </p>

            <div
              className="mt-10 grid gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.3s', opacity: 0 }}
            >
              {contactCards.map((item) => (
                <article key={item.label} className="surface-panel rounded-[28px] p-6">
                  <div className="relative z-10">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-accent-text)]">
                      {item.label}
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{item.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex text-sm text-[var(--color-accent-text)] hover:underline"
                      >
                        打开链接
                      </a>
                    ) : (
                      <button
                        onClick={() => navigator.clipboard?.writeText(item.title)}
                        className="mt-5 inline-flex text-sm text-[var(--color-accent-text)] hover:underline"
                      >
                        复制联系方式
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className="surface-panel animate-scale-in rounded-[34px] p-7 md:p-8"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            <div className="relative z-10">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-accent-text)]">
                Project inquiry
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">发一条更明确的合作信息</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                建议直接说明你的项目类型、希望完成的目标、当前阶段，以及你最想先解决的问题。
              </p>

              {submitted ? (
                <div className="mt-10 rounded-[28px] border border-[var(--border-brand)] bg-[var(--color-accent-soft)] p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-gradient-start),var(--color-gradient-end))] text-[var(--background-primary)]">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">信息已记录</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                    当前表单仍是前端演示状态，但页面体验已经整理完毕。接下来如果你需要，我也可以继续接入真实提交逻辑。
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-[var(--color-accent-text)] hover:underline"
                  >
                    重新填写
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">姓名</label>
                      <input
                        type="text"
                        required
                        placeholder="你的名字"
                        className="w-full rounded-[18px] border border-[var(--border-default)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">邮箱</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full rounded-[18px] border border-[var(--border-default)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">项目类型</label>
                    <select
                      className="w-full rounded-[18px] border border-[var(--border-default)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
                    >
                      <option>AI Agent 官网升级</option>
                      <option>AI 产品 / 工作流开发</option>
                      <option>培训 / 咨询 / 评审</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">项目描述</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="你现在的网站或项目处于什么阶段？想达成什么目标？"
                      className="w-full resize-none rounded-[18px] border border-[var(--border-default)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary rounded-full px-8 py-3.5 text-sm font-semibold">
                    发送合作信息
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
