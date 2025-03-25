'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchForm() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/blog/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
                <input
                    type="text"
                    className="w-full p-3 pl-10 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="搜索文章..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search size={20} />
                </div>
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                    搜索
                </button>
            </div>
        </form>
    );
} 