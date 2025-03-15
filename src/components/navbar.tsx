"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navigation = [
  { name: "首页", href: "/" },
  { name: "工具导航", href: "/tools" },
  { name: "新闻资讯", href: "/news" },
  { name: "社区", href: "/community" },
  { name: "价格", href: "/pricing" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // 在组件挂载后才渲染主题切换按钮，避免水合错误
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
      data-oid="gjdwm2b"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        data-oid="ws-hbjm"
      >
        <div
          className="flex items-center justify-between h-16"
          data-oid="b--gy4z"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center" data-oid="qs1:2:2">
            <div
              className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"
              data-oid="oa845c."
            >
              <span
                className="text-transparent font-extrabold text-2xl tracking-tight"
                data-oid="27lazuk"
              >
                AI
              </span>
              <span
                className="text-transparent font-bold text-2xl tracking-tight"
                data-oid="trtuiby"
              >
                Tools Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-1"
            data-oid="3hj2vao"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                  pathname === item.href
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
                data-oid="-gfknpt"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div
            className="hidden md:flex items-center space-x-3"
            data-oid="u8.ud:p"
          >
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-label="Toggle dark mode"
                suppressHydrationWarning
                data-oid="vzs-bq:"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={20} data-oid="k_blc37" />
                ) : (
                  <Moon size={20} data-oid="yoir3b7" />
                )}
              </button>
            )}
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              data-oid="b-re0_v"
            >
              登录
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full transition-colors shadow-md hover:shadow-lg"
              data-oid="gexcn5d"
            >
              注册
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden" data-oid="5n3iddn">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 mr-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-label="Toggle dark mode"
                suppressHydrationWarning
                data-oid="7zr6.a9"
              >
                {resolvedTheme === "dark" ? (
                  <Sun size={18} data-oid="gr0:usu" />
                ) : (
                  <Moon size={18} data-oid="7:7ittj" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              data-oid="qy-b4j2"
            >
              {isOpen ? (
                <X className="h-6 w-6" data-oid=".9wxcmz" />
              ) : (
                <Menu className="h-6 w-6" data-oid="k.zs:o-" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" data-oid="ghtiy2l">
          <div
            className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg"
            data-oid="4kv_nsy"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={() => setIsOpen(false)}
                data-oid="up7aa8l"
              >
                {item.name}
              </Link>
            ))}
            <div
              className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700"
              data-oid="d6p8q-r"
            >
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
                data-oid="o1j0hj9"
              >
                登录
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-2"
                onClick={() => setIsOpen(false)}
                data-oid="5.-y-u6"
              >
                注册
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
