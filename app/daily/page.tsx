import { getAllDailyEntries, getLatestDailyEntry } from "@/lib/daily-loader";
import { parseMarkdown } from "@/lib/markdown-parser";
import Link from "next/link";

// 强制动态渲染，禁用所有缓存
export const dynamic = "force-dynamic";
export const revalidate = 0;

// 格式化日期显示
function formatDate(dateStr: string): string {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const date = new Date(`${year}-${month}-${day}`);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };

  return date.toLocaleDateString('zh-CN', options);
}

// 提取内容摘要
function extractExcerpt(content: string, maxLength = 200): string {
  let clean = content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^[-*+]\s/gm, '')
    .replace(/^\d+\.\s/gm, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (clean.length > maxLength) {
    return clean.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
  }
  return clean;
}

// 提取关键指标
function extractMetrics(content: string): { count?: number, categories?: string[] } {
  const countMatch = content.match(/本期精选\s*(\d+)\s*个/);
  const count = countMatch ? parseInt(countMatch[1]) : undefined;

  const categories: string[] = [];
  if (content.includes('📈')) categories.push('行业动态');
  if (content.includes('🎓')) categories.push('学术突破');
  if (content.includes('🔬')) categories.push('技术创新');
  if (content.includes('🛠️')) categories.push('AI工具');
  if (content.includes('💡')) categories.push('核心洞察');
  if (content.includes('📰')) categories.push('深度观察');

  return { count, categories: categories.slice(0, 4) };
}

export default async function DailyPage() {
  const entries = await getAllDailyEntries();
  const latestEntry = await getLatestDailyEntry();
  const latestExcerpt = latestEntry ? extractExcerpt(latestEntry.content, 180) : '';

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)]">
        <div className="px-6 py-6">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] font-mono tracking-tight">
              今日 AI 热点
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Latest Entry */}
          {latestEntry && (
            <Link href={`/daily/${latestEntry.date}`} className="block group">
              <div className="card p-8 md:p-10 mb-16">
                <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-muted)] mb-6">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(latestEntry.date)}
                </div>
                <h2 className="text-2xl md:text-4xl font-semibold text-[var(--text-primary)] mb-6 font-mono leading-tight group-hover:text-[var(--border-medium)] transition-colors">
                  {latestEntry.title}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-lg">
                  {latestExcerpt}
                </p>
                <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-primary)] group-hover:gap-3 transition-all">
                  <span>阅读完整内容</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          )}

          {/* Historical Entries */}
          {entries.length > 1 && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] font-mono">
                  历史归档
                </h2>
                {entries.length > 4 && (
                  <span className="text-sm font-mono text-[var(--text-muted)]">
                    共 {entries.length - 1} 期
                  </span>
                )}
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {entries.slice(1).map((entry) => {
                  const metrics = extractMetrics(entry.content);
                  const excerpt = extractExcerpt(entry.content, 120);

                  return (
                    <Link
                      key={entry.date}
                      href={`/daily/${entry.date}`}
                      className="card-interactive card p-6 group"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-4">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {entry.date.slice(0, 4)}-{entry.date.slice(4, 6)}-{entry.date.slice(6, 8)}
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 font-mono group-hover:text-[var(--border-medium)] transition-colors leading-snug">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-5">
                        {excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        {metrics.count && (
                          <span className="text-xs font-mono text-[var(--text-muted)]">
                            {metrics.count} 条动态
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-sm font-mono text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
