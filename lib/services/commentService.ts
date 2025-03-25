'use server';

import { formatDate } from '../utils';

export type BlogComment = {
    id: string;
    post_id: string;
    user_id: string;
    content: string;
    created_at: string;
    updated_at?: string;
    status: 'pending' | 'approved' | 'spam' | 'trash';
    parent_id?: string;
    user?: {
        id: string;
        username: string;
        display_name: string;
        avatar_url?: string;
    };
    replies?: BlogComment[];
};

// 模拟评论数据
const mockComments: BlogComment[] = [
    {
        id: 'comment1',
        post_id: '1',
        user_id: 'user2',
        content: '这是一篇非常有用的文章！我学到了很多关于Next.js 14的新知识。',
        created_at: new Date(Date.now() - 3 * 86400000).toISOString(), // 3天前
        status: 'approved',
        user: {
            id: 'user2',
            username: 'lisi',
            display_name: '李四',
            avatar_url: 'https://via.placeholder.com/150?text=LS'
        }
    },
    {
        id: 'comment2',
        post_id: '1',
        user_id: 'user1',
        content: '感谢您的反馈！我很高兴您觉得这篇文章有用。',
        created_at: new Date(Date.now() - 2 * 86400000).toISOString(), // 2天前
        status: 'approved',
        parent_id: 'comment1',
        user: {
            id: 'user1',
            username: 'zhangsan',
            display_name: '张三',
            avatar_url: 'https://via.placeholder.com/150?text=ZS'
        }
    },
    {
        id: 'comment3',
        post_id: '2',
        user_id: 'user2',
        content: '您分享的React优化技巧非常实用，特别是关于memo和useCallback的部分。',
        created_at: new Date(Date.now() - 1 * 86400000).toISOString(), // 1天前
        status: 'approved',
        user: {
            id: 'user2',
            username: 'lisi',
            display_name: '李四',
            avatar_url: 'https://via.placeholder.com/150?text=LS'
        }
    }
];

/**
 * 获取文章的所有评论
 * @param postId 文章ID
 * @param includeReplies 是否包含回复（嵌套结构）
 * @returns 评论列表
 */
export async function getPostComments(postId: string, includeReplies = true) {
    try {
        // 获取该文章的所有评论
        let comments = mockComments.filter(
            comment => comment.post_id === postId && comment.status === 'approved'
        );

        if (includeReplies) {
            // 构建评论树结构
            const topLevelComments = comments.filter(comment => !comment.parent_id);
            const commentReplies = comments.filter(comment => comment.parent_id);

            // 将回复添加到父评论的replies数组中
            return topLevelComments.map(comment => {
                return {
                    ...comment,
                    replies: commentReplies.filter(reply => reply.parent_id === comment.id)
                };
            });
        }

        return comments;
    } catch (error) {
        console.error('Error in getPostComments:', error);
        return [];
    }
}

/**
 * 获取单个评论
 * @param commentId 评论ID
 * @returns 评论详情
 */
export async function getCommentById(commentId: string) {
    try {
        return mockComments.find(comment => comment.id === commentId) || null;
    } catch (error) {
        console.error('Error in getCommentById:', error);
        return null;
    }
}

/**
 * 创建新评论
 * @param commentData 评论数据
 * @returns 创建的评论
 */
export async function createComment(commentData: Partial<BlogComment>) {
    try {
        console.log('Creating comment with data:', commentData);
        const now = new Date().toISOString();

        const newComment: BlogComment = {
            id: Math.random().toString(36).substring(2, 9),
            post_id: commentData.post_id || '',
            user_id: commentData.user_id || '',
            content: commentData.content || '',
            created_at: now,
            updated_at: now,
            status: 'approved', // 默认为已批准状态，实际应用中可能需要审核流程
            parent_id: commentData.parent_id,
            user: commentData.user
        };

        return newComment;
    } catch (error) {
        console.error('Error in createComment:', error);
        throw error;
    }
}

/**
 * 更新评论状态
 * @param commentId 评论ID
 * @param status 新状态
 * @returns 更新后的评论
 */
export async function updateCommentStatus(
    commentId: string,
    status: 'pending' | 'approved' | 'spam' | 'trash'
) {
    try {
        console.log('Updating comment status:', commentId, status);
        const comment = await getCommentById(commentId);

        if (!comment) {
            throw new Error('Comment not found');
        }

        const updatedComment = {
            ...comment,
            status,
            updated_at: new Date().toISOString()
        };

        return updatedComment;
    } catch (error) {
        console.error('Error in updateCommentStatus:', error);
        throw error;
    }
}

/**
 * 获取最近的评论
 * @param limit 获取数量
 * @returns 最近评论列表
 */
export async function getRecentComments(limit = 5) {
    try {
        // 按创建时间排序并限制数量
        return mockComments
            .filter(comment => comment.status === 'approved')
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, limit);
    } catch (error) {
        console.error('Error in getRecentComments:', error);
        return [];
    }
}

/**
 * 获取用户的所有评论
 * @param userId 用户ID
 * @returns 用户评论列表
 */
export async function getUserComments(userId: string) {
    try {
        return mockComments.filter(
            comment => comment.user_id === userId && comment.status === 'approved'
        );
    } catch (error) {
        console.error('Error in getUserComments:', error);
        return [];
    }
}

/**
 * 删除评论
 * @param commentId 评论ID
 * @returns 操作是否成功
 */
export async function deleteComment(commentId: string) {
    try {
        console.log('Deleting comment:', commentId);
        // 在实际应用中，这里会从数据库中删除评论
        return true;
    } catch (error) {
        console.error('Error in deleteComment:', error);
        throw error;
    }
} 