import "./globals.css";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { SessionProvider } from "@/components/providers";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: "极客狐 DevFox - AI 工程师 & 独立开发者",
  description: "分享 AI 技术见解、独立开发经验和实用工具",
};

// 防止主题闪烁的内联脚本
const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') || 'system';
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)] antialiased">
        <ThemeProvider>
          <SessionProvider>
            <div className="min-h-screen">
              <Navbar />
              <main>{children}</main>
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
