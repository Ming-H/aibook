'use client';

/**
 * 提示词灵感页面 - 展示精选的爆款提示词
 * Prompts are loaded from data/prompts/*.json files via /api/prompts
 */

import { useState, useEffect, useMemo } from 'react';
import { loadPrompts, getCategories, type Prompt } from '@/lib/prompt-loader';

export default function PromptsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load prompts and categories on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [loadedPrompts, loadedCategories] = await Promise.all([
        loadPrompts(),
        getCategories(),
      ]);
      setPrompts(loadedPrompts);
      setCategories(loadedCategories);
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredPrompts = selectedCategory === 'all'
    ? prompts
    : prompts.filter(p => p.category === selectedCategory);

  const copyToClipboard = (prompt: Prompt) => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getDifficultyLabel = (difficulty: Prompt['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return '入门';
      case 'intermediate':
        return '中级';
      case 'advanced':
        return '高级';
    }
  };

  const getDifficultyColor = (difficulty: Prompt['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'advanced':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  if (loading) {
    return (
      <div className="page-surface page-surface-soft py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--border-medium)]"></div>
            <p className="mt-4 text-[var(--text-secondary)] font-mono">加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-surface page-surface-soft py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4 font-mono border-b-4 border-[var(--border-medium)] inline-block pb-2">
            提示词灵感 ✨
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            精选的爆款提示词，激发你的 AI 创作潜力。每个提示词都经过精心挑选和优化，可以直接使用或作为灵感来源。
          </p>
        </div>

        {/* 分类筛选 */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const categoryLabels: Record<string, string> = {
              all: '全部',
              writing: '写作',
              coding: '编程',
              design: '设计',
              productivity: '效率',
              creative: '创意',
              education: '教育',
            };
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-mono text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[var(--border-medium)] text-[var(--text-primary)] border-2 border-[var(--border-medium)]'
                    : 'bg-[var(--background-secondary)] text-[var(--text-secondary)] border-2 border-[var(--border-subtle)] hover:border-[var(--border-default)]'
                }`}
              >
                {categoryLabels[category] || category}
              </button>
            );
          })}
        </div>

        {/* 提示词卡片列表 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="card rounded-2xl overflow-hidden flex flex-col h-full"
            >
              {/* 卡片头部 */}
              <div className="p-6 border-b border-[var(--border-subtle)]">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl bg-[var(--background-tertiary)] border-2 border-[var(--border-default)]">
                    {prompt.emoji}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono border ${getDifficultyColor(prompt.difficulty)}`}>
                    {getDifficultyLabel(prompt.difficulty)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-mono">
                  {prompt.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {prompt.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[var(--background-tertiary)] text-[var(--text-tertiary)] text-xs rounded-md font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 卡片内容预览 */}
              <div className="p-6 flex-1 overflow-hidden">
                <div className="bg-[var(--background-tertiary)] rounded-lg p-4 mb-4">
                  <p className="text-xs text-[var(--text-muted)] font-mono mb-2">提示词预览：</p>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-4 font-mono">
                    {prompt.prompt.substring(0, 150)}...
                  </p>
                </div>
              </div>

              {/* 卡片底部 */}
              <div className="p-6 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => copyToClipboard(prompt)}
                  className="w-full btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold font-mono transition-all duration-200"
                >
                  {copiedId === prompt.id ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      已复制
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      复制提示词
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 底部说明 */}
        <div className="mt-16 text-center">
          <div className="card p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 font-mono">
              💡 使用提示
            </h3>
            <div className="text-left space-y-3 text-[var(--text-secondary)]">
              <p>• <strong>复制使用：</strong>点击"复制提示词"按钮，然后粘贴到 ChatGPT、Claude 等AI工具中使用</p>
              <p>• <strong>自定义调整：</strong>根据你的具体需求，对提示词进行适当修改和优化</p>
              <p>• <strong>参考学习：</strong>研究这些提示词的结构和技巧，提升自己的提示词工程能力</p>
              <p>• <strong>反馈分享：</strong>如果你有好的提示词创意，欢迎分享给更多人</p>
            </div>
          </div>
        </div>

        {/* 来源说明 */}
        <div className="mt-8 text-center text-[var(--text-muted)] text-sm font-mono">
          <p>部分提示词来源：
            <a href="https://github.com/NeekChaw/awesome-prompt" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline ml-1">NeekChaw/awesome-prompt</a>
            {' · '}
            <a href="https://github.com/langgptai/wonderful-prompts" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline">langgptai/wonderful-prompts</a>
          </p>
        </div>
      </div>
    </div>
  );
}
