"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { deepLearningMenu, llmMenu } from "@/docs/config"

export function Sidebar() {
    const pathname = usePathname()
    const isDeepLearning = pathname.startsWith("/deep-learning")
    const menu = isDeepLearning ? deepLearningMenu : llmMenu

    return (
        <aside className="w-64 border-r border-gray-200 dark:border-gray-700 min-h-screen bg-white dark:bg-gray-900">
            <nav className="p-4">
                {menu.map((section) => (
                    <div key={section.title} className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {section.title}
                        </h3>
                        <ul className="space-y-1">
                            {section.items.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`block px-4 py-2 text-sm rounded-lg ${pathname + location.hash === item.href
                                                ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-800"
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