import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          data-oid="wo0oitp"
        >
          404 - 页面未找到
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8" data-oid="udjkde8">
          您访问的页面不存在或已被移除。
        </p>
        <Link
          href="/"
          className="px-5 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md font-medium hover:shadow-lg transition-all"
          data-oid="p588w8f"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
