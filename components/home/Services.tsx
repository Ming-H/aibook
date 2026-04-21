'use client';

import Link from 'next/link';

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'AI 落地应用 & Agent 开发',
    description: '帮企业设计、开发和部署 AI 应用和 Agent 系统，让 AI 真正融入业务流程，产生可衡量的价值。',
    capabilities: [
      'Multi-Agent 系统架构设计与开发',
      'RAG/知识库检索增强生成',
      'AI 工作流编排与自动化',
      'LLM 微调与 Prompt Engineering',
      'AI 应用全栈开发与部署',
    ],
    href: '/services',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: 'AI 培训 & 咨询',
    description: '为团队提供 AI 技术培训和技术咨询，帮助企业制定 AI 战略规划，降低 AI 落地门槛。',
    capabilities: [
      '团队 AI 技术培训（入门到进阶）',
      'AI 落地方案技术咨询',
      'AI 战略规划与技术选型',
      '代码审查与架构优化',
      'AI 项目可行性评估',
    ],
    href: '/services',
  },
];

export function Services() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-section px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-20 animate-on-scroll">
          <p className="text-sm font-medium text-[var(--color-accent-text)] tracking-widest uppercase mb-4">Services</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] mb-5">
            核心服务
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            专注 AI 应用落地，提供从战略到交付的完整解决方案
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <Link
              key={service.title}
              href={service.href}
              className="card group p-8 md:p-10 flex flex-col animate-on-scroll"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 text-[var(--color-accent-text)] bg-[var(--color-accent-soft)] border border-[var(--border-brand)] transition-all group-hover:shadow-[var(--shadow-brand)] group-hover:border-[var(--color-accent)]">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-[var(--color-accent-text)] transition-colors tracking-[-0.02em]">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Capabilities */}
              <ul className="space-y-3.5 mt-auto">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {cap}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <div className="mt-8 flex items-center text-sm font-medium text-[var(--text-muted)] group-hover:text-[var(--color-accent-text)] transition-colors">
                了解更多
                <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
