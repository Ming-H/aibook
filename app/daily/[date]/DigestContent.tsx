'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DigestContentProps {
  html: string;
  title: string;
}

export function DigestContent({ html, title }: DigestContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    // 提取所有 h2 和 h3 标题用于目录
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');

    const extractedHeadings = Array.from(headingElements).map((heading) => ({
      id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }));

    setHeadings(extractedHeadings);
  }, [html]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = (window.scrollY / documentHeight) * 100;
      setScrollProgress(scrolled);

      // 检测当前可见的标题
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.getBoundingClientRect().top <= 150) {
          setActiveHeading(element.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* 阅读进度条 */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[var(--background-tertiary)]">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-purple)] to-[var(--color-pink)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 桌面端目录导航 */}
      {headings.length > 3 && (
        <nav className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 w-56 z-40">
          <div className="glass-card rounded-2xl border border-[var(--border-subtle)] p-4 shadow-xl">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">目录导航</h3>
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`text-left text-sm transition-all duration-200 hover:text-[var(--color-brand)] ${
                      heading.level === 3 ? 'pl-4' : 'pl-0'
                    } ${
                      activeHeading === heading.id
                        ? 'text-[var(--color-brand)] font-semibold'
                        : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* 回到顶部按钮 */}
      {scrollProgress > 20 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[var(--gradient-primary)] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="回到顶部"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
}
