"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { TipJar } from "./TipJar";

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
          if (entry.isIntersecting) setActiveId(entry.target.id);
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

  const filteredHeadings = headings.filter((h) => h.level === 2 || h.level === 3);

  return (
    <>
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[1px]">
        <div
          className="h-full bg-[var(--text-muted)] transition-[width] duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 py-10 md:py-16 flex gap-10">
        {/* TOC - desktop */}
        {filteredHeadings.length > 0 && (
          <aside className="hidden lg:block w-48 shrink-0">
            <nav className="sticky top-20">
              <p className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-3">目录</p>
              <ul className="space-y-1">
                {filteredHeadings.map((h) => (
                  <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 10}px` }}>
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`block text-xs truncate py-0.5 transition-colors ${
                        activeId === h.id
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-muted)] hover:text-[var(--text-tertiary)]"
                      }`}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* Content */}
        <article className="flex-1 min-w-0 max-w-[680px]">
          <header className="mb-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight leading-tight">{title}</h1>
            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
              {date && <time>{formatDate(date)}</time>}
              {readingTime && (
                <>
                  <span className="text-[var(--border-medium)]">·</span>
                  <span>{readingTime}</span>
                </>
              )}
            </div>
            {tags.length > 0 && (
              <div className="flex gap-1.5 mt-3">
                {tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </header>

          <div className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {/* Tip Jar */}
          <TipJar />

          {/* AdSense placeholder */}
          {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
            <div className="mt-8 border-t border-[var(--border-default)] pt-6">
              <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          )}

          {/* Comments */}
          <div id="waline" className="mt-12 pt-8 border-t border-[var(--border-default)]" />
        </article>
      </div>

      {/* Back to top */}
      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-8 h-8 rounded-full bg-[var(--background-secondary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors text-xs"
          aria-label="回到顶部"
        >
          ↑
        </button>
      )}
    </>
  );
}
