'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiMail, FiAlertCircle } from 'react-icons/fi';
import { supabase } from '../../../lib/supabase/client';

export default function AccountRecovery() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState<any>(null);
    const [step, setStep] = useState(1);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResult(null);
        setIsLoading(true);

        try {
            if (!email) {
                setError('请输入邮箱地址');
                return;
            }

            // 检查用户是否存在
            const { data, error: searchError } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', email)
                .single();

            if (searchError) {
                if (searchError.code === 'PGRST116') {
                    setError('此邮箱地址未找到关联账户');
                } else {
                    throw searchError;
                }
            } else if (data) {
                setResult(data);
                setStep(2);
            }
        } catch (err: any) {
            console.error('账户查询失败:', err);
            setError(err.message || '查询失败，请重试');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        setIsLoading(true);
        setError('');

        try {
            // 发送密码重置邮件
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            setStep(3);
        } catch (err: any) {
            console.error('密码重置失败:', err);
            setError(err.message || '发送重置邮件失败，请重试');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">AIBook Studio</h1>
                    <h2 className="mt-6 text-2xl font-bold text-white">账户恢复</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        找回您的账户并重置密码
                    </p>
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-md">
                        <div className="flex items-center">
                            <FiAlertCircle className="mr-2" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <form className="mt-8 space-y-6" onSubmit={handleSearch}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                您的注册邮箱
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
                                {isLoading ? '查询中...' : '查找账户'}
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && result && (
                    <div className="mt-8 space-y-6">
                        <div className="bg-green-900/30 border border-green-800 text-green-300 px-4 py-3 rounded-md">
                            <p className="font-medium">找到您的账户!</p>
                            <p className="mt-1 text-sm">用户名: {result.username || result.full_name || '未设置'}</p>
                            <p className="text-sm">注册时间: {new Date(result.created_at).toLocaleDateString()}</p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-300 text-sm">
                                我们可以向您的邮箱 {email} 发送一封密码重置邮件。
                            </p>

                            <button
                                onClick={handlePasswordReset}
                                disabled={isLoading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isLoading ? '发送中...' : '发送重置邮件'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="mt-8 space-y-6">
                        <div className="bg-green-900/30 border border-green-800 text-green-300 px-4 py-3 rounded-md">
                            <p className="font-medium">重置邮件已发送!</p>
                            <p className="mt-1 text-sm">
                                我们已向 {email} 发送了一封密码重置邮件。请检查您的收件箱和垃圾邮件文件夹。
                            </p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-300 text-sm">
                                点击邮件中的链接可以设置新密码。如果您没有收到邮件，可以尝试重新发送。
                            </p>

                            <button
                                onClick={() => setStep(1)}
                                className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
                            >
                                重新开始
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <Link href="/signin" className="text-sm text-blue-500 hover:text-blue-400 flex items-center justify-center">
                        <FiArrowLeft className="mr-2" /> 返回登录页面
                    </Link>
                </div>
            </div>
        </div>
    );
} 