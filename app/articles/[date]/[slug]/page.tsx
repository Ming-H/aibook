import { getArticle, getAllArticles } from "@/lib/content-loader";
import { formatDate } from "@/lib/fs-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    date: article.date,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { date: string; slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.date, params.slug);

  if (!article) {
    return {
      title: "文章不存在",
    };
  }

  return {
    title: `${article.title} - AI Hot Tech`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
    },
  };
}

export default async function ArticlePage({ params }: { params: { date: string; slug: string } }) {
  const article = await getArticle(params.date, params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* 返回按钮 */}
      <div className="px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
      </div>

      {/* 文章头部 */}
      <header className="relative px-6 pt-12 pb-16 md:pt-20">
        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:from-blue-950/20" />
        </div>

        <div className="mx-auto max-w-4xl">
          {/* 标签 */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/archive?tag=${tag}`}
                  className="rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:from-blue-100 hover:to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* 标题 */}
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white">
            {article.emoji && <span className="mr-3">{article.emoji}</span>}
            {article.title}
          </h1>

          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime} 分钟阅读
            </span>
            {article.wordCount && (
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {article.wordCount} 字
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 文章内容 */}
      <article className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-none md:p-12">
            <div
              className="prose prose-lg prose-slate max-w-none dark:prose-invert dark:prose-slate"
              dangerouslySetInnerHTML={{ __html: article.htmlContent || article.content }}
            />
          </div>
        </div>
      </article>

      {/* 文章底部 */}
      <footer className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50 p-12 text-center dark:border-slate-800 dark:from-slate-900/50 dark:to-purple-950/20">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
              感谢阅读
            </h2>
            <p className="mb-8 text-slate-600 dark:text-slate-400">
              希望这篇文章对你有所帮助。继续探索更多 AI 技术内容吧！
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                返回首页
              </Link>
              <Link
                href="/archive"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                浏览归档
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
