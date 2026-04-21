import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollAnimator } from '@/components/ScrollAnimator';

export const metadata: Metadata = {
  title: '案例 — DevFox AI',
  description: 'DevFox AI 项目案例：AI Agent、销售对话系统、内容自动化工作流与落地交付。',
};

const cases = [
  {
    id: 'growth-pilot',
    category: 'Growth infrastructure',
    name: 'GrowthPilot Agent',
    tagline: '面向货运平台的增长决策 Agent 系统',
    description: '通过多 Agent 协作、因果推断和模型分层，把增长动作从经验驱动升级为具备决策逻辑的自动化系统。',
    details: [
      '6 个专业 Agent 协同工作',
      '因果推断避免伪相关决策',
      '规则引擎 / ML / LLM 三层体系',
    ],
    stack: ['LangGraph', 'LightGBM', 'DoWhy', 'SHAP', 'FastAPI'],
    architecture: 'Orchestrator -> Acquisition -> Subsidy -> Ad -> Conversion -> Retention',
  },
  {
    id: 'smart-sales',
    category: 'Sales orchestration',
    name: 'Smart Sales Agent',
    tagline: '面向汽车销售场景的多 Agent 对话系统',
    description: '通过 Scope 路由 DAG、Checkpoint 持久化和工具系统，把多轮销售流程组织成可持续演进的智能对话体验。',
    details: [
      '5 Agent + 16 工具协同',
      '多轮对话状态持久化',
      '66 个测试用例验证交付质量',
    ],
    stack: ['LangGraph', 'LangChain', 'OpenAI', 'FastAPI', 'pytest'],
    architecture: 'Router -> Domain Agents -> Tooling Layer -> Persistent State',
  },
  {
    id: 'content-forge',
    category: 'Content automation',
    name: 'ContentForge AI',
    tagline: '内容选题、生成与发布的一体化自动化生产线',
    description: '把内容生产从人工串联流程升级为自动化工作流，支持多模型分工、定时运行和多平台分发。',
    details: [
      '研究、创作、发布链路打通',
      '多模型协同与定时执行',
      'GitHub Actions 驱动自动发布',
    ],
    stack: ['Python', 'Multiple LLMs', 'GitHub Actions', 'Markdown', 'Hugo'],
    architecture: 'Trigger -> Research -> Draft -> Review -> Publish -> Monitor',
  },
];

export default function CasesPage() {
  return (
    <div className="page-shell">
      <ScrollAnimator>
        <section className="px-5 pb-16 pt-24 sm:px-8 md:pb-24 md:pt-28">
          <div className="mx-auto max-w-section">
            <div className="max-w-3xl">
              <span className="eyebrow animate-fade-in-down">Selected work</span>
              <h1 className="section-heading mt-8 animate-text-reveal">
                案例页的重点不是“做过”，
                <br />
                而是“为什么这件事能真正落地”。
              </h1>
              <p
                className="section-copy mt-8 max-w-2xl animate-fade-in-up"
                style={{ animationDelay: '0.15s', opacity: 0 }}
              >
                我把每个项目都按照更接近交付说明的方式来组织：场景、系统机制、关键亮点和架构表达都放进同一套版式里。
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 py-8 sm:px-8 md:py-12">
          <div className="mx-auto max-w-section grid gap-6">
            {cases.map((item, index) => (
              <article
                key={item.id}
                id={item.id}
                className="surface-panel animate-on-scroll rounded-[36px] p-8 md:p-10"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10 grid gap-8 xl:grid-cols-[0.82fr_1.18fr]">
                  <div>
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent-text)]">
                      {item.category}
                    </p>
                    <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{item.name}</h2>
                    <p className="mt-4 body-copy">{item.tagline}</p>
                    <p className="mt-6 body-copy">{item.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--border-default)] bg-[var(--background-secondary)] px-3 py-2 text-xs text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                    <div className="rounded-[28px] border border-[var(--border-default)] bg-[var(--background-secondary)] p-6">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                        Why it matters
                      </p>
                      <div className="mt-5 grid gap-3">
                        {item.details.map((detail) => (
                          <div
                            key={detail}
                            className="rounded-[22px] border border-[var(--border-default)] bg-[var(--background-primary)] px-4 py-4 body-copy"
                          >
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-[var(--border-default)] bg-[linear-gradient(180deg,rgba(102,231,213,0.1),transparent_50%),var(--background-secondary)] p-6">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                        Architecture
                      </p>
                      <p className="mt-5 font-mono text-xs leading-7 text-[var(--color-accent-text)]">
                        {item.architecture}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 pb-24 pt-24 sm:px-8 md:pb-32 md:pt-32">
          <div className="mx-auto max-w-section">
            <div className="surface-panel overflow-hidden rounded-[36px] p-8 md:p-12">
              <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <span className="eyebrow">Need a similar build</span>
                  <h2 className="section-heading mt-8">如果你希望把项目也做成这种可交付、可上线的状态，我们可以继续往前推进。</h2>
                </div>
                <Link href="/contact" className="btn-primary rounded-full px-8 py-3.5 text-sm font-semibold">
                  联系我讨论项目
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimator>
    </div>
  );
}
