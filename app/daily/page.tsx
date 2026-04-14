import Link from "next/link";
import { listDailyDates, getDailyEntry } from "@/lib/daily-loader";

export const revalidate = 3600;

export const metadata = {
  title: "AI 日报 — DevFox AI",
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
    weekday: "short",
  });
}

function formatShortDate(dateStr: string): string {
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
}

function getMonthKey(dateStr: string): string {
  const d = new Date(`${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`);
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}

function extractExcerpt(content: string, maxLen = 120): string {
  // Extract from the first blockquote or first paragraph after title
  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith(">") && !trimmed.startsWith("> 💡") && !trimmed.startsWith("> **")) {
      const text = trimmed.replace(/^>\s*/, "").replace(/\*\*/g, "").trim();
      if (text.length > 10) return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
    }
    if (trimmed.startsWith("## 💡") || trimmed.startsWith("## ")) continue;
    if (trimmed.startsWith("- ") && trimmed.length > 20) {
      const text = trimmed.replace(/^- /, "").replace(/\*\*/g, "").trim();
      if (text.length > 10) return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
    }
  }
  return "";
}

function groupByMonth(dates: string[]): Map<string, string[]> {
  const groups = new Map<string, string[]>();
  for (const d of dates) {
    const key = getMonthKey(d);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(d);
  }
  return groups;
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

  const olderDates = dates.slice(1);
  const monthGroups = groupByMonth(olderDates);

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">AI 日报</h1>
        <p className="text-[var(--text-secondary)]">每日 AI 行业动态速览，精选全球 AI 前沿资讯</p>
      </header>

      {/* Latest - Featured */}
      {latestEntry && (
        <Link href={`/daily/${latestEntry.date}`} className="block group mb-12">
          <article className="p-6 rounded-lg border-2 border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs tracking-wide uppercase text-[var(--accent-color)] font-medium">最新</span>
              <time className="text-sm text-[var(--text-tertiary)]">{formatDate(latestEntry.date)}</time>
            </div>
            <h2 className="text-xl font-bold group-hover:text-[var(--accent-color)] transition-colors mb-3">
              {latestEntry.title}
            </h2>
            {latestEntry.content && (
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {extractExcerpt(latestEntry.content)}
              </p>
            )}
          </article>
        </Link>
      )}

      {/* Archive by Month */}
      {olderDates.length > 0 ? (
        <div className="space-y-8">
          {Array.from(monthGroups.entries()).map(([month, monthDates]) => (
            <div key={month}>
              <h2 className="text-sm font-medium text-[var(--text-muted)] tracking-wide mb-4">{month}</h2>
              <div className="space-y-2">
                {monthDates.map((date) => (
                  <Link key={date} href={`/daily/${date}`} className="block group">
                    <div className="py-3 px-4 rounded-lg hover:bg-[var(--background-secondary)] transition-colors flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <time className="text-sm text-[var(--text-tertiary)] tabular-nums w-24">
                          {formatShortDate(date)}
                        </time>
                        <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                          AI Daily
                        </span>
                      </div>
                      <span className="text-[var(--text-muted)] text-sm group-hover:text-[var(--text-tertiary)] transition-colors">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : dates.length === 0 ? (
        <p className="text-[var(--text-secondary)]">暂无日报数据。</p>
      ) : null}
    </div>
  );
}
