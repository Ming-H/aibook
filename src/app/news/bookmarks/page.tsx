'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchNewsItem } from '@/lib/news';
import { NewsItem } from '@/types/news';
import { NewsImage } from '@/components/news/NewsImage';

export default function BookmarksPage() {
    const [bookmarkedNews, setBookmarkedNews] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadBookmarkedNews() {
            try {
                const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');
                const newsPromises = bookmarks.map((id: string) => fetchNewsItem(id));
                const newsItems = await Promise.all(newsPromises);
                setBookmarkedNews(newsItems.filter((item): item is NewsItem => item !== null));
            } catch (error) {
                console.error('加载收藏新闻失败:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadBookmarkedNews();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link
                            href="/news"
                            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            返回新闻列表
                        </Link>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        我的收藏
                    </h1>

                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse"
                                >
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : bookmarkedNews.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                            <p className="text-gray-500 dark:text-gray-400">
                                暂无收藏的新闻
                            </p>
                            <Link
                                href="/news"
                                className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                浏览新闻
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {bookmarkedNews.map((news) => (
                                <article
                                    key={news.id}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                                >
                                    <Link
                                        href={`/news/${news.slug}`}
                                        className="flex flex-col md:flex-row"
                                    >
                                        <div className="md:w-48 flex-shrink-0">
                                            <NewsImage src={news.image} alt={news.title} />
                                        </div>
                                        <div className="p-4 flex-grow">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                <span>{news.category}</span>
                                                <time dateTime={news.publishedAt}>
                                                    {new Date(news.publishedAt).toLocaleDateString()}
                                                </time>
                                            </div>
                                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400">
                                                {news.title}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                                                {news.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 