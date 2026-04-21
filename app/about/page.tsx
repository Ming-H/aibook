import type { Metadata } from 'next';
import { ScrollAnimator } from '@/components/ScrollAnimator';

export const metadata: Metadata = {
  title: '关于 — DevFox AI',
  description: 'DevFox — AI 工程师 & 独立开发者。专注 AI 落地应用、Agent 系统开发和技术写作。',
};

const skills = [
  { category: 'AI / Agent', items: ['LangGraph', 'LangChain', 'RAG', 'Prompt Engineering', 'Multi-Agent', 'Fine-tuning'] },
  { category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'React Flow'] },
  { category: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis'] },
  { category: 'DevOps', items: ['GitHub Actions', 'Vercel', 'Docker', 'CI/CD'] },
  { category: 'LLM', items: ['OpenAI', 'Anthropic', 'GLM', 'DeepSeek', 'Ollama'] },
  { category: 'Data', items: ['LightGBM', 'DoWhy', 'SHAP', 'Pandas', '因果推断'] },
];

const timeline = [
  { year: '2024', event: '开始探索 AI Agent 开发，完成多个 Multi-Agent 项目' },
  { year: '2025', event: '深入 LangGraph 生态，构建企业级 Agent 系统' },
  { year: '2026', event: '建立 DevFox AI 品牌，专注 AI 落地应用和 Agent 开发' },
];

export default function AboutPage() {
  return (
    <ScrollAnimator>
      {/* Header */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-section px-5 sm:px-8">
          <div className="max-w-3xl">
            <div className="animate-fade-in-down mb-6">
              <span className="tag tag-brand">About</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 animate-fade-in-up">
              关于 DevFox
            </h1>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-section px-5 sm:px-8">
          <div className="grid md:grid-cols-5 gap-12 animate-on-scroll">
            <div className="md:col-span-3">
              <h2 className="text-xl font-bold mb-4">AI 工程师 & 独立开发者</h2>
              <div className="space-y-4 text-base text-[var(--text-secondary)] leading-relaxed">
                <p>
                  我是一名专注于 AI 落地应用的独立开发者。我相信 AI 技术的价值在于解决真实问题，而非停留在概念阶段。
                </p>
                <p>
                  我的工作围绕两个核心方向：一是帮企业设计和开发 AI 应用（特别是 Multi-Agent 系统），让 AI 真正融入业务流程；二是通过培训和咨询，帮助团队降低 AI 落地的门槛。
                </p>
                <p>
                  在技术实现上，我倾向于务实的工程方法——选择最合适的技术而非最热门的技术，注重系统的可维护性和可扩展性。每个项目都追求清晰的架构设计、完善的测试覆盖和详尽的技术文档。
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="card p-6 bg-[var(--background-secondary)]">
                <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
                  旅程
                </h3>
                <div className="space-y-4">
                  {timeline.map((t, i) => (
                    <div key={t.year} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                        {i < timeline.length - 1 && (
                          <div className="w-px flex-1 bg-[var(--border-default)] mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <div className="text-sm font-semibold mb-0.5">{t.year}</div>
                        <div className="text-sm text-[var(--text-tertiary)]">{t.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-20 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-section px-5 sm:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">技术栈</h2>
            <p className="text-base text-[var(--text-secondary)]">
              持续学习和实践，保持对前沿技术的敏锐度
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {skills.map((group) => (
              <div key={group.category} className="card p-6 animate-on-scroll">
                <h3 className="text-sm font-semibold mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="tag text-xs">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-section px-5 sm:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">工作理念</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: '务实工程',
                desc: '选择最合适的技术方案，而非最热门的。注重可维护性、可扩展性和文档质量。',
                icon: '01',
              },
              {
                title: '透明沟通',
                desc: '全程透明的工作方式，定期同步进展。代码托管在 GitHub，所有进展可追溯。',
                icon: '02',
              },
              {
                title: '持续交付',
                desc: '敏捷迭代，快速验证。每周可交付可用版本，确保项目方向正确。',
                icon: '03',
              },
            ].map((item) => (
              <div key={item.title} className="card p-6 animate-on-scroll">
                <div className="text-xs font-mono text-[var(--text-tertiary)] mb-3">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-16 md:py-20 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-section px-5 sm:px-8 text-center animate-on-scroll">
          <h2 className="text-2xl font-bold tracking-tight mb-6">了解更多</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/Ming-H"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-6 py-2.5 text-sm inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://x.com/MingFire520"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-6 py-2.5 text-sm inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </a>
            <a
              href="https://ming-h.github.io/ai-insights/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-6 py-2.5 text-sm inline-flex items-center gap-2"
            >
              AI Insights
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <a
              href="/contact"
              className="btn-secondary px-6 py-2.5 text-sm inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z" />
              </svg>
              微信 randforest0102
            </a>
          </div>
        </div>
      </section>
    </ScrollAnimator>
  );
}
