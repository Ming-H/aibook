import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollAnimator } from '@/components/ScrollAnimator';

export const metadata: Metadata = {
  title: '服务 — DevFox AI',
  description: 'DevFox AI 提供 AI Agent、自动化工作流、知识检索与智能应用的落地交付服务。',
};

const services = [
  {
    id: 'agent-build',
    label: '01',
    title: 'AI Agent 与智能应用开发',
    summary: '把模型能力、业务流程、知识源和产品界面整合成真正可运行、可上线的 AI 应用。',
    points: [
      'Multi-Agent 架构设计与实现',
      'RAG / 检索增强知识系统',
      '工作流编排与自动化执行',
      '前后端联动与业务集成',
    ],
    deliverables: ['技术方案', '可运行代码库', '部署与维护说明', '交付与使用说明'],
  },
  {
    id: 'training',
    label: '02',
    title: 'AI 培训、评审与落地咨询',
    summary: '帮助团队缩短从“想做 AI”到“知道该怎么做”的距离，避免在错误方向上消耗时间。',
    points: [
      '团队 AI 能力培训',
      '技术路线评估与选型',
      '已有项目代码审查',
      '落地可行性与优先级判断',
    ],
    deliverables: ['培训内容框架', '咨询纪要', '方案建议书', '问题清单与优化建议'],
  },
];

const process = [
  { step: '01', title: 'Clarify', description: '先明确业务目标、用户场景和需要 AI 真正解决的问题。' },
  { step: '02', title: 'Design', description: '设计 Agent 分工、工作流、知识检索和系统边界。' },
  { step: '03', title: 'Build', description: '完成模型集成、前后端开发和业务流程联调。' },
  { step: '04', title: 'Launch', description: '部署上线并根据实际反馈迭代，让项目稳定运行。' },
];

const faqs = [
  {
    q: '你更适合做哪类项目？',
    a: '适合需要落地 AI Agent、自动化工作流、知识检索或智能应用的项目，尤其是需要从方案走到上线的场景。',
  },
  {
    q: '你主要提供什么交付？',
    a: '核心是 AI 项目落地交付，包括方案设计、系统开发、部署上线，以及必要的培训和评审支持。',
  },
  {
    q: '合作周期通常多久？',
    a: '取决于复杂度。轻量原型通常 1-2 周，完整的 Agent 系统或更复杂的业务集成项目一般需要 4-8 周。',
  },
];

export default function ServicesPage() {
  return (
    <div className="page-shell">
      <ScrollAnimator>
        <section className="px-5 pb-16 pt-24 sm:px-8 md:pb-24 md:pt-28">
          <div className="mx-auto max-w-section">
            <div className="max-w-3xl">
              <span className="eyebrow animate-fade-in-down">Services</span>
              <h1 className="section-heading mt-8 animate-text-reveal">
                我提供的不是概念展示，
                <br />
                而是 AI 项目的真实落地能力。
              </h1>
              <p
                className="section-copy mt-8 max-w-2xl animate-fade-in-up"
                style={{ animationDelay: '0.15s', opacity: 0 }}
              >
                面向企业和个人，我更关注 AI Agent、自动化工作流和智能应用怎么真正落到业务和使用场景里，
                而不是停在 PPT 或 Demo 阶段。
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 py-8 sm:px-8 md:py-12">
          <div className="mx-auto max-w-section grid gap-5">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="surface-panel animate-on-scroll rounded-[34px] p-8 md:p-10"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent-text)]">
                      Service {service.label}
                    </p>
                    <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em]">{service.title}</h2>
                    <p className="mt-6 body-copy">{service.summary}</p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-[1fr_0.85fr]">
                    <div className="rounded-[28px] border border-[var(--border-default)] bg-[var(--background-secondary)] p-6">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                        What is included
                      </p>
                      <div className="mt-5 space-y-3">
                        {service.points.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 rounded-full border border-[var(--border-default)] bg-[var(--background-primary)] px-4 py-3 body-copy"
                          >
                            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-[var(--border-default)] bg-[linear-gradient(180deg,rgba(82,167,255,0.14),transparent_46%),var(--background-secondary)] p-6">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                        Deliverables
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.deliverables.map((item) => (
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
            ))}
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 md:py-32">
          <div className="mx-auto max-w-section">
            <div className="mb-14 max-w-3xl animate-on-scroll">
              <span className="eyebrow">Process</span>
              <h2 className="section-heading mt-8">合作流程很直接，但每一步都服务于最终落地结果。</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {process.map((item, index) => (
                <article
                  key={item.step}
                  className="card animate-on-scroll rounded-[30px] p-7"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent-text)]">
                    {item.step}
                  </p>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{item.title}</h3>
                  <p className="mt-5 body-copy">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 md:py-32">
          <div className="mx-auto max-w-section">
            <div className="mb-14 max-w-3xl animate-on-scroll">
              <span className="eyebrow">FAQ</span>
              <h2 className="section-heading mt-8">合作前最常见的几个问题。</h2>
            </div>

            <div className="grid gap-5">
              {faqs.map((item, index) => (
                <article
                  key={item.q}
                  className="surface-panel animate-on-scroll rounded-[30px] p-7"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold tracking-[-0.04em]">{item.q}</h3>
                    <p className="mt-4 body-copy">{item.a}</p>
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
                  <span className="eyebrow">Next step</span>
                  <h2 className="section-heading mt-8">如果你已经有 AI 项目方向，下一步就是把它真正做出来并上线。</h2>
                </div>
                <Link href="/contact" className="btn-primary rounded-full px-8 py-3.5 text-sm font-semibold">
                  联系我开始合作
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimator>
    </div>
  );
}
