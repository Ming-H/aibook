import "./globals.css";
import type { ReactNode } from "react";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "AI Book 一站式机器学习平台",
  description: "面向不会编程学生的可视化机器学习建模与数据分析平台",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">{children}</main>
            <footer className="border-t border-slate-800/50 bg-slate-950/80 py-8">
              <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-400 md:px-6">
                <p>AI Book © 2024 · 一站式机器学习建模与分析平台</p>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
