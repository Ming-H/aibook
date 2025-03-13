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
        // 默认菜单，可以根据需要设置
        menu = pathname.includes("deep-learning") ? deepLearningMenu :
            pathname.includes("large-language-model") ? llmMenu :
                pathname.includes("ai-models") ? aiModelsMenu : deepLearningMenu
    }

    // 在客户端监听 hash 变化
    useEffect(() => {
        // 初始化当前 hash
        setCurrentHash(window.location.hash)

        // 监听 hash 变化
        const handleHashChange = () => {
            setCurrentHash(window.location.hash)
        }

        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [])

    return (
        <aside className="w-full h-full">
            <nav className="p-3">
                {menu.map((section) => (
                    <div key={section.title} className="mb-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 px-2 py-1 rounded">
                            {section.title}
                        </h3>
                        <ul className="space-y-1 pl-2">
                            {section.items.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`block px-3 py-1 text-sm rounded-lg transition-colors duration-150 ${pathname + currentHash === item.href
                                            ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-medium"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            }`}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    )
} 