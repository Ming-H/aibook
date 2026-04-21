'use client';

import Link from 'next/link';

const services = [
  {
    index: '01',
    title: '官网定位与品牌叙事',
    description: '先把“你到底在卖什么能力”说清楚。整理项目矩阵、产品语言和信任信号，避免页面只是技术清单。',
    bullets: ['价值主张重构', '首页信息架构', '项目定位梳理'],
  },
  {
    index: '02',
    title: 'AI Agent 产品化表达',
    description: '把 Agent、工作流、自动化模块用更可感知的方式呈现出来，让客户看懂能力边界、应用场景和交付深度。',
    bullets: ['Agent 系统说明', '案例界面包装', '能力模块拆解'],
  },
  {
    index: '03',
    title: '设计与工程同步交付',
    description: '不是单做视觉稿，而是在现有 Next.js 结构内直接升级为可上线的专业官网，兼顾性能、维护性和扩展性。',
    bullets: ['Next.js 实装', '设计系统升级', '可持续迭代结构'],
  },
];

export function Services() {
  return (
    <section className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-section">
        <div className="mb-14 max-w-3xl animate-on-scroll">
          <span className="eyebrow">Capabilities</span>
          <h2 className="section-heading mt-8">网站不该只是介绍你，而该替你成交。</h2>
          <p className="section-copy mt-6 max-w-2xl">
            一个专业的 AI 官网，需要同时具备产品视角、工程判断和可信的项目叙事。
            我把这三层合并成一个统一的输出，而不是拆成彼此割裂的页面模块。
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card animate-on-scroll flex h-full flex-col rounded-[30px] p-7 md:p-8"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent-text)]">
                  {service.index}
                </span>
                <span className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs text-[var(--text-tertiary)]">
                  Core layer
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">{service.title}</h3>
              <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">{service.description}</p>

              <div className="mt-8 space-y-3">
                {service.bullets.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-full border border-[var(--border-default)] bg-[var(--background-secondary)] px-4 py-3 text-sm text-[var(--text-secondary)]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 animate-on-scroll">
          <Link href="/services" className="btn-secondary rounded-full px-7 py-3 text-sm font-semibold">
            查看完整服务说明
          </Link>
        </div>
      </div>
    </section>
  );
}
