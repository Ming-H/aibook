import Link from 'next/link';
import { fetchNews } from '@/lib/news';
import { NewsImage } from '@/components/news/NewsImage';

interface RelatedNewsProps {
    currentNewsId: string;
    category: string;
}

export async function RelatedNews({ currentNewsId, category }: RelatedNewsProps) {
    // 获取同类别的新闻
    const { news } = await fetchNews({ category, pageSize: 4 });

    // 过滤掉当前新闻，最多显示3条相关新闻
    const relatedNews = news
        .filter(item => item.id !== currentNewsId)
        .slice(0, 3);

    if (relatedNews.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((item) => (
                <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="block group"
                >
                    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden h-full">
                        <div className="relative">
                            <NewsImage src={item.image} alt={item.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="p-4">
                            <time className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(item.publishedAt).toLocaleDateString()}
                            </time>
                            <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                {item.title}
                            </h3>
                        </div>
                    </article>
                </Link>
            ))}
        </div>
    );
} 