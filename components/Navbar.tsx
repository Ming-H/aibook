'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 检测滚动状态
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 判断链接是否处于活动状态
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: '/', label: '首页', icon: '🏠' },
    { href: '/daily', label: '今日热点', icon: '🔥' },
    { href: '/series', label: 'LLM系列', icon: '📚' },
    { href: '/quiz-generator', label: '智能出题', icon: '✨' },
    { href: '/creative-workshop', label: '创意工坊', icon: '🎨' },
    { href: '/archive', label: '归档', icon: '📁' },
  ];

  return (
    <header
      className={`sticky top-0 z-[var(--z-sticky)] w-full transition-all duration-500 ${
        scrolled
          ? 'glass-strong border-b border-[var(--border-subtle)] shadow-lg'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo - 带发光效果 */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-3d-xl"
            style={{
              background: 'var(--gradient-primary)',
              animation: 'pulseGlow 3s ease-in-out infinite'
            }}
          >
            <span className="text-3xl">🤖</span>
            {/* 悬停时的粒子效果 */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white animate-float"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <span
              className="text-xl font-black tracking-tight text-[var(--text-primary)] transition-all duration-300 group-hover:text-[var(--color-brand)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AI Hot Tech
            </span>
            <span className="text-xs text-[var(--text-muted)] tracking-widest uppercase">
              每日 AI 技术热点
            </span>
          </div>
        </Link>

        {/* 导航链接 - 智能悬停效果 */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item, index) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative group px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                  active
                    ? 'text-white shadow-2xl'
                    : 'text-[var(--text-secondary)] hover:text-white'
                }`}
                style={{
                  fontFamily: 'var(--font-body)',
                  background: active ? 'var(--gradient-primary)' : 'transparent',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* 智能指示器 */}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-base transition-transform duration-300 group-hover:scale-125">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </span>

                {/* 悬停光晕效果 */}
                {!active && hoveredIndex === index && (
                  <div className="absolute inset-0 rounded-xl opacity-20"
                    style={{
                      background: 'var(--gradient-primary)',
                      animation: 'pulseSubtle 2s ease-in-out infinite'
                    }}
                  />
                )}

                {/* 活动状态发光效果 */}
                {active && (
                  <>
                    <div className="absolute -inset-1 rounded-xl opacity-50 blur-lg"
                      style={{
                        background: 'var(--gradient-primary)',
                        animation: 'pulseSubtle 3s ease-in-out infinite'
                      }}
                    />
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 右侧操作区 */}
        <div className="flex items-center gap-4">
          {/* 状态指示器 */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full glass-card">
            <div className="relative">
              <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon-green)] opacity-20" />
              <div className="relative inline-flex h-2 w-2 rounded-full bg-[var(--neon-green)] animate-pulse" />
            </div>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              系统在线
            </span>
          </div>

          {/* 移动端菜单按钮 - 霓虹效果 */}
          <button
            className="md:hidden relative inline-flex items-center justify-center rounded-xl p-3 transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              background: 'var(--background-secondary)',
              border: '1px solid var(--border-default)'
            }}
            onClick={() => {
              // 这里可以添加移动端菜单逻辑
              console.log('Mobile menu toggle');
            }}
          >
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-6 rounded-full bg-[var(--text-primary)] transition-all duration-300" />
              <span className="block h-0.5 w-6 rounded-full bg-[var(--text-primary)] transition-all duration-300" />
              <span className="block h-0.5 w-4 rounded-full bg-[var(--text-primary)] transition-all duration-300" />
            </div>
          </button>
        </div>
      </div>

      {/* 底部光晕装饰 - 仅在滚动时显示 */}
      {scrolled && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px opacity-50"
          style={{
            background: 'var(--gradient-primary)',
            filter: 'blur(1px)'
          }}
        />
      )}
    </header>
  );
}
