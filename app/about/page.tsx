import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollAnimator } from '@/components/ScrollAnimator';

export const metadata: Metadata = {
  title: '关于 — DevFox AI',
  description: '关于 DevFox AI：专注 AI Agent、自动化工作流与智能应用落地的工程实践者。',
};

const principles = [
  {
    id: '01',
    title: '先讲清场景，再讲技术',
    description: '任何项目都应该先回答业务问题、使用对象和交付边界，而不是先堆模型名词。',
  },
  {
    id: '02',
    title: '产品体验和工程质量一起做',
    description: '界面、信息结构、系统架构和自动化流程是一体的。分开处理，最后一定显得拼凑。',
  },
  {
    id: '03',
    title: '交付要能长期演进',
    description: '不做一次性 Demo。代码结构、内容组织和系统设计都应该允许后续继续生长。',
  },
];

const capabilities = [
  { label: 'AI / Agent', items: ['LangGraph', 'LangChain', 'RAG', 'Prompt Engineering', 'Multi-Agent'] },
  { label: 'Product build', items: ['Next.js', 'React', 'TypeScript', 'Information Architecture', 'Design Systems'] },
  { label: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis'] },
  { label: 'Delivery', items: ['GitHub Actions', 'Vercel', 'Automation', 'CI/CD', 'Deployable workflows'] },
];

const timeline = [
  { year: '2024', title: '开始系统化构建 Agent 项目', description: '从原型验证进入真实业务场景，开始把 Agent 当作可落地的产品能力来设计。' },
  { year: '2025', title: '深入多 Agent 与工作流编排', description: '围绕增长、销售、内容生产等场景完成多套可运行系统。' },
  { year: '2026', title: '以 DevFox AI 统一对外表达', description: '把技术交付、案例叙事和项目能力整合成一个更专业的对外品牌。' },
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <ScrollAnimator>
        <section className="px-5 pb-16 pt-24 sm:px-8 md:pb-24 md:pt-28">
          <div className="mx-auto max-w-section">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="max-w-3xl">
                <span className="eyebrow animate-fade-in-down">About the builder</span>
                <h1 className="section-heading mt-8 animate-text-reveal">
                  我做的不只是 AI 项目，
                  <br />
                  也是它们真正落地的方式。
                </h1>
                <p
                  className="section-copy mt-8 max-w-2xl animate-fade-in-up"
                  style={{ animationDelay: '0.15s', opacity: 0 }}
                >
                  DevFox AI 背后的工作方式，是把 Agent 系统、自动化流程、产品体验和业务目标放在一个统一框架里处理。
                  这让项目不只是能跑，而且能被真正使用和交付。
                </p>
              </div>

              <div
                className="surface-panel animate-scale-in rounded-[32px] p-7"
                style={{ animationDelay: '0.2s', opacity: 0 }}
              >
                <div className="relative z-10">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-accent-text)]">
                    Positioning
                  </p>
                  <div className="mt-6 grid gap-4">
                    <div className="rounded-[24px] border border-[var(--border-default)] bg-[var(--background-secondary)] p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-muted)]">Role</p>
                      <p className="mt-3 text-lg font-semibold tracking-[-0.04em]">AI engineer + delivery builder</p>
                    </div>
                    <div className="rounded-[24px] border border-[var(--border-default)] bg-[var(--background-secondary)] p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-muted)]">Focus</p>
                      <p className="mt-3 text-lg font-semibold tracking-[-0.04em]">Agent systems, automation workflows, real deployment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-8 sm:px-8 md:py-12">
          <div className="mx-auto max-w-section">
            <div className="grid gap-5 md:grid-cols-3">
              {principles.map((item, index) => (
                <article
                  key={item.id}
                  className="card animate-on-scroll rounded-[30px] p-7"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent-text)]">
                    {item.id}
                  </p>
                  <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{item.title}</h2>
                  <p className="mt-5 body-copy">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 md:py-32">
          <div className="mx-auto max-w-section">
            <div className="mb-14 max-w-3xl animate-on-scroll">
              <span className="eyebrow">Capability matrix</span>
              <h2 className="section-heading mt-8">我擅长把技术能力变成可交付的 AI 项目资产。</h2>
              <p className="section-copy mt-6 max-w-2xl">
                技术栈对我来说不是标签墙，而是支撑交付的工具集合。真正重要的是它们如何共同服务于项目结果。
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {capabilities.map((group, index) => (
                <article
                  key={group.label}
                  className="surface-panel animate-on-scroll rounded-[30px] p-7"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="relative z-10">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-accent-text)]">
                      {group.label}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[var(--border-default)] bg-[var(--background-secondary)] px-3 py-2 text-sm text-[var(--text-secondary)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 md:py-32">
          <div className="mx-auto max-w-section">
            <div className="mb-14 max-w-3xl animate-on-scroll">
              <span className="eyebrow">Timeline</span>
              <h2 className="section-heading mt-8">路径很清晰：从做项目，到把项目做成可复用的方法。</h2>
            </div>

            <div className="grid gap-5">
              {timeline.map((item, index) => (
                <article
                  key={item.year}
                  className="surface-panel animate-on-scroll rounded-[30px] p-7 md:p-8"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="relative z-10 grid gap-4 md:grid-cols-[160px_1fr] md:items-start">
                    <div className="metric-value gradient-text !text-[3rem] md:!text-[4rem]">{item.year}</div>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.04em]">{item.title}</h3>
                      <p className="mt-4 body-copy">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 md:pb-32">
          <div className="mx-auto max-w-section">
            <div className="surface-panel overflow-hidden rounded-[36px] p-8 md:p-12">
              <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
              <span className="eyebrow">Connect</span>
                  <h2 className="section-heading mt-8">如果你要推进的是 AI 项目落地，我们可以直接开始。</h2>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                  <Link href="/cases" className="btn-secondary rounded-full px-8 py-3.5 text-sm font-semibold">
                    看案例细节
                  </Link>
                  <Link href="/contact" className="btn-primary rounded-full px-8 py-3.5 text-sm font-semibold">
                    联系我
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimator>
    </div>
  );
}
