'use client';

/**
 * 联系页面 - 提供多种联系方式
 */

import { useState } from "react";
import Link from "next/link";

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

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4 font-mono border-b-4 border-[var(--border-medium)] inline-block pb-2">
            联系我
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            有问题或合作意向？欢迎通过以下方式联系我
          </p>
        </div>

        {/* 联系卡片 */}
        <div className="card p-8 mb-8">
          {/* 邮箱 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-[var(--text-primary)] font-mono">邮箱</span>
            </div>
            <button
              onClick={() => copyToClipboard(contactInfo.email, 'email')}
              className="w-full p-4 bg-[var(--background-tertiary)] border-2 border-[var(--border-subtle)] rounded-md hover:border-[var(--border-default)] transition-all duration-300 flex items-center justify-between group"
            >
              <span className="text-[var(--text-secondary)] font-mono">{contactInfo.email}</span>
              <span className="text-[var(--text-primary)] text-sm flex items-center gap-1 font-mono">
                {copiedType === 'email' ? '已复制' : '复制'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </span>
            </button>
          </div>

          {/* 微信 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.5 10c-.828 0-1.5-.672-1.5-1.5S7.672 7 8.5 7s1.5.672 1.5 1.5S9.328 10 8.5 10zm7 0c-.828 0-1.5-.672-1.5-1.5S14.672 7 15.5 7s1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm-3.5-8C5.467 2 2 5.467 2 9.5c0 2.687 1.12 5.083 2.883 6.758V19l2.96-1.963c.854.475 1.832.743 2.883.743 4.033 0 7.5-3.467 7.5-7.5S16.033 2 12 2zm0 13c-.85 0-1.735-.19-2.52-.54l-.23-.1-2.77 1.836v-2.32c-1.46-1.39-2.48-3.42-2.48-5.87 0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"/>
              </svg>
              <span className="font-medium text-[var(--text-primary)] font-mono">微信</span>
            </div>
            <button
              onClick={() => copyToClipboard(contactInfo.wechat, 'wechat')}
              className="w-full p-4 bg-[var(--background-tertiary)] border-2 border-[var(--border-subtle)] rounded-md hover:border-[var(--border-default)] transition-all duration-300 flex items-center justify-between group"
            >
              <span className="text-[var(--text-secondary)] font-mono">{contactInfo.wechat}</span>
              <span className="text-[var(--text-primary)] text-sm flex items-center gap-1 font-mono">
                {copiedType === 'wechat' ? '已复制' : '复制'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </span>
            </button>
          </div>

          {/* 响应时间说明 */}
          <div className="text-sm text-[var(--text-secondary)] mt-1 mb-6">
            我通常会在 24-48 小时内回复邮件。社交媒体私信也可以，但响应可能较慢。微信回复最快。
          </div>
        </div>

        {/* 社交媒体链接 */}
        <div className="card p-8 mb-8">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 font-mono">社交媒体</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {/* GitHub */}
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[var(--background-tertiary)] border-2 border-[var(--border-subtle)] rounded-md hover:border-[var(--border-default)] transition-all duration-300 flex items-center gap-3 group"
            >
              <svg className="w-6 h-6 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <div className="font-medium text-[var(--text-primary)] font-mono">GitHub</div>
                <div className="text-sm text-[var(--text-muted)]">@devfoxaicn</div>
              </div>
            </a>

            {/* DINQ (LinkedIn) */}
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[var(--background-tertiary)] border-2 border-[var(--border-subtle)] rounded-md hover:border-[var(--border-default)] transition-all duration-300 flex items-center gap-3 group"
            >
              <svg className="w-6 h-6 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <div className="flex-1">
                <div className="font-medium text-[var(--text-primary)] font-mono">DINQ</div>
                <div className="text-sm text-[var(--text-muted)]">/devfoxai</div>
              </div>
            </a>

            {/* X (Twitter) */}
            <a
              href={contactInfo.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[var(--background-tertiary)] border-2 border-[var(--border-subtle)] rounded-md hover:border-[var(--border-default)] transition-all duration-300 flex items-center gap-3 group"
            >
              <svg className="w-6 h-6 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <div className="flex-1">
                <div className="font-medium text-[var(--text-primary)] font-mono">X (Twitter)</div>
                <div className="text-sm text-[var(--text-muted)]">@MingFire520</div>
              </div>
            </a>
          </div>
        </div>

        {/* 位置信息 */}
        <div className="card p-8">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 font-mono">位置</h2>
          <div className="flex items-center gap-3 text-[var(--text-secondary)]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-mono">{contactInfo.location}</span>
          </div>
        </div>

        {/* 返回首页链接 */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-mono text-[var(--text-primary)] border-2 border-[var(--border-subtle)] hover:bg-[var(--background-tertiary)] hover:border-[var(--border-default)] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
