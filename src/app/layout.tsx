import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Tools Hub - 一站式AI工具解决方案",
  description:
    "提供文本、图像、视频、音频处理的AI工具集合，提高工作效率，释放创造力",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning data-oid="dg-xgu7">
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen`}
        data-oid="3kgxio4"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          data-oid="9g4fa:_"
        >
          <div className="min-h-screen flex flex-col" data-oid="nkvnk.a">
            {/* 导航栏 - 只保留一个导航组件 */}
            <Navbar data-oid="_j.bs21" />

            {/* 主内容区域 */}
            <main className="flex-grow" data-oid="mg:5_b8">
              {children}
            </main>

            {/* 页脚 */}
            <Footer data-oid="pwls2dt" />
          </div>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
