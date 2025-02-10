import { Sidebar } from "@/components/sidebar"

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            {/* 左侧固定侧边栏 */}
            <div className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] overflow-y-auto border-r border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <Sidebar />
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