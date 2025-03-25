import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';

interface BlogAuthorBoxProps {
    author: {
        id: string;
        full_name?: string;
        avatar_url?: string;
    };
}

export default function BlogAuthorBox({ author }: BlogAuthorBoxProps) {
    if (!author) {
        return null;
    }

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
                <div className="mr-4">
                    {author.avatar_url ? (
                        <Image
                            src={author.avatar_url}
                            alt={author.full_name || '作者'}
                            width={64}
                            height={64}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-gray-400">
                            <FiUser size={32} />
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white">
                        {author.full_name || '匿名作者'}
                    </h3>
                    <Link
                        href={`/blog?author=${author.id}`}
                        className="text-blue-400 hover:text-blue-300 mt-1 inline-block"
                    >
                        查看所有文章
                    </Link>
                </div>
            </div>
        </div>
    );
} 