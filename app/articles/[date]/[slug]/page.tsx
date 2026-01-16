import { getArticle, getAllArticles } from "@/lib/content-loader";
import { formatDate } from "@/lib/fs-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => {
    // 从 fullPath 中提取 articleDir (格式: "20260114_133012_标题/filename.md")
    const articleDir = article.fullPath.split("/")[0];
    return {
      date: articleDir, // 使用完整的目录名而不是日期
      slug: article.slug,
    };
  });
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* 返回按钮 */}
      <div className="relative px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-all hover:text-white rounded-xl px-4 py-2 hover:bg-white/5"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
      </div>

      {/* 文章头部 */}
      <header className="relative px-6 pt-12 pb-16 md:pt-20">
        <div className="mx-auto max-w-5xl">
          {/* 标签 */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-3">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/archive?tag=${tag}`}
                  className="rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 px-5 py-2 text-sm font-semibold text-blue-400 transition-all hover:scale-105 hover:bg-blue-500/20"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* 标题 */}
          <h1 className="mb-8 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            {article.emoji && <span className="mr-4">{article.emoji}</span>}
            {article.title}
          </h1>

          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-8 text-sm text-slate-400">
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
      <article className="relative px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-16 shadow-2xl">
            {/* 顶部装饰条 */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl" />

            <div
              className="prose prose-lg prose-invert prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: article.htmlContent || article.content }}
            />
          </div>
        </div>
      </article>

      {/* 文章底部 */}
      <footer className="relative px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-16 text-center backdrop-blur-xl">
            {/* 装饰背景 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

            {/* 内容 */}
            <div className="relative">
              <h2 className="mb-4 text-4xl font-black text-white">
                感谢阅读
              </h2>
              <p className="mb-10 text-lg text-slate-400">
                希望这篇文章对你有所帮助。继续探索更多 AI 技术内容吧！
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  返回首页
                </Link>
                <Link
                  href="/archive"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-10 py-4 text-base font-bold text-white backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/30"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  浏览归档
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
