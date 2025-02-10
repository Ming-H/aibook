import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import ChatAssistant from "@/components/chat-assistant"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aibook.website'),
  title: {
    default: 'AIBook - AI教程网站',
    template: '%s - AIBook'
  },
  description: '专业的深度学习与大语言模型教程',
  keywords: ['AI', '深度学习', '大语言模型', '教程', '人工智能'],
  authors: [{ name: 'AIBook Team' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.aibook.website',
    title: 'AIBook - AI教程网站',
    description: '专业的深度学习与大语言模型教程',
    siteName: 'AIBook'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIBook - AI教程网站',
    description: '专业的深度学习与大语言模型教程'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#fafafa] dark:bg-gray-950`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <ChatAssistant />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
