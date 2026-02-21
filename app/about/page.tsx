const principles = [
  {
    title: '极简体验',
    description: '让复杂 AI 能力用最少的界面完成，保持专注与效率。',
  },
  {
    title: '隐私与安全',
    description: '坚持本地优先和最小化数据采集，降低数据风险。',
  },
  {
    title: '工程化交付',
    description: '标准化组件与流程，保证输出可控、可复用。',
  },
  {
    title: '持续进化',
    description: '快速迭代模型与工具，确保能力长期可用。',
  },
];

const pillars = [
  {
    title: '产品矩阵',
    description: '从提示词库到创意工坊、智能出题与工具箱，覆盖核心场景。',
  },
  {
    title: '平台能力',
    description: '模型编排、工作流、SDK 接入，让能力快速落地。',
  },
  {
    title: '协作治理',
    description: '权限、审计与知识沉淀机制，帮助团队稳定交付。',
  },
];

const highlights = [
  {
    title: '可组合架构',
    description: '用模块化方式构建业务流程，降低维护成本。',
  },
  {
    title: '统一体验',
    description: '跨工具一致的交互语言，让团队协作更顺畅。',
  },
  {
    title: '多模型适配',
    description: '支持灵活切换模型与策略，确保输出质量。',
  },
];

export default function AboutPage() {
  return (
    <div className="page-surface">
      {/* Hero */}
      <section className="relative">
        <div className="px-6 pt-24 pb-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">About</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-[var(--text-primary)]">
              关于 DevFox AI
            </h1>
            <p className="mt-5 text-lg text-[var(--text-secondary)] max-w-3xl">
              DevFox AI 是面向开发者与增长团队的 AI 产品平台。我们聚合模型、工具与工作流，
              帮助团队用更少的时间交付更高质量的 AI 产品。
            </p>
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {highlights.map((item) => (
                <div key={item.title} className="card p-5">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--text-tertiary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Mission</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">品牌使命</h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              让 AI 真正融入产品交付流程，成为团队稳定可靠的生产力。DevFox AI 关注真实场景，
              用工程化方式沉淀可复用的能力，让每一次输出都可控、可信、可演进。
            </p>
          </div>
          <div className="grid gap-4">
            {principles.map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="page-section-panel px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Pillars</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold">产品与平台支柱</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {pillars.map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="card p-8 md:p-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Contact</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold">与我们建立连接</h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              无论是产品合作、场景咨询还是技术交流，欢迎随时联系 DevFox AI。
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:1518246548@qq.com" className="btn-primary px-8 py-3 text-base inline-block">
                1518246548@qq.com
              </a>
              <a
                href="https://x.com/MingFire520"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-3 text-base inline-block"
              >
                关注 X
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
