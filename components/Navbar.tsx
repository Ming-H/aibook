'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--background-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-nav items-center justify-between px-5 sm:px-8 h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[15px] font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--color-accent-text)] transition-colors"
        >
          <Image
            src="/avatar.png"
            alt="DevFox AI"
            width={32}
            height={32}
            className="rounded-full"
            priority
          />
          <span>DevFox AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                  active
                    ? 'text-[var(--text-primary)] bg-[var(--background-secondary)]'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--background-secondary)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="ml-1.5 pl-2 border-l border-[var(--border-subtle)]">
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
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--background-primary)]/95 backdrop-blur-xl pb-4">
          <nav className="flex flex-col px-5 pt-3 gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'text-[var(--text-primary)] bg-[var(--background-secondary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
