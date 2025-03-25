import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRelatedPosts } from '@/lib/services/blogService';
import { formatDate } from '@/lib/utils';
import { LuCalendar } from 'react-icons/lu';

interface RelatedPostsProps {
    currentPostId: string;
    categoryId: string | null;
}

export default async function RelatedPosts({ currentPostId, categoryId }: RelatedPostsProps) {
    if (!categoryId) return null;

    const posts = await getRelatedPosts(currentPostId, categoryId);

    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">相关文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <article key={post.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                        {/* 文章特色图片 */}
                        {post.featured_image && (
                            <Link href={`/blog/${post.slug}`} className="block">
                                <div className="relative aspect-video">
                                    <Image
                                        src={post.featured_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                </div>
                            </Link>
                        )}

                        {/* 文章内容 */}
                        <div className="p-4">
                            {/* 分类 */}
                            {post.blog_categories && (
                                <Link
                                    href={`/blog/category/${post.blog_categories.slug}`}
                                    className="text-xs text-blue-600 hover:text-blue-800 transition-colors inline-block mb-1"
                                >
                                    {post.blog_categories.name}
                                </Link>
                            )}

                            {/* 标题 */}
                            <Link href={`/blog/${post.slug}`} className="block">
                                <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                            </Link>

                            {/* 摘要 */}
                            {post.excerpt && (
                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                    {post.excerpt}
                                </p>
                            )}

                            {/* 日期 */}
                            <div className="flex items-center text-xs text-gray-500">
                                <LuCalendar className="mr-1" />
                                {formatDate(post.created_at)}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
} 