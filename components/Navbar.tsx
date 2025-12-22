"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/AuthProvider";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 via-purple-500 to-cyan-400 shadow-lg shadow-blue-500/40">
            <span className="text-lg font-bold text-white">AB</span>
          </div>
          <div>
            <div className="text-base font-bold tracking-wide text-slate-100">AI Book</div>
            <div className="text-xs text-slate-400">一站式机器学习平台</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-slate-100"
          >
            创建实验
          </Link>
          <Link
            href="/experiments"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-slate-100"
          >
            实验历史
          </Link>
          <Link
            href="/models"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-slate-100"
          >
            模型管理
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {user && (
                <span className="hidden text-sm text-slate-400 md:inline">
                  {user.email}
                </span>
              )}
              <Button variant="outline" size="sm" onClick={logout}>
                登出
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  登录
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">注册</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

