'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: '/', label: '首页' },
    { href: '/products', label: 'AI 产品' },
    { href: '/projects', label: '作品集' },
    { href: '/blog', label: '博客' },
    { href: '/about', label: '关于' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? 'bg-[var(--background-floating)] backdrop-blur-xl border-b border-[var(--border-subtle)]'
          : 'bg-transparent border-b border-transparent'
        }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-9 w-9 overflow-hidden rounded-lg bg-[var(--background-tertiary)]">
            <img
              src="/avatar.png"
              alt="DevFox"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-[17px] font-semibold tracking-tight text-[var(--text-primary)]">
            DevFox AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-[15px] font-medium rounded-lg transition-colors duration-200 ${active
                    ? 'text-[var(--text-primary)] bg-[var(--background-tertiary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-tertiary)]'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden p-2.5 rounded-lg hover:bg-[var(--background-tertiary)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="菜单"
          >
            <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--background-primary)] px-5 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-[17px] font-medium ${isActive(item.href)
                    ? 'text-[var(--text-primary)] bg-[var(--background-tertiary)]'
                    : 'text-[var(--text-secondary)]'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
