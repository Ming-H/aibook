'use server';

import type { User } from './userService';
import { getUserByEmail } from './userService';
import { createClient } from '../supabase/client';

export type AuthSession = {
    user: User | null;
    isAuthenticated: boolean;
    error?: string | null;
};

const supabase = createClient();

export async function getSession(): Promise<AuthSession> {
    try {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
            return { user: null, isAuthenticated: false, error: error?.message };
        }

        // 获取完整用户资料
        const { data: userData } = await supabase
            .from('profiles')
            .select('id, email, username, display_name, role, created_at, updated_at')
            .eq('id', data.session.user.id)
            .single();

        if (!userData) {
            return { user: null, isAuthenticated: false, error: '用户资料不存在' };
        }

        return {
            user: {
                id: userData.id,
                email: userData.email,
                username: userData.username,
                display_name: userData.display_name,
                role: userData.role,
                created_at: userData.created_at
            },
            isAuthenticated: true
        };
    } catch (error) {
        console.error('Session error:', error);
        return { user: null, isAuthenticated: false, error: '无法获取会话信息' };
    }
}

export async function login(email: string, password: string): Promise<AuthSession> {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return { user: null, isAuthenticated: false, error: error.message };
        }

        // 获取完整用户资料
        const { data: userData } = await supabase
            .from('profiles')
            .select('id, email, username, display_name, role, created_at, updated_at')
            .eq('id', data.user.id)
            .single();

        return {
            user: userData as User,
            isAuthenticated: true
        };
    } catch (error) {
        console.error('Login error:', error);
        return { user: null, isAuthenticated: false, error: '登录过程中发生错误' };
    }
}

export async function signUp(
    email: string,
    password: string,
    username: string
): Promise<AuthSession> {
    try {
        // 邮箱唯一性检查
        const { count } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('email', email);

        if (count && count > 0) {
            return { user: null, isAuthenticated: false, error: '该邮箱已被注册' };
        }

        // 创建新用户
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    display_name: username
                }
            }
        });

        if (error) {
            return { user: null, isAuthenticated: false, error: error.message };
        }

        // 创建用户资料
        const { data: userData } = await supabase
            .from('profiles')
            .insert({
                id: data.user!.id,
                email,
                username,
                display_name: username,
                role: 'user',
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        return {
            user: userData as User,
            isAuthenticated: true
        };
    } catch (error) {
        console.error('Registration error:', error);
        return { user: null, isAuthenticated: false, error: '注册过程中发生错误' };
    }
}

export async function signOut(): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase.auth.signOut();
        return error ? { success: false, error: error.message } : { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: '登出过程中发生错误' };
    }
}
