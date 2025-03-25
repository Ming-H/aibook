'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
    placeholder?: string;
    hotSearches?: string[];
}

export default function SearchBar({
    placeholder = '搜索AI工具...',
    hotSearches = ['文章生成', '图像创作', '视频制作', 'AI聊天']
}: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    // 使用useCallback优化性能
    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        // 确保搜索词不为空
        if (searchTerm.trim()) {
            console.log('搜索:', searchTerm.trim()); // 调试日志
            // 跳转到搜索结果页面
            router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    }, [searchTerm, router]);

    const handleHotSearchClick = useCallback((term: string) => {
        setSearchTerm(term);
        console.log('热门搜索点击:', term); // 调试日志
        router.push(`/search?q=${encodeURIComponent(term)}`);
    }, [router]);

    // 添加键盘事件处理
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            e.preventDefault();
            console.log('回车键搜索:', searchTerm.trim()); // 调试日志
            router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    }, [searchTerm, router]);

    return (
        <div className="w-full max-w-3xl mx-auto px-4">
            <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
                    <div className="pl-4 pr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="flex-grow py-3 px-2 bg-gray-800 text-white placeholder-gray-400 outline-none"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium rounded-r-lg"
                        onClick={handleSearch}
                    >
                        搜索
                    </button>
                </div>
            </form>

            <div className="mt-2 text-gray-400 text-sm">
                <span>热门搜索: </span>
                {hotSearches.map((term, index) => (
                    <button
                        key={index}
                        onClick={() => handleHotSearchClick(term)}
                        className="hover:text-blue-400 transition-colors ml-2"
                    >
                        {term}
                    </button>
                ))}
            </div>
        </div>
    );
} 