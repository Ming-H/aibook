'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function EmailVerification() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '您的邮箱';

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center">
                    <span className="sr-only">AIBook Studio</span>
                    <h1 className="text-4xl font-bold text-blue-600">AIBook Studio</h1>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    验证您的邮箱
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <svg className="h-20 w-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">验证邮件已发送</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            我们已向 <span className="font-semibold">{email}</span> 发送了一封验证邮件。
                            请点击邮件中的链接完成注册流程。
                        </p>
                        <div className="mt-6">
                            <p className="text-sm text-gray-600">
                                没有收到邮件？请检查您的垃圾邮件文件夹，或
                            </p>
                            <button
                                type="button"
                                className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                重新发送验证邮件
                            </button>
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/signin"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                返回登录
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 