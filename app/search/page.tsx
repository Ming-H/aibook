import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import SearchResults from '../../src/components/SearchResults';
import SearchBar from '../../src/components/SearchBar';

// 搜索页面组件
export default function SearchPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const query = searchParams.q;

    // 如果没有查询参数，显示404页面
    if (!query) {
        return notFound();
    }

    return (
        <main className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <SearchBar placeholder="继续搜索..." />
            </div>

            <h1 className="text-2xl font-bold mb-6 text-white">搜索结果: {query}</h1>

            <Suspense fallback={<div className="text-center py-8 text-white">正在加载搜索结果...</div>}>
                <SearchResults query={query} />
            </Suspense>
        </main>
    );
} 