'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export function NewsSearch({ initialSearch = '' }: { initialSearch?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(initialSearch);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const category = searchParams.get('category') || 'all';
        const params = new URLSearchParams();
        params.set('category', category);
        if (search) params.set('search', search);
        router.push(`/news?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="search"
                placeholder="搜索新闻..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </form>
    );
} 