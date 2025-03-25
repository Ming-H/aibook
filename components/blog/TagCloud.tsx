'use client';

import React from 'react';
import Link from 'next/link';
import { FiTag } from 'react-icons/fi';

interface TagCloudProps {
    tags: any[];
    activeTag?: string;
}

export default function TagCloud({ tags, activeTag }: TagCloudProps) {
    if (!tags || tags.length === 0) {
        return (
            <div className="text-gray-500 text-center py-2">
                暂无标签
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${activeTag === tag.slug
                        ? 'bg-blue-900/40 text-blue-300'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                >
                    <FiTag className="mr-1 text-xs" />
                    {tag.name}
                </Link>
            ))}
        </div>
    );
} 