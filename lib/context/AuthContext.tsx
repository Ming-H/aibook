'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { STORAGE_KEYS } from '@/app/lib/constants';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

// 创建Supabase客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 定义用户类型
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
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
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
                            name: profileData.display_name,
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
                        name: profileData.display_name,
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

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Login error:', error.message);
                setError(error.message);
                return;
            }

            if (data.user) {
                console.log('Login successful:', {
                    id: data.user.id,
                    email: data.user.email,
                    emailConfirmed: data.user.email_confirmed_at ? true : false
                });
                setUser(data.user);
            }
        } catch (error: any) {
            console.error('Unexpected login error:', error.message);
            setError(error.message);
        }
    };

    // 注册方法
    const signup = async (email: string, password: string, name: string) => {
        console.log('AuthContext: Attempting signup with', { email, name, passwordLength: password.length });

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                    // 确保邮箱验证重定向到正确URL
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                console.error('Signup error:', error.message);
                return { error };
            }

            if (data.user) {
                console.log('Signup successful:', {
                    id: data.user.id,
                    email: data.user.email,
                    emailConfirmed: data.user.email_confirmed_at ? true : false
                });
            }

            return { data, error: null };
        } catch (error: any) {
            console.error('Unexpected signup error:', error.message);
            return { error: { message: error.message } };
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