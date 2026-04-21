'use client';

const stats = [
  { value: '10+', label: 'AI 项目交付' },
  { value: '5+', label: 'Agent 系统构建' },
  { value: '3+', label: '年 AI 工程经验' },
  { value: '100%', label: '客户满意度' },
];

export function Stats() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-section px-5 sm:px-8">
        <div className="relative">
          {/* Top separator */}
          <div className="section-separator mb-20 md:mb-24" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center animate-on-scroll"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.04em] mb-3 leading-none">
                <span className="gradient-text">{stat.value}</span>
              </div>
              <div className="text-sm text-[var(--text-tertiary)] font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-20 md:mt-24">
          <div className="section-separator" />
        </div>
      </div>
    </section>
  );
}
