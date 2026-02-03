'use client';

/**
 * 作品集页面 - 展示所有项目和作品
 */

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
      id: 'skillset',
      name: 'Skillset',
      description: 'AI 技能聚合平台',
      longDescription: '一个聚合 AI 技能的平台，提供丰富的 AI 功能和工具，帮助用户更高效地使用 AI 技术',
      image: '🚀',
      tags: ['Next.js', 'TypeScript', 'AI', 'React'],
      stars: 0,
      url: 'https://github.com/devfoxaicn/skillset',
      github: 'https://github.com/devfoxaicn/skillset',
      category: 'opensource',
    },
    {
      id: 'pixel-factory',
      name: 'Pixel Factory',
      description: '像素艺术创作工厂',
      longDescription: '在线像素艺术编辑器和生成工具，支持像素画创作、动画制作和资源导出',
      image: '🎨',
      tags: ['React', 'TypeScript', 'Canvas', 'Vite'],
      stars: 3,
      url: 'https://github.com/devfoxaicn/pixel-factory',
      github: 'https://github.com/devfoxaicn/pixel-factory',
      category: 'opensource',
    },
    {
      id: 'dating-spot-finder',
      name: 'Dating Spot Finder',
      description: '约会地点推荐工具',
      longDescription: '基于地理位置和偏好推荐适合的约会地点，帮助用户找到浪漫的约会场所',
      image: '💕',
      tags: ['Next.js', 'TypeScript', 'Map API', 'Prisma'],
      stars: 5,
      url: 'https://github.com/devfoxaicn/dating-spot-finder',
      github: 'https://github.com/devfoxaicn/dating-spot-finder',
      category: 'opensource',
    },
    {
      id: 'hahacamera',
      name: 'Haha Camera',
      description: '趣味相机应用',
      longDescription: '带有趣味滤镜和特效的相机应用，让拍照变得更有趣',
      image: '📸',
      tags: ['React Native', 'TypeScript', 'Camera API', 'ML Kit'],
      stars: 8,
      url: 'https://github.com/devfoxaicn/hahacamera',
      github: 'https://github.com/devfoxaicn/hahacamera',
      category: 'opensource',
    },
    {
      id: 'bunnytimer',
      name: 'Bunny Timer',
      description: '可爱的番茄钟计时器',
      longDescription: '以兔子为主题的番茄工作法计时器，帮助用户提高工作效率',
      image: '🐰',
      tags: ['Swift', 'SwiftUI', 'Core Data', 'WidgetKit'],
      stars: 12,
      url: 'https://github.com/devfoxaicn/bunnytimer',
      github: 'https://github.com/devfoxaicn/bunnytimer',
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
  ];

  const categories = [
    { id: 'all', name: '全部', icon: '📁' },
    { id: 'opensource', name: '开源项目', icon: '💻' },
    { id: 'tool', name: '实用工具', icon: '🔧' },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--background-primary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-grid-fine opacity-40" />
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Ecosystem</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-[var(--text-primary)]">
            生态项目与实践
          </h1>
          <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            DevFox AI 的开源项目与实验性实践，用于探索更好的产品体验。
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

        {/* 项目列表 */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card p-8"
            >
              {/* 项目头部 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{project.image}</span>
                    <div>
                      <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
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
                    className="tag"
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
                  className="btn-primary flex-1 py-3 px-6 rounded-md font-semibold text-center"
                >
                  {project.category === 'opensource' ? '查看项目' : '立即体验'}
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary py-3 px-6 rounded-md font-semibold border flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                )}
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
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
              关注 DevFox AI 开源生态
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              了解最新开源项目进展，或与团队交流合作机会。
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/devfoxaicn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3 rounded-md font-semibold"
              >
                GitHub 主页
              </a>
              <a
                href="mailto:1518246548@qq.com"
                className="btn-secondary px-6 py-3 rounded-md font-semibold border"
              >
                联系团队
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
