"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface ArticleLayoutProps {
  title: string;
  date?: string;
  readingTime?: string;
  tags?: string[];
  contentHtml: string;
  headings?: Heading[];
}

export function ArticleLayout({
  title,
  date,
  readingTime,
  tags = [],
  contentHtml,
  headings = [],
}: ArticleLayoutProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowBackTop(scrollTop > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredHeadings = headings.filter((h) => h.level === 2 || h.level === 3);

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
        <div
          className="h-full bg-[var(--accent-color)] transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 flex gap-8">
        {/* TOC sidebar - desktop only */}
        {filteredHeadings.length > 0 && (
          <aside className="hidden md:block w-56 shrink-0">
            <nav className="sticky top-24">
              <h4 className="text-sm font-semibold mb-3 text-[var(--text-secondary)]">目录</h4>
              <ul className="space-y-1.5 text-sm">
                {filteredHeadings.map((h) => (
                  <li
                    key={h.id}
                    style={{ paddingLeft: `${(h.level - 2) * 12}px` }}
                  >
                    <button
                      onClick={() => scrollToHeading(h.id)}
                      className={`text-left w-full truncate transition-colors ${
                        activeId === h.id
                          ? "text-[var(--accent-color)] font-medium"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {h.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* Main content */}
        <article className="flex-1 min-w-0">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
              {date && <time>{formatDate(date)}</time>}
              {readingTime && <span>{readingTime}</span>}
            </div>
            {tags.length > 0 && (
              <div className="flex gap-2 mt-3">
                {tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </header>

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Comment section */}
          <div id="waline" className="mt-16 pt-8 border-t border-[var(--border-color)]" />
        </article>
      </div>

      {/* Back to top */}
      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-10 h-10 rounded-full bg-[var(--background-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shadow-md"
          aria-label="回到顶部"
        >
          ↑
        </button>
      )}
    </>
  );
}
