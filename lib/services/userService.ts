'use server';

import { supabase } from '../supabase/client';
import { v4 as uuidv4 } from 'uuid';

export type User = {
    id: string;
    email: string;
    username: string;
    display_name: string;
    avatar_url?: string;
    bio?: string;
    website?: string;
    created_at: string;
    updated_at?: string;
    role?: string;
    last_login?: string;
};

// 模拟用户数据
const mockUsers: User[] = [
    {
        id: 'user1',
        email: 'zhangsan@example.com',
        username: 'zhangsan',
        display_name: '张三',
        avatar_url: 'https://via.placeholder.com/150?text=ZS',
        bio: '热爱技术和编程的前端开发者，专注于React和Next.js生态。',
        website: 'https://zhangsan.example.com',
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(), // 30天前
        updated_at: new Date(Date.now() - 5 * 86400000).toISOString(), // 5天前
        role: 'admin',
        last_login: new Date(Date.now() - 86400000).toISOString() // 1天前
    },
    {
        id: 'user2',
        email: 'lisi@example.com',
        username: 'lisi',
        display_name: '李四',
        avatar_url: 'https://via.placeholder.com/150?text=LS',
        bio: '全栈开发者，喜欢探索新技术。',
        created_at: new Date(Date.now() - 60 * 86400000).toISOString(), // 60天前
        role: 'author',
        last_login: new Date(Date.now() - 3 * 86400000).toISOString() // 3天前
    }
];

/**
 * 获取所有用户
 * @returns 用户列表
 */
export async function getAllUsers() {
    try {
        console.log('Getting all users with mock data');
        return mockUsers;
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        return [];
    }
}

/**
 * 根据ID获取用户
 * @param userId 用户ID
 * @returns 用户详情
 */
export async function getUserById(userId: string) {
    try {
        return mockUsers.find(user => user.id === userId) || null;
    } catch (error) {
        console.error('Error in getUserById:', error);
        return null;
    }
}

/**
 * 根据用户名获取用户
 * @param username 用户名
 * @returns 用户详情
 */
export async function getUserByUsername(username: string) {
    try {
        return mockUsers.find(user => user.username === username) || null;
    } catch (error) {
        console.error('Error in getUserByUsername:', error);
        return null;
    }
}

/**
 * 根据邮箱获取用户
 * @param email 邮箱地址
 * @returns 用户详情
 */
export async function getUserByEmail(email: string) {
    try {
        return mockUsers.find(user => user.email === email) || null;
    } catch (error) {
        console.error('Error in getUserByEmail:', error);
        return null;
    }
}

/**
 * 创建新用户
 * @param userData 用户数据
 * @returns 创建的用户
 */
export async function createUser(userData: Partial<User>) {
    try {
        console.log('Creating user with data:', userData);
        const newUser: User = {
            id: Math.random().toString(36).substring(2, 9),
            email: userData.email || '',
            username: userData.username || '',
            display_name: userData.display_name || userData.username || '',
            avatar_url: userData.avatar_url,
            bio: userData.bio,
            website: userData.website,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            role: userData.role || 'user',
            last_login: new Date().toISOString()
        };

        return newUser;
    } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
    }
}

/**
 * 更新用户信息
 * @param userId 用户ID
 * @param userData 要更新的用户数据
 * @returns 更新后的用户
 */
export async function updateUser(userId: string, userData: Partial<User>) {
    try {
        console.log('Updating user:', userId, userData);
        const user = await getUserById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const updatedUser = {
            ...user,
            ...userData,
            updated_at: new Date().toISOString()
        };

        return updatedUser;
    } catch (error) {
        console.error('Error in updateUser:', error);
        throw error;
    }
}

/**
 * 获取当前登录用户
 * @returns 当前用户信息或null
 */
export async function getCurrentUser() {
    try {
        // 模拟当前用户是第一个用户
        return mockUsers[0];
    } catch (error) {
        console.error('Error in getCurrentUser:', error);
        return null;
    }
}

/**
 * 检查是否有此邮箱的用户
 */
