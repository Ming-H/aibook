'use client';

const steps = [
  {
    step: '01',
    title: '理解业务场景',
    description: '先明确使用对象、业务目标和需要 AI 解决的具体问题，而不是先堆技术方案',
  },
  {
    step: '02',
    title: '设计 Agent 与流程',
    description: '拆解角色分工、工具链、知识源和执行步骤，建立真正可运行的 Agent 系统方案',
  },
  {
    step: '03',
    title: '开发并完成集成',
    description: '把模型、前后端、自动化流程和业务接口接起来，形成可用的 AI 应用或工作流',
  },
  {
    step: '04',
    title: '上线与持续迭代',
    description: '完成部署、验证和后续优化，让项目不是停在演示阶段，而是真正能长期使用',
  },
];

export function Process() {
  return (
    <section className="px-5 py-14 sm:px-8 md:py-20">
      <div className="mx-auto max-w-section">
        <div className="mb-8 max-w-3xl animate-on-scroll">
          <span className="eyebrow">Process</span>
          <h2 className="section-heading mt-5">我的工作方式，是把 AI 项目从想法推进到实际落地</h2>
          <p className="section-copy mt-4 max-w-2xl">
            每个阶段都产出可验证的交付物，确保项目从需求澄清到部署上线始终保持落地导向
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="surface-panel animate-on-scroll rounded-[28px] p-6 md:p-7"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10 flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent-text)]">
                    Step {step.step}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                </div>
                <div className="rounded-full border border-[var(--border-default)] px-4 py-2 text-xs text-[var(--text-tertiary)]">
                  Phase {step.step}
                </div>
              </div>

              <p className="relative z-10 mt-5 body-copy">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
