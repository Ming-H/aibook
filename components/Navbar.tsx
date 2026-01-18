'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: '/', label: '首页', icon: '🏠' },
    { href: '/projects', label: '作品', icon: '💼' },
    { href: '/blog', label: '博客', icon: '📝' },
    { href: '/products', label: '产品', icon: '🚀' },
    { href: '/about', label: '关于', icon: '👤' },
    { href: '/contact', label: '联系', icon: '📧' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-[var(--background-primary)]/80 backdrop-blur-md border-b border-gray-200 dark:border-[var(--border-subtle)] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-indigo-600 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5">
            <span className="text-2xl">🦊</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-[var(--text-primary)] transition-colors">
              极客狐 DevFox
            </span>
            <span className="text-xs text-gray-500 dark:text-[var(--text-muted)]">
              AI 工程师 & 独立开发者
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30'
                    : 'text-gray-600 dark:text-[var(--text-secondary)] hover:text-gray-900 dark:hover:text-[var(--text-primary)] hover:bg-gray-100 dark:hover:bg-[var(--background-tertiary)]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[var(--background-tertiary)] transition-colors"
            onClick={() => {
              console.log('Mobile menu toggle');
            }}
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
