import { supabase, extractDataOrError } from '../supabase/client';
import type { CreativeDNA } from '../types/supabase';

// 获取用户创意DNA
export async function getUserCreativeDNA(userId: string): Promise<CreativeDNA | null> {
    const { data, error } = await supabase
        .from('creative_dna')
        .select('*')
        .eq('user_id', userId)
        .single();

    // 如果没有找到结果，返回null而不是抛出错误
    if (error && error.code === 'PGRST116') return null;

    if (error) throw error;
    return data;
}

// 创建或更新创意DNA
export async function saveCreativeDNA(userId: string, dnaData: Partial<CreativeDNA>): Promise<CreativeDNA> {
    // 先检查是否已存在
    const existingData = await getUserCreativeDNA(userId);

    if (existingData) {
        // 更新
        const { data, error } = await supabase
            .from('creative_dna')
            .update({
                ...dnaData,
                updated_at: new Date().toISOString(),
            })
            .eq('id', existingData.id)
            .select()
            .single();

        return extractDataOrError<CreativeDNA>({ data, error });
    } else {
        // 创建
        const { data, error } = await supabase
            .from('creative_dna')
            .insert({
                user_id: userId,
                ...dnaData,
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        return extractDataOrError<CreativeDNA>({ data, error });
    }
}

// 更新创意DNA的特定部分（比如只更新风格偏好）
export async function updateCreativeDNAComponent(
    userId: string,
    component: 'style_preferences' | 'creative_habits' | 'insights',
    data: any
): Promise<CreativeDNA> {
    const existingData = await getUserCreativeDNA(userId);

    if (!existingData) {
        // 如果不存在，创建一个新的
        return saveCreativeDNA(userId, {
            [component]: data,
            confidence_score: 0,
        });
    }

    // 更新特定组件
    const { data: updatedData, error } = await supabase
        .from('creative_dna')
        .update({
            [component]: data,
            updated_at: new Date().toISOString(),
        })
        .eq('id', existingData.id)
        .select()
        .single();

    return extractDataOrError<CreativeDNA>({ data: updatedData, error });
}

// 分析创意DNA，提供洞察
export async function analyzeCreativeDNA(userId: string): Promise<CreativeDNA> {
    const dnaData = await getUserCreativeDNA(userId);

    if (!dnaData) {
        throw new Error('没有找到用户的创意DNA数据');
    }

    // 这里实际上应该调用AI服务进行分析
    // 这里仅作为演示，生成一些模拟的洞察
    const mockInsights = {
        strengths: [
            '视觉思维和创意表达',
            '结构化思考和组织能力',
            '对细节的关注'
        ],
        growthAreas: [
            '可以更多探索跨领域创作',
            '增强叙事技巧',
            '拓展色彩运用范围'
        ],
        recommendations: [
            '尝试新的创作媒介扩展能力',
            '参与协作项目增强互动创作体验',
            '建立定期反思和迭代的创作习惯'
        ]
    };

    // 更新并返回带有新洞察的DNA数据
    return await updateCreativeDNAComponent(userId, 'insights', mockInsights);
} 