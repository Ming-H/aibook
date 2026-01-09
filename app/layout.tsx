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
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="min-h-screen">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
