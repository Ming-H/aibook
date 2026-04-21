'use client';

const steps = [
  {
    step: '01',
    title: '需求沟通',
    description: '深入了解业务场景和痛点，明确 AI 落地目标和预期效果。',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    step: '02',
    title: '方案设计',
    description: '基于业务需求，设计最优技术方案，包括架构选型和实施路线图。',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    step: '03',
    title: '开发交付',
    description: '敏捷迭代开发，全程透明沟通，确保按时高质量交付。',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    step: '04',
    title: '持续迭代',
    description: '上线后持续监控优化，根据数据反馈迭代升级，确保持续产生价值。',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),
  },
];

export function Process() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-section px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-20 animate-on-scroll">
          <p className="text-sm font-medium text-[var(--color-accent-text)] tracking-widest uppercase mb-4">Process</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] mb-5">
            合作流程
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            清晰透明的工作方式，确保每个项目高效推进
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-10 md:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.step}
              className="relative animate-on-scroll"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-9 left-[calc(50%+36px)] w-[calc(100%-72px)] h-px">
                  <div className="w-full h-full bg-gradient-to-r from-[var(--border-medium)] to-transparent" />
                </div>
              )}

              <div className="text-center">
                {/* Icon circle */}
                <div className="w-[72px] h-[72px] rounded-2xl mx-auto mb-6 flex items-center justify-center bg-[var(--background-secondary)] border border-[var(--border-default)] text-[var(--color-accent-text)] transition-all hover:border-[var(--border-brand)] hover:shadow-[var(--shadow-brand)]">
                  {step.icon}
                </div>

                {/* Step number */}
                <div className="text-[0.65rem] font-mono text-[var(--text-muted)] tracking-[0.2em] uppercase mb-2.5">
                  Step {step.step}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2.5 tracking-[-0.02em]">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
