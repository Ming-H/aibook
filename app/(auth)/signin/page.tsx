'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { quickLoginTest } from '@/lib/supabase/client';

export default function SignIn() {
    const { user, login, signInWithGithub, isLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') || '/dashboard';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDevTools, setShowDevTools] = useState(false);

    // 如果用户已登录，重定向到dashboard
    useEffect(() => {
        if (user) {
            router.push(redirectTo);
        }
    }, [user, router, redirectTo]);

    // 检查是否为开发环境
    useEffect(() => {
        setShowDevTools(process.env.NODE_ENV === 'development');
    }, []);

    // 处理表单提交
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            // 输入验证
            if (!email || !password) {
                throw new Error('请输入邮箱和密码');
            }

            // 尝试登录
            console.log('开始登录流程');
            const { error: loginError } = await login(email, password);

            if (loginError) {
                console.error('登录失败:', loginError.message);
                if (loginError.message.includes('Invalid login credentials')) {
                    setError('邮箱或密码不正确，请重试');
                } else {
                    setError(`登录失败: ${loginError.message}`);
                }
            } else {
                console.log('登录成功，准备重定向');
                router.push(redirectTo);
            }
        } catch (err: any) {
            console.error('登录过程发生异常:', err);
            setError(`登录过程发生错误: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // GitHub登录
    const handleGitHubLogin = async () => {
        try {
            setError(null);
            await signInWithGithub();
        } catch (err: any) {
            console.error('GitHub登录错误:', err);
            setError(`GitHub登录失败: ${err.message}`);
        }
    };

    // 开发者模式快速登录
    const handleQuickLogin = async () => {
        try {
            setError(null);
            setIsSubmitting(true);
            const { error: loginError } = await quickLoginTest();

            if (loginError) {
                console.error('快速登录失败:', loginError.message);
                setError(`快速登录失败: ${loginError.message}`);
            } else {
                console.log('快速登录成功，准备重定向');
                router.push(redirectTo);
            }
        } catch (err: any) {
            console.error('快速登录异常:', err);
            setError(`快速登录过程发生错误: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 显示环境信息
    const showEnvironmentInfo = () => {
        console.log({
            NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
            SUPABASE_URL_SET: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            NEXT_PUBLIC_SUPABASE_ANON_KEY_SET: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            NODE_ENV: process.env.NODE_ENV
        });
        alert('环境信息已打印到控制台');
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-center text-sm text-gray-600">加载中...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold">
                    登录您的账户
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    没有账户？{' '}
                    <Link href="/signup" className="font-medium text-primary hover:text-primary/90">
                        立即注册
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-md p-3 mb-6">
                            <p>{error}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">
                                密码
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm">
                                    记住我
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/account-recovery" className="font-medium text-primary hover:text-primary/90">
                                    忘记密码?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50"
                            >
                                {isSubmitting ? '登录中...' : '登录'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-card text-muted-foreground">或使用</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleGitHubLogin}
                                className="flex w-full justify-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-semibold hover:bg-accent/80"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                使用GitHub登录
                            </button>
                        </div>
                    </div>

                    {/* 开发者工具 - 仅在开发环境显示 */}
                    {showDevTools && (
                        <div className="mt-6 pt-4 border-t border-gray-600">
                            <p className="text-xs text-muted-foreground mb-2">开发者工具</p>
                            <div className="flex flex-col gap-2">
                                <button
                                    type="button"
                                    onClick={handleQuickLogin}
                                    className="flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800"
                                >
                                    开发者快速登录
                                </button>
                                <button
                                    type="button"
                                    onClick={showEnvironmentInfo}
                                    className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                                >
                                    检查环境变量
                                </button>
                                <Link
                                    href="/env-check"
                                    className="flex w-full justify-center rounded-md bg-purple-700 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-800"
                                >
                                    Supabase环境检查
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 