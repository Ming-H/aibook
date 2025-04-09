'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client'; // 确保导入 supabase
import { Eye, EyeOff, Lock, AtSign, Github } from "lucide-react";

export default function SignIn() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') || '/dashboard';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDevTools, setShowDevTools] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 检查用户是否已登录
    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                if (data.session) {
                    router.push(redirectTo as any);
                }
            } catch (err) {
                console.error('检查会话失败:', err);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, [router, redirectTo]);

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

            console.log('开始登录流程...');

            // 增加错误处理明确性
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) {
                console.error('登录失败:', signInError);

                // 根据错误类型提供更明确的错误信息
                if (signInError.status === 400) {
                    if (signInError.message.includes('Invalid login credentials')) {
                        setError('邮箱或密码不正确，请重试');
                    } else {
                        setError(`登录请求无效: ${signInError.message}`);
                    }
                } else if (signInError.status === 422) {
                    setError('邮箱格式不正确');
                } else if (signInError.message.includes('fetch')) {
                    setError('连接服务器失败，请检查网络连接');
                } else {
                    setError(`登录失败: ${signInError.message}`);
                }
            } else {
                console.log('登录成功，准备重定向');
                // 解决类型问题，使用明确的类型断言
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

            // 直接使用 Supabase 客户端进行 GitHub OAuth 登录
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            });

            if (error) {
                console.error('GitHub登录失败:', error);
                setError(`GitHub登录失败: ${error.message}`);
            }
            // 注意：这里不需要导航，因为 OAuth 流程会自动重定向
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

            // 使用测试账号直接登录
            const testEmail = '1518246548@qq.com'; // 使用您知道存在的账号
            const testPassword = '123h456m';       // 使用该账号的密码

            const { data, error } = await supabase.auth.signInWithPassword({
                email: testEmail,
                password: testPassword,
            });

            if (error) {
                console.error('快速登录失败:', error.message);
                setError(`快速登录失败: ${error.message}`);
            } else {
                console.log('快速登录成功，准备重定向');
                router.push(redirectTo as any);
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

    // 开发者工具部分
    const debugSupabase = async () => {
        try {
            setError(null);

            // 显示环境变量
            console.log('Supabase 环境变量:', {
                url: process.env.NEXT_PUBLIC_SUPABASE_URL,
                hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
                hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                // 检查是否有非 ASCII 字符
                urlHasNonAscii: /[^\x00-\x7F]/.test(process.env.NEXT_PUBLIC_SUPABASE_URL || ''),
                keyHasNonAscii: /[^\x00-\x7F]/.test(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '')
            });

            // 测试连接
            const { data, error } = await supabase.from('profiles').select('count');

            if (error) {
                console.error('Supabase 连接测试失败:', error);
                setError(`Supabase 连接测试失败: ${error.message}`);
                return;
            }

            console.log('Supabase 连接测试成功:', data);
            alert('Supabase 连接测试成功，详情见控制台');

            // 检查 profiles 表是否存在
            try {
                const { data: profilesData, error: profilesError } = await supabase
                    .from('profiles')
                    .select('*')
                    .limit(5);

                if (profilesError) {
                    console.error('profiles 表查询失败:', profilesError);
                } else {
                    console.log('profiles 表数据样例:', profilesData);
                }
            } catch (err) {
                console.error('检查 profiles 表时出错:', err);
            }
        } catch (err: any) {
            console.error('调试 Supabase 时出错:', err);
            setError(`调试过程中发生错误: ${err.message}`);
        }
    };

    // 添加这个测试函数到您的组件中
    const testSupabaseAuth = async () => {
        try {
            setError(null);
            console.log('测试 Supabase 认证...');

            // 测试环境变量是否正确
            console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
            console.log('Anon Key 设置:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

            // 测试匿名查询
            const { data: countData, error: countError } = await supabase
                .from('profiles')
                .select('count');

            if (countError) {
                console.error('数据库查询错误:', countError);
                setError(`Supabase 连接测试失败: ${countError.message}`);
                return;
            }

            console.log('Supabase 连接测试成功:', countData);

            // 获取 auth.users 表数据（需要管理员权限）
            console.log('检查认证配置...');

            // 尝试登录
            console.log('尝试登录，使用:', { email, password: '***' });

            const authResponse = await supabase.auth.signInWithPassword({
                email: email || '1518246548@qq.com',
                password: password || '123h456m',
            });

            if (authResponse.error) {
                console.error('登录测试失败:', authResponse.error);
                console.log('错误代码:', authResponse.error.status);
                console.log('错误消息:', authResponse.error.message);
                setError(`登录测试失败: ${authResponse.error.message}`);

                // 检查密码是否正确编码
                if (authResponse.error.message === 'Invalid login credentials') {
                    console.log('可能是用户不存在或密码错误');

                    // 检查用户是否存在
                    const { data: userExists, error: userExistsError } = await supabase
                        .from('profiles')
                        .select('id')
                        .eq('email', email || '1518246548@qq.com')
                        .maybeSingle();

                    if (userExistsError) {
                        console.error('检查用户时出错:', userExistsError);
                    } else if (userExists) {
                        console.log('用户存在于 profiles 表中:', userExists);
                    } else {
                        console.log('用户在 profiles 表中不存在');
                    }
                }
                return;
            }

            console.log('登录测试成功');
            console.log('用户信息:', authResponse.data.user);
            alert('Supabase 连接和登录测试成功！');
        } catch (err: any) {
            console.error('测试过程中出错:', err);
            setError(`测试过程中出错: ${err.message}`);
        }
    };

    // 添加到测试函数中
    const testAuthConfig = async () => {
        try {
            setError(null);

            // 测试您的邮箱是否在 auth.users 表中
            console.log('检查认证状态...');

            // 获取当前会话
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            if (sessionError) {
                console.error('获取会话失败:', sessionError);
                return;
            }

            console.log('当前会话状态:', {
                hasSession: !!sessionData.session,
                user: sessionData.session?.user ? {
                    id: sessionData.session.user.id,
                    email: sessionData.session.user.email,
                } : null
            });

            // 创建新用户测试
            if (!email) {
                console.log('未输入邮箱，无法测试用户创建');
                return;
            }

            const testPassword = 'Test123456!';

            console.log(`尝试为 ${email} 创建新的测试用户...`);

            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password: testPassword,
            });

            if (signUpError) {
                console.error('创建测试用户失败:', signUpError);
                if (signUpError.message.includes('already registered')) {
                    console.log('用户已存在，尝试用新密码登录');

                    // 尝试用新密码登录
                    const { error: loginError } = await supabase.auth.signInWithPassword({
                        email,
                        password: testPassword,
                    });

                    if (loginError) {
                        console.error('使用测试密码登录失败:', loginError);
                    } else {
                        console.log('使用测试密码登录成功');
                        alert(`已成功用测试密码登录。新密码是: ${testPassword}`);
                    }
                }
            } else {
                console.log('创建测试用户成功:', {
                    id: signUpData.user?.id,
                    email: signUpData.user?.email,
                });

                // 创建对应的 profile
                if (signUpData.user) {
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .insert([
                            {
                                id: signUpData.user.id,
                                email: signUpData.user.email,
                                full_name: signUpData.user.email?.split('@')[0] || '测试用户',
                                updated_at: new Date().toISOString(),
                            }
                        ]);

                    if (profileError) {
                        console.error('创建测试用户的 profile 失败:', profileError);
                    } else {
                        console.log('创建测试用户的 profile 成功');
                        alert(`已成功创建测试用户和 profile。测试密码是: ${testPassword}`);
                    }
                }
            }
        } catch (err: any) {
            console.error('测试认证配置时出错:', err);
            setError(`测试认证配置时出错: ${err.message}`);
        }
    };

    // 在开发者工具部分添加这个新函数
    const advancedLoginTest = async () => {
        try {
            setError(null);
            console.log('执行高级登录测试...');

            // 1. 检查会话状态
            console.log('1. 检查当前会话状态...');
            const { data: sessionData } = await supabase.auth.getSession();
            console.log('当前会话:', sessionData.session ? '已登录' : '未登录');

            if (sessionData.session) {
                console.log('已登录用户:', sessionData.session.user.email);
                await supabase.auth.signOut();
                console.log('已登出，准备测试登录');
            }

            const testEmail = email || '1518246548@qq.com';
            const testPassword = password || '123h456m';

            // 2. 检查用户在 profiles 表中是否存在
            console.log(`2. 检查 ${testEmail} 在 profiles 表中是否存在...`);
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', testEmail)
                .maybeSingle();

            if (profileError) {
                console.error('检查 profile 时出错:', profileError);
            } else if (profileData) {
                console.log('在 profiles 表中找到用户:', profileData);
            } else {
                console.log('在 profiles 表中未找到用户');
            }

            // 3. 尝试登录
            console.log(`3. 尝试使用邮箱 ${testEmail} 和密码登录...`);
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: testEmail,
                password: testPassword
            });

            if (authError) {
                console.error('登录失败:', authError);

                // 4. 如果登录失败，尝试注册新账户
                console.log('4. 登录失败，尝试注册新账户...');
                const newPassword = 'NewPassword123!';

                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email: testEmail,
                    password: newPassword,
                    options: {
                        data: {
                            full_name: testEmail.split('@')[0]
                        }
                    }
                });

                if (signUpError) {
                    console.error('注册新账户失败:', signUpError);

                    if (signUpError.message.includes('already registered')) {
                        // 5. 如果账户已存在但无法登录，尝试重置密码
                        console.log('5. 账户已存在但无法登录，尝试重置密码...');
                        alert(`账户已存在但登录失败。请使用以下按钮发送密码重置邮件，或者尝试使用测试认证配置按钮重置账户。`);
                    }
                } else {
                    console.log('注册新账户成功:', signUpData);

                    if (profileData) {
                        console.log('profiles 表中已有记录，无需创建');
                    } else {
                        // 创建新的 profile 记录
                        console.log('在 profiles 表中创建记录...');
                        const { error: insertError } = await supabase
                            .from('profiles')
                            .insert([
                                {
                                    id: signUpData.user!.id,
                                    email: testEmail,
                                    full_name: testEmail.split('@')[0],
                                    updated_at: new Date().toISOString()
                                }
                            ]);

                        if (insertError) {
                            console.error('创建 profile 记录失败:', insertError);
                        } else {
                            console.log('成功创建 profile 记录');
                        }
                    }

                    alert(`已成功创建新账户！新密码是: ${newPassword}`);

                    // 尝试使用新密码登录
                    console.log('尝试使用新账户登录...');
                    const { data: newLoginData, error: newLoginError } = await supabase.auth.signInWithPassword({
                        email: testEmail,
                        password: newPassword
                    });

                    if (newLoginError) {
                        console.error('使用新账户登录失败:', newLoginError);
                    } else {
                        console.log('使用新账户登录成功:', newLoginData);
                        router.push(redirectTo as any);
                    }
                }
            } else {
                console.log('登录成功:', authData);
                alert('登录成功！即将重定向...');
                router.push(redirectTo as any);
            }
        } catch (err: any) {
            console.error('高级登录测试发生错误:', err);
            setError(`测试过程中出错: ${err.message}`);
        }
    };

    // 在开发者工具部分添加以下函数
    const checkAuthStatus = async () => {
        try {
            setError(null);
            const testEmail = email || '1518246548@qq.com';

            // 1. 检查 profiles 表中是否存在用户
            console.log(`检查 ${testEmail} 在 profiles 表中...`);
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', testEmail)
                .maybeSingle();

            if (profileError) {
                console.error('检查 profiles 表失败:', profileError);
                alert(`检查 profiles 表失败: ${profileError.message}`);
                return;
            }

            if (!profileData) {
                console.log('用户在 profiles 表中不存在');
                alert(`用户 ${testEmail} 在 profiles 表中不存在，请先创建用户`);
                return;
            }

            console.log('在 profiles 表中找到记录:', profileData);

            // 2. 创建新的认证用户(这会自动在 auth.users 表中添加记录)
            console.log('尝试在 auth.users 中创建用户...');

            const newPassword = 'Test123456!';
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: testEmail,
                password: newPassword
            });

            if (signUpError) {
                console.error('创建 auth 用户失败:', signUpError);

                if (signUpError.message.includes('already registered')) {
                    console.log('用户已在 auth.users 表中注册');
                    alert(`用户已在 auth.users 中注册，请尝试使用密码重置功能`);
                } else {
                    alert(`创建 auth 用户失败: ${signUpError.message}`);
                }
                return;
            }

            console.log('成功在 auth.users 中创建用户:', signUpData);
            alert(`已成功在 auth.users 中创建用户！新密码是: ${newPassword}`);

            // 3. 尝试用新密码登录
            console.log('尝试使用新创建的用户登录...');
            const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                email: testEmail,
                password: newPassword
            });

            if (loginError) {
                console.error('新用户登录失败:', loginError);
                alert(`新用户登录失败: ${loginError.message}`);
                return;
            }

            console.log('新用户登录成功!', loginData);
            alert('登录成功！即将跳转到仪表板');
            router.push(redirectTo as any);

        } catch (err: any) {
            console.error('检查认证状态时出错:', err);
            setError(`检查认证状态时出错: ${err.message}`);
        }
    };

    // 可以考虑将开发者工具部分提取为单独的组件
    const DevTools = ({
        email,
        password,
        redirectTo,
        router,
        setError
    }: {
        email: string;
        password: string;
        redirectTo: string;
        router: any;
        setError: (error: string | null) => void;
    }) => {
        // 开发者工具相关功能
        return (
            <div className="mt-6 pt-4 border-t border-gray-700">
                <h3 className="text-sm font-medium text-gray-400 mb-2">开发者工具</h3>
                <div className="grid grid-cols-1 gap-2">
                    <button
                        type="button"
                        onClick={handleQuickLogin}
                        className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        快速登录
                    </button>
                    <button
                        type="button"
                        onClick={checkAuthStatus}
                        className="px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        修复 auth.users 记录
                    </button>
                    {/* 其他开发工具按钮 */}
                </div>
            </div>
        );
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
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-white">登录您的账户</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        没有账户?{" "}
                        <Link href="/signup" className="font-medium text-blue-500 hover:text-blue-400">
                            立即注册
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">邮箱地址</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <AtSign className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="邮箱地址"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">密码</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="密码"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-500 hover:text-gray-400 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-700"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                                记住我
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link href="/forgot-password" className="font-medium text-blue-500 hover:text-blue-400">
                                忘记密码?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    登录中...
                                </span>
                            ) : (
                                "登录"
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-500">或继续使用</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleGitHubLogin}
                            className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            <Github className="h-5 w-5 mr-2" />
                            GitHub
                        </button>
                    </div>
                </div>

                {/* 开发者工具 - 仅在开发环境显示 */}
                {showDevTools && process.env.NODE_ENV === 'development' && (
                    <DevTools email={email} password={password} redirectTo={redirectTo} router={router} setError={setError} />
                )}
            </div>
        </div>
    );
} 