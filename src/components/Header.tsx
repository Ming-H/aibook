"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      (!localStorage.getItem("darkMode") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <header className="bg-black fixed w-full z-10 top-0" data-oid="atpxv_b">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        data-oid="ldyg0.h"
      >
        <div
          className="flex items-center justify-between h-16"
          data-oid="92brpot"
        >
          <div className="flex items-center" data-oid="sk-445s">
            <Link href="/" className="flex items-center" data-oid="aka5:4i">
              {/* 使用渐变文本而不是图像，避免图像加载问题 */}
              <span
                className="text-purple-500 font-bold text-2xl mr-1"
                data-oid="7iq7pls"
              >
                AI
              </span>
              <span
                className="text-blue-400 font-bold text-2xl"
                data-oid="z8w0pm5"
              >
                Tools Hub
              </span>
            </Link>
          </div>

          <div className="hidden md:block" data-oid="q_do2wg">
            <div
              className="ml-10 flex items-center space-x-6"
              data-oid="e4r1:ay"
            >
              <Link
                href="/"
                className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
                data-oid="m8z0.n0"
              >
                首页
              </Link>
              <Link
                href="/tools"
                className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
                data-oid="1pql_km"
              >
                工具导航
              </Link>
              <Link
                href="/news"
                className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
                data-oid="tbvw-_g"
              >
                新闻资讯
              </Link>
              <Link
                href="/community"
                className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
                data-oid="8-7j9ab"
              >
                社区
              </Link>
              <Link
                href="/pricing"
                className="text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
                data-oid="h4o:2f0"
              >
                价格
              </Link>
            </div>
          </div>

          <div className="flex items-center" data-oid="6rvf0.f">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle dark mode"
              data-oid="qu7enpb"
            >
              {mounted &&
                (darkMode ? (
                  <Sun size={20} data-oid="pi5:ni5" />
                ) : (
                  <Moon size={20} data-oid="yc8e8qr" />
                ))}
            </button>

            <Link
              href="/login"
              className="ml-4 text-white hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium"
              data-oid="1o9n7xm"
            >
              登录
            </Link>

            <Link
              href="/signup"
              className="ml-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              data-oid="b5jyt3w"
            >
              注册
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
