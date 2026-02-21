/**
 * 图书简报页面 - 展示 AI 生成的图书摘要
 * 数据从 book-digest 仓库通过 GitHub API 加载
 */

import { getAllBookDigestsMetadata, getBookDigestStats } from '@/lib/book-digest-loader';
import { BOOK_CATEGORIES } from '@/types/book-digest';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-static';

export default async function BookDigestPage() {
  const [books, stats] = await Promise.all([
    getAllBookDigestsMetadata(),
    getBookDigestStats(),
  ]);

  return (
    <div className="page-surface page-surface-soft py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4 font-mono border-b-4 border-[var(--border-medium)] inline-block pb-2">
            图书简报 📚
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            AI 驱动的图书摘要，帮助你快速了解书籍核心内容。每个简报都包含关键观点、金句、概念解释和实用框架。
          </p>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-[var(--text-primary)] mb-2 font-mono">
              {stats.totalBooks}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">收录图书</div>
          </div>
          {Object.entries(stats.categoryStats).slice(0, 3).map(([category, count]) => (
            <div key={category} className="card p-6 text-center">
              <div className="text-3xl font-bold text-[var(--text-primary)] mb-2 font-mono">
                {count}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">{category}</div>
            </div>
          ))}
        </div>

        {/* 分类导航 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 font-mono">
            📂 按分类浏览
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Object.values(BOOK_CATEGORIES).map((category) => (
              <Link
                key={category.id}
                href={`/book-digest?category=${category.id}`}
                className="card p-4 text-center hover:border-[var(--border-medium)] transition-all duration-200"
              >
                <div className="text-3xl mb-2">{category.emoji}</div>
                <div className="text-sm font-mono text-[var(--text-primary)]">{category.label}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">
                  {stats.categoryStats[category.label] || 0} 本
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 图书列表 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 font-mono">
            📖 所有图书
          </h2>
        </div>

        {books.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-mono">
              暂无图书简报
            </h3>
            <p className="text-[var(--text-secondary)]">
              图书简报正在整理中，敬请期待...
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/book-digest/${book.slug}`}
                className="card rounded-2xl overflow-hidden flex flex-col h-full hover:border-[var(--border-medium)] transition-all duration-200"
              >
                {/* 图书封面 */}
                <div className="relative h-64 bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background-secondary)] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-20">
                      {book.categoryEmoji}
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{book.emoji}</div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] font-mono line-clamp-2">
                        {book.title}
                      </h3>
                    </div>
                  </div>
                  {/* 分类标签 */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[var(--background-primary)]/90 backdrop-blur-sm rounded-full text-xs font-mono text-[var(--text-primary)] border border-[var(--border-default)]">
                      {book.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* 图书信息 */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* 评分和难度 */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-[var(--text-primary)]">{book.rating}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      book.difficulty === 'beginner'
                        ? 'bg-green-500/20 text-green-400'
                        : book.difficulty === 'intermediate'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {book.difficultyLabel}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      {book.readTime} 分钟
                    </span>
                  </div>

                  {/* 作者 */}
                  <div className="text-sm text-[var(--text-secondary)] mb-4">
                    作者：{book.authors.join('、')}
                  </div>

                  {/* 简介 */}
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-4 flex-1">
                    {book.summary}
                  </p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {book.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[var(--background-tertiary)] text-[var(--text-tertiary)] text-xs rounded-md font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                    {book.tags.length > 3 && (
                      <span className="px-2 py-1 text-[var(--text-muted)] text-xs font-mono">
                        +{book.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* 查看详情按钮 */}
                  <div className="text-center">
                    <span className="text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                      查看详情 →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 底部说明 */}
        <div className="mt-16 text-center">
          <div className="card p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 font-mono">
              🤖 关于图书简报
            </h3>
            <div className="text-left space-y-3 text-[var(--text-secondary)]">
              <p>• <strong>AI 生成：</strong>使用 GLM-4 大语言模型分析全书内容，提取核心观点和关键信息</p>
              <p>• <strong>结构化摘要：</strong>包含关键要点、金句摘录、概念解释、实用框架等模块</p>
              <p>• <strong>视觉增强：</strong>为每本书生成封面图、概念图和金句卡片，提升阅读体验</p>
              <p>• <strong>持续更新：</strong>定期添加新书内容，涵盖个人成长、商业、心理学等领域</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
