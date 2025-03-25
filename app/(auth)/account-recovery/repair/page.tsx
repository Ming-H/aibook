'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiMail, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { repairUserAccount, checkUserExists } from '../../../../lib/services/userService';

export default function AccountRepair() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState<any>(null);
    const [adminCode, setAdminCode] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [tempPassword, setTempPassword] = useState('');

    const handleAdminAuth = (e: React.FormEvent) => {
        e.preventDefault();
        // 简单的管理员验证 - 实际生产中应使用更安全的方式
        if (adminCode === 'admin123') {
            setIsAdmin(true);
            setError('');
        } else {
            setError('管理员代码不正确');
        }
    };

    const handleCheckAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResult(null);
        setIsLoading(true);

        try {
            if (!email) {
                setError('请输入邮箱地址');
                return;
            }

            // 检查用户账户状态
            const checkResult = await checkUserExists(email);
            setResult({
                ...checkResult,
                step: 'check'
            });
        } catch (err: any) {
            console.error('账户检查失败:', err);
            setError(err.message || '检查失败，请重试');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRepairAccount = async () => {
        setIsLoading(true);
        setError('');

        try {
            // 修复用户账户
            const repairResult = await repairUserAccount(email);

            if (repairResult.password) {
                setTempPassword(repairResult.password);
            }

            setResult({
                ...result,
                step: 'repair',
                repairResult
            });
        } catch (err: any) {
            console.error('账户修复失败:', err);
            setError(err.message || '修复失败，请重试');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAdmin) {
        return (
            <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white">AIBook Studio</h1>
                        <h2 className="mt-6 text-2xl font-bold text-white">账户修复工具</h2>
                        <p className="mt-2 text-sm text-gray-400">
                            仅限管理员使用
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

                    <form className="mt-8 space-y-6" onSubmit={handleAdminAuth}>
                        <div>
                            <label htmlFor="adminCode" className="block text-sm font-medium text-gray-300 mb-1">
                                管理员代码
                            </label>
                            <input
                                id="adminCode"
                                name="adminCode"
                                type="password"
                                required
                                value={adminCode}
                                onChange={(e) => setAdminCode(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="输入管理员代码"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                验证
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

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">AIBook Studio</h1>
                    <h2 className="mt-6 text-2xl font-bold text-white">账户修复工具</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        修复账户认证与数据库不一致问题
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

                {!result && (
                    <form className="mt-8 space-y-6" onSubmit={handleCheckAccount}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                用户邮箱
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
                                {isLoading ? '检查中...' : '检查账户状态'}
                            </button>
                        </div>
                    </form>
                )}

                {result && result.step === 'check' && (
                    <div className="mt-8 space-y-6">
                        <div className={`${result.needsRepair ? 'bg-red-900/30 border-red-800 text-red-300' : 'bg-green-900/30 border-green-800 text-green-300'} px-4 py-3 rounded-md border`}>
                            <p className="font-medium">账户状态检查结果:</p>
                            <div className="mt-2 space-y-1">
                                <p>邮箱: {email}</p>
                                <p>账户存在: {result.exists ? '是' : '否'}</p>
                                <p>数据库记录: {result.profile ? '存在' : '不存在'}</p>
                                <p>认证系统: {result.auth ? '存在' : '不存在'}</p>
                                <p>需要修复: {result.needsRepair ? '是' : '否'}</p>
                            </div>
                        </div>

                        {result.needsRepair && (
                            <div className="space-y-4">
                                <p className="text-gray-300 text-sm">
                                    此账户存在不一致问题，建议进行修复。修复将:
                                </p>
                                <ul className="list-disc list-inside text-gray-300 text-sm">
                                    <li>创建新的认证用户（如果不存在）</li>
                                    <li>生成临时密码（用户可稍后重置）</li>
                                    <li>确保数据库记录与认证用户关联</li>
                                </ul>

                                <button
                                    onClick={handleRepairAccount}
                                    disabled={isLoading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? '修复中...' : '修复账户'}
                                </button>
                            </div>
                        )}

                        {!result.needsRepair && (
                            <div className="bg-green-900/30 border border-green-800 text-green-300 px-4 py-3 rounded-md">
                                <div className="flex items-center">
                                    <FiCheckCircle className="mr-2" />
                                    <span>账户状态正常，无需修复</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {result && result.step === 'repair' && (
                    <div className="mt-8 space-y-6">
                        <div className={`${result.repairResult.success ? 'bg-green-900/30 border-green-800 text-green-300' : 'bg-red-900/30 border-red-800 text-red-300'} px-4 py-3 rounded-md border`}>
                            <p className="font-medium">修复结果:</p>
                            <p className="mt-2">{result.repairResult.message}</p>

                            {tempPassword && (
                                <div className="mt-4 p-3 bg-blue-900/50 border border-blue-800 rounded-md">
                                    <p className="font-medium">临时密码:</p>
                                    <p className="mt-1 font-mono bg-gray-900 p-2 rounded select-all">{tempPassword}</p>
                                    <p className="mt-2 text-sm">请将此密码提供给用户，并建议他们立即更改。</p>
                                </div>
                            )}
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => {
                                    setResult(null);
                                    setEmail('');
                                    setTempPassword('');
                                }}
                                className="flex-1 flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
                            >
                                检查其他账户
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