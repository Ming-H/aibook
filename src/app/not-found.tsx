import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    404 - 页面未找到
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    抱歉，您访问的页面不存在。
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                    返回首页
                </Link>
            </div>
        </div>
    )
} 