import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollAnimator } from '@/components/ScrollAnimator';

export const metadata: Metadata = {
  title: '服务 — DevFox AI',
  description: 'AI 落地应用 & Agent 开发、AI 培训 & 咨询。从战略规划到落地交付，端到端的 AI 解决方案。',
};

const services = [
  {
    id: 'ai-application',
    title: 'AI 落地应用 & Agent 开发',
    subtitle: '让 AI 真正融入业务，产生可衡量的价值',
    description:
      '帮企业设计、开发和部署 AI 应用和 Agent 系统。从需求分析到架构设计，从原型验证到生产部署，提供完整的 AI 落地方案。',
    capabilities: [
      {
        title: 'Multi-Agent 系统架构设计与开发',
        desc: '基于 LangGraph、CrewAI 等框架，设计多 Agent 协同工作的复杂系统，实现业务流程自动化。',
      },
      {
        title: 'RAG / 知识库检索增强生成',
        desc: '构建企业级知识库，结合向量检索和大语言模型，实现精准的知识问答和内容生成。',
      },
      {
        title: 'AI 工作流编排与自动化',
        desc: '设计可编排的 AI 工作流，将多个 AI 能力串联成完整的业务流程。',
      },
      {
        title: 'LLM 微调与 Prompt Engineering',
        desc: '针对特定场景微调模型，或通过精细的 Prompt 设计实现最优效果。',
      },
      {
        title: 'AI 应用全栈开发与部署',
        desc: '从前端界面到后端 API，从模型推理到数据管道，完整的全栈 AI 应用开发。',
      },
    ],
    deliverables: ['技术方案文档', '可运行的代码仓库', '部署文档与运维手册', '技术培训与知识转移'],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    id: 'ai-training',
    title: 'AI 培训 & 咨询',
    subtitle: '降低 AI 落地门槛，提升团队 AI 能力',
    description:
      '为团队提供 AI 技术培训和技术咨询，帮助企业制定 AI 战略规划，评估 AI 项目的可行性，降低试错成本。',
    capabilities: [
      {
        title: '团队 AI 技术培训（入门到进阶）',
        desc: '定制化培训课程，从 AI 基础概念到实战开发，帮助团队快速掌握 AI 核心技能。',
      },
      {
        title: 'AI 落地方案技术咨询',
        desc: '针对具体业务场景，提供 AI 技术选型、方案设计和可行性评估。',
      },
      {
        title: 'AI 战略规划与技术选型',
        desc: '帮助企业制定中长期 AI 战略，选择合适的技术路线和工具链。',
      },
      {
        title: '代码审查与架构优化',
        desc: '对现有 AI 项目进行代码审查，提供架构优化和性能提升建议。',
      },
      {
        title: 'AI 项目可行性评估',
        desc: '评估 AI 项目的商业价值和实施难度，降低投资风险。',
      },
    ],
    deliverables: ['定制培训大纲与课件', '技术咨询报告', '方案选型建议书', '代码审查报告'],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: '项目周期一般多长？',
    a: '取决于项目复杂度。简单的 AI 应用原型通常 1-2 周可以完成，完整的 Multi-Agent 系统一般需要 4-8 周。培训项目通常 2-5 天。',
  },
  {
    q: '如何保证项目质量？',
    a: '采用敏捷开发模式，每周同步进度。全程代码审查，编写完整的测试用例，交付时提供详细的技术文档和部署指南。',
  },
  {
    q: '支持远程协作吗？',
    a: '完全支持。通过飞书/微信/邮件等工具进行日常沟通，代码托管在 GitHub，所有进展透明可追溯。',
  },
  {
    q: '技术栈有哪些？',
    a: '主要使用 LangGraph/LangChain 构建 Agent 系统，Next.js/React 开发前端，Python/FastAPI 开发后端，支持 OpenAI/Anthropic/国产大模型等多种 LLM。',
  },
];

export default function ServicesPage() {
  return (
    <ScrollAnimator>
      {/* Header */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-section px-5 sm:px-8">
          <div className="max-w-3xl">
            <div className="animate-fade-in-down mb-6">
              <span className="tag tag-brand">Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-fade-in-up">
              核心服务
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed animate-fade-in-up stagger-2">
              专注 AI 应用落地，提供从战略到交付的完整解决方案。
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, sIdx) => (
        <section
          key={service.id}
          className={`py-16 md:py-20 ${sIdx % 2 === 1 ? 'bg-[var(--background-secondary)]' : ''}`}
        >
          <div className="mx-auto max-w-section px-5 sm:px-8">
            <div className="animate-on-scroll">
              {/* Service header */}
              <div className="flex items-start gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent-text)] flex-shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    {service.title}
                  </h2>
                  <p className="text-base text-[var(--text-secondary)]">{service.subtitle}</p>
                </div>
              </div>

              <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-10 max-w-3xl">
                {service.description}
              </p>

              {/* Capabilities grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {service.capabilities.map((cap) => (
                  <div key={cap.title} className="card p-5">
                    <h3 className="text-sm font-semibold mb-1.5">{cap.title}</h3>
                    <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">{cap.desc}</p>
                  </div>
                ))}
              </div>

              {/* Deliverables */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                  交付物
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <span key={d} className="tag">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-section px-5 sm:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">常见问题</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="card p-6 animate-on-scroll">
                <h3 className="text-base font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-section px-5 sm:px-8 text-center animate-on-scroll">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            有项目想法？
          </h2>
          <p className="text-base text-[var(--text-secondary)] mb-6">
            欢迎聊聊，看看我能怎么帮助你。
          </p>
          <Link href="/contact" className="btn-primary px-8 py-3 text-base">
            开始对话
          </Link>
        </div>
      </section>
    </ScrollAnimator>
  );
}
