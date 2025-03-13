import { aiModels } from '@/config/ai-models'
import Link from 'next/link'

export default function AiModelsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            {/* 左侧固定侧边栏 */}
            <div className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] border-r border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <nav className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        AI大模型导航
                    </h2>
                    {aiModels.map((model) => (
                        <Link
                            key={model.id}
                            href={`/ai-models/${model.id}`}
                            className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                        >
                            {model.name}
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                ({model.company})
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* 右侧内容区域 */}
            <div className="flex-1 ml-64">
                <main className="p-8 border-t border-gray-200 dark:border-gray-800">
                    {children}
                </main>
            </div>
        </div>
    )
} 