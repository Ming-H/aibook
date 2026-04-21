import "./globals.css";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans-display",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "DevFox AI — AI Agent 产品与自动化系统工作室",
  description: "DevFox AI 帮助团队设计、开发并上线真正可用的 AI Agent、自动化工作流与智能产品体验。",
  metadataBase: new URL("https://devfox.ai"),
  openGraph: {
    title: "DevFox AI — AI Agent 产品与自动化系统工作室",
    description: "DevFox AI 帮助团队设计、开发并上线真正可用的 AI Agent、自动化工作流与智能产品体验。",
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
      className={`${spaceGrotesk.variable} ${plexMono.variable} scroll-smooth`}
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
