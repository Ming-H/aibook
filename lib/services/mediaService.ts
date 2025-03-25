'use server';

export type MediaItem = {
    id: string;
    file_name: string;
    original_name: string;
    mime_type: string;
    size: number;
    url: string;
    width?: number;
    height?: number;
    thumbnail_url?: string;
    user_id: string;
    alt_text?: string;
    description?: string;
    created_at: string;
    updated_at?: string;
};

// 模拟媒体数据
const mockMediaItems: MediaItem[] = [
    {
        id: 'media1',
        file_name: 'nextjs-tutorial-cover.jpg',
        original_name: 'nextjs-tutorial-cover.jpg',
        mime_type: 'image/jpeg',
        size: 1024000,
        url: 'https://via.placeholder.com/800x450?text=Next.js+14',
        width: 800,
        height: 450,
        thumbnail_url: 'https://via.placeholder.com/150x150?text=Next.js+14',
        user_id: 'user1',
        alt_text: 'Next.js 14 教程封面图片',
        description: '用于Next.js 14教程文章的封面图片',
        created_at: new Date(Date.now() - 7 * 86400000).toISOString() // 7天前
    },
    {
        id: 'media2',
        file_name: 'react-optimization.jpg',
        original_name: 'react-optimization.jpg',
        mime_type: 'image/jpeg',
        size: 890000,
        url: 'https://via.placeholder.com/800x450?text=React+Optimization',
        width: 800,
        height: 450,
        thumbnail_url: 'https://via.placeholder.com/150x150?text=React+Optimization',
        user_id: 'user1',
        alt_text: 'React优化技巧封面图片',
        description: '用于React优化技巧文章的封面图片',
        created_at: new Date(Date.now() - 5 * 86400000).toISOString() // 5天前
    },
    {
        id: 'media3',
        file_name: 'typescript-guide.jpg',
        original_name: 'typescript-guide.jpg',
        mime_type: 'image/jpeg',
        size: 750000,
        url: 'https://via.placeholder.com/800x450?text=TypeScript+Guide',
        width: 800,
        height: 450,
        thumbnail_url: 'https://via.placeholder.com/150x150?text=TypeScript+Guide',
        user_id: 'user1',
        alt_text: 'TypeScript指南封面图片',
        description: '用于TypeScript指南文章的封面图片',
        created_at: new Date(Date.now() - 3 * 86400000).toISOString() // 3天前
    }
];

/**
 * 获取所有媒体文件
 * @param limit 获取数量限制
 * @param offset 偏移量
 * @returns 媒体文件列表
 */
export async function getAllMedia(limit = 20, offset = 0) {
    try {
        console.log('Getting all media items with mock data');
        return mockMediaItems
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(offset, offset + limit);
    } catch (error) {
        console.error('Error in getAllMedia:', error);
        return [];
    }
}

/**
 * 根据ID获取媒体文件
 * @param mediaId 媒体文件ID
 * @returns 媒体文件详情
 */
export async function getMediaById(mediaId: string) {
    try {
        return mockMediaItems.find(item => item.id === mediaId) || null;
    } catch (error) {
        console.error('Error in getMediaById:', error);
        return null;
    }
}

/**
 * 获取用户的所有媒体文件
 * @param userId 用户ID
 * @param limit 获取数量限制
 * @param offset 偏移量
 * @returns 用户的媒体文件列表
 */
export async function getUserMedia(userId: string, limit = 20, offset = 0) {
    try {
        return mockMediaItems
            .filter(item => item.user_id === userId)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(offset, offset + limit);
    } catch (error) {
        console.error('Error in getUserMedia:', error);
        return [];
    }
}

/**
 * 上传新的媒体文件（模拟）
 * @param file 文件对象
 * @param userId 用户ID
 * @param altText 替代文本
 * @param description 描述
 * @returns 上传的媒体文件信息
 */
export async function uploadMedia(
    file: any,
    userId: string,
    altText?: string,
    description?: string
) {
    try {
        console.log('Uploading media:', file.name);

        const now = new Date().toISOString();

        // 模拟随机文件名生成
        const randomId = Math.random().toString(36).substring(2, 9);
        const extension = file.name.split('.').pop();
        const fileName = `${randomId}.${extension}`;

        // 模拟新的媒体文件
        const newMediaItem: MediaItem = {
            id: randomId,
            file_name: fileName,
            original_name: file.name,
            mime_type: file.type || 'image/jpeg',
            size: file.size || 1000000,
            url: `https://via.placeholder.com/800x450?text=${encodeURIComponent(file.name)}`,
            width: 800,
            height: 450,
            thumbnail_url: `https://via.placeholder.com/150x150?text=${encodeURIComponent(file.name)}`,
            user_id: userId,
            alt_text: altText,
            description: description,
            created_at: now,
            updated_at: now
        };

        return newMediaItem;
    } catch (error) {
        console.error('Error in uploadMedia:', error);
        throw error;
    }
}

/**
 * 更新媒体文件信息
 * @param mediaId 媒体文件ID
 * @param data 要更新的数据
 * @returns 更新后的媒体文件信息
 */
export async function updateMedia(
    mediaId: string,
    data: { alt_text?: string; description?: string }
) {
    try {
        console.log('Updating media:', mediaId, data);

        const mediaItem = await getMediaById(mediaId);

        if (!mediaItem) {
            throw new Error('Media item not found');
        }

        const updatedItem = {
            ...mediaItem,
            alt_text: data.alt_text !== undefined ? data.alt_text : mediaItem.alt_text,
            description: data.description !== undefined ? data.description : mediaItem.description,
            updated_at: new Date().toISOString()
        };

        return updatedItem;
    } catch (error) {
        console.error('Error in updateMedia:', error);
        throw error;
    }
}

/**
 * 删除媒体文件
 * @param mediaId 媒体文件ID
 * @returns 操作是否成功
 */
export async function deleteMedia(mediaId: string) {
    try {
        console.log('Deleting media:', mediaId);
        // 在实际应用中，这里会从存储中删除文件
        return true;
    } catch (error) {
        console.error('Error in deleteMedia:', error);
        throw error;
    }
} 