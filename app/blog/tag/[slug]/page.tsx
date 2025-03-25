import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPublishedPosts } from '@/lib/services/blogService';
import { getTagBySlug, getPostTags } from '@/lib/services/tagService';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import SearchForm from '@/components/blog/SearchForm';

// 生成动态元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const tag = await getTagBySlug(params.slug);

    if (!tag) {
        return {
            title: '标签未找到 | AIBook Studio',
            description: '您请求的标签不存在或已被移除。',
        };
    }

    return {
        title: `${tag.name} | 标签 | AIBook Studio`,
        description: `浏览标签为"${tag.name}"的所有文章。`,
    };
}

export default async function TagPage({ params }: { params: { slug: string } }) {
    const tag = await getTagBySlug(params.slug);

    if (!tag) {
        return notFound();
    }

    // 获取所有文章
    const allPosts = await getPublishedPosts(100, 0);

    // 过滤出包含该标签的文章
    const taggedPosts = [];

    // 在真实应用中，这里应该有更高效的查询方式
    // 这里我们简单地检查每篇文章的标签
    for (const post of allPosts) {
        const postTags = await getPostTags(post.id);
        if (postTags.some(t => t.id === tag.id)) {
            taggedPosts.push(post);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">标签: {tag.name}</h1>

            {/* 搜索表单 */}
            <div className="mb-8">
                <SearchForm />
            </div>

            {/* 文章计数 */}
            <div className="mb-8">
                <p className="text-lg">
                    {taggedPosts.length > 0
                        ? `${taggedPosts.length} 篇文章`
                        : '该标签下暂无文章'}
                </p>
            </div>

            {/* 显示标签文章 */}
            {taggedPosts.length > 0 ? (
                <div className="space-y-8">
                    {taggedPosts.map((post) => (
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
                                    {post.category && (
                                        <span>分类:
                                            <Link href={`/blog/category/${post.category.slug}`} className="text-blue-600 hover:underline ml-1">
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
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600 mb-4">该标签下暂无文章</p>
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