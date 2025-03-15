import Link from 'next/link';
import { fetchNews } from '@/lib/news';
import { NewsItem } from '@/types/news';
import { Pagination } from '@/components/ui/Pagination';
import { NewsImage } from '@/components/news/NewsImage';

export async function NewsList({
    category = 'all',
    page = 1,
    search = '',
}: {
    category?: string;
    page?: number;
    search?: string;
}) {
    const { news, total } = await fetchNews({ category, page, search });

    if (news.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                    暂无相关新闻
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="space-y-8">
                {news.map((item: NewsItem) => (
                    <article key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                        <Link href={`/news/${item.slug}`} className="block hover:opacity-90 transition-opacity">
                            <NewsImage src={item.image} alt={item.title} />
                        </Link>

                        <div className="p-6">
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                <span>{item.category}</span>
                                <span>•</span>
                                <time dateTime={item.publishedAt}>{new Date(item.publishedAt).toLocaleDateString()}</time>
                            </div>

                            <h2 className="text-xl font-semibold mb-3">
                                <Link href={`/news/${item.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                                    {item.title}
                                </Link>
                            </h2>

                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                {item.excerpt}
                            </p>

                            <div className="flex items-center gap-4">
                                <Link
                                    href={`/news/${item.slug}`}
                                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                                >
                                    阅读全文
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-8">
                <Pagination
                    total={total}
                    pageSize={10}
                    currentPage={page}
                    baseUrl={`/news?category=${category}${search ? `&search=${search}` : ''}`}
                />
            </div>
        </div>
    );
} 