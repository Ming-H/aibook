import { getAllDailyEntries, getDailyEntry } from "@/lib/daily-loader";
import { parseMarkdown } from "@/lib/markdown-parser";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { DigestContent } from "./DigestContent";

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
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* 返回按钮 */}
      <div className="px-6 pt-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/daily"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回今日热点
          </Link>
        </div>
      </div>

      {/* 内容区域 */}
      <article className="px-6 pt-12 pb-24">
        <div className="mx-auto max-w-4xl">
          {/* 标题 */}
          <header className="mb-12">
            <div className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {entry.date}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
              {entry.title}
            </h1>
          </header>

          {/* Markdown 内容 */}
          <div className="prose-digest">
            <DigestContent html={parsed.html || entry.content} title={entry.title} />
            <div
              dangerouslySetInnerHTML={{ __html: parsed.html || entry.content }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
