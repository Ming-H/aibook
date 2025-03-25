'use client';

import React from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    queryParams?: {
        [key: string]: string | undefined;
    };
}

export default function Pagination({
    currentPage,
    totalPages,
    baseUrl,
    queryParams = {}
}: PaginationProps) {
    // 如果只有一页，不显示分页
    if (totalPages <= 1) {
        return null;
    }

    // 构建查询字符串
    const buildUrl = (page: number) => {
        const params = new URLSearchParams();

        // 添加页码
        params.append('page', page.toString());

        // 添加其他查询参数
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value) {
                params.append(key, value);
            }
        });

        return `${baseUrl}?${params.toString()}`;
    };

    // 生成分页项
    const renderPaginationItems = () => {
        const items = [];
        const maxPageButtons = 5;

        // 始终显示第一页
        items.push(
            <PaginationItem
                key="page-1"
                page={1}
                isCurrent={currentPage === 1}
                url={buildUrl(1)}
            />
        );

        // 如果当前页前面有折叠页，显示省略号
        if (currentPage > 3) {
            items.push(
                <span key="ellipsis-1" className="px-3 py-2 text-gray-500">
                    ...
                </span>
            );
        }

        // 显示当前页附近的页码
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            if (i !== 1 && i !== totalPages) {
                items.push(
                    <PaginationItem
                        key={`page-${i}`}
                        page={i}
                        isCurrent={currentPage === i}
                        url={buildUrl(i)}
                    />
                );
            }
        }

        // 如果当前页后面有折叠页，显示省略号
        if (currentPage < totalPages - 2) {
            items.push(
                <span key="ellipsis-2" className="px-3 py-2 text-gray-500">
                    ...
                </span>
            );
        }

        // 始终显示最后一页
        if (totalPages > 1) {
            items.push(
                <PaginationItem
                    key={`page-${totalPages}`}
                    page={totalPages}
                    isCurrent={currentPage === totalPages}
                    url={buildUrl(totalPages)}
                />
            );
        }

        return items;
    };

    return (
        <nav className="flex justify-center">
            <ul className="flex space-x-1 items-center">
                {/* 上一页按钮 */}
                <li>
                    {currentPage > 1 ? (
                        <Link
                            href={buildUrl(currentPage - 1)}
                            className="flex items-center px-3 py-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md"
                            aria-label="上一页"
                        >
                            <FiChevronLeft />
                        </Link>
                    ) : (
                        <span className="flex items-center px-3 py-2 text-gray-600 bg-gray-800 rounded-md cursor-not-allowed">
                            <FiChevronLeft />
                        </span>
                    )}
                </li>

                {/* 页码 */}
                {renderPaginationItems()}

                {/* 下一页按钮 */}
                <li>
                    {currentPage < totalPages ? (
                        <Link
                            href={buildUrl(currentPage + 1)}
                            className="flex items-center px-3 py-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md"
                            aria-label="下一页"
                        >
                            <FiChevronRight />
                        </Link>
                    ) : (
                        <span className="flex items-center px-3 py-2 text-gray-600 bg-gray-800 rounded-md cursor-not-allowed">
                            <FiChevronRight />
                        </span>
                    )}
                </li>
            </ul>
        </nav>
    );
}

interface PaginationItemProps {
    page: number;
    isCurrent: boolean;
    url: string;
}

function PaginationItem({ page, isCurrent, url }: PaginationItemProps) {
    return (
        <li>
            {isCurrent ? (
                <span className="inline-flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-md">
                    {page}
                </span>
            ) : (
                <Link
                    href={url}
                    className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md"
                >
                    {page}
                </Link>
            )}
        </li>
    );
} 