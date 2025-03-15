import { Suspense } from 'react';
import { NewsList } from '@/components/news/NewsList';
import { NewsCategories } from '@/components/news/NewsCategories';
import { NewsSearch } from '@/components/news/NewsSearch';
import { NewsLoading } from '@/components/news/NewsLoading';

export const revalidate = 3600; // 每小时重新验证一次数据

export default async function NewsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const category = typeof searchParams.category === 'string' ? searchParams.category : 'all';
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
    const search = typeof searchParams.search === 'string' ? searchParams.search : '';

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        AI资讯动态
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* 左侧边栏 */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <NewsCategories activeCategory={category} />
                            </div>
                        </div>

                        {/* 主内容区 */}
                        <div className="lg:col-span-3">
                            <div className="mb-6">
                                <NewsSearch initialSearch={search} />
                            </div>

                            <Suspense fallback={<NewsLoading />}>
                                <NewsList
                                    category={category}
                                    page={page}
                                    search={search}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 