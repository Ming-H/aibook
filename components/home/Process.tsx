'use client';

const steps = [
  {
    step: '01',
    title: '定义价值主张',
    description: '先确认你希望别人记住什么，是技术能力、产品思维，还是垂直行业的交付经验。',
  },
  {
    step: '02',
    title: '重构首页叙事',
    description: '把首屏、能力模块、项目案例和 CTA 串成一个完整销售逻辑，而不是堆信息。',
  },
  {
    step: '03',
    title: '把项目做成资产',
    description: '用专业的版式、命名、技术解释和结果信号，让每个案例都成为可信的业务材料。',
  },
  {
    step: '04',
    title: '升级为可持续官网',
    description: '保留可扩展代码结构，后续可以继续接入更多 Agent 项目、内容和转化入口。',
  },
];

export function Process() {
  return (
    <section className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-section">
        <div className="mb-14 max-w-3xl animate-on-scroll">
          <span className="eyebrow">Process</span>
          <h2 className="section-heading mt-8">好的官网不是装饰，而是一种组织能力。</h2>
          <p className="section-copy mt-6 max-w-2xl">
            我会把页面设计、内容排序和项目表达放在同一个框架内处理，这样整体才会显得专业，而不是局部漂亮。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="surface-panel animate-on-scroll rounded-[30px] p-7 md:p-8"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10 flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent-text)]">
                    Step {step.step}
                  </p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                </div>
                <div className="rounded-full border border-[var(--border-default)] px-4 py-2 text-xs text-[var(--text-tertiary)]">
                  Phase {step.step}
                </div>
              </div>

              <p className="relative z-10 mt-5 text-sm leading-7 text-[var(--text-secondary)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
