import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollAnimator } from '@/components/ScrollAnimator';

export const metadata: Metadata = {
  title: '服务 — DevFox AI',
  description: 'DevFox AI 提供 AI Agent 产品化、自动化系统构建、培训与技术咨询服务。',
};

const services = [
  {
    id: 'agent-build',
    label: '01',
    title: 'AI Agent 产品与工作流构建',
    summary: '把模型能力、业务流程和产品界面整合成一套真正可运行、可上线、可演示的系统。',
    points: [
      'Multi-Agent 架构设计与实现',
      'RAG / 检索增强知识系统',
      '工作流编排与自动化执行',
      '前后端联动的产品化交付',
    ],
    deliverables: ['技术方案', '可运行代码库', '部署与维护说明', '面向业务方的演示材料'],
  },
  {
    id: 'training',
    label: '02',
    title: 'AI 培训、评审与方案咨询',
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
  { step: '01', title: 'Clarify', description: '先明确业务目标、使用对象和你真正希望被看见的能力。' },
  { step: '02', title: 'Frame', description: '建立页面结构、模块边界和项目叙事，把价值表达组织起来。' },
  { step: '03', title: 'Build', description: '在现有工程中实装，统一设计、代码结构和内容呈现。' },
  { step: '04', title: 'Launch', description: '做构建验证和上线准备，让官网成为稳定可持续的资产。' },
];

const faqs = [
  {
    q: '你更适合做哪类项目？',
    a: '适合需要同时处理 AI 能力、工作流设计、产品界面和对外表达的项目，尤其是 Agent 系统与自动化产品。',
  },
  {
    q: '只做技术开发，还是也做官网表达？',
    a: '两者都做。很多 AI 项目技术上成立，但官网和案例表达不成立，最后价值被低估。我会把这两部分一起处理。',
  },
  {
    q: '合作周期通常多久？',
    a: '轻量官网或表达升级通常 1-2 周，完整的 Agent 系统或更复杂的产品化交付一般需要 4-8 周。',
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
                不是卖 AI 功能，
                <br />
                而是卖一套能交付的能力系统。
              </h1>
              <p
                className="section-copy mt-8 max-w-2xl animate-fade-in-up"
                style={{ animationDelay: '0.15s', opacity: 0 }}
              >
                DevFox AI 的服务不是孤立的开发包，而是围绕“怎么让你的能力被市场理解、被用户使用、被团队持续迭代”
                来组织的。
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
                    <p className="mt-6 text-sm leading-7 text-[var(--text-secondary)]">{service.summary}</p>
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
                            className="flex items-center gap-3 rounded-full border border-[var(--border-default)] bg-[var(--background-primary)] px-4 py-3 text-sm text-[var(--text-secondary)]"
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
              <h2 className="section-heading mt-8">合作方式很简单，但每一步都服务于最终表达质量。</h2>
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
                  <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>
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
                    <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{item.a}</p>
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
                  <h2 className="section-heading mt-8">如果你已经有项目雏形，现在最需要的是专业化表达和落地能力。</h2>
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
