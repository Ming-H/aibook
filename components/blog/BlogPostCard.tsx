import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiUser, FiCalendar, FiEye } from 'react-icons/fi';
import { formatDate } from '@/lib/utils';

interface BlogPostCardProps {
    post: any;
    minimal?: boolean;
}

export default function BlogPostCard({ post, minimal = false }: BlogPostCardProps) {
    // 如果是精简模式，显示更紧凑的卡片
    if (minimal) {
        return (
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <Link href={`/blog/${post.slug}`} className="block">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
                            {post.title}
                        </h3>
                        <div className="flex text-xs text-gray-400 space-x-3 mb-2">
                            <span className="flex items-center">
                                <FiCalendar className="mr-1" />
                                {formatDate(post.created_at)}
                            </span>
                            <span className="flex items-center">
                                <FiEye className="mr-1" />
                                {post.view_count || 0}
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <article className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col md:flex-row">
            {/* 文章特色图片 */}
            {post.featured_image && (
                <Link href={`/blog/${post.slug}`} className="md:w-1/3 block">
                    <div className="relative h-48 md:h-full">
                        <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                </Link>
            )}

            {/* 文章内容 */}
            <div className={`p-6 flex flex-col justify-between ${post.featured_image ? 'md:w-2/3' : 'w-full'}`}>
                <div>
                    {/* 分类 */}
                    {post.categories && (
                        <Link
                            href={`/blog?category=${post.categories.slug}`}
                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-block mb-2"
                        >
                            {post.categories.name}
                        </Link>
                    )}

                    {/* 标题 */}
                    <Link href={`/blog/${post.slug}`} className="block">
                        <h2 className="text-xl font-bold mb-3 hover:text-blue-400 transition-colors">
                            {post.title}
                        </h2>
                    </Link>

                    {/* 摘要 */}
                    <div className="text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt || post.content.substring(0, 160).replace(/#{1,6}\s?/g, '')}
                    </div>

                    {/* 标签 */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tagItem: any) => (
                                <Link
                                    key={tagItem.blog_tags.id}
                                    href={`/blog?tag=${tagItem.blog_tags.slug}`}
                                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition"
                                >
                                    {tagItem.blog_tags.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* 元信息 */}
                <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
                    <div className="flex items-center">
                        {post.author?.avatar_url ? (
                            <Image
                                src={post.author.avatar_url}
                                alt={post.author.full_name || '作者'}
                                width={24}
                                height={24}
                                className="rounded-full mr-2"
                            />
                        ) : (
                            <FiUser className="mr-2" />
                        )}
                        <span>{post.author?.full_name || '匿名'}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                            <FiCalendar className="mr-1" />
                            {formatDate(post.created_at)}
                        </span>
                        <span className="flex items-center">
                            <FiEye className="mr-1" />
                            {post.view_count || 0}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
} 