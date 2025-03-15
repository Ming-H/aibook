import Link from 'next/link';
import { cn } from '@/lib/utils';

const categories = [
    { id: 'all', name: '全部' },
    { id: 'ai-research', name: 'AI研究' },
    { id: 'ai-applications', name: 'AI应用' },
    { id: 'industry-news', name: '行业动态' },
    { id: 'company-updates', name: '企业资讯' },
    { id: 'policy-regulation', name: '政策法规' },
];

export function NewsCategories({ activeCategory = 'all' }: { activeCategory?: string }) {
    return (
        <nav className="space-y-1">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/news?category=${category.id}`}
                    className={cn(
                        'block px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        activeCategory === category.id
                            ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    )}
                >
                    {category.name}
                </Link>
            ))}
        </nav>
    );
} 