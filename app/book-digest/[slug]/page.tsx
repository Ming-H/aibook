/**
 * 图书简报详情页 - 展示单本书的完整摘要
 * 包含封面、关键要点、金句、概念解释等内容
 */

import { notFound } from 'next/navigation';
import { getBookDigestBySlug, getRelatedBookDigests } from '@/lib/book-digest-loader';
import { getCategoryInfo, getDifficultyLabel } from '@/types/book-digest';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-static';

export default async function BookDigestDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const book = await getBookDigestBySlug(params.slug);

  if (!book) {
    notFound();
  }

  const categoryInfo = getCategoryInfo(book.basicInfo.category);
  const relatedBooks = await getRelatedBookDigests(book, 3);

  // 构建图片基础 URL（从 GitHub 仓库获取）
  const imageBaseUrl = `https://raw.githubusercontent.com/${process.env.BOOK_DIGEST_REPO}/main/output/images`;

  return (
    <div className="page-surface page-surface-soft py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-6xl mx-auto">
        {/* 返回链接 */}
        <Link
          href="/book-digest"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8 font-mono text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回图书简报
        </Link>

        {/* 图书头部信息 */}
        <div className="card rounded-3xl overflow-hidden mb-8">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            {/* 图书封面 */}
            <div className="md:col-span-1">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background-secondary)] shadow-2xl">
                <Image
                  src={`${imageBaseUrl}/${book.slug}/cover.png`}
                  alt={book.basicInfo.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* 如果图片加载失败，显示 emoji */}
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--background-secondary)]">
                  <div className="text-center p-6">
                    <div className="text-8xl mb-4">{book.metadata.emoji}</div>
                    <div className="text-lg font-mono font-bold text-[var(--text-primary)]">
                      {book.basicInfo.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 图书基本信息 */}
            <div className="md:col-span-2 flex flex-col justify-center">
              <div className="flex items-start justify-between mb-4">
                <span className="px-4 py-2 bg-[var(--background-tertiary)] rounded-full text-sm font-mono text-[var(--text-primary)] border border-[var(--border-default)]">
                  {categoryInfo.emoji} {categoryInfo.label}
                </span>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-2xl font-bold text-[var(--text-primary)] font-mono">
                    {book.basicInfo.rating}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4 font-mono">
                {book.basicInfo.title}
              </h1>

              <p className="text-lg text-[var(--text-secondary)] mb-6">
                {book.summary.mainMessage}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-[var(--text-muted)] font-mono mb-1">作者</div>
                  <div className="text-[var(--text-primary)]">{book.basicInfo.authors.join('、')}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--text-muted)] font-mono mb-1">出版社</div>
                  <div className="text-[var(--text-primary)]">{book.basicInfo.publishers.join('、')}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--text-muted)] font-mono mb-1">出版年份</div>
                  <div className="text-[var(--text-primary)]">{book.basicInfo.publishYear}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--text-muted)] font-mono mb-1">页数</div>
                  <div className="text-[var(--text-primary)]">{book.basicInfo.pages} 页</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--text-muted)] font-mono mb-1">阅读时间</div>
                  <div className="text-[var(--text-primary)]">{book.basicInfo.readTime} 分钟</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--text-muted)] font-mono mb-1">难度等级</div>
                  <div className="text-[var(--text-primary)]">{getDifficultyLabel(book.basicInfo.difficulty)}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {book.basicInfo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[var(--background-tertiary)] text-[var(--text-tertiary)] text-sm rounded-md font-mono border border-[var(--border-subtle)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 核心要点 */}
        {book.keyPoints.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 font-mono flex items-center gap-3">
              <span className="text-3xl">📋</span>
              核心要点
            </h2>
            <div className="grid gap-4">
              {book.keyPoints.map((point, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--background-tertiary)] flex items-center justify-center text-[var(--text-primary)] font-bold font-mono flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 font-mono">
                        {point.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] mb-4">
                        {point.description}
                      </p>
                      {point.examples.length > 0 && (
                        <div className="bg-[var(--background-tertiary)] rounded-lg p-4">
                          <div className="text-sm text-[var(--text-muted)] font-mono mb-2">示例：</div>
                          <ul className="space-y-2">
                            {point.examples.map((example, idx) => (
                              <li key={idx} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                                <span className="text-[var(--text-muted)]">•</span>
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 金句摘录 */}
        {book.quotes.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 font-mono flex items-center gap-3">
              <span className="text-3xl">💬</span>
              金句摘录
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {book.quotes.map((quote, index) => (
                <div key={index} className="card p-6 relative overflow-hidden">
                  <div className="absolute top-4 left-4 text-6xl text-[var(--border-subtle)] opacity-20 font-serif">
                    "
                  </div>
                  <div className="relative">
                    <p className="text-lg text-[var(--text-primary)] mb-4 font-medium leading-relaxed">
                      {quote.text}
                    </p>
                    <div className="text-sm text-[var(--text-muted)] font-mono">
                      {quote.chapter}
                    </div>
                    {quote.context && (
                      <p className="text-sm text-[var(--text-secondary)] mt-2 italic">
                        {quote.context}
                      </p>
                    )}
                  </div>
                  {/* 金句图片（如果有） */}
                  {book.metadata.images.quotes[index] && (
                    <div className="mt-4 rounded-lg overflow-hidden">
                      <Image
                        src={`${imageBaseUrl}/${book.metadata.images.quotes[index].replace('../images/', '')}`}
                        alt={`金句卡片: ${quote.text.slice(0, 20)}`}
                        width={400}
                        height={400}
                        className="w-full h-auto"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 核心概念 */}
        {book.concepts.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 font-mono flex items-center gap-3">
              <span className="text-3xl">🧠</span>
              核心概念
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {book.concepts.map((concept, index) => (
                <div key={index} className="card p-6">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 font-mono">
                    {concept.term}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3 font-mono bg-[var(--background-tertiary)] px-3 py-2 rounded">
                    {concept.definition}
                  </p>
                  <p className="text-[var(--text-secondary)] mb-4">
                    {concept.explanation}
                  </p>
                  {concept.relatedConcepts.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {concept.relatedConcepts.map((related, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-[var(--background-tertiary)] text-[var(--text-tertiary)] text-xs rounded-md font-mono"
                        >
                          → {related}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* 概念图片（如果有） */}
                  {book.metadata.images.concepts[index] && (
                    <div className="mt-4 rounded-lg overflow-hidden">
                      <Image
                        src={`${imageBaseUrl}/${book.metadata.images.concepts[index].replace('../images/', '')}`}
                        alt={`概念图: ${concept.term}`}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 实用框架 */}
        {book.frameworks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 font-mono flex items-center gap-3">
              <span className="text-3xl">🔧</span>
              实用框架
            </h2>
            <div className="grid gap-6">
              {book.frameworks.map((framework, index) => (
                <div key={index} className="card p-6">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 font-mono">
                    {framework.name}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-4">
                    {framework.description}
                  </p>
                  {framework.steps.length > 0 && (
                    <ol className="space-y-3">
                      {framework.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-[var(--background-tertiary)] flex items-center justify-center text-[var(--text-primary)] text-sm font-bold flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-[var(--text-secondary)]">{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 总结 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 font-mono flex items-center gap-3">
            <span className="text-3xl">✨</span>
            核心收获
          </h2>
          <div className="card p-6 mb-6">
            <ul className="space-y-3">
              {book.summary.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[var(--border-medium)]">✓</span>
                  <span className="text-[var(--text-secondary)]">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6 bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background-secondary)]">
            <p className="text-[var(--text-primary)] leading-relaxed text-center font-medium">
              {book.summary.conclusion}
            </p>
          </div>
        </section>

        {/* 相关推荐 */}
        {relatedBooks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 font-mono flex items-center gap-3">
              <span className="text-3xl">📚</span>
              相关推荐
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBooks.map((relatedBook) => (
                <Link
                  key={relatedBook.id}
                  href={`/book-digest/${relatedBook.slug}`}
                  className="card p-6 hover:border-[var(--border-medium)] transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{relatedBook.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[var(--text-primary)] mb-2 font-mono line-clamp-2">
                        {relatedBook.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">
                        {relatedBook.authors.join('、')}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <span>{relatedBook.categoryLabel}</span>
                        <span>·</span>
                        <span>{relatedBook.rating} 分</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 底部导航 */}
        <div className="flex justify-between items-center">
          <Link
            href="/book-digest"
            className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold font-mono"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回列表
          </Link>
        </div>
      </div>
    </div>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  const { getAllBookDigestsMetadata } = await import('@/lib/book-digest-loader');
  const books = await getAllBookDigestsMetadata();

  return books.map((book) => ({
    slug: book.slug,
  }));
}
