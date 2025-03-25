'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuSearch, LuX } from 'react-icons/lu';

export default function SearchButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();

    // 打开/关闭搜索框
    const toggleSearch = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setTimeout(() => {
                document.getElementById('search-input')?.focus();
            }, 100);
        }
    };

    // 处理搜索表单提交
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/blog/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
            setQuery('');
        }
    };

    return (
        <>
            {/* 搜索按钮 */}
            <button
                onClick={toggleSearch}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center"
                aria-label="搜索"
            >
                <LuSearch className="w-5 h-5" />
            </button>

            {/* 搜索弹出框 */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-24">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-lg shadow-lg overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="font-semibold">搜索博客文章</h3>
                            <button
                                onClick={toggleSearch}
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                                aria-label="关闭"
                            >
                                <LuX className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4">
                            <div className="relative">
                                <input
                                    id="search-input"
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="搜索文章..."
                                    className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <LuSearch className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={toggleSearch}
                                    className="px-4 py-2 mr-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    disabled={!query.trim()}
                                >
                                    搜索
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
} 