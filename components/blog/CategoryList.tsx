'use client';

import React from 'react';
import Link from 'next/link';
import { FiFolder } from 'react-icons/fi';

interface CategoryListProps {
    categories: any[];
    activeCategory?: string;
}

export default function CategoryList({ categories, activeCategory }: CategoryListProps) {
    if (!categories || categories.length === 0) {
        return (
            <div className="text-gray-500 text-center py-2">
                暂无分类
            </div>
        );
    }

    return (
        <ul className="space-y-1">
            {categories.map((category) => (
                <li key={category.id}>
                    <Link
                        href={`/blog?category=${category.slug}`}
                        className={`flex items-center px-3 py-2 rounded-md hover:bg-gray-700 ${activeCategory === category.slug
                            ? 'bg-blue-900/40 text-blue-300'
                            : 'text-gray-300'
                            }`}
                    >
                        <FiFolder className="mr-2" />
                        <span>{category.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
} 