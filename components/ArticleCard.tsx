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
    <Link href={href} className="block py-4 border-b border-[var(--border-subtle)] group">
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <h3 className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
          {title}
        </h3>
        <time className="text-xs text-[var(--text-muted)] whitespace-nowrap flex-shrink-0">
          {formatDate(date)}
        </time>
      </div>
      {excerpt && (
        <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-1">{excerpt}</p>
      )}
    </Link>
  );
}
