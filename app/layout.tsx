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
  title: "极客狐 DevFox — AI 技术 · 工具 · 投资",
  description: "极客狐 DevFox 的个人知识网站，分享 AI 技术文章、开源工具和投资理财思考。",
  metadataBase: new URL("https://devfox.ai"),
  openGraph: {
    title: "极客狐 DevFox",
    description: "AI 技术 · 工具 · 投资",
    url: "https://devfox.ai",
    siteName: "极客狐 DevFox",
    locale: "zh_CN",
    type: "website",
  },
  rss: "/rss.xml",
};

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
