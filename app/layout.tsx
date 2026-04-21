import "./globals.css";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "DevFox AI — 用 AI 重新定义业务效率",
  description: "专注 AI 落地应用和 Agent 系统开发。帮助企业设计、开发和部署 AI 应用与 Agent 系统。",
  metadataBase: new URL("https://devfox.ai"),
  openGraph: {
    title: "DevFox AI — 用 AI 重新定义业务效率",
    description: "专注 AI 落地应用和 Agent 系统开发。帮助企业设计、开发和部署 AI 应用与 Agent 系统。",
    url: "https://devfox.ai",
    siteName: "DevFox AI",
    locale: "zh_CN",
    type: "website",
  },
};

const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  })();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${jetbrains.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)] antialiased font-sans">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
