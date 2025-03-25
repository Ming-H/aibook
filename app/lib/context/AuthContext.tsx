'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 用户类型定义
export type User = {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
    role?: 'user' | 'admin';
};

// 认证上下文类型
type AuthContextType = {
    user: User | null;
    loading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, name?: string) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (userData: Partial<User>) => Promise<void>;
};

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 提供者属性类型
type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 初始化后检查认证状态
    useEffect(() => {
        const checkAuthState = async () => {
            try {
                // 这里是模拟检查本地存储中的用户信息
                const storedUser = localStorage.getItem('aibook_user');

                if (storedUser) {
                    // 如果有存储的用户信息，解析并设置
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Failed to restore auth state:', error);
            } finally {
                // 无论如何，都设置加载完成
                setLoading(false);
            }
        };

        checkAuthState();
    }, []);

    // 登录函数
    const signIn = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            // 模拟API请求延迟
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 模拟验证，实际应用中这里应该调用真实的API
            if (email && password) {
                // 模拟成功登录的用户数据
                const userData: User = {
                    id: '123456',
                    email,
                    name: email.split('@')[0],
                    avatar: '/placeholder-avatar.jpg',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    role: 'user'
                };

                // 存储到本地存储
                localStorage.setItem('aibook_user', JSON.stringify(userData));

                // 更新状态
                setUser(userData);
            } else {
                throw new Error('请提供邮箱和密码');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '登录失败，请重试');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 注册函数
    const signUp = async (email: string, password: string, name?: string) => {
        setLoading(true);
        setError(null);
        try {
            // 模拟API请求延迟
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 模拟验证，实际应用中这里应该调用真实的API
            if (email && password) {
                // 模拟成功注册的用户数据
                const userData: User = {
                    id: `user_${Math.random().toString(36).substr(2, 9)}`,
                    email,
                    name: name || email.split('@')[0],
                    avatar: '/placeholder-avatar.jpg',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    role: 'user'
                };

                // 存储到本地存储
                localStorage.setItem('aibook_user', JSON.stringify(userData));

                // 更新状态
                setUser(userData);
            } else {
                throw new Error('请提供邮箱和密码');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '注册失败，请重试');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 注销函数
    const signOut = async () => {
        setLoading(true);
        try {
            // 模拟API请求延迟
            await new Promise(resolve => setTimeout(resolve, 500));

            // 清除本地存储
            localStorage.removeItem('aibook_user');

            // 更新状态
            setUser(null);
        } catch (err) {
            console.error('Sign out error:', err);
        } finally {
            setLoading(false);
        }
    };

    // 重置密码函数
    const resetPassword = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            // 模拟API请求延迟
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 实际应用中，这里会调用密码重置API
            if (!email) {
                throw new Error('请提供邮箱地址');
            }

            // 假设密码重置邮件发送成功
            return;
        } catch (err) {
            setError(err instanceof Error ? err.message : '密码重置失败，请重试');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 更新用户资料
    const updateProfile = async (userData: Partial<User>) => {
        setLoading(true);
        setError(null);
        try {
            // 模拟API请求延迟
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (user) {
                // 更新用户数据
                const updatedUser = {
                    ...user,
                    ...userData,
                    updatedAt: new Date().toISOString()
                };

                // 更新本地存储
                localStorage.setItem('aibook_user', JSON.stringify(updatedUser));

                // 更新状态
                setUser(updatedUser);
            } else {
                throw new Error('用户未登录');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '更新资料失败，请重试');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // 构建上下文值
    const value = {
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// 自定义Hook，用于访问认证上下文
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 