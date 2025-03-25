import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AuthProvider } from '../lib/context/AuthContext'
// import { Toaster } from 'sonner'
import Navbar from '../components/Navbar'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AIBook Studio',
    description: '创建、协作和发布您的AI驱动内容',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN" className="scroll-smooth">
            <body className={`${inter.className} bg-gray-100 min-h-screen flex flex-col`}>
                <AuthProvider>
                    <Navbar />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                    {/* 暂时注释掉 Toaster */}
                    {/* <Toaster /> */}
                </AuthProvider>
            </body>
        </html>
    )
} 