'use client';

import Link from 'next/link';

const services = [
  {
    index: '01',
    title: 'AI Agent 方案设计与落地',
    description: '围绕业务目标拆解需求，完成 Agent 角色设计、工具链路定义和系统落地方案',
    bullets: ['需求与场景梳理', 'Agent 架构设计', '落地路线规划'],
  },
  {
    index: '02',
    title: '自动化工作流与智能应用开发',
    description: '把模型、知识库、业务规则和产品界面整合起来，形成真正可使用的 AI 应用',
    bullets: ['工作流编排', '知识检索与 RAG', '前后端联动开发'],
  },
  {
    index: '03',
    title: '部署、迭代与交付支持',
    description: '不止停留在原型层，覆盖部署上线、效果验证和后续演进，确保项目真正能跑起来',
    bullets: ['部署与上线', '稳定性验证', '后续迭代支持'],
  },
  {
    index: '04',
    title: 'AI 咨询与方案评审',
    description: '帮助企业或个人判断怎么做 AI，减少试错成本，提升落地效率',
    bullets: ['场景与需求梳理', '方案选型建议', '落地路径评审'],
  },
];

export function Services() {
  return (
    <section className="px-5 py-14 sm:px-8 md:py-20">
      <div className="mx-auto max-w-section">
        <div className="mb-8 max-w-3xl animate-on-scroll">
          <span className="eyebrow">Capabilities</span>
          <h2 className="section-heading mt-5">交付 AI 项目，不做空泛展示</h2>
          <p className="section-copy mt-3 max-w-2xl">
            每一项服务都指向可交付的成果——从 Agent 系统设计到自动化工作流开发，从部署上线到持续迭代
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card animate-on-scroll flex flex-col rounded-[28px] p-6"
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

              <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{service.title}</h3>
              <p className="mt-3 body-copy flex-1">{service.description}</p>

              <div className="mt-auto space-y-3 pt-4">
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

        <div className="mt-6 animate-on-scroll">
          <Link href="/services" className="btn-secondary rounded-full px-7 py-3 text-sm font-semibold">
            查看完整服务说明
          </Link>
        </div>
      </div>
    </section>
  );
}
