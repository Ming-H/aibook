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
      {/* Header */}
      <div className="border-b-2 border-[var(--border-subtle)]">
        <div className="px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center justify-between">
            <Link
              href="/daily"
              className="inline-flex items-center gap-2 text-sm font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回今日热点
            </Link>
            <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-muted)]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {entry.date}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Title */}
          <header className="mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight font-mono mb-8">
              {entry.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm font-mono text-[var(--text-muted)]">
              <span>每日简报</span>
              <span>·</span>
              <span>{entry.date}</span>
            </div>
          </header>

          {/* Content */}
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
