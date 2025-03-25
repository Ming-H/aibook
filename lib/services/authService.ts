'use server';

import type { User } from './userService';
import { getUserByEmail } from './userService';

export type AuthSession = {
    user: User | null;
    isAuthenticated: boolean;
    error?: string | null;
};

// 模拟会话状态（实际中应该使用真实的会话管理）
let mockSession: AuthSession = {
    user: {
        id: 'user1',
        email: 'zhangsan@example.com',
        username: 'zhangsan',
        display_name: '张三',
        avatar_url: 'https://via.placeholder.com/150?text=ZS',
        bio: '热爱技术和编程的前端开发者，专注于React和Next.js生态。',
        website: 'https://zhangsan.example.com',
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
        role: 'admin',
        last_login: new Date().toISOString()
    },
    isAuthenticated: true
};

/**
 * 获取当前会话状态
 * @returns 当前会话信息
 */
export async function getSession(): Promise<AuthSession> {
    try {
        return mockSession;
    } catch (error) {
        console.error('Error in getSession:', error);
        return { user: null, isAuthenticated: false, error: 'Failed to get session' };
    }
}

/**
 * 用户登录
 * @param email 用户邮箱
 * @param password 用户密码
 * @returns 会话信息
 */
export async function signIn(email: string, password: string): Promise<AuthSession> {
    try {
        console.log('Signing in with email:', email);

        // 模拟登录验证
        if (email === 'zhangsan@example.com' && password === 'password123') {
            const user = await getUserByEmail(email);

            if (user) {
                mockSession = {
                    user,
                    isAuthenticated: true
                };
                return mockSession;
            }
        }

        return {
            user: null,
            isAuthenticated: false,
            error: '邮箱或密码不正确'
        };
    } catch (error) {
        console.error('Error in signIn:', error);
        return {
            user: null,
            isAuthenticated: false,
            error: '登录时出现错误'
        };
    }
}

/**
 * 用户注册
 * @param email 用户邮箱
 * @param password 用户密码
 * @param username 用户名
 * @returns 会话信息
 */
export async function signUp(
    email: string,
    password: string,
    username: string
): Promise<AuthSession> {
    try {
        console.log('Signing up with email:', email);

        // 模拟注册流程
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return {
                user: null,
                isAuthenticated: false,
                error: '该邮箱已被注册'
            };
        }

        // 模拟创建新用户
        const newUser: User = {
            id: Math.random().toString(36).substring(2, 9),
            email,
            username,
            display_name: username,
            created_at: new Date().toISOString(),
            role: 'user',
            last_login: new Date().toISOString()
        };

        // 更新模拟会话
        mockSession = {
            user: newUser,
            isAuthenticated: true
        };

        return mockSession;
    } catch (error) {
        console.error('Error in signUp:', error);
        return {
            user: null,
            isAuthenticated: false,
            error: '注册时出现错误'
        };
    }
}

/**
 * 用户登出
 * @returns 操作是否成功
 */
export async function signOut(): Promise<boolean> {
    try {
        console.log('Signing out');

        // 清除模拟会话
        mockSession = {
            user: null,
            isAuthenticated: false
        };

        return true;
    } catch (error) {
        console.error('Error in signOut:', error);
        return false;
    }
}

/**
 * 发送密码重置链接
 * @param email 用户邮箱
 * @returns 操作是否成功
 */
export async function sendPasswordResetEmail(email: string): Promise<boolean> {
    try {
        console.log('Sending password reset email to:', email);

        // 模拟发送密码重置邮件
        return true;
    } catch (error) {
        console.error('Error in sendPasswordResetEmail:', error);
        return false;
    }
}

/**
 * 重置用户密码
 * @param token 重置令牌
 * @param newPassword 新密码
 * @returns 操作是否成功
 */
export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
        console.log('Resetting password with token:', token);

        // 模拟密码重置
        return true;
    } catch (error) {
        console.error('Error in resetPassword:', error);
        return false;
    }
}

/**
 * 更新用户密码
 * @param userId 用户ID
 * @param currentPassword 当前密码
 * @param newPassword 新密码
 * @returns 操作是否成功
 */
export async function updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
): Promise<boolean> {
    try {
        console.log('Updating password for user:', userId);

        // 模拟密码更新
        if (currentPassword === 'password123') {
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error in updatePassword:', error);
        return false;
    }
} 