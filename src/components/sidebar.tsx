"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { deepLearningMenu, llmMenu, aiModelsMenu } from "@/docs/config"
import { useEffect, useState } from "react"

export function Sidebar() {
    const pathname = usePathname()
    const [currentHash, setCurrentHash] = useState("")

    // 确定当前路径对应的菜单
    let menu
    if (pathname.startsWith("/deep-learning")) {
        menu = deepLearningMenu
    } else if (pathname.startsWith("/large-language-model")) {
        menu = llmMenu
    } else if (pathname.startsWith("/ai-models")) {
        menu = aiModelsMenu
    } else {
        menu = pathname.includes("deep-learning") ? deepLearningMenu :
            pathname.includes("large-language-model") ? llmMenu :
                pathname.includes("ai-models") ? aiModelsMenu : deepLearningMenu
    }

    // 在客户端监听 hash 变化
    useEffect(() => {
        setCurrentHash(window.location.hash)
        const handleHashChange = () => {
            setCurrentHash(window.location.hash)
        }
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [])

    // 获取当前页面的标题
    const getPageTitle = () => {
        if (pathname.startsWith("/deep-learning")) {
            return "深度学习"
        } else if (pathname.startsWith("/large-language-model")) {
            return "大语言模型"
        } else if (pathname.startsWith("/ai-models")) {
            return "AI大模型导航"
        }
        return "课程目录"
    }

    return (
        <nav className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {getPageTitle()}
            </h2>
            <div className="space-y-4">
                {menu.map((section) => (
                    <div key={section.title} className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 px-4 mb-2">
                            {section.title}
                        </h3>
                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${pathname + currentHash === item.href
                                            ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-medium"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                        }`}
                                >
                                    <span className="flex-1">{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </nav>
    )
} 