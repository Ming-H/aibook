'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { href: '/services', label: '服务' },
  { href: '/cases', label: '案例' },
  { href: '/about', label: '关于' },
  { href: '/contact', label: '联系' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-[var(--background-primary)]/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
      style={scrolled ? { boxShadow: '0px 0px 0px 1px var(--border-default)' } : undefined}
    >
      <div className="mx-auto flex max-w-nav items-center justify-between px-5 sm:px-8 h-14">
        {/* Logo */}
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-[var(--text-primary)] hover:text-[var(--color-accent-text)] transition-colors"
        >
          DevFox AI
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-[13px] font-medium rounded-lg transition-colors ${
                  active
                    ? 'text-[var(--text-primary)] bg-[var(--background-secondary)]'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* AI Insights external link */}
          <a
            href="https://ming-h.github.io/ai-insights/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-3 py-1.5 text-[13px] font-medium rounded-lg text-[var(--color-accent-text)] hover:bg-[var(--color-accent-soft)] transition-colors inline-flex items-center gap-1"
          >
            AI Insights
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>

          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border-default)] bg-[var(--background-primary)] pb-4">
          <nav className="flex flex-col px-5 pt-3 gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'text-[var(--text-primary)] bg-[var(--background-secondary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="https://ming-h.github.io/ai-insights/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm font-medium rounded-lg text-[var(--color-accent-text)] hover:bg-[var(--color-accent-soft)] transition-colors inline-flex items-center gap-1"
            >
              AI Insights
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
