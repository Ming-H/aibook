'use client';

/**
 * 作品集页面 - 展示所有项目和作品
 */

import Link from "next/link";
import { useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  stars: number;
  url: string;
  github?: string;
  category: 'opensource' | 'product' | 'tool';
}

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      id: 'aibook',
      name: 'AI Hot Tech',
      description: 'AI 技术热点展示平台',
      longDescription: '每日呈现最新的 AI 技术话题和深度文章，包含今日热点、LLM系列教程、智能出题、创意工坊等功能模块',
      image: '🤖',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'Vercel'],
      stars: 2,
      url: 'https://github.com/devfoxaicn/aibook',
      github: 'https://github.com/devfoxaicn/aibook',
      category: 'opensource',
    },
    {
      id: 'content-forge-ai',
      name: 'Content Forge AI',
      description: 'AI 内容生成工具',
      longDescription: '专注于 demos 和实用工具开发，提供高效的 AI 内容生成解决方案',
      image: '🔧',
      tags: ['Python', 'Kotlin', 'TypeScript'],
      stars: 1,
      url: 'https://github.com/devfoxaicn/content-forge-ai',
      github: 'https://github.com/devfoxaicn/content-forge-ai',
      category: 'opensource',
    },
    {
      id: 'quiz-generator',
      name: '智能出题系统',
      description: 'AI 驱动的智能题目生成',
      longDescription: '基于 GLM-4.7 的智能题目生成系统，支持选择题、填空题、简答题等多种题型，可导出多种格式',
      image: '✨',
      tags: ['Next.js', 'GLM-4.7', 'AI', 'Education'],
      stars: 0,
      url: '/quiz-generator',
      category: 'product',
    },
    {
      id: 'creative-workshop',
      name: '创意工坊',
      description: 'AI 图片生成工具',
      longDescription: '基于 ModelScope API 的 AI 图片生成工具，支持多种风格和自定义模型',
      image: '🎨',
      tags: ['Next.js', 'ModelScope', 'AI', 'Image Gen'],
      stars: 0,
      url: '/creative-workshop',
      category: 'product',
    },
  ];

  const categories = [
    { id: 'all', name: '全部', icon: '📁' },
    { id: 'opensource', name: '开源项目', icon: '💻' },
    { id: 'product', name: 'AI 产品', icon: '🚀' },
    { id: 'tool', name: '实用工具', icon: '🔧' },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

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
            作品集
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            我的项目和产品展示，涵盖开源项目、AI 产品和实用工具
          </p>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'bg-[var(--background-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--background-elevated)]'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* 项目列表 */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group card-3d-interactive glass-card rounded-2xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all duration-300"
            >
              {/* 项目头部 */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{project.image}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-[var(--text-secondary)]">{project.description}</p>
                      </div>
                    </div>
                  </div>
                  {project.stars > 0 && (
                    <div className="flex items-center gap-1 text-[var(--text-muted)]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="font-medium">{project.stars}</span>
                    </div>
                  )}
                </div>

                {/* 项目描述 */}
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  {project.longDescription}
                </p>

                {/* 技术标签 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-sm font-medium bg-[var(--background-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <a
                    href={project.url}
                    target={project.url.startsWith('http') ? '_blank' : undefined}
                    rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex-1 py-3 px-6 rounded-xl font-bold text-center transition-all duration-300"
                    style={{
                      background: 'var(--gradient-primary)',
                      color: 'white',
                    }}
                  >
                    {project.category === 'opensource' ? '查看项目' : '立即体验'}
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 rounded-xl font-bold border-2 border-[var(--border-medium)] hover:bg-[var(--background-elevated)] transition-all duration-300 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 更多项目提示 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--text-secondary)] text-lg">
              该分类下暂无项目
            </p>
          </div>
        )}

        {/* 底部 CTA */}
        <div className="mt-20 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto border border-[var(--border-subtle)]">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              对我的项目感兴趣？
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              欢迎通过 GitHub 关注我的最新项目，或者直接联系我讨论合作机会
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/devfoxaicn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-white"
                style={{ background: 'var(--gradient-primary)' }}
              >
                GitHub 主页
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl font-bold border-2 border-[var(--border-medium)] hover:bg-[var(--background-elevated)] transition-all duration-300"
              >
                联系我
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
