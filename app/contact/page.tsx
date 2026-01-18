'use client';

/**
 * 联系页面
 */

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [copiedType, setCopiedType] = useState<'email' | 'wechat' | null>(null);

  const contactInfo = {
    email: '1518246548@qq.com',
    wechat: 'DevFoxAI',
    github: 'https://github.com/devfoxaicn',
    linkedin: 'https://dinq.me/devfoxai',
    twitter: 'https://x.com/MingFire520',
    location: '北京, 中国',
  };

  const copyToClipboard = async (text: string, type: 'email' | 'wechat') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const collaborationTypes = [
    {
      icon: '💼',
      title: '项目合作',
      description: '有 AI 项目需要技术支持或合作开发',
    },
    {
      icon: '📝',
      title: '技术写作',
      description: '需要 AI 技术文章或教程内容',
    },
    {
      icon: '🎯',
      title: '技术咨询',
      description: 'AI/LLM 技术选型、架构设计咨询',
    },
    {
      icon: '💡',
      title: '产品建议',
      description: '对现有产品的改进建议或新想法',
    },
    {
      icon: '🤝',
      title: '技术交流',
      description: '交流 AI 技术心得和行业见解',
    },
    {
      icon: '📢',
      title: '媒体采访',
      description: 'AI 行业观点分享或媒体采访',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-[var(--text-primary)] mb-4">
            联系我
          </h1>
          <p className="text-gray-600 dark:text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            无论是技术交流、项目合作，还是产品咨询，欢迎随时联系
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 左侧 - 联系方式 */}
          <div className="space-y-8">
            {/* 主要联系方式 */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-[var(--text-primary)] mb-6">联系方式</h2>

              {/* Email */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-900 dark:text-[var(--text-primary)]">邮箱</span>
                </div>
                <button
                  onClick={() => copyToClipboard(contactInfo.email, 'email')}
                  className="w-full p-4 bg-gray-50 dark:bg-[var(--background-tertiary)] rounded-xl border border-gray-200 dark:border-[var(--border-subtle)] hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="text-gray-700 dark:text-[var(--text-secondary)]">{contactInfo.email}</span>
                  <span className="text-indigo-500 text-sm flex items-center gap-1">
                    {copiedType === 'email' ? '已复制' : '复制'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* WeChat */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212.966 4.134 2.544 6.61 3.261l-.672 2.453 2.611-.672c1.959.566 4.144.894 6.461.894 4.736 0 8.691-3.056 8.691-7.31 0-4.68-3.939-8.568-8.691-8.568zM6.03 7.078c.752 0 1.36-.578 1.36-1.292 0-.714-.608-1.292-1.36-1.292-.752 0-1.36.578-1.36 1.292 0 .714.608 1.292 1.36 1.292zm4.319 0c.752 0 1.36-.578 1.36-1.292 0-.714-.608-1.292-1.36-1.292-.752 0-1.36.578-1.36 1.292 0 .714.608 1.292 1.36 1.292z"/>
                  </svg>
                  <span className="font-medium text-gray-900 dark:text-[var(--text-primary)]">微信</span>
                </div>
                <button
                  onClick={() => copyToClipboard(contactInfo.wechat, 'wechat')}
                  className="w-full p-4 bg-gray-50 dark:bg-[var(--background-tertiary)] rounded-xl border border-gray-200 dark:border-[var(--border-subtle)] hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 flex items-center justify-between group"
                >
                  <span className="text-gray-700 dark:text-[var(--text-secondary)] font-mono">{contactInfo.wechat}</span>
                  <span className="text-green-500 text-sm flex items-center gap-1">
                    {copiedType === 'wechat' ? '已复制' : '复制'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* 社交媒体 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="font-medium text-gray-900 dark:text-[var(--text-primary)]">社交媒体</span>
                </div>
                <div className="space-y-3">
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[var(--background-tertiary)] rounded-xl border border-gray-200 dark:border-[var(--border-subtle)] hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 group"
                  >
                    <svg className="w-6 h-6 text-gray-700 dark:text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-[var(--text-primary)]">GitHub</div>
                      <div className="text-sm text-gray-500 dark:text-[var(--text-muted)]">@devfoxaicn</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 dark:text-[var(--text-muted)] group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[var(--background-tertiary)] rounded-xl border border-gray-200 dark:border-[var(--border-subtle)] hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 group"
                  >
                    <svg className="w-6 h-6 text-gray-700 dark:text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-[var(--text-primary)]">DINQ</div>
                      <div className="text-sm text-gray-500 dark:text-[var(--text-muted)]">dinq.me/devfoxai</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 dark:text-[var(--text-muted)] group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  <a
                    href={contactInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[var(--background-tertiary)] rounded-xl border border-gray-200 dark:border-[var(--border-subtle)] hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 group"
                  >
                    <svg className="w-6 h-6 text-gray-700 dark:text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-[var(--text-primary)]">X (Twitter)</div>
                      <div className="text-sm text-gray-500 dark:text-[var(--text-muted)]">@MingFire520</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 dark:text-[var(--text-muted)] group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* 位置 */}
              <div className="pt-6 border-t border-gray-200 dark:border-[var(--border-subtle)]">
                <div className="flex items-center gap-2 text-gray-600 dark:text-[var(--text-secondary)]">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{contactInfo.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧 - 合作类型 */}
          <div>
            <div className="card p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-[var(--text-primary)] mb-6">合作类型</h2>
              <p className="text-gray-600 dark:text-[var(--text-secondary)] mb-8">
                欢迎就以下任何话题与我交流
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {collaborationTypes.map((type, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-[var(--background-tertiary)] rounded-xl border border-gray-200 dark:border-[var(--border-subtle)] hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300"
                  >
                    <span className="text-3xl mb-2 block">{type.icon}</span>
                    <h3 className="font-bold text-gray-900 dark:text-[var(--text-primary)] mb-1">{type.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-[var(--text-secondary)]">{type.description}</p>
                  </div>
                ))}
              </div>

              {/* 响应时间提示 */}
              <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-[var(--text-primary)]">关于回复</div>
                    <div className="text-sm text-gray-600 dark:text-[var(--text-secondary)] mt-1">
                      我通常会在 24-48 小时内回复邮件。社交媒体私信也可以，但响应可能较慢。微信回复最快。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部 CTA */}
        <div className="mt-20 text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-[var(--text-primary)] mb-3">
              感谢你的关注！
            </h3>
            <p className="text-gray-600 dark:text-[var(--text-secondary)] mb-6">
              如果你对我的项目或文章感兴趣，欢迎关注我的 GitHub 和社交媒体
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub 主页
              </a>
              <Link
                href="/projects"
                className="btn-secondary px-6 py-3"
              >
                查看作品
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
