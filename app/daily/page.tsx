import Link from "next/link";
import { listDailyDates, getDailyEntry } from "@/lib/daily-loader";
import { parseMarkdown } from "@/lib/markdown-parser";

export const revalidate = 3600;

export const metadata = {
  title: "AI 日报 — 极客狐 DevFox",
  description: "每日 AI 行业动态速览，涵盖学术突破、技术创新、产品发布等前沿资讯。",
};

function formatDate(dateStr: string): string {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  return new Date(`${year}-${month}-${day}`).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function extractExcerpt(content: string, maxLen = 160): string {
  const clean = content
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
  return clean.length > maxLen ? clean.slice(0, maxLen) + "..." : clean;
}

export default async function DailyPage() {
  let dates: string[] = [];
  let latestEntry: Awaited<ReturnType<typeof getDailyEntry>> = null;

  try {
    dates = await listDailyDates();
    if (dates.length > 0) {
      latestEntry = await getDailyEntry(dates[0]);
    }
  } catch {
    // GitHub credentials may not be available during build
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">AI 日报</h1>
        <p className="text-[var(--text-secondary)]">每日 AI 行业动态速览</p>
      </header>

      {/* Latest */}
      {latestEntry && (
        <Link href={`/daily/${latestEntry.date}`} className="block group mb-8">
          <article className="p-6 rounded-lg border-2 border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors">
            <div className="text-sm text-[var(--text-secondary)] mb-2">
              {formatDate(latestEntry.date)}
            </div>
            <h2 className="text-xl font-bold group-hover:text-[var(--accent-color)] transition-colors mb-3">
              {latestEntry.title}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm line-clamp-3">
              {extractExcerpt(latestEntry.content)}
            </p>
          </article>
        </Link>
      )}

      {/* Archive */}
      {dates.length > 1 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">历史归档</h2>
          <div className="space-y-3">
            {dates.slice(1).map((date) => (
              <Link key={date} href={`/daily/${date}`} className="block group">
                <div className="p-4 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors flex items-center justify-between">
                  <div>
                    <div className="font-medium group-hover:text-[var(--accent-color)] transition-colors">
                      AI Daily · {date.slice(0, 4)}-{date.slice(4, 6)}-{date.slice(6, 8)}
                    </div>
                    <div className="text-sm text-[var(--text-secondary)] mt-1">
                      {formatDate(date)}
                    </div>
                  </div>
                  <span className="text-[var(--text-secondary)]">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : dates.length === 0 ? (
        <p className="text-[var(--text-secondary)]">暂无日报数据。</p>
      ) : null}
    </div>
  );
}
