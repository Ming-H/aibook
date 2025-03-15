'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Share2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface NewsActionsProps {
    newsId: string;
    title: string;
}

export function NewsActions({ newsId, title }: NewsActionsProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    // 在组件加载时检查是否已收藏
    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');
        setIsBookmarked(bookmarks.includes(newsId));
    }, [newsId]);

    // 处理收藏/取消收藏
    const handleBookmark = () => {
        const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');

        if (isBookmarked) {
            // 取消收藏
            const updatedBookmarks = bookmarks.filter((id: string) => id !== newsId);
            localStorage.setItem('newsBookmarks', JSON.stringify(updatedBookmarks));
            setIsBookmarked(false);
            toast.success('已取消收藏');
        } else {
            // 添加收藏
            bookmarks.push(newsId);
            localStorage.setItem('newsBookmarks', JSON.stringify(bookmarks));
            setIsBookmarked(true);
            toast.success('已添加到收藏');
        }
    };

    // 处理分享
    const handleShare = async () => {
        const shareData = {
            title: title,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                // 使用原生分享API
                await navigator.share(shareData);
            } else {
                // 复制链接到剪贴板
                await navigator.clipboard.writeText(window.location.href);
                toast.success('链接已复制到剪贴板');
            }
        } catch (error) {
            console.error('分享失败:', error);
            toast.error('分享失败，请重试');
        }
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={handleBookmark}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isBookmarked
                        ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
            >
                {isBookmarked ? (
                    <>
                        <Check className="w-4 h-4" />
                        已收藏
                    </>
                ) : (
                    <>
                        <Bookmark className="w-4 h-4" />
                        收藏
                    </>
                )}
            </button>

            <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <Share2 className="w-4 h-4" />
                分享
            </button>
        </div>
    );
} 