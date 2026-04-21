'use client';

import Link from 'next/link';
import { useState } from 'react';

const cases = [
  {
    id: 'growth-pilot',
    name: 'GrowthPilot Agent',
    tagline: '面向货运平台的 Multi-Agent 用户增长系统',
    description: '基于 LangGraph 构建的 Multi-Agent 系统，集成因果推断和三层模型分级。6个专业Agent协同工作，实现用户获取、激活、留存的全链路自动化运营。',
    highlights: ['6个专业Agent协同', '因果推断驱动决策', '三层模型分级体系', '全链路增长自动化'],
    techStack: ['LangGraph', 'LightGBM', 'DoWhy', 'FastAPI'],
    category: 'Multi-Agent',
  },
  {
    id: 'smart-sales',
    name: 'Smart Sales Agent',
    tagline: '汽车销售 Multi-Agent 智能对话系统',
    description: '5个Agent + 16个工具组成的汽车销售智能系统。通过 Scope 路由 DAG 实现精准意图识别和任务分发，支持 Checkpoint 持久化实现多轮对话状态管理。',
    highlights: ['5Agent + 16工具', 'Scope路由DAG', 'Checkpoint持久化', '多轮对话状态管理'],
    techStack: ['LangGraph', 'LangChain', 'OpenAI', 'FastAPI'],
    category: 'Multi-Agent',
  },
{
    id: 'content-forge',
    name: 'ContentForge AI',
    tagline: 'AI 内容自动化生产线',
    description: '全自动 AI 内容生产系统，集成多个 LLM 实现从选题、创作到发布的完整流程。通过 GitHub Actions 实现定时触发，支持多平台自动发布。',
    highlights: ['全自动内容生产线', '多LLM协同工作', '多平台自动发布', 'CI/CD驱动'],
    techStack: ['Python', '多LLM', 'GitHub Actions', 'Markdown'],
    category: 'Automation',
  },
];

function CaseCard({ caseItem, index }: { caseItem: typeof cases[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="card p-6 md:p-8 flex flex-col animate-on-scroll"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="tag text-xs">{caseItem.category}</span>
          </div>
          <h3 className="text-lg font-semibold">{caseItem.name}</h3>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        {caseItem.tagline}
      </p>

      {/* Description (expandable) */}
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-40' : 'max-h-0'}`}>
        <p className="text-sm text-[var(--text-tertiary)] leading-relaxed mb-4">
          {caseItem.description}
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {caseItem.highlights.map((h) => (
          <div key={h} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
            {h}
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
        {caseItem.techStack.map((tech) => (
          <span key={tech} className="tag text-xs">{tech}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-medium text-[var(--color-accent-text)] hover:underline transition-colors"
        >
          {expanded ? '收起' : '展开详情'}
        </button>
        <Link
          href="/cases"
          className="text-xs font-medium text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
        >
          查看完整案例 →
        </Link>
      </div>
    </div>
  );
}

export function Cases() {
  return (
    <section className="py-24 md:py-32 bg-[var(--background-secondary)]">
      <div className="mx-auto max-w-section px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            精选案例
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            每个项目都经过深思熟虑的设计和严谨的工程实现
          </p>
        </div>

        {/* Case cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <CaseCard key={c.id} caseItem={c} index={i} />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12 animate-on-scroll">
          <Link
            href="/cases"
            className="btn-secondary inline-flex items-center gap-2"
          >
            查看所有案例
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
