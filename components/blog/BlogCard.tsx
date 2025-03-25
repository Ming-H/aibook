'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LuCalendar, LuEye, LuUser, LuTag, LuFolder } from 'react-icons/lu';

type BlogCardProps = {
    post: any;
    variant?: 'default' | 'featured';
};

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
    const isFeatured = variant === 'featured';

    if (!post) return null;

    return (
        <div className={`group relative overflow-hidden border rounded-lg ${isFeatured ? 'md:flex' : ''}`}>
            <div
                className={`relative overflow-hidden ${isFeatured
                        ? 'md:w-1/2 h-64 md:h-auto'
                        : 'h-48'
                    }`}
            >
                <Link href={`/blog/${post.slug}`}>
                    <div className="relative w-full h-full">
                        <Image
                            src={post.featured_image || 'https://via.placeholder.com/800x450?text=AIBook+Studio'}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    </div>
                </Link>
            </div>

            <div className={`p-5 ${isFeatured ? 'md:w-1/2' : ''}`}>
                {post.category && (
                    <Link href={`/blog/category/${post.category.slug}`}>
                        <Badge variant="secondary" className="mb-2">
                            {post.category.name}
                        </Badge>
                    </Link>
                )}

                <Link href={`/blog/${post.slug}`}>
                    <h3 className={`font-bold tracking-tight mb-2 group-hover:text-primary transition-colors ${isFeatured ? 'text-2xl' : 'text-xl'
                        }`}>
                        {post.title}
                    </h3>
                </Link>

                {post.excerpt && (
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>
                )}

                <div className="flex items-center mt-4">
                    {post.author && (
                        <>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={post.author.avatar_url} alt={post.author.display_name || post.author.email} />
                                <AvatarFallback>
                                    {(post.author.display_name || post.author.email || '?').charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="ml-2 text-sm">
                                <p className="font-medium">{post.author.display_name || post.author.email}</p>
                                <p className="text-muted-foreground">
                                    {formatDate(post.created_at)} ·
                                    {post.reading_time ? ` ${post.reading_time}分钟阅读` : ' 快速阅读'}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
} 