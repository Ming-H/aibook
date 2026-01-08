import "./globals.css";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "AI Hot Tech - 每日 AI 技术热点",
  description: "探索最新的 AI 技术热点，深入了解前沿人工智能技术",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <div className="min-h-screen">
          <Navbar />
          <main>{children}</main>
          <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-6 py-12">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span>© 2025 AI Hot Tech</span>
                  <span>·</span>
                  <span>每日 AI 技术热点</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                  <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    关于
                  </a>
                  <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    联系
                  </a>
                  <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    RSS
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
