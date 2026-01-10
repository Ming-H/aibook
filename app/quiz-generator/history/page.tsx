/**
 * 出题历史记录页面
 * 暂时显示简单的占位内容
 */

import Link from 'next/link';

export const dynamic = 'force-static';

export default function QuizHistoryPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-20 sm:px-8 lg:px-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
          历史记录
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          该功能正在开发中，敬请期待...
        </p>
        <Link
          href="/quiz-generator"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--background-secondary)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回
        </Link>
      </div>
    </div>
  );
}
