'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
    total: number;
    pageSize: number;
    currentPage: number;
    baseUrl: string;
}

export function Pagination({
    total,
    pageSize,
    currentPage,
    baseUrl,
}: PaginationProps) {
    const totalPages = Math.ceil(total / pageSize);

    // 如果只有一页，不显示分页
    if (totalPages <= 1) {
        return null;
    }

    // 计算要显示的页码数组
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; // 最多显示5个页码按钮

        if (totalPages <= maxPagesToShow) {
            // 如果总页数小于等于最大显示数，显示所有页码
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // 计算左右侧显示的页码数
            let leftSide = Math.floor(maxPagesToShow / 2);
            let rightSide = maxPagesToShow - leftSide - 1;

            // 当前页靠近开始或结束时的特殊处理
            if (currentPage > totalPages - rightSide) {
                leftSide = maxPagesToShow - (totalPages - currentPage) - 1;
                rightSide = totalPages - currentPage;
            } else if (currentPage < leftSide + 1) {
                leftSide = currentPage - 1;
                rightSide = maxPagesToShow - leftSide - 1;
            }

            // 添加当前页左侧的页码
            for (let i = currentPage - leftSide; i < currentPage; i++) {
                if (i > 0) pageNumbers.push(i);
            }

            // 添加当前页
            pageNumbers.push(currentPage);

            // 添加当前页右侧的页码
            for (let i = currentPage + 1; i <= currentPage + rightSide; i++) {
                if (i <= totalPages) pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav className="flex items-center justify-center gap-1" aria-label="分页导航">
            {/* 上一页按钮 */}
            <Link
                href={currentPage > 1 ? `${baseUrl}&page=${currentPage - 1}` : '#'}
                className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-md transition-colors',
                    currentPage > 1
                        ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                )}
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : 0}
            >
                <span className="sr-only">上一页</span>
                <ChevronLeft className="w-5 h-5" />
            </Link>

            {/* 页码按钮 */}
            {pageNumbers.map((pageNumber) => (
                <Link
                    key={pageNumber}
                    href={`${baseUrl}&page=${pageNumber}`}
                    className={cn(
                        'flex items-center justify-center w-10 h-10 rounded-md transition-colors',
                        pageNumber === currentPage
                            ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-medium'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    )}
                    aria-current={pageNumber === currentPage ? 'page' : undefined}
                >
                    {pageNumber}
                </Link>
            ))}

            {/* 下一页按钮 */}
            <Link
                href={
                    currentPage < totalPages ? `${baseUrl}&page=${currentPage + 1}` : '#'
                }
                className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-md transition-colors',
                    currentPage < totalPages
                        ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                )}
                aria-disabled={currentPage >= totalPages}
                tabIndex={currentPage >= totalPages ? -1 : 0}
            >
                <span className="sr-only">下一页</span>
                <ChevronRight className="w-5 h-5" />
            </Link>
        </nav>
    );
} 