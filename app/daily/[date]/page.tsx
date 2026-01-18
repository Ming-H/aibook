import { getAllDailyEntries, getDailyEntry } from "@/lib/daily-loader";
import { parseMarkdown } from "@/lib/markdown-parser";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

// 临时改为 SSR 以加快构建速度
export const dynamic = "force-dynamic";

// 暂时禁用 generateStaticParams 以加快构建
// export async function generateStaticParams() {
//   const entries = await getAllDailyEntries();
//   return entries.map((entry) => ({
//     date: entry.date,
//   }));
// }

export async function generateMetadata({ params }: { params: { date: string } }): Promise<Metadata> {
  const entry = await getDailyEntry(params.date);

  if (!entry) {
    return {
      title: "内容不存在",
    };
  }

  return {
    title: `${entry.title} - AI Hot Tech`,
    description: `AI 每日热点 - ${entry.date}`,
  };
}

export default async function DailyDetailPage({ params }: { params: { date: string } }) {
  const entry = await getDailyEntry(params.date);

  if (!entry) {
    notFound();
  }

  const parsed = await parseMarkdown(entry.content);

  return (
    <div className="min-h-screen bg-[var(--background-primary)] bg-noise">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            animationDelay: '1.5s',
            filter: 'blur(80px)'
          }}
        />
      </div>

      {/* 返回按钮 */}
      <div className="relative px-6 pt-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/daily"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-all hover:text-[var(--text-primary)] rounded-xl px-4 py-2 hover:bg-[var(--background-secondary)]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回今日热点
          </Link>
        </div>
      </div>

      {/* 内容区域 */}
      <article className="relative px-6 pt-12 pb-24">
        <div className="mx-auto max-w-5xl">
          {/* 标题 */}
          <header className="mb-12">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-[var(--gradient-primary)] px-6 py-2 text-sm font-bold text-white shadow-lg">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {entry.date}
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              {entry.title}
            </h1>
          </header>

          {/* Markdown 内容 */}
          <div className="relative rounded-3xl border border-[var(--border-default)] bg-[var(--background-secondary)] backdrop-blur-xl p-8 md:p-16 shadow-2xl">
            {/* 顶部装饰条 */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-purple)] to-[var(--color-pink)] rounded-t-3xl" />

            <div
              className="prose prose-lg prose-invert prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: parsed.html || entry.content }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
