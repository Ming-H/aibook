'use client';

/**
 * 关于我页面 - 个人介绍
 * 展示个人信息、技能、项目等
 */

import { useState } from 'react';

interface Project {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  const profile = {
    avatar: '🦊',
    name: '极客狐DevFox',
    verified: true,
    title: '自媒体博主 | 独立开发者',
    education: '硕士, 北京工业大学',
    email: '1518246548@qq.com',
    location: '北京, 中国',
    timezone: 'UTC +08:00',
    tags: [
      { name: 'AI科技', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      { name: '自媒体', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
      { name: '独立开发者', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    ],
    bio: '热爱技术，专注于AI领域的探索与实践。分享最新的AI技术动态，开发实用的工具产品。',
  };

  const skills = [
    { name: 'Python', level: 90, color: 'bg-blue-500' },
    { name: 'TypeScript', level: 85, color: 'bg-cyan-500' },
    { name: 'Kotlin', level: 80, color: 'bg-purple-500' },
    { name: 'Next.js', level: 85, color: 'bg-white' },
    { name: 'AI/ML', level: 75, color: 'bg-green-500' },
  ];

  const projects: Project[] = [
    {
      name: 'content-forge-ai',
      description: 'AI内容生成工具，专注于 demos 和实用工具开发',
      stars: 1,
      language: 'TypeScript',
      url: 'https://github.com/devfoxaicn/content-forge-ai',
    },
    {
      name: 'aibook',
      description: 'AI技术热点展示平台，每日呈现最新的AI技术话题',
      stars: 2,
      language: 'TypeScript',
      url: 'https://github.com/devfoxaicn/aibook',
    },
  ];

  const socialLinks: SocialLink[] = [
    { platform: 'GitHub', url: 'https://github.com/devfoxaicn', icon: '🐙' },
    { platform: 'X (Twitter)', url: 'https://x.com/MingFire520', icon: '𝕏' },
    { platform: 'Email', url: 'mailto:1518246548@qq.com', icon: '📧' },
  ];

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--background-primary)] via-[var(--background-secondary)] to-[var(--background-tertiary)] py-12 px-4 sm:px-6 lg:px-8">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-primary opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            关于我
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            了解更多关于我的信息
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧 - 个人信息卡片 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 主资料卡 */}
            <div className="glass-card rounded-2xl p-8 hover:shadow-glow-brand transition-all duration-300">
              {/* 头像和基本信息 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-purple-500/30">
                    <img
                      src="/avatar.png"
                      alt="极客狐DevFox"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {profile.verified && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-[var(--background-secondary)]">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2 flex items-center justify-center sm:justify-start gap-2">
                    {profile.name}
                  </h2>
                  <p className="text-[var(--text-secondary)] text-lg mb-4">
                    {profile.title}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
                    {profile.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${tag.color}`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://dinq.me/devfoxai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    DINQ: dinq.me/devfoxai
                  </a>
                </div>
              </div>

              {/* 详细信息 */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  <span>{profile.education}</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${profile.email}`} className="hover:text-blue-400 transition-colors">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{profile.timezone}</span>
                </div>
              </div>

              {/* 个人简介 */}
              <div className="bg-[var(--background-tertiary)] rounded-xl p-6 border border-[var(--border-subtle)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">个人简介</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            </div>

            {/* 技能卡片 */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">技术栈</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-[var(--text-secondary)]">{skill.name}</span>
                      <span className="text-[var(--text-muted)]">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-[var(--background-tertiary)] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 项目卡片 */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">开源项目</h3>
                <a
                  href="https://github.com/devfoxaicn?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
                >
                  查看全部
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <a
                    key={index}
                    href={`https://github.com/devfoxaicn/${project.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[var(--background-tertiary)] rounded-xl p-5 border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-[var(--text-primary)] font-semibold group-hover:text-purple-400 transition-colors">
                        {project.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[var(--text-muted)]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm">{project.stars}</span>
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm mb-3">
                      {project.description}
                    </p>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md border border-blue-500/30">
                      {project.language}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧 - 社交链接和其他信息 */}
          <div className="space-y-8">
            {/* 社交链接卡片 */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">社交媒体</h3>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[var(--background-tertiary)] rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:bg-[var(--background-elevated)] transition-all duration-300 group"
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {link.platform}
                    </span>
                    <svg className="w-4 h-4 ml-auto text-[var(--text-muted)] group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* 统计信息卡片 */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">统计信息</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">GitHub Stars</span>
                  <span className="text-2xl font-bold text-purple-400">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">公开项目</span>
                  <span className="text-2xl font-bold text-blue-400">10+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">技术文章</span>
                  <span className="text-2xl font-bold text-green-400">50+</span>
                </div>
              </div>
            </div>

            {/* 分享卡片 */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">分享页面</h3>
              <button
                onClick={handleShare}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-glow-brand"
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    已复制链接
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    复制链接分享
                  </>
                )}
              </button>
            </div>

            {/* 联系方式卡片 */}
            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">合作联系</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                欢迎技术交流、项目合作或其他形式的沟通
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                发送邮件
              </a>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <div className="mt-16 text-center text-[var(--text-muted)] text-sm">
          <p>Built with ❤️ by {profile.name}</p>
          <p className="mt-2">© 2024 All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
