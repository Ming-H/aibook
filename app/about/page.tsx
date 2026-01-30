'use client';

/**
 * About Page - Bold Minimalist Design with Geek-Chic Aesthetic
 * Features: Large avatar focal point, asymmetric layout, generous spacing
 */

import { useState, useEffect } from 'react';

interface TechBadge {
  name: string;
}

interface Experience {
  role: string;
  focus: string;
  expertise: string[];
}

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const techStack: TechBadge[] = [
    'Python',
    'TypeScript',
    'Kotlin',
    'Next.js',
    'React',
    'PostgreSQL',
    'LLM/RAG',
    'Prisma',
    'Tailwind CSS',
    'Node.js',
  ];

  const experiences: Experience[] = [
    {
      role: 'AI 工程师 & 独立开发者',
      focus: '构建 AI 驱动的产品并分享技术见解',
      expertise: ['LLM 应用开发', '全栈 Web 开发', '技术写作'],
    },
    {
      role: '技术博主',
      focus: '创作 AI/ML 领域的优质内容',
      expertise: ['AI 技术分析', '教程创作', '行业洞察'],
    },
  ];

  const achievements = [
    { icon: '📦', label: '开源项目', value: '10+' },
    { icon: '📝', label: '技术文章', value: '50+' },
    { icon: '👥', label: '社交关注', value: '1.5K+' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      handle: 'Ming-H',
      url: 'https://github.com/Ming-H',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      handle: '@MingFire520',
      url: 'https://x.com/MingFire520',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'DINQ',
      handle: 'devfoxai',
      url: 'https://dinq.me/devfoxai',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      ),
    },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('1518246548@qq.com');
    alert('邮箱已复制！');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background-primary)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-dot-matrix-dense opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[var(--border-subtle)] to-transparent opacity-20 pointer-events-none" />

      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column - Avatar & Key Info */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-8">
            {/* Avatar Section - Large focal point */}
            <div className="relative group">
              {/* Decorative ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--border-subtle)] via-[var(--border-default)] to-[var(--border-subtle)] rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />

              {/* Avatar container */}
              <div className="relative bg-[var(--background-tertiary)] rounded-2xl p-1">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background-tertiary)] flex items-center justify-center overflow-hidden">
                  {/* Large initial/avatar placeholder */}
                  <div className="text-center">
                    <div className="text-8xl md:text-9xl font-bold text-[var(--text-muted)] opacity-20 font-mono">
                      DF
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[var(--border-subtle)] flex items-center justify-center">
                        <span className="text-5xl md:text-6xl">🦊</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status indicator */}
              <div className="absolute -bottom-2 -right-2 bg-[var(--background-elevated)] border-2 border-[var(--border-default)] rounded-full px-3 py-1 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-[var(--text-primary)] font-mono">OPEN TO WORK</span>
              </div>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] font-mono tracking-tight">
                DevFox AI
              </h1>
              <p className="text-xl text-[var(--text-secondary)] font-light">
                极客狐 <span className="text-[var(--text-muted)]">·</span> AI 工程师
              </p>
            </div>

            {/* Bio */}
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              构建智能工具并与社区分享知识。专注于 AI 技术的实际应用，从 LLM 应用开发到全栈 Web 开发，致力于让 AI 技术更容易被理解和使用。
            </p>

            {/* Location */}
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>北京，中国</span>
            </div>

            {/* Contact Button */}
            <button
              onClick={handleCopyEmail}
              className="btn-primary px-6 py-3 text-base font-mono w-full hover-lift"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                复制邮箱
              </span>
            </button>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-7 space-y-10">

            {/* Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card-interactive p-4 hover-lift"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {social.icon}
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider">
                        {social.name}
                      </div>
                      <div className="text-[var(--text-primary)] font-medium">
                        {social.handle}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-[var(--background-secondary)] rounded-xl hover-shine"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="text-2xl font-bold text-[var(--text-primary)] font-mono">
                    {achievement.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1 font-mono uppercase tracking-wider">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[var(--border-default)]" />
                技术栈
                <span className="flex-1 h-px bg-[var(--border-subtle)]" />
              </h2>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="tag hover:border-[var(--border-medium)] transition-colors cursor-default"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[var(--border-default)]" />
                经验与专长
                <span className="flex-1 h-px bg-[var(--border-subtle)]" />
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-[var(--background-secondary)] rounded-xl hover-lift"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--border-subtle)] flex items-center justify-center text-lg font-mono text-[var(--text-muted)] group-hover:bg-[var(--border-default)] transition-colors">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] font-mono">
                        {exp.role}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                      {exp.focus}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.expertise.map((skill, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-[var(--border-subtle)] rounded text-[var(--text-secondary)] font-mono">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="relative p-6 bg-[var(--background-tertiary)] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-dot-matrix opacity-20" />
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1 font-mono">
                    有兴趣合作？
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    欢迎通过邮件或社交媒体联系我
                  </p>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="btn-secondary px-6 py-2 text-sm whitespace-nowrap"
                >
                  取得联系
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <p className="font-mono">© 2024 DevFox AI. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built with</span>
            <span className="text-red-500">❤</span>
            <span>using Next.js & TypeScript</span>
          </p>
        </div>
      </div>
    </div>
  );
}
