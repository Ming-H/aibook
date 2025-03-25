'use server';

export type ViewStats = {
    post_id: string;
    view_count: number;
    last_updated: string;
};

export type DailyViewCount = {
    date: string;
    count: number;
};

// 模拟文章浏览数据
const mockViewStats: Record<string, ViewStats> = {
    '1': {
        post_id: '1',
        view_count: 156,
        last_updated: new Date().toISOString()
    },
    '2': {
        post_id: '2',
        view_count: 89,
        last_updated: new Date().toISOString()
    }
};

// 模拟文章每日浏览数据（最近7天）
const mockDailyStats: Record<string, DailyViewCount[]> = {
    '1': [
        { date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0], count: 12 },
        { date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0], count: 18 },
        { date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0], count: 15 },
        { date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0], count: 24 },
        { date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0], count: 30 },
        { date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0], count: 28 },
        { date: new Date().toISOString().split('T')[0], count: 29 }
    ],
    '2': [
        { date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0], count: 6 },
        { date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0], count: 9 },
        { date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0], count: 12 },
        { date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0], count: 18 },
        { date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0], count: 15 },
        { date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0], count: 14 },
        { date: new Date().toISOString().split('T')[0], count: 15 }
    ]
};

/**
 * 记录文章浏览量
 * @param postId 文章ID
 * @returns 更新后的文章浏览统计
 */
export async function recordPostView(postId: string) {
    try {
        console.log('Recording view for post:', postId);

        // 检查文章是否已有浏览记录
        if (mockViewStats[postId]) {
            mockViewStats[postId] = {
                ...mockViewStats[postId],
                view_count: mockViewStats[postId].view_count + 1,
                last_updated: new Date().toISOString()
            };
        } else {
            // 创建新的浏览记录
            mockViewStats[postId] = {
                post_id: postId,
                view_count: 1,
                last_updated: new Date().toISOString()
            };

            // 创建新的每日浏览记录
            const today = new Date().toISOString().split('T')[0];
            mockDailyStats[postId] = [
                { date: today, count: 1 }
            ];
        }

        // 更新今天的浏览量
        const today = new Date().toISOString().split('T')[0];
        const dailyStats = mockDailyStats[postId] || [];
        const todayStat = dailyStats.find(stat => stat.date === today);

        if (todayStat) {
            todayStat.count += 1;
        } else {
            dailyStats.push({ date: today, count: 1 });
        }

        return mockViewStats[postId];
    } catch (error) {
        console.error('Error in recordPostView:', error);
        return null;
    }
}

/**
 * 获取文章的浏览统计
 * @param postId 文章ID
 * @returns 文章浏览统计
 */
export async function getPostViewStats(postId: string) {
    try {
        return mockViewStats[postId] || { post_id: postId, view_count: 0, last_updated: new Date().toISOString() };
    } catch (error) {
        console.error('Error in getPostViewStats:', error);
        return { post_id: postId, view_count: 0, last_updated: new Date().toISOString() };
    }
}

/**
 * 获取文章的每日浏览统计
 * @param postId 文章ID
 * @param days 天数
 * @returns 文章每日浏览统计
 */
export async function getPostDailyViewStats(postId: string, days = 7) {
    try {
        const stats = mockDailyStats[postId] || [];
        return stats.slice(-days);
    } catch (error) {
        console.error('Error in getPostDailyViewStats:', error);
        return [];
    }
}

/**
 * 获取最热门的文章
 * @param limit 获取数量
 * @returns 热门文章ID及浏览量
 */
export async function getPopularPosts(limit = 5) {
    try {
        return Object.values(mockViewStats)
            .sort((a, b) => b.view_count - a.view_count)
            .slice(0, limit);
    } catch (error) {
        console.error('Error in getPopularPosts:', error);
        return [];
    }
}

/**
 * 获取总体博客统计信息
 * @returns 博客统计信息
 */
export async function getBlogStats() {
    try {
        // 计算总浏览量
        const totalViews = Object.values(mockViewStats).reduce(
            (sum, stat) => sum + stat.view_count,
            0
        );

        // 其他模拟统计数据
        return {
            totalViews,
            totalPosts: Object.keys(mockViewStats).length,
            totalComments: 3, // 这里使用模拟评论数量
            totalCategories: 3, // 模拟分类数量
            totalTags: 5, // 模拟标签数量
        };
    } catch (error) {
        console.error('Error in getBlogStats:', error);
        return {
            totalViews: 0,
            totalPosts: 0,
            totalComments: 0,
            totalCategories: 0,
            totalTags: 0
        };
    }
} 