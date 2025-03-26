'use client';

import { createClient as supabaseCreateClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

// 这些值应该在环境变量中设置
// 对于本地开发，可以在.env.local文件中设置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
    console.warn('Supabase Anonymous Key is not set. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.');
}

// 创建 Supabase 客户端
export const supabase = supabaseCreateClient(supabaseUrl, supabaseAnonKey);

// 创建客户端的函数（用于服务器组件）
export function createServerClient() {
    return supabaseCreateClient(supabaseUrl, supabaseAnonKey);
}

// 确保这个引用能够在客户端组件中正确获取
export { supabase as default };

// 辅助函数：从响应中提取数据或错误
export const extractDataOrError = <T>(
    { data, error }: { data: T | null; error: any }
): T => {
    if (error) throw error;
    if (!data) throw new Error('没有返回数据');
    return data;
};

// 登录方法
export async function signIn({ email, password }: { email: string; password: string }) {
    console.log('尝试登录:', { email, passwordLength: password.length });

    try {
        // 检查输入是否有效
        if (!email || !password) {
            console.error('登录失败: 邮箱或密码为空');
            return {
                data: null,
                error: { message: '邮箱和密码不能为空' }
            };
        }

        // 调用Supabase登录
        const result = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        // 记录结果（不含敏感信息）
        console.log('登录结果:', {
            success: !!result.data.user,
            errorMessage: result.error?.message,
            user: result.data.user ? {
                id: result.data.user.id,
                email: result.data.user.email,
                emailConfirmed: result.data.user.email_confirmed_at ? true : false
            } : null
        });

        return result;
    } catch (error: any) {
        console.error('登录过程中发生异常:', error.message);
        return {
            data: null,
            error: { message: `登录过程中发生异常: ${error.message}` }
        };
    }
}

// 快速登录测试（开发模式专用）
export async function quickLoginTest() {
    if (process.env.NODE_ENV !== 'development') {
        return { error: { message: '此功能仅在开发模式可用' } };
    }

    console.log('使用测试账号登录');
    return supabase.auth.signInWithPassword({
        email: 'dev@example.com',
        password: 'dev_mode_123',
    });
}

// 注册方法
export async function signUp({ email, password, name }: { email: string; password: string; name: string }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
            },
        },
    });

    if (!error && data?.user) {
        // 创建用户配置文件
        await supabase.from('user_profiles').insert([
            {
                user_id: data.user.id,
                display_name: name,
                email: email
            }
        ]);
    }

    return { data, error };
}

// 登出方法
export async function signOut() {
    return supabase.auth.signOut();
}

// 获取当前用户
export async function getCurrentUser() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user;
}

// 获取用户个人资料
export async function getUserProfile(userId: string) {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

    return { data, error };
}

// 更新用户个人资料
export async function updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', userId);

    return { data, error };
}

// 创建新项目
export async function createProject(projectData: any) {
    const { data, error } = await supabase
        .from('projects')
        .insert([projectData]);

    return { data, error };
}

// 获取用户项目列表
export async function getUserProjects(userId: string) {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    return { data, error };
}

// 获取单个项目详情
export async function getProject(projectId: string) {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

    return { data, error };
}

// 更新项目信息
export async function updateProject(projectId: string, updates: any) {
    const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId);

    return { data, error };
}

// 删除项目
export async function deleteProject(projectId: string) {
    const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

    return { data, error };
}

// 通用数据类型定义
export type Collaborator = {
    id: string
    role: 'viewer' | 'editor' | 'admin'
    user: {
        id: string
        name: string
        email: string
        avatar_url?: string
    }
}

export type CreativeDNA = {
    id: string
    user_id: string
    style_preferences: any
    creative_habits: any
    insights: any
    created_at: string
    updated_at: string
}

export type Project = {
    id: string
    name: string
    description?: string
    thumbnail_url?: string
    created_at: string
    updated_at: string
    user_id: string
    category?: string
    status: 'draft' | 'active' | 'archived'
    collaborators?: Collaborator[]
}

export type Workflow = {
    id: string
    name: string
    description?: string
    created_at: string
    updated_at: string
    user_id: string
    steps: WorkflowStep[]
    category?: string
    is_template: boolean
    thumbnail_url?: string
    collaborators?: Collaborator[]
}

export type WorkflowStep = {
    id: string
    workflow_id: string
    name: string
    description?: string
    type: 'ai_generation' | 'user_input' | 'content_edit' | 'review' | 'export'
    order: number
    settings: any
    next_steps: string[]
    ai_prompt?: string
    created_at: string
    updated_at: string
} 