"use client"

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // 等待客户端挂载完成
    useEffect(() => {
        setMounted(true)
    }, [])

    // 在挂载完成前不渲染主题切换按钮
    if (!mounted) {
        return null
    }

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                            AIBook
                        </Link>
                    </div>

                    <div className="flex items-center space-x-8">
                        <Link
                            href="/deep-learning"
                            className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
                        >
                            深度学习
                        </Link>
                        <Link
                            href="/large-language-model"
                            className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
                        >
                            大语言模型
                        </Link>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
} 