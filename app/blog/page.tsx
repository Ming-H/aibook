'use client';

/**
 * 博客页面 - 文章内容聚合
 */

import Link from "next/link";

interface BlogSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  gradient: string;
  stats: string;
}

export default function BlogPage() {
  const sections: BlogSection[] = [
    {
      id: 'daily',
      title: '今日 AI 热点',
      description: '每天 20+ 条 AI 行业动态，涵盖学术突破、技术创新、产品发布等前沿资讯。让你随时掌握 AI 领域的最新发展。',
      icon: '🔥',
      href: '/daily',
      gradient: 'from-orange-500/20 to-red-500/20',
      stats: '每日更新',
    },
    {
      id: 'series',
      title: 'LLM 系列教程',
      description: '系统化学习大语言模型，包含原理基础、RAG 技术、Agent 开发等 10 大系列。从入门到精通，循序渐进掌握 LLM 技术。',
      icon: '📚',
      href: '/series',
      gradient: 'from-purple-500/20 to-pink-500/20',
      stats: '10+ 系列',
    },
    {
      id: 'archive',
      title: '文章归档',
      description: '浏览所有历史文章，按日期、标签分类整理。支持搜索功能，快速找到你需要的技术内容。',
      icon: '📁',
      href: '/archive',
      gradient: 'from-green-500/20 to-emerald-500/20',
      stats: '50+ 文章',
    },
  ];

  const topics = [
    { name: 'AI/LLM', count: 20, icon: '🤖' },
    { name: 'RAG 技术', count: 8, icon: '🔍' },
    { name: 'Agent 开发', count: 6, icon: '🎯' },
    { name: '模型训练', count: 5, icon: '🧠' },
    { name: '应用实践', count: 12, icon: '💡' },
    { name: '行业动态', count: 15, icon: '📊' },
  ];

  const recentArticles = [
    {
      title: 'LLM 微调实践指南',
      category: '模型训练',
      date: '2024-01-15',
      readTime: '15 min',
      excerpt: '详细介绍大语言模型的微调方法，包括数据准备、训练技巧和最佳实践...',
    },
    {
      title: 'RAG 系统架构设计',
      category: 'RAG 技术',
      date: '2024-01-14',
      readTime: '20 min',
      excerpt: '深入探讨检索增强生成系统的架构设计，包括向量数据库选择、检索优化等...',
    },
    {
      title: 'AI Agent 开发入门',
      category: 'Agent 开发',
      date: '2024-01-13',
      readTime: '18 min',
      excerpt: '从零开始学习 AI Agent 开发，涵盖工具调用、任务规划、多模态交互等核心概念...',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--background-primary)] via-[var(--background-secondary)] to-[var(--background-tertiary)] py-12 px-4 sm:px-6 lg:px-8">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            技术博客
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            分享 AI 技术见解和学习心得，助你在 AI 领域快速成长
          </p>
        </div>

        {/* 主要内容区 */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className="group card-3d-interactive glass-card rounded-2xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all duration-300"
            >
              <div className="p-8">
                {/* 图标和标签 */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{section.icon}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    {section.stats}
                  </span>
                </div>

                {/* 标题 */}
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-purple-400 transition-colors">
                  {section.title}
                </h3>

                {/* 描述 */}
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  {section.description}
                </p>

                {/* 箭头 */}
                <div className="flex items-center gap-2 text-purple-400 font-medium">
                  <span>探索内容</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 专题分类 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">专题分类</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topics.map((topic) => (
              <Link
                key={topic.name}
                href={`/archive?tag=${topic.name}`}
                className="glass-card rounded-xl p-4 text-center border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all duration-300 group"
              >
                <span className="text-3xl mb-2 block">{topic.icon}</span>
                <div className="font-medium text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
                  {topic.name}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{topic.count} 篇</div>
              </Link>
            ))}
          </div>
        </div>

        {/* 最新文章预览 */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">最新文章</h2>
            <Link
              href="/archive"
              className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
            >
              查看全部
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="space-y-4">
            {recentArticles.map((article, index) => (
              <Link
                key={index}
                href={`/archive`}
                className="block glass-card rounded-xl p-6 border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-purple-500/20 text-purple-400">
                        {article.category}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {article.date}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        ⏱ {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-purple-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {article.excerpt}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-[var(--text-muted)] group-hover:text-purple-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 订阅提示 */}
        <div className="glass-card rounded-2xl p-8 text-center border border-[var(--border-subtle)]">
          <div className="text-5xl mb-4">📬</div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
            订阅更新
          </h3>
          <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            关注我的社交账号，第一时间获取最新文章和技术分享
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/devfoxaicn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold border-2 border-[var(--border-medium)] hover:bg-[var(--background-elevated)] transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href="https://x.com/MingFire520"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold border-2 border-[var(--border-medium)] hover:bg-[var(--background-elevated)] transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X (Twitter)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
