'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase/client';
import { STORAGE_KEYS } from '@/app/lib/constants';
// 重命名导入的 User 类型以避免冲突
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

// 定义自定义用户类型
export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
    role?: string;
}

// 定义 AuthContext 类型
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    isLoading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<{ error?: string }>;
    login: (email: string, password: string) => Promise<{ error?: string }>;
    signOut: () => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<{ data?: any; error?: any }>;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
}

// 创建 AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 自定义 hook 以使用 AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// 定义 Props 类型
interface AuthProviderProps {
    children: ReactNode;
}

// 认证提供者组件
export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // 初始化时检查用户会话
    useEffect(() => {
        // 从localStorage获取用户信息（用于客户端渲染）
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse stored user', e);
            }
        }

        // 从Supabase获取当前会话
        const fetchSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('Error fetching session:', error);
                    setUser(null);
                } else if (data?.session?.user) {
                    // 获取用户详细信息
                    const { data: profileData } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', data.session.user.id)
                        .single();

                    if (profileData) {
                        const userData: User = {
                            id: data.session.user.id,
                            email: data.session.user.email!,
                            name: profileData.full_name,
                            avatar: profileData.avatar_url,
                        };

                        setUser(userData);
                        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
                    }
                }
            } catch (err) {
                console.error('Session fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();

        // 订阅认证状态变化
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                // 获取用户详细信息
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (profileData) {
                    const userData: User = {
                        id: session.user.id,
                        email: session.user.email!,
                        name: profileData.full_name,
                        avatar: profileData.avatar_url,
                    };

                    setUser(userData);
                    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
                }
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                localStorage.removeItem(STORAGE_KEYS.USER);
            }
        });

        // 清理订阅
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    // 登录方法
    const signIn = async (email: string, password: string) => {
        console.log('AuthContext: Attempting login with', { email, passwordLength: password.length });
        setError(null);

        try {
            // 检查输入是否含有非 ASCII 字符，这可能导致请求失败
            if (/[^\x00-\x7F]/.test(email) || /[^\x00-\x7F]/.test(password)) {
                return { error: '邮箱或密码包含不支持的特殊字符' };
            }

            // 检查环境变量是否配置
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
                throw new Error('Supabase 环境变量未正确配置');
            }

            if (/[^\x00-\x7F]/.test(process.env.NEXT_PUBLIC_SUPABASE_URL) ||
                /[^\x00-\x7F]/.test(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
                console.error('环境变量包含非 ASCII 字符，可能导致连接问题');
                return { error: 'Supabase 配置错误：环境变量包含不支持的字符' };
            }

            console.log('使用 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 20) + '...');

            // 尝试登录
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Login error:', error.message);
                if (error.message === 'Failed to fetch') {
                    return { error: 'Supabase 连接失败，请检查网络连接或服务器配置' };
                }
                return { error: error.message };
            }

            if (data.user) {
                console.log('Login successful:', {
                    id: data.user.id,
                    email: data.user.email,
                });

                // 获取用户详细信息
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', data.user.id)
                    .single();

                if (profileError) {
                    console.error('Error fetching profile:', profileError);
                    // 如果找不到配置文件，则创建一个
                    if (profileError.code === 'PGRST116') {
                        console.log('Profile not found, creating a new one');

                        const { error: insertError } = await supabase
                            .from('profiles')
                            .insert([
                                {
                                    id: data.user.id,
                                    email: data.user.email,
                                    full_name: data.user.email?.split('@')[0] || 'User',
                                    updated_at: new Date().toISOString(),
                                }
                            ]);

                        if (insertError) {
                            console.error('Failed to create profile:', insertError);
                        }
                    }
                }

                // 使用配置文件数据或回退到基本用户数据
                const userData: User = {
                    id: data.user.id,
                    email: data.user.email!,
                    name: profileData?.full_name || data.user.email!.split('@')[0],
                    avatar: profileData?.avatar_url,
                };

                setUser(userData);
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
                return {};
            }

            return { error: '登录失败：无效的用户数据' };
        } catch (error: any) {
            console.error('Unexpected login error:', error.message);
            return { error: error.message };
        }
    };

    // 添加 login 别名以保持兼容性
    const login = signIn;

    // 注册方法
    const signup = async (email: string, password: string, name: string) => {
        console.log('AuthContext: Attempting signup with', { email, name, passwordLength: password.length });
        setError(null);

        try {
            // 1. 创建用户认证
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (error) {
                console.error('Signup error:', error.message);
                return { error: error.message };
            }

            if (data.user) {
                console.log('Signup successful. Creating profile for user:', data.user.id);

                // 2. 手动创建用户配置文件
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: data.user.id,
                            email: email,
                            full_name: name,
                            avatar_url: null,
                            updated_at: new Date().toISOString(),
                        }
                    ]);

                if (profileError) {
                    console.error('Failed to create user profile:', profileError);
                    return { error: `用户创建成功，但个人资料设置失败: ${profileError.message}` };
                }

                console.log('User profile created successfully');

                // 用户已创建，返回成功
                return { data: data.user };
            }

            return { error: '注册过程中发生未知错误' };
        } catch (error: any) {
            console.error('Unexpected signup error:', error.message);
            return { error: error.message };
        }
    };

    // 登出方法
    const signOut = async () => {
        console.log('AuthContext: Logging out');

        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error('Logout error:', error.message);
                setError(error.message);
                return;
            }

            setUser(null);
            localStorage.removeItem(STORAGE_KEYS.USER);
            router.push('/');
            console.log('Logout successful');
        } catch (error: any) {
            console.error('Unexpected logout error:', error.message);
            setError(error.message);
        }
    };

    // GitHub登录
    const signInWithGithub = async () => {
        console.log('AuthContext: Attempting GitHub login');

        try {
            // 检查环境变量
            if (!process.env.NEXT_PUBLIC_SITE_URL) {
                console.warn('NEXT_PUBLIC_SITE_URL not set, using window.location.origin');
            }

            const redirectTo = process.env.NEXT_PUBLIC_SITE_URL
                ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
                : `${window.location.origin}/auth/callback`;

            console.log('GitHub login redirect URL:', redirectTo);

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo
                }
            });

            if (error) {
                console.error('GitHub login error:', error.message);
                throw error;
            }

            console.log('GitHub login initiated:', data);
            return data;
        } catch (error: any) {
            console.error('Unexpected GitHub login error:', error.message);
            throw error;
        }
    };

    // 重置密码
    const resetPassword = async (email: string) => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;
        } catch (error: any) {
            console.error('Reset password error:', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // 更新用户资料
    const updateProfile = async (data: Partial<User>) => {
        setLoading(true);

        if (!user) {
            throw new Error('没有用户登录');
        }

        try {
            // 更新用户元数据
            const { error: updateError } = await supabase.auth.updateUser({
                data: {
                    full_name: data.name,
                },
            });

            if (updateError) throw updateError;

            // 更新profiles表
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    full_name: data.name,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', user.id);

            if (profileError) throw profileError;

            // 更新本地状态
            setUser({
                ...user,
                ...data,
            });

        } catch (error: any) {
            console.error('Update profile error:', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        isLoading: loading,
        error,
        signIn,
        login,
        signup,
        signInWithGoogle: async () => {
            // Implementation needed
        },
        signInWithGithub,
        signOut,
        resetPassword,
        updateProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 