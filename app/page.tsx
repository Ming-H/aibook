import Link from "next/link";

const signalItems = [
  {
    title: '多模型路由',
    description: '按任务自动匹配最佳模型与工具链',
  },
  {
    title: '隐私优先',
    description: '本地处理与最小化数据采集策略',
  },
  {
    title: '可组合工作流',
    description: '模块化搭建，快速复用与扩展',
  },
];

const productHighlights = [
  {
    title: '提示词灵感库',
    description: '可直接复用的高质量提示词资产库',
    href: '/prompts',
    icon: '✨',
    tags: ['Prompt', '创意', '可复制'],
  },
  {
    title: '创意工坊',
    description: '多风格 AI 视觉生成与资产管理',
    href: '/creative-workshop',
    icon: '🎨',
    tags: ['视觉', '生成', '素材'],
  },
  {
    title: '智能出题',
    description: '从内容到题库的自动化生成流程',
    href: '/quiz-generator',
    icon: '🧠',
    tags: ['教育', '评估', '导出'],
  },
  {
    title: '图片工具箱',
    description: '浏览器端处理，隐私与效率兼得',
    href: '/image-tools',
    icon: '🛠️',
    tags: ['本地', '效率', '隐私'],
  },
];

const capabilityItems = [
  {
    title: '模型与工具编排',
    description: '统一调度模型、知识库与工具能力，按场景自动路由。',
  },
  {
    title: '可视化工作流',
    description: '将输入、处理、输出串联为标准流程，便于团队复用。',
  },
  {
    title: '可扩展 SDK',
    description: '提供 API/SDK 接入现有系统，快速打通业务流程。',
  },
  {
    title: '权限与治理',
    description: '细粒度权限、审计与配额控制，保证交付稳定可靠。',
  },
];

const solutionItems = [
  {
    title: '内容与品牌增长',
    description: '高一致性的文案、视觉与营销素材生产线。',
    tags: ['品牌调性', '活动物料', '增长实验'],
  },
  {
    title: '教育与培训',
    description: '从课程摘要、题库生成到学习评估的闭环支持。',
    tags: ['课程', '题库', '评估'],
  },
  {
    title: '产品与研发',
    description: '需求拆解、原型、文档与研发协作的全流程助力。',
    tags: ['需求分析', '文档', '协作'],
  },
];

const studioModules = [
  {
    title: 'DevFox Studio',
    description: '统一的 AI 工作台，聚合产品与工作流。',
    status: 'Active',
  },
  {
    title: 'DevFox Tools',
    description: '面向场景的工具组件，灵活组合与扩展。',
    status: 'Active',
  },
  {
    title: 'DevFox Insight',
    description: '行业与模型动态的轻量洞察与提醒。',
    status: 'Active',
    href: 'https://ming-h.github.io/ai-insights/',
    cta: '查看 Insight',
  },
];

export default function HomePage() {
  return (
    <div className="page-surface">
      {/* Hero */}
      <section className="relative">
        <div className="relative px-6 pt-24 pb-20">
          <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] surface-soft px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]" />
                DevFox AI
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
                为开发者与增长团队打造的
                <span className="text-gradient"> AI 产品矩阵</span>
              </h1>
              <p className="mt-5 text-lg text-[var(--text-secondary)] max-w-xl">
                以最小界面承载最强能力，聚合多模型、工具与工作流，帮助团队更快交付高质量 AI 产品。
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="btn-primary px-8 py-3 text-base text-center">
                  查看产品
                </Link>
                <a href="mailto:1518246548@qq.com" className="btn-secondary px-8 py-3 text-base text-center">
                  获取演示
                </a>
              </div>
              <div className="mt-10 grid sm:grid-cols-3 gap-4">
                {signalItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl surface-soft p-4"
                  >
                    <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                      {item.title}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  <span>DevFox Studio</span>
                  <span className="rounded-full border border-[var(--border-subtle)] px-2 py-0.5">Live</span>
                </div>
                <div className="mt-6 space-y-4">
                  {studioModules.map((module) => {
                    if (module.href) {
                      return (
                        <a
                          key={module.title}
                          href={module.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block rounded-lg surface-soft p-4 border border-transparent hover:border-[var(--border-default)] transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-[var(--text-primary)]">
                              {module.title}
                            </span>
                            <span className="text-xs text-[var(--text-muted)]">{module.status}</span>
                          </div>
                          <p className="mt-2 text-xs text-[var(--text-tertiary)] leading-relaxed">
                            {module.description}
                          </p>
                          <p className="mt-3 text-xs text-[var(--color-accent)]">
                            {module.cta} ↗
                          </p>
                        </a>
                      );
                    }

                    return (
                      <div
                        key={module.title}
                        className="rounded-lg surface-soft p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-[var(--text-primary)]">
                            {module.title}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">{module.status}</span>
                        </div>
                        <p className="mt-2 text-xs text-[var(--text-tertiary)] leading-relaxed">
                          {module.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="card p-4">
                  <p className="text-xs uppercase tracking-widest text-[var(--text-muted)]">策略</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">多模型路由</p>
                </div>
                <div className="card p-4">
                  <p className="text-xs uppercase tracking-widest text-[var(--text-muted)]">治理</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">权限与审计</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Products</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold">
                核心产品矩阵
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] max-w-xl">
              聚焦真实场景，提供可直接落地的 AI 工具与工作流组件。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {productHighlights.map((product) => (
              <Link key={product.href} href={product.href} className="group card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{product.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                          {product.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] mt-1">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                    ↗
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="page-section-panel px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Platform</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold">平台能力</h2>
            </div>
            <p className="text-[var(--text-secondary)] max-w-xl">
              以工程化方式交付 AI 能力，让团队在同一平台内高效协作。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {capabilityItems.map((item, index) => (
              <div key={item.title} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[var(--text-muted)]">0{index + 1}</span>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Solutions</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold">面向场景的解决方案</h2>
            </div>
            <p className="text-[var(--text-secondary)] max-w-xl">
              将 AI 能力沉淀为可复用的场景方案，帮助团队快速上线。
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {solutionItems.map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="card p-8 md:p-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Get Started</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold">准备好构建下一代 AI 产品了吗？</h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              从概念验证到规模化交付，DevFox AI 提供稳定、可扩展的产品能力。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-primary px-8 py-3 text-base">
                浏览产品
              </Link>
              <a href="mailto:1518246548@qq.com" className="btn-secondary px-8 py-3 text-base">
                联系团队
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-subtle)] px-6 py-12">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">DevFox AI</p>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              极简、可信赖的 AI 产品平台
            </p>
          </div>
          <div className="text-sm text-[var(--text-muted)]">
            <p>联系邮箱：1518246548@qq.com</p>
            <p className="mt-2">© {new Date().getFullYear()} DevFox AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
