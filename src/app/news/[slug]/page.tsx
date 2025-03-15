import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { fetchNewsItem } from '@/lib/news';
import { NewsActions } from '@/components/news/NewsActions';
import { RelatedNews } from '@/components/news/RelatedNews';
import { formatDate } from '@/lib/utils';
import { NewsImage } from '@/components/news/NewsImage';

export const revalidate = 3600; // 每小时重新验证一次数据

export default async function NewsDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const news = await fetchNewsItem(params.slug);

    if (!news) {
        notFound();
    }

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

                    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                        <NewsImage src={news.image} alt={news.title} priority />

                        <div className="p-6 lg:p-8">
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                                    {news.category}
                                </span>
                                <time dateTime={news.publishedAt}>
                                    {formatDate(news.publishedAt)}
                                </time>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                {news.title}
                            </h1>

                            <NewsActions newsId={news.id} title={news.title} />

                            <div className="prose dark:prose-invert max-w-none mt-8">
                                {news.content.split('\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </article>

                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            相关新闻
                        </h2>
                        <RelatedNews currentNewsId={news.id} category={news.category} />
                    </div>
                </div>
            </div>
        </div>
    );
} 