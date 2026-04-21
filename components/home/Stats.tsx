'use client';

const stats = [
  { value: '10+', label: 'AI 项目交付' },
  { value: '5+', label: 'Agent 系统构建' },
  { value: '3+', label: '年 AI 工程经验' },
  { value: '100%', label: '客户满意度' },
];

export function Stats() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-section px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center animate-on-scroll"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                <span className="gradient-text">{stat.value}</span>
              </div>
              <div className="text-sm text-[var(--text-tertiary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
