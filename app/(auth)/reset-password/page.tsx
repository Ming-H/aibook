'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../../lib/context/AuthContext';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setIsLoading(true);

        if (!email.trim()) {
            setError('请输入您的邮箱地址');
            setIsLoading(false);
            return;
        }

        try {
            await resetPassword(email);
            setSuccess(true);
        } catch (err: any) {
            console.error('重置密码失败:', err);
            setError(err.message || '发送重置密码邮件失败，请重试');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">AIBook Studio</h1>
                    <h2 className="mt-6 text-2xl font-bold text-white">重置您的密码</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        我们将向您发送一封邮件，其中包含重置密码的链接
                    </p>
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-900/30 border border-green-800 text-green-300 px-4 py-3 rounded-md">
                        重置密码邮件已发送！请检查您的邮箱（包括垃圾邮件文件夹）
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            邮箱地址
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <FiMail />
                            </span>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="example@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoading ? '发送中...' : '发送重置链接'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/signin" className="text-sm text-blue-500 hover:text-blue-400 flex items-center justify-center">
                        <FiArrowLeft className="mr-2" /> 返回登录页面
                    </Link>
                </div>
            </div>
        </div>
    );
} 