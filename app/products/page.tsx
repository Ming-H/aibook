'use client';

/**
 * 产品展示页面
 */

import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  gradient: string;
  features: string[];
  href: string;
  status: 'live' | 'beta' | 'coming-soon';
}

export default function ProductsPage() {
  const products: Product[] = [
    {
      id: 'quiz-generator',
      name: '智能出题系统',
      description: 'AI 驱动的智能题目生成',
      longDescription: '基于 GLM-4.7 大语言模型的智能题目生成系统，支持选择题、填空题、简答题等多种题型。可根据文章内容自动生成题目，并支持导出为 JSON、Text、Markdown 等多种格式。',
      icon: '✨',
      gradient: 'from-green-500/20 to-emerald-500/20',
      features: [
        '多种题型支持（选择、填空、简答）',
        '智能题目生成',
        '多格式导出',
        '实时预览',
        '题库管理',
      ],
      href: '/quiz-generator',
      status: 'live',
    },
    {
      id: 'creative-workshop',
      name: '创意工坊',
      description: 'AI 图片生成工具',
      longDescription: '基于 ModelScope API 的 AI 图片生成工具，支持多种预设风格和自定义模型。可生成风景、人像、卡通、赛博朋克等多种风格的图片，并支持下载保存。',
      icon: '🎨',
      gradient: 'from-pink-500/20 to-rose-500/20',
      features: [
        '多种预设风格',
        '自定义模型支持',
        '高清图片生成',
        '实时任务状态',
        '一键下载',
      ],
      href: '/creative-workshop',
      status: 'live',
    },
    {
      id: 'ai-hot-tech',
      name: 'AI Hot Tech',
      description: 'AI 技术热点平台',
      longDescription: '每日更新的 AI 技术热点展示平台，包含今日热点、LLM 系列教程、文章归档等功能模块。汇聚最新的 AI 行业动态和深度技术文章。',
      icon: '🤖',
      gradient: 'from-purple-500/20 to-blue-500/20',
      features: [
        '每日热点更新',
        'LLM 系列教程',
        '智能搜索',
        '标签分类',
        '响应式设计',
      ],
      href: '/',
      status: 'live',
    },
  ];

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'live':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">已上线</span>;
      case 'beta':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">测试中</span>;
      case 'coming-soon':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">即将推出</span>;
    }
  };

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
            AI 产品
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            我构建的 AI 驱动产品，展示人工智能技术的实际应用
          </p>
        </div>

        {/* 产品列表 */}
        <div className="space-y-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="glass-card rounded-3xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all duration-300"
            >
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                {/* 左侧 - 产品信息 */}
                <div className="flex flex-col justify-center">
                  {/* 状态徽章 */}
                  <div className="mb-4">
                    {getStatusBadge(product.status)}
                  </div>

                  {/* 图标和标题 */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl bg-gradient-to-br ${product.gradient}`}>
                      {product.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                        {product.name}
                      </h2>
                      <p className="text-[var(--text-secondary)]">{product.description}</p>
                    </div>
                  </div>

                  {/* 详细描述 */}
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                    {product.longDescription}
                  </p>

                  {/* 功能列表 */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">核心功能</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA 按钮 */}
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-2xl hover:shadow-glow-brand transition-all duration-300 hover:scale-105 self-start"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    {product.status === 'live' ? '立即体验' : '了解更多'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* 右侧 - 功能演示图占位 */}
                <div className="relative rounded-2xl overflow-hidden bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center min-h-[400px]">
                  <div className="text-center p-8">
                    <div className={`w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center text-6xl bg-gradient-to-br ${product.gradient} opacity-50`}>
                      {product.icon}
                    </div>
                    <p className="text-[var(--text-muted)]">
                      {product.name} 演示
                    </p>
                    <p className="text-sm text-[var(--text-tertiary)] mt-2">
                      点击左侧按钮体验产品
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部 CTA */}
        <div className="mt-20 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto border border-[var(--border-subtle)]">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              有好的产品想法？
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              我正在不断探索 AI 技术的新应用场景，如果你有想法或建议，欢迎与我交流
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
              style={{ background: 'var(--gradient-primary)' }}
            >
              联系我
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