export async function checkUserExists(email: string) {
    try {
        // 检查profiles表
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        if (profileError) {
            console.error('检查profiles表错误:', profileError);
            throw profileError;
        }

        // 检查auth.users
        try {
            const { data: authData, error: authError } = await supabase.auth.admin.getUserByEmail(email);

            if (authError) {
                console.log('没有找到认证用户:', email);
                return {
                    exists: !!profileData,
                    profile: profileData,
                    auth: null,
                    needsRepair: !!profileData
                };
            }

            // 如果都有记录，确认id是否匹配
            if (profileData && authData) {
                const needsRepair = profileData.id !== authData.id;
                return {
                    exists: true,
                    profile: profileData,
                    auth: authData,
                    needsRepair
                };
            }

            return {
                exists: !!authData,
                profile: profileData,
                auth: authData,
                needsRepair: !profileData && !!authData
            };
        } catch (err) {
            console.log('无法检查auth用户，可能权限不足');
            // 回退到只检查profiles
            return {
                exists: !!profileData,
                profile: profileData,
                auth: null,
                needsRepair: false
            };
        }
    } catch (error) {
        console.error('检查用户是否存在出错:', error);
        throw error;
    }
}

/**
 * 从profiles复制到新的认证用户（需要管理员权限）
 */
export async function repairUserAccount(email: string, newPassword?: string) {
    try {
        const { profile, auth, needsRepair } = await checkUserExists(email);

        if (!needsRepair) {
            return { success: true, message: '账户不需要修复' };
        }

        if (!profile) {
            return { success: false, message: '未找到用户资料，无法修复' };
        }

        // 如果有auth用户但ID不匹配，需要删除旧auth用户并创建新的
        if (auth && profile.id !== auth.id) {
            try {
                await supabase.auth.admin.deleteUser(auth.id);
                console.log('已删除不匹配的auth用户');
            } catch (err) {
                console.error('删除旧auth用户失败:', err);
                // 继续尝试创建新用户
            }
        }

        // 创建新auth用户
        const password = newPassword || `${uuidv4().substring(0, 8)}Aa1!`;
        const { data: newAuth, error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                full_name: profile.full_name,
            }
        });

        if (createError) {
            console.error('创建auth用户失败:', createError);
            return { success: false, message: '无法创建认证用户: ' + createError.message };
        }

        // 更新profiles记录中的id
        if (newAuth.user) {
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ id: newAuth.user.id })
                .eq('id', profile.id);

            if (updateError) {
                console.error('更新profiles记录失败:', updateError);
                return {
                    success: true,
                    message: '用户已创建，但profiles记录未更新',
                    password: newPassword ? undefined : password
                };
            }

            return {
                success: true,
                message: '用户账户已成功修复',
                password: newPassword ? undefined : password
            };
        }

        return { success: false, message: '创建用户未返回用户数据' };
    } catch (error: any) {
        console.error('修复用户账户失败:', error);
        return { success: false, message: '修复失败: ' + error.message };
    }
}

/**
 * 检查user表和profiles表的一致性
 */
export async function checkDatabaseIntegrity() {
    try {
        // 获取所有profiles
        const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('id, email');

        if (profilesError) throw profilesError;

        const results = {
            total: profiles.length,
            orphaned: 0,
            mismatched: 0,
            details: [] as any[]
        };

        // 对每个profile检查是否有对应的auth用户
        for (const profile of profiles) {
            try {
                const { data: user, error } = await supabase.auth.admin.getUserById(profile.id);

                if (error || !user) {
                    results.orphaned++;
                    results.details.push({
                        email: profile.email,
                        profileId: profile.id,
                        status: 'orphaned',
                        message: '无对应auth用户'
                    });
                    continue;
                }

                // 检查邮箱是否匹配
                if (user.email !== profile.email) {
                    results.mismatched++;
                    results.details.push({
                        email: profile.email,
                        profileId: profile.id,
                        authEmail: user.email,
                        status: 'mismatched',
                        message: '邮箱不匹配'
                    });
                }
            } catch (err) {
                console.log('检查用户失败:', profile.email);
            }
        }

        return results;
    } catch (error) {
        console.error('检查数据库完整性失败:', error);
        throw error;
    }
} 