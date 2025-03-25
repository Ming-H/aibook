import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPublishedPosts } from '@/lib/services/blogService';
import { getCategoryBySlug } from '@/lib/services/categoryService';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import SearchForm from '@/components/blog/SearchForm';

// 生成动态元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const category = await getCategoryBySlug(params.slug);

    if (!category) {
        return {
            title: '分类未找到 | AIBook Studio',
            description: '您请求的分类不存在或已被移除。',
        };
    }

    return {
        title: `${category.name} | 分类 | AIBook Studio`,
        description: category.description || `浏览${category.name}分类下的所有文章。`,
    };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const category = await getCategoryBySlug(params.slug);

    if (!category) {
        return notFound();
    }

    // 获取该分类下的所有文章
    const allPosts = await getPublishedPosts(100, 0);
    const categoryPosts = allPosts.filter(post => post.category_id === category.id);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>

            {category.description && (
                <p className="text-gray-600 mb-8">{category.description}</p>
            )}

            {/* 搜索表单 */}
            <div className="mb-8">
                <SearchForm />
            </div>

            {/* 文章计数 */}
            <div className="mb-8">
                <p className="text-lg">
                    {categoryPosts.length > 0
                        ? `${categoryPosts.length} 篇文章`
                        : '该分类下暂无文章'}
                </p>
            </div>

            {/* 显示分类文章 */}
            {categoryPosts.length > 0 ? (
                <div className="space-y-8">
                    {categoryPosts.map((post) => (
                        <article key={post.id} className="border rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row">
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
                                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                                        {post.title}
                                    </Link>
                                </h2>
                                <div className="text-sm text-gray-500 mb-3 flex gap-3">
                                    <span>作者: {post.author?.display_name}</span>
                                    <span>发布于: {formatDate(post.created_at)}</span>
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
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600 mb-4">该分类下暂无文章</p>
                    <p className="text-gray-500">
                        浏览我们的
                        <Link href="/blog" className="text-blue-600 hover:underline mx-1">
                            博客首页
                        </Link>
                        查看所有文章
                    </p>
                </div>
            )}

            {/* 返回按钮 */}
            <div className="mt-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-blue-600 hover:underline"
                >
                    ← 返回博客首页
                </Link>
            </div>
        </div>
    );
} 