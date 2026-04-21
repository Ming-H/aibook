'use client';

import Link from 'next/link';

const signalCards = [
  {
    label: 'Positioning',
    title: 'AI project delivery',
    detail: '帮助企业或个人把 AI 想法落成真正可运行、可验证、可上线的应用。',
  },
  {
    label: 'Delivery',
    title: 'Strategy + engineering + deployment',
    detail: '不是只做 Demo，而是覆盖方案、架构、工作流、交付与部署闭环。',
  },
];

const pipeline = [
  'Discover',
  'Architect',
  'Prototype',
  'Automate',
  'Deploy',
];

const featuredProjects = [
  'GrowthPilot / 增长决策 Agent',
  'Smart Sales / 销售对话 Agent',
  'ContentForge / 内容自动化系统',
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 md:pb-24 md:pt-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,167,255,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(184,242,119,0.12),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(102,231,213,0.12),transparent_32%)]" />
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-[var(--border-medium)] to-transparent md:top-20" />

      <div className="relative mx-auto grid max-w-section gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-start">
        <div className="max-w-3xl">
          <span className="eyebrow animate-fade-in-down">
            AI Agent delivery for business and creator teams
          </span>

          <h1 className="section-heading mt-5 animate-text-reveal">
            帮助企业和个人
            <span className="gradient-text-animated"> 落地 AI Agent</span>
            <br />
            与实际可用的 AI 应用
          </h1>

          <p
            className="section-copy mt-5 max-w-2xl animate-fade-in-up"
            style={{ animationDelay: '0.15s', opacity: 0 }}
          >
            DevFox AI 聚焦 AI 项目落地交付，面向 to B 和 to C 场景，
            帮助客户完成 Agent 系统、自动化工作流、知识检索和智能应用的设计、开发与上线。
          </p>

          <div
            className="mt-7 flex flex-col gap-4 sm:flex-row animate-fade-in-up"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            <Link href="/cases" className="btn-primary rounded-full px-8 py-3.5 text-sm font-semibold">
              查看代表项目
            </Link>
            <Link href="/contact" className="btn-secondary rounded-full px-8 py-3.5 text-sm font-semibold">
              发起合作沟通
            </Link>
          </div>

          <div
            className="mt-8 grid gap-4 sm:grid-cols-2 animate-fade-in-up"
            style={{ animationDelay: '0.45s', opacity: 0 }}
          >
            {signalCards.map((card) => (
              <div key={card.title} className="surface-panel rounded-[28px] p-6">
                <div className="relative z-10">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    {card.label}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                    {card.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                    {card.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="surface-panel animate-scale-in rounded-[32px] p-4 shadow-[var(--shadow-xl)]"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <div className="relative z-10 overflow-hidden rounded-[28px] border border-[var(--border-default)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_32%),var(--background-secondary)] p-6 md:p-7">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-accent-text)]">
                  Live positioning board
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                  DevFox capability system
                </h2>
              </div>
              <div className="rounded-full border border-[var(--border-default)] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                v2.0
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[24px] border border-[var(--border-default)] bg-[var(--background-primary)]/70 p-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  Delivery pipeline
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pipeline.map((step, index) => (
                    <div
                      key={step}
                      className="rounded-full border border-[var(--border-default)] bg-[var(--background-secondary)] px-3 py-2 text-xs text-[var(--text-secondary)]"
                    >
                      <span className="mr-2 font-mono text-[var(--color-accent-text)]">
                        0{index + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-[22px] border border-[var(--border-default)] bg-[var(--background-secondary)] p-4">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Focus
                    </p>
                    <p className="mt-3 text-lg font-medium tracking-[-0.03em]">
                      Agent systems
                    </p>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      多 Agent 编排、知识检索、自动化执行与业务集成。
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-[var(--border-default)] bg-[var(--background-secondary)] p-4">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Output
                    </p>
                    <p className="mt-3 text-lg font-medium tracking-[-0.03em]">
                      Real deployment
                    </p>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      从需求梳理到交付上线，形成真正可用的 AI 项目成果。
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-[var(--border-default)] bg-[linear-gradient(180deg,rgba(82,167,255,0.18),transparent_50%),var(--background-primary)] p-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  Featured builds
                </p>
                <div className="mt-4 space-y-3">
                  {featuredProjects.map((project, index) => (
                    <div
                      key={project}
                      className="rounded-[20px] border border-[var(--border-default)] bg-[rgba(255,255,255,0.03)] px-4 py-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium leading-6 text-[var(--text-primary)]">
                          {project}
                        </p>
                        <span className="font-mono text-[0.7rem] text-[var(--color-accent-text)]">
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[22px] border border-[var(--border-brand)] bg-[var(--color-accent-soft)] px-4 py-4">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-accent-text)]">
                    What changes now
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    交付从“会用模型”升级为“能把 AI 项目真正落地并交付出去”。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
