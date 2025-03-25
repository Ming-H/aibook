'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { aiModels } from '../config/ai-models';

// 简单的搜索结果项组件
const SearchResultItem = ({ result }: { result: any }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition">
            <h2 className="text-xl font-semibold text-white mb-2">{result.name}</h2>
            <p className="text-gray-300 mb-4">{result.description}</p>
            <div className="flex items-center text-sm text-gray-400">
                <span className="mr-4">公司: {result.company}</span>
                <span>发布日期: {result.releaseDate}</span>
            </div>
            <div className="mt-4">
                <Link
                    href={`/tools/${result.id}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    查看详情
                </Link>
            </div>
        </div>
    );
};

// 搜索结果组件
export default function SearchResults({ query }: { query: string }) {
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        // 模拟搜索功能，在实际项目中这里可以替换为真实的API调用
        const searchData = () => {
            const searchTerm = query.toLowerCase();

            const filteredResults = aiModels.filter(model => {
                return (
                    model.name.toLowerCase().includes(searchTerm) ||
                    model.company.toLowerCase().includes(searchTerm) ||
                    model.description.toLowerCase().includes(searchTerm) ||
                    (model.features && model.features.some(feature =>
                        feature.toLowerCase().includes(searchTerm)
                    ))
                );
            });

            setResults(filteredResults);
        };

        searchData();
    }, [query]);

    // 没有搜索结果时显示提示
    if (results.length === 0) {
        return (
            <div className="text-center py-8">
                <h3 className="text-xl text-white mb-2">没有找到与 "{query}" 相关的结果</h3>
                <p className="text-gray-400">尝试使用其他搜索词，或浏览我们的工具导航页面</p>
            </div>
        );
    }

    // 显示搜索结果
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result) => (
                <SearchResultItem key={result.id} result={result} />
            ))}
        </div>
    );
} 