'use client';

import Link from 'next/link';

const cases = [
  {
    id: 'growth-pilot',
    category: 'Growth system',
    name: 'GrowthPilot Agent',
    summary: '面向货运平台的增长决策系统，用 Multi-Agent 协同完成用户获取、激活与留存策略执行。',
    metrics: ['6 个专业 Agent', '因果推断策略层', '三层模型分级'],
    stack: ['LangGraph', 'LightGBM', 'DoWhy', 'FastAPI'],
  },
  {
    id: 'smart-sales',
    category: 'Sales orchestration',
    name: 'Smart Sales Agent',
    summary: '面向汽车销售场景的对话系统，完成意图路由、任务分发和多轮状态管理。',
    metrics: ['5 Agent + 16 工具', 'Scope 路由 DAG', 'Checkpoint 持久化'],
    stack: ['LangGraph', 'LangChain', 'OpenAI', 'FastAPI'],
  },
  {
    id: 'content-forge',
    category: 'Content automation',
    name: 'ContentForge AI',
    summary: '从选题、生成到发布的自动化内容生产线，把内容团队的低效重复工作压缩成可复用流程。',
    metrics: ['全自动发布链路', '多模型协同', '定时工作流'],
    stack: ['Python', 'GitHub Actions', 'Markdown', 'LLM workflow'],
  },
];

export function Cases() {
  return (
    <section className="bg-[linear-gradient(180deg,transparent,rgba(82,167,255,0.06),transparent)] px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-section">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl animate-on-scroll">
            <span className="eyebrow">Selected work</span>
            <h2 className="section-heading mt-8">项目展示必须像产品，而不是像简历附件。</h2>
            <p className="section-copy mt-6 max-w-2xl">
              用场景、架构和结果说明每个项目的落地能力。
            </p>
          </div>

          <div className="animate-on-scroll">
            <Link href="/cases" className="btn-secondary rounded-full px-7 py-3 text-sm font-semibold">
              查看全部案例
            </Link>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="card animate-on-scroll rounded-[34px] p-7 md:p-9">
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[var(--border-brand)] bg-[var(--color-accent-soft)] px-3 py-1 text-xs text-[var(--color-accent-text)]">
                Flagship case
              </span>
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                AI growth infrastructure
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.26em] text-[var(--text-muted)]">
                  {cases[0].category}
                </p>
                <h3 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
                  {cases[0].name}
                </h3>
                <p className="mt-6 body-copy">
                  {cases[0].summary}
                </p>
              </div>

              <div className="rounded-[28px] border border-[var(--border-default)] bg-[var(--background-secondary)] p-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  {cases[0].metrics.map((metric) => (
                    <div
                      key={metric}
                      className="rounded-[22px] border border-[var(--border-default)] bg-[var(--background-primary)] px-4 py-5"
                    >
                      <p className="text-sm leading-6 text-[var(--text-secondary)]">{metric}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[24px] border border-[var(--border-default)] bg-[linear-gradient(135deg,rgba(102,231,213,0.08),transparent_60%)] p-5">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-accent-text)]">
                    Key engineering lens
                  </p>
                  <p className="mt-3 body-copy">通过因果推断和模型分层，提升增长决策质量。</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cases[0].stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--border-default)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-xs text-[var(--text-secondary)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-5">
            {cases.slice(1).map((item, index) => (
              <article
                key={item.id}
                className="card animate-on-scroll rounded-[30px] p-7"
                style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-accent-text)]">
                    {item.category}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">Project</span>
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{item.name}</h3>
                <p className="mt-4 body-copy">{item.summary}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-[var(--border-default)] bg-[var(--background-secondary)] px-3 py-2 text-xs text-[var(--text-secondary)]"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Stack</p>
                  <p className="mt-3 body-copy">{item.stack.join(' / ')}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
