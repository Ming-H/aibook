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
          ? 'bg-[var(--background-primary)]/90 backdrop-blur-md border-b-2 border-[var(--border-subtle)]'
          : 'bg-transparent border-b-2 border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo - 边框样式 */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border-2 border-[var(--border-default)] transition-all duration-300 group-hover:border-[var(--border-medium)] group-hover:-translate-y-0.5">
            <img
              src="/avatar.png"
              alt="极客狐DevFox"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[var(--text-primary)] transition-colors font-mono">
              极客狐 DevFox
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
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
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 font-mono ${
                  active
                    ? 'text-[var(--text-primary)] border-b-2 border-[var(--border-medium)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-tertiary)]'
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
            className="md:hidden p-2 rounded-md hover:bg-[var(--background-tertiary)] transition-colors border border-[var(--border-subtle)]"
            onClick={() => {
              console.log('Mobile menu toggle');
            }}
          >
            <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
