'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiCheck, FiX } from 'react-icons/fi';
import { useAuth } from '../../../lib/context/AuthContext';
import { supabase } from '../../../lib/supabase/client';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [error, setError] = useState('');
    const [emailStatus, setEmailStatus] = useState<'available' | 'taken' | 'checking' | null>(null);

    const router = useRouter();
    const { signup, signInWithGoogle, signInWithGithub } = useAuth();

    // 检查邮箱是否已注册
    useEffect(() => {
        const checkEmail = async () => {
            if (!email || !email.includes('@') || email.length < 5) return;

            setIsCheckingEmail(true);
            setEmailStatus('checking');

            try {
                // 延迟执行，避免频繁请求
                await new Promise(resolve => setTimeout(resolve, 500));

                const { data } = await supabase
                    .from('profiles')
                    .select('email')
                    .eq('email', email)
                    .maybeSingle();

                setEmailStatus(data ? 'taken' : 'available');
            } catch (err) {
                console.error('检查邮箱失败:', err);
                setEmailStatus(null);
            } finally {
                setIsCheckingEmail(false);
            }
        };

        checkEmail();
    }, [email]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // 基本验证
            if (!email || !password || !name) {
                setError('请填写所有必填字段');
                setIsLoading(false);
                return;
            }

            // 注册用户
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: name }
                }
            });

            if (signUpError) {
                throw new Error(signUpError.message);
            }

            if (!data.user) {
                throw new Error('注册过程中发生未知错误');
            }

            // 手动创建用户配置文件
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: data.user.id,
                        email: email,
                        display_name: name,
                        updated_at: new Date().toISOString()
                    }
                ]);

            if (profileError) {
                console.error('创建用户资料失败:', profileError);
                // 继续导航，不阻止用户体验
            }

            // 注册成功，导航到仪表板
            router.push('/dashboard');
        } catch (err: any) {
            console.error('注册失败:', err);
            setError(err.message || '注册失败，请检查您的信息并重试');
        } finally {
            setIsLoading(false);
        }
    };

    // 切换密码可见性
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 切换确认密码可见性
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">AIBook Studio</h1>
                    <h2 className="mt-6 text-2xl font-bold text-white">创建您的账户</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        已有账户？{' '}
                        <Link href="/signin" className="text-blue-500 hover:text-blue-400">
                            立即登录
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                您的名字
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <FiUser />
                                </span>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="张三"
                                />
                            </div>
                        </div>

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
                                    className={`block w-full pl-10 pr-10 py-2 border rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${emailStatus === 'available'
                                        ? 'border-green-500'
                                        : emailStatus === 'taken'
                                            ? 'border-red-500'
                                            : 'border-gray-700'
                                        }`}
                                    placeholder="example@email.com"
                                />
                                {emailStatus && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        {isCheckingEmail ? (
                                            <div className="h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                                        ) : emailStatus === 'available' ? (
                                            <FiCheck className="text-green-500" />
                                        ) : (
                                            <FiX className="text-red-500" />
                                        )}
                                    </span>
                                )}
                            </div>
                            {emailStatus === 'taken' && (
                                <p className="mt-1 text-sm text-red-400">
                                    此邮箱已注册，请
                                    <Link href="/signin" className="text-blue-500 hover:text-blue-400 mx-1">
                                        登录
                                    </Link>
                                    或
                                    <Link href="/account-recovery" className="text-blue-500 hover:text-blue-400 ml-1">
                                        找回账户
                                    </Link>
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                密码
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <FiLock />
                                </span>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-2 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="至少8个字符"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                                    onClick={togglePasswordVisibility}
                                    tabIndex={-1}
                                    aria-label={showPassword ? "隐藏密码" : "显示密码"}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {password && password.length < 8 && (
                                <p className="mt-1 text-sm text-red-400">
                                    密码必须至少包含8个字符
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                                确认密码
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <FiLock />
                                </span>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`block w-full pl-10 pr-10 py-2 border rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${confirmPassword && password !== confirmPassword
                                        ? 'border-red-500'
                                        : 'border-gray-700'
                                        }`}
                                    placeholder="再次输入密码"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                                    onClick={toggleConfirmPasswordVisibility}
                                    tabIndex={-1}
                                    aria-label={showConfirmPassword ? "隐藏密码" : "显示密码"}
                                >
                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="mt-1 text-sm text-red-400">
                                    两次输入的密码不匹配
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400 mb-4">
                            通过注册，您同意我们的
                            <Link href="/terms" className="text-blue-500 hover:text-blue-400 mx-1">
                                服务条款
                            </Link>
                            和
                            <Link href="/privacy" className="text-blue-500 hover:text-blue-400 ml-1">
                                隐私政策
                            </Link>
                            。
                        </p>
                        <button
                            type="submit"
                            disabled={isLoading || emailStatus === 'taken'}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading || emailStatus === 'taken' ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoading ? '注册中...' : '注册'}
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">或通过以下方式继续</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
                            onClick={() => signInWithGoogle()}
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.545, 10.239v3.821h5.445c-0.712, 2.315-2.647, 3.972-5.445, 3.972-3.332, 0-6.033-2.701-6.033-6.032s2.701-6.032, 6.033-6.032c1.498, 0, 2.866, 0.549, 3.921, 1.453l2.814-2.814C17.503, 2.988, 15.139, 2, 12.545, 2 7.021, 2, 2.543, 6.477, 2.543, 12s4.478, 10, 10.002, 10c8.396, 0, 10.249-7.85, 9.426-11.748l-9.426, 0.013z" />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
                            onClick={() => signInWithGithub()}
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12, 0c-6.626, 0-12, 5.373-12, 12 0, 5.302, 3.438, 9.8, 8.207, 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0, 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0, .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 