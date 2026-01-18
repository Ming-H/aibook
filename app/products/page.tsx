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
      gradient: '',
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
      gradient: '',
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
      id: 'content-forge-ai',
      name: 'Content Forge AI',
      description: 'AI 内容生成工具',
      longDescription: '专注于 demos 和实用工具开发的 AI 内容生成工具，提供高效的 AI 内容生成解决方案。支持多种内容类型和自定义模型。',
      icon: '🔧',
      gradient: '',
      features: [
        '智能内容生成',
        '多种内容类型',
        '自定义模型支持',
        '高效批量处理',
        '导出多种格式',
      ],
      href: 'https://github.com/devfoxaicn/content-forge-ai',
      status: 'live',
    },
  ];

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'live':
        return <span className="tag text-xs font-mono">已上线</span>;
      case 'beta':
        return <span className="tag text-xs font-mono">测试中</span>;
      case 'coming-soon':
        return <span className="tag text-xs font-mono">即将推出</span>;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background-primary)] bg-dot-matrix py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4 font-mono border-b-4 border-[var(--border-medium)] inline-block pb-2">
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
              className="card rounded-3xl overflow-hidden"
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
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl bg-[var(--background-tertiary)] border-2 border-[var(--border-default)]">
                      {product.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-[var(--text-primary)] font-mono">
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
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 font-mono">核心功能</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <svg className="w-4 h-4 text-[var(--text-primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA 按钮 */}
                  {product.href.startsWith('http') ? (
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold self-start font-mono"
                    >
                      查看项目
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={product.href}
                      className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold self-start font-mono"
                    >
                      {product.status === 'live' ? '立即体验' : '了解更多'}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>

                {/* 右侧 - 功能演示图占位 */}
                <div className="relative rounded-2xl overflow-hidden bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center min-h-[400px]">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center text-6xl bg-[var(--background-secondary)] border-2 border-[var(--border-subtle)]">
                      {product.icon}
                    </div>
                    <p className="text-[var(--text-muted)] font-mono">
                      {product.name} 演示
                    </p>
                    <p className="text-sm text-[var(--text-tertiary)] mt-2 font-mono">
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
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 font-mono">
              有好的产品想法？
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              我正在不断探索 AI 技术的新应用场景，如果你有想法或建议，欢迎与我交流
            </p>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold font-mono"
            >
              联系我
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
