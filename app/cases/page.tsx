import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollAnimator } from '@/components/ScrollAnimator';

export const metadata: Metadata = {
  title: '案例 — DevFox AI',
  description: 'AI 项目案例展示 — Multi-Agent 系统、AI 开发工具、内容自动化等。',
};

const cases = [
  {
    id: 'growth-pilot',
    name: 'GrowthPilot Agent',
    tagline: '面向货运平台的 Multi-Agent 用户增长系统',
    category: 'Multi-Agent',
    description:
      '基于 LangGraph 构建的企业级 Multi-Agent 系统，面向货运平台 ¥1500 亿市场的用户增长需求。系统包含 6 个专业 Agent：获客(Acquisition)、补贴(Subsidy)、广告(Ad)、转化(Conversion)、留存(Retention) 和编排器(Orchestrator)，通过协同工作实现全链路增长自动化。',
    highlights: [
      { label: '6 个专业 Agent 协同', detail: 'Orchestrator + 5 个业务 Agent，各司其职又紧密协作' },
      { label: '因果推断驱动决策', detail: '集成 DoWhy 因果推断框架，避免相关性陷阱' },
      { label: '三层模型分级体系', detail: '规则引擎 → ML模型 → LLM决策，按复杂度分级处理' },
      { label: '全链路增长自动化', detail: '从获客到留存的完整增长闭环' },
    ],
    techStack: ['LangGraph', 'LightGBM', 'DoWhy', 'SHAP', 'PuLP', 'FastAPI'],
    architecture: 'Orchestrator → Prospect → Subsidy → Ad → Conversion → Retention',
  },
  {
    id: 'smart-sales',
    name: 'Smart Sales Agent',
    tagline: '汽车销售 Multi-Agent 智能对话系统',
    category: 'Multi-Agent',
    description:
      '面向汽车销售场景的 Multi-Agent 智能对话系统，由 5 个 Agent 和 16 个工具组成。通过 Scope 路由 DAG 实现精准意图识别和任务分发，支持 Checkpoint 持久化实现多轮对话状态管理。经过 9 项优化和 66 个测试用例的严格验证。',
    highlights: [
      { label: '5 Agent + 16 工具', detail: '专业化的 Agent 分工，丰富的工具支持' },
      { label: 'Scope 路由 DAG', detail: '基于意图范围的精准路由和任务分发' },
      { label: 'Checkpoint 持久化', detail: '支持中断恢复和多轮对话状态管理' },
      { label: '66 个测试用例', detail: '完善的测试覆盖，确保系统稳定性' },
    ],
    techStack: ['LangGraph', 'LangChain', 'OpenAI', 'FastAPI', 'pytest'],
    architecture: 'Router → Greeter/Product/Finance/Appointment + 16 Tools',
  },
{
    id: 'content-forge',
    name: 'ContentForge AI',
    tagline: 'AI 内容自动化生产线',
    category: 'Automation',
    description:
      '全自动 AI 内容生产系统，集成多个 LLM 实现从选题、创作到发布的完整流程。系统自动生成 AI 每日简报和系列深度文章，通过 GitHub Actions 实现定时触发，支持多平台自动发布。已稳定运行 3 个月，产出 73 期简报和 302 篇系列文章。',
    highlights: [
      { label: '全自动内容生产线', detail: '从选题到发布，全程无需人工干预' },
      { label: '多 LLM 协同工作', detail: 'GLM/DeepSeek/GPT 等模型各司其职' },
      { label: '多平台自动发布', detail: 'GitHub Pages + 多渠道同步' },
      { label: '自愈式运维', detail: '内置 watchdog 机制，自动修复同步异常' },
    ],
    techStack: ['Python', '多 LLM', 'GitHub Actions', 'Hugo', 'Markdown'],
    architecture: 'Trigger → Research → Draft → Review → Publish → Monitor',
  },
];

export default function CasesPage() {
  return (
    <ScrollAnimator>
      {/* Header */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-section px-5 sm:px-8">
          <div className="max-w-3xl">
            <div className="animate-fade-in-down mb-6">
              <span className="tag tag-brand">Cases</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-fade-in-up">
              项目案例
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed animate-fade-in-up stagger-2">
              每个项目都经过深思熟虑的设计和严谨的工程实现。以下是我完成的部分代表性项目。
            </p>
          </div>
        </div>
      </section>

      {/* Cases list */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-section px-5 sm:px-8 space-y-16">
          {cases.map((c, idx) => (
            <article
              key={c.id}
              className="animate-on-scroll"
              id={c.id}
            >
              <div className={`flex flex-col md:flex-row gap-8 md:gap-12 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Left: Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="tag text-xs">{c.category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    {c.name}
                  </h2>
                  <p className="text-base text-[var(--text-secondary)] mb-4">{c.tagline}</p>
                  <p className="text-sm text-[var(--text-tertiary)] leading-relaxed mb-6">
                    {c.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {c.techStack.map((tech) => (
                      <span key={tech} className="tag text-xs">{tech}</span>
                    ))}
                  </div>

                  {/* Architecture */}
                  <div className="card p-4 bg-[var(--background-secondary)]">
                    <div className="text-xs font-mono text-[var(--text-tertiary)] mb-1">Architecture</div>
                    <div className="text-sm font-mono text-[var(--color-accent-text)]">{c.architecture}</div>
                  </div>
                </div>

                {/* Right: Highlights */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
                    核心亮点
                  </h3>
                  <div className="space-y-3">
                    {c.highlights.map((h) => (
                      <div key={h.label} className="card p-4">
                        <div className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-1.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">{h.label}</div>
                            <div className="text-xs text-[var(--text-tertiary)] mt-0.5">{h.detail}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              {idx < cases.length - 1 && (
                <div className="mt-16 border-t border-[var(--border-subtle)]" />
              )}
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-section px-5 sm:px-8 text-center animate-on-scroll">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            想了解更多？
          </h2>
          <p className="text-base text-[var(--text-secondary)] mb-6">
            欢迎联系我，深入探讨你的项目需求。
          </p>
          <Link href="/contact" className="btn-primary px-8 py-3 text-base">
            联系我
          </Link>
        </div>
      </section>
    </ScrollAnimator>
  );
}
