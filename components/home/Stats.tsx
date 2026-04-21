'use client';

const stats = [
  { value: '10+', label: '交付项目', note: '覆盖 AI Agent、自动化系统和智能应用' },
  { value: '5+', label: '核心 Agent 系统', note: '从增长、销售到内容生产闭环' },
  { value: '3x', label: '价值层表达', note: '产品定位、界面质感、工程可信度同步升级' },
  { value: '0-1', label: '落地方式', note: '从概念、原型到上线站点一体推进' },
];

export function Stats() {
  return (
    <section className="px-5 py-8 sm:px-8 md:py-12">
      <div className="mx-auto max-w-section">
        <div className="surface-panel rounded-[32px] px-6 py-8 md:px-10 md:py-10">
          <div className="relative z-10 grid gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-on-scroll border-b border-[var(--border-subtle)] pb-6 last:border-none last:pb-0 md:border-b-0 md:border-r md:pr-6 md:last:border-r-0"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="metric-value gradient-text">{stat.value}</div>
                <h2 className="mt-3 text-lg font-semibold tracking-[-0.03em]">{stat.label}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
