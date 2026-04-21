'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/services', label: '服务' },
  { href: '/cases', label: '案例' },
  { href: '/about', label: '关于' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => href === '/' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto max-w-nav rounded-full border transition-all duration-300 ${
          scrolled
            ? 'border-[var(--border-medium)] bg-[var(--background-elevated)]/88 shadow-[var(--shadow-lg)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="flex h-[72px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative overflow-hidden rounded-full border border-[var(--border-default)]">
              <Image src="/avatar.png" alt="DevFox AI" width={38} height={38} priority />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                DevFox AI
              </div>
              <div className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                Productized agents
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    active
                      ? 'bg-[var(--background-secondary)] text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="ml-2">
              <ThemeToggle />
            </div>
            <Link href="/contact" className="btn-primary ml-3 rounded-full px-5 py-2.5 text-sm font-semibold">
              联系合作
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((value) => !value)}
              className="rounded-full border border-[var(--border-default)] p-2 text-[var(--text-secondary)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-[var(--border-subtle)] px-4 pb-4 pt-2 md:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      active
                        ? 'bg-[var(--background-secondary)] text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/contact" className="btn-primary mt-2 rounded-2xl px-5 py-3 text-sm font-semibold">
                联系合作
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
