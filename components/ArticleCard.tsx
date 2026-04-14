import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  date: string;
  excerpt: string;
  readingTime?: string;
  tags?: string[];
  href: string;
}

export function ArticleCard({ title, date, excerpt, readingTime, tags = [], href }: ArticleCardProps) {
  return (
    <Link href={href} className="block py-5 border-b border-[var(--border-subtle)] group">
      <h3 className="text-base text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors mb-1.5">
        {title}
      </h3>
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-2">
        <time>{formatDate(date)}</time>
        {readingTime && (
          <>
            <span className="text-[var(--border-medium)]">·</span>
            <span>{readingTime}</span>
          </>
        )}
      </div>
      {excerpt && (
        <p className="text-sm text-[var(--text-tertiary)] line-clamp-2">{excerpt}</p>
      )}
    </Link>
  );
}
