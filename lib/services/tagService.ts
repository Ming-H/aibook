'use server';

export type BlogTag = {
    id: string;
    name: string;
    slug: string;
    created_at: string;
    postCount?: number;
};

// 模拟标签数据
const mockTags: BlogTag[] = [
    {
        id: 'tag1',
        name: 'Next.js',
        slug: 'nextjs',
        created_at: new Date().toISOString(),
        postCount: 1
    },
    {
        id: 'tag2',
        name: 'React',
        slug: 'react',
        created_at: new Date().toISOString(),
        postCount: 2
    },
    {
        id: 'tag3',
        name: 'TypeScript',
        slug: 'typescript',
        created_at: new Date().toISOString(),
        postCount: 1
    },
    {
        id: 'tag4',
        name: 'JavaScript',
        slug: 'javascript',
        created_at: new Date().toISOString(),
        postCount: 1
    },
    {
        id: 'tag5',
        name: 'Web开发',
        slug: 'web-development',
        created_at: new Date().toISOString(),
        postCount: 2
    }
];

// 模拟文章标签关联
const mockPostTags = [
    { post_id: '1', tag_id: 'tag1' },
    { post_id: '1', tag_id: 'tag2' },
    { post_id: '1', tag_id: 'tag5' },
    { post_id: '2', tag_id: 'tag2' },
    { post_id: '2', tag_id: 'tag3' },
    { post_id: '2', tag_id: 'tag4' },
    { post_id: '2', tag_id: 'tag5' }
];

/**
 * 获取所有博客标签
 * @returns 标签列表
 */
export async function getAllTags() {
    try {
        console.log('Getting all tags with mock data');
        return mockTags;
    } catch (error) {
        console.error('Error in getAllTags:', error);
        return [];
    }
}

/**
 * 获取所有标签及其文章数量
 * @returns 带有文章数量的标签列表
 */
export async function getTagsWithPostCount() {
    try {
        console.log('Getting tags with post count (mock data)');
        return mockTags;
    } catch (error) {
        console.error('Error in getTagsWithPostCount:', error);
        return [];
    }
}

/**
 * 根据ID获取标签
 * @param id 标签ID
 * @returns 标签详情
 */
export async function getTagById(id: string) {
    try {
        return mockTags.find(tag => tag.id === id) || null;
    } catch (error) {
        console.error('Error in getTagById:', error);
        return null;
    }
}

/**
 * 根据slug获取标签
 * @param slug 标签slug
 * @returns 标签详情
 */
export async function getTagBySlug(slug: string) {
    try {
        return mockTags.find(tag => tag.slug === slug) || null;
    } catch (error) {
        console.error('Error in getTagBySlug:', error);
        return null;
    }
}

/**
 * 获取文章的所有标签
 * @param postId 文章ID
 * @returns 文章的标签列表
 */
export async function getPostTags(postId: string) {
    try {
        // 找到文章的所有标签ID
        const tagIds = mockPostTags
            .filter(pt => pt.post_id === postId)
            .map(pt => pt.tag_id);

        // 返回标签详情
        return mockTags.filter(tag => tagIds.includes(tag.id));
    } catch (error) {
        console.error('Error in getPostTags:', error);
        return [];
    }
}

/**
 * 创建新标签
 * @param tagData 标签数据
 * @returns 创建的标签
 */
export async function createTag(tagData: any) {
    try {
        console.log('Creating tag with data:', tagData);
        const newTag = {
            ...tagData,
            id: Math.random().toString(36).substring(2, 9),
            created_at: new Date().toISOString(),
            postCount: 0
        };

        return newTag;
    } catch (error) {
        console.error('Error in createTag:', error);
        throw error;
    }
}

/**
 * 更新文章的标签关联
 * @param postId 文章ID
 * @param tagIds 标签ID数组
 * @returns 是否成功更新
 */
export async function updatePostTags(postId: string, tagIds: string[]) {
    try {
        console.log('Updating post tags:', postId, tagIds);
        return true;
    } catch (error) {
        console.error('Error in updatePostTags:', error);
        throw error;
    }
}

// 获取标签文章数量
export async function getTagPostCount(tagId: string): Promise<number> {
    const supabase = createClient();
    const { count, error } = await supabase
        .from('blog_post_tags')
        .select('*', { count: 'exact', head: true })
        .eq('tag_id', tagId);

    if (error) throw new Error(error.message);
    return count || 0;
}

// 获取特定文章的所有标签
export async function getTagsForPost(postId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_post_tags')
        .select(`
      tag_id,
      blog_tags:tag_id(*)
    `)
        .eq('post_id', postId);

    if (error) throw new Error(error.message);
    return data.map(item => item.blog_tags);
} 