'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // 处理表单输入变化
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError('');
    };

    // 表单验证
    const validateForm = () => {
        // 验证邮箱
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setError('请输入邮箱地址');
            return false;
        } else if (!emailRegex.test(email)) {
            setError('请输入有效的邮箱地址');
            return false;
        }
        return true;
    };

    // 处理表单提交
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 表单验证
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) {
                throw new Error(error.message);
            }

            setIsSubmitted(true);
            setMessage('密码重置链接已发送到您的邮箱');
        } catch (err: any) {
            setError(err.message || '发送密码重置链接失败，请稍后再试');
            console.error('密码重置错误:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center">
                    <span className="sr-only">AIBook Studio</span>
                    <h1 className="text-4xl font-bold text-blue-600">AIBook Studio</h1>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    重置您的密码
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    记起密码了？{' '}
                    <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                        返回登录
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {message && (
                        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{message}</span>
                        </div>
                    )}

                    {!isSubmitted ? (
                        <>
                            <p className="text-sm text-gray-600 mb-6">
                                请输入您的邮箱地址，我们将向您发送一个密码重置链接。
                            </p>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        邮箱地址
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={handleEmailChange}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="请输入您的邮箱地址"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? '发送中...' : '发送重置链接'}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <svg className="h-20 w-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">检查您的邮箱</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                我们已向 <span className="font-semibold">{email}</span> 发送了一封密码重置邮件。
                                请点击邮件中的链接重置您的密码。
                            </p>
                            <div className="mt-6">
                                <p className="text-sm text-gray-600">
                                    没有收到邮件？请检查您的垃圾邮件文件夹，或
                                </p>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? '发送中...' : '重新发送重置链接'}
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
                    )}
                </div>
            </div>
        </div>
    );
} 