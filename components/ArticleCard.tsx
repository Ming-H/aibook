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
    <Link href={href} className="block group">
      <article className="p-5 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors">
        <h3 className="text-lg font-semibold group-hover:text-[var(--accent-color)] transition-colors mb-2">
          {title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)] mb-3">
          <time>{formatDate(date)}</time>
          {readingTime && <span>· {readingTime}</span>}
        </div>
        <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-3">{excerpt}</p>
        {tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[var(--background-tertiary)] text-[var(--text-secondary)]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
