'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';
import Link from 'next/link';

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <ReactMarkdown
            className="markdown-body"
            remarkPlugins={[remarkGfm]}
            components={{
                // 代码块高亮
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');

                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },

                // 链接处理
                a({ node, children, href, ...props }) {
                    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));

                    if (isInternal) {
                        return (
                            <Link href={href} {...props}>
                                {children}
                            </Link>
                        );
                    }

                    return (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                        >
                            {children}
                        </a>
                    );
                },

                // 图片处理 (使用Next.js的Image组件)
                img({ node, src, alt, ...props }) {
                    if (!src) return null;

                    return (
                        <div className="relative w-full my-6 flex justify-center">
                            {/* 使用普通img标签因为我们不知道图片尺寸 */}
                            <img
                                src={src}
                                alt={alt || ''}
                                className="max-w-full h-auto rounded-lg"
                                loading="lazy"
                                {...props}
                            />
                        </div>
                    );
                },

                // 自定义表格样式
                table({ node, children, ...props }) {
                    return (
                        <div className="overflow-x-auto my-6">
                            <table className="min-w-full border border-gray-700 divide-y divide-gray-700 rounded-lg overflow-hidden" {...props}>
                                {children}
                            </table>
                        </div>
                    );
                },

                // 表格头部样式
                thead({ node, children, ...props }) {
                    return (
                        <thead className="bg-gray-800" {...props}>
                            {children}
                        </thead>
                    );
                },

                // 表格行样式
                tr({ node, isHeader, children, ...props }) {
                    return (
                        <tr
                            className={isHeader ? '' : 'hover:bg-gray-700 transition-colors'}
                            {...props}
                        >
                            {children}
                        </tr>
                    );
                },

                // 表格单元格样式
                td({ node, children, ...props }) {
                    return (
                        <td className="px-4 py-2 border-r border-gray-700 last:border-r-0" {...props}>
                            {children}
                        </td>
                    );
                },

                // 表格标题单元格样式
                th({ node, children, ...props }) {
                    return (
                        <th className="px-4 py-3 text-left border-r border-gray-700 last:border-r-0" {...props}>
                            {children}
                        </th>
                    );
                },

                // 引用块样式
                blockquote({ node, children, ...props }) {
                    return (
                        <blockquote
                            className="border-l-4 border-blue-500 pl-4 py-1 my-6 text-gray-300 bg-gray-800/50 rounded-r-md"
                            {...props}
                        >
                            {children}
                        </blockquote>
                    );
                },

                // 自定义列表样式
                ul({ node, ordered, children, ...props }) {
                    return (
                        <ul className="list-disc pl-6 my-6 space-y-2" {...props}>
                            {children}
                        </ul>
                    );
                },

                // 自定义有序列表样式
                ol({ node, ordered, children, ...props }) {
                    return (
                        <ol className="list-decimal pl-6 my-6 space-y-2" {...props}>
                            {children}
                        </ol>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
} 