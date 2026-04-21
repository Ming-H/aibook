import Link from "next/link";

interface BookCardProps {
  title: string;
  subtitle: string;
  keywords: string[];
  audience: string;
  readingTime: string;
  version: string;
  href: string;
}

export function BookCard({ title, subtitle, keywords, audience, readingTime, version, href }: BookCardProps) {
  return (
    <Link href={href} className="block py-5 border-b border-[var(--border-subtle)] group">
      <h3 className="text-[17px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors mb-1">
        {title}
      </h3>
      {subtitle && (
        <p className="text-[14px] text-[var(--text-tertiary)] mb-2 line-clamp-1">{subtitle}</p>
      )}
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-2">
        {version && <span>{version}</span>}
        {version && <span className="text-[var(--border-medium)]">·</span>}
        <span>{readingTime}</span>
      </div>
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {keywords.slice(0, 5).map((kw) => (
            <span
              key={kw}
              className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--background-secondary)] text-[var(--text-muted)]"
            >
              {kw}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
