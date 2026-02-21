'use client';

/**
 * 产品展示 - 与作品集页面风格一致
 */

import Link from "next/link";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  href: string;
  category: 'ai' | 'tool' | 'content';
}

export default function ProductsPage() {
  const products: Product[] = [
    {
      id: 'prompts',
      name: '提示词灵感库',
      description: '精选 AI 提示词库',
      longDescription: '精心挑选的爆款提示词集合，涵盖写作、编程、设计、创意等多个领域。每个提示词都经过优化，可直接复制使用，帮助你更好地发挥 AI 的潜力。',
      image: '✨',
      tags: ['AI', '提示词', '创意'],
      href: '/prompts',
      category: 'ai',
    },
    {
      id: 'creative-workshop',
      name: '创意工坊',
      description: 'AI 图片生成工具',
      longDescription: '基于 ModelScope API 的 AI 图片生成工具，支持多种预设风格和自定义模型。可生成风景、人像、卡通、赛博朋克等多种风格的图片，并支持下载保存。',
      image: '🎨',
      tags: ['AI', 'ModelScope', '图像生成'],
      href: '/creative-workshop',
      category: 'ai',
    },
    {
      id: 'quiz-generator',
      name: '智能出题系统',
      description: 'AI 驱动的智能题目生成',
      longDescription: '基于 GLM-4.7 大语言模型的智能题目生成系统，支持选择题、填空题、简答题等多种题型。可根据文章内容自动生成题目，并支持多格式导出。',
      image: '🧠',
      tags: ['AI', 'GLM-4.7', '教育'],
      href: '/quiz-generator',
      category: 'ai',
    },
    {
      id: 'image-tools',
      name: '图片工具箱',
      description: '纯前端图片处理工具',
      longDescription: '基于浏览器 Canvas API 的纯前端图片处理工具，所有处理都在本地完成，图片绝不上传服务器。支持尺寸调整、智能裁剪、格式转换、质量控制等，秒级响应，保护隐私。',
      image: '🛠️',
      tags: ['Canvas', '工具', '隐私'],
      href: '/image-tools',
      category: 'tool',
    },
    {
      id: 'book-digest',
      name: '图书简报',
      description: 'AI 驱动的图书摘要',
      longDescription: '使用 GLM-4 大语言模型生成的图书摘要，包含关键要点、金句摘录、概念解释和实用框架。为每本书生成封面图、概念图和金句卡片，帮助你快速了解书籍核心内容。',
      image: '📚',
      tags: ['AI', '阅读', '摘要'],
      href: '/book-digest',
      category: 'content',
    },
  ];

  const categories = [
    { id: 'all', name: '全部', icon: '📁' },
    { id: 'ai', name: 'AI 工具', icon: '🤖' },
    { id: 'tool', name: '实用工具', icon: '🔧' },
    { id: 'content', name: '内容服务', icon: '📝' },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="page-surface">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Products</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-[var(--text-primary)]">
            DevFox AI 产品矩阵
          </h1>
          <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            从灵感到交付的一体化 AI 产品与工具组合。
          </p>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-[var(--color-accent)] text-white shadow-md'
                  : 'bg-[var(--background-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* 产品列表 */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card p-8"
            >
              {/* 产品头部 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{product.image}</span>
                    <div>
                      <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                        {product.name}
                      </h3>
                      <p className="text-[var(--text-secondary)]">{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 产品描述 */}
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {product.longDescription}
              </p>

              {/* 技术标签 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-3">
                <Link
                  href={product.href}
                  className="btn-primary flex-1 py-3 px-6 rounded-md font-bold text-center font-mono"
                >
                  立即体验
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 更多产品提示 */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--text-secondary)] text-lg">
              该分类下暂无产品
            </p>
          </div>
        )}

        {/* 底部 CTA */}
        <div className="mt-20 text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
              需要更贴合业务的方案？
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              让 DevFox AI 团队协助你完成从需求梳理到方案落地。
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:1518246548@qq.com"
                className="btn-primary px-6 py-3 rounded-md font-semibold"
              >
                联系团队
              </a>
              <Link
                href="/#solutions"
                className="btn-secondary px-6 py-3 rounded-md font-semibold border"
              >
                查看解决方案
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
