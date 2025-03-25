import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { searchPosts } from '@/lib/services/blogService';
import { formatDate } from '@/lib/utils';
import SearchForm from '@/components/blog/SearchForm';
import { LuArrowLeft, LuSearch } from 'react-icons/lu';

export const metadata: Metadata = {
    title: '搜索结果 - AIBook Studio',
    description: '搜索AIBook博客的文章',
};

export default async function SearchPage({
    searchParams
}: {
    searchParams: { q: string }
}) {
    const query = searchParams.q || '';

    // 如果没有查询参数，显示搜索表单
    if (!query) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">搜索文章</h1>

                <div className="max-w-xl mx-auto">
                    <SearchForm />

                    <div className="mt-8 text-center">
                        <p className="text-muted-foreground">请输入关键词以搜索相关文章</p>
                    </div>
                </div>
            </div>
        );
    }

    // 搜索文章
    const searchResults = await searchPosts(query);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link
                    href="/blog"
                    className="text-blue-600 hover:underline inline-flex items-center"
                >
                    <LuArrowLeft className="mr-2" />
                    返回博客首页
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-2">
                搜索结果: "{query}"
            </h1>
            <p className="text-muted-foreground mb-8">
                找到 {searchResults.length} 篇相关文章
            </p>

            {/* 搜索表单 */}
            <div className="mb-8">
                <SearchForm />
            </div>

            {/* 搜索结果 */}
            {searchResults.length > 0 ? (
                <div className="space-y-8">
                    {searchResults.map((post) => (
                        <article
                            key={post.id}
                            className="border rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row"
                        >
                            {post.featured_image && (
                                <div className="relative h-48 md:h-auto md:w-1/3">
                                    <Image
                                        src={post.featured_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6 flex-1">
                                <h2 className="text-2xl font-semibold mb-2">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="hover:text-blue-600"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>
                                <div className="text-sm text-gray-500 mb-3 flex gap-3">
                                    <span>作者: {post.author?.display_name}</span>
                                    <span>发布于: {formatDate(post.created_at)}</span>
                                    {post.category && (
                                        <span>分类:
                                            <Link
                                                href={`/blog/category/${post.category.slug}`}
                                                className="text-blue-600 hover:underline ml-1"
                                            >
                                                {post.category.name}
                                            </Link>
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    阅读更多
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border rounded-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <LuSearch className="w-8 h-8 text-gray-500" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">未找到相关文章</h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        很抱歉，我们找不到与"{query}"相关的文章。请尝试使用不同的关键词搜索。
                    </p>
                    <Link
                        href="/blog"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        返回博客首页
                    </Link>
                </div>
            )}
        </div>
    );
} 