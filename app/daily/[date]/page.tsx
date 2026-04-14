import { getDailyEntry, listDailyDates } from "@/lib/daily-loader";
import { parseMarkdown } from "@/lib/markdown-parser";
import { ArticleLayout } from "@/components/ArticleLayout";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ date: string }>;
}

export async function generateStaticParams() {
  try {
    const dates = await listDailyDates();
    return dates.map((date) => ({ date }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;
  let entry = null;
  try {
    entry = await getDailyEntry(date);
  } catch {}
  if (!entry) return { title: "未找到" };
  return {
    title: `${entry.title} — 极客狐 DevFox`,
    description: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)} AI 日报`,
  };
}

export default async function DailyDetailPage({ params }: PageProps) {
  const { date } = await params;
  let entry = null;
  try {
    entry = await getDailyEntry(date);
  } catch {}

  if (!entry) notFound();

  const parsed = await parseMarkdown(entry.content);

  return (
    <ArticleLayout
      title={entry.title}
      date={`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`}
      readingTime={`${parsed.readTime} min`}
      contentHtml={parsed.html}
      headings={parsed.headings}
    />
  );
}
