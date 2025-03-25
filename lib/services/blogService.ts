'use server';

import { Database } from '../database.types';

export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update'];

export type BlogCategory = Database['public']['Tables']['blog_categories']['Row'];
export type BlogCategoryInsert = Database['public']['Tables']['blog_categories']['Insert'];
export type BlogCategoryUpdate = Database['public']['Tables']['blog_categories']['Update'];

export type BlogTag = Database['public']['Tables']['blog_tags']['Row'];
export type BlogTagInsert = Database['public']['Tables']['blog_tags']['Insert'];
export type BlogTagUpdate = Database['public']['Tables']['blog_tags']['Update'];

export type BlogComment = Database['public']['Tables']['blog_comments']['Row'];
export type BlogCommentInsert = Database['public']['Tables']['blog_comments']['Insert'];
export type BlogCommentUpdate = Database['public']['Tables']['blog_comments']['Update'];

/**
 * 模拟文章数据
 */
const mockPosts = [
    {
        id: '1',
        title: '使用Next.js 14构建现代Web应用',
        slug: 'building-modern-web-apps-with-nextjs-14',
        content: '这是一篇关于Next.js 14的详细教程...',
        excerpt: 'Next.js 14带来了许多激动人心的新特性，本文将详细介绍如何利用这些特性构建现代Web应用。',
        featured_image: 'https://via.placeholder.com/800x450?text=Next.js+14',
        published: true,
        status: 'published',
        author_id: 'user1',
        category_id: 'cat1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        view_count: 120,
        meta_title: '使用Next.js 14构建现代Web应用 | AIBook Studio',
        meta_description: 'Next.js 14教程：学习如何使用最新特性构建高性能Web应用',
        author: {
            id: 'user1',
            display_name: '张三',
            email: 'zhangsan@example.com',
            avatar_url: 'https://via.placeholder.com/150',
            username: 'zhangsan',
            created_at: new Date().toISOString()
        },
        category: {
            id: 'cat1',
            name: '技术',
            slug: 'technology',
            description: '技术相关文章',
            created_at: new Date().toISOString()
        }
    },
    {
        id: '2',
        title: 'React优化技巧：提升应用性能',
        slug: 'react-optimization-tips',
        content: '本文介绍一系列React性能优化技巧...',
        excerpt: '学习如何通过多种优化技巧提升React应用的性能和用户体验。',
        featured_image: 'https://via.placeholder.com/800x450?text=React+Optimization',
        published: true,
        status: 'published',
        author_id: 'user1',
        category_id: 'cat1',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 一天前
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        view_count: 85,
        meta_title: 'React优化技巧：提升应用性能 | AIBook Studio',
        meta_description: '学习如何优化React应用，提高性能和用户体验',
        author: {
            id: 'user1',
            display_name: '张三',
            email: 'zhangsan@example.com',
            avatar_url: 'https://via.placeholder.com/150',
            username: 'zhangsan',
            created_at: new Date().toISOString()
        },
        category: {
            id: 'cat1',
            name: '技术',
            slug: 'technology',
            description: '技术相关文章',
            created_at: new Date().toISOString()
        }
    }
];

/**
 * 获取所有已发布的博客文章
 * @param limit 限制返回的文章数量
 * @param offset 分页偏移量
 * @returns 已发布的博客文章列表
 */
export async function getPublishedPosts(limit = 10, offset = 0) {
    try {
        console.log('Getting published posts with mock data');
        // 返回模拟数据
        return mockPosts;
    } catch (error) {
        console.error('Error in getPublishedPosts:', error);
        return [];
    }
}

/**
 * 根据ID获取单篇博客文章
 * @param id 文章ID
 * @returns 文章详情
 */
export async function getPostById(id: string) {
    try {
        // 返回模拟数据
        return mockPosts.find(post => post.id === id) || null;
    } catch (error) {
        console.error('Error in getPostById:', error);
        return null;
    }
}

/**
 * 根据slug获取单篇博客文章
 * @param slug 文章slug
 * @returns 文章详情
 */
export async function getPostBySlug(slug: string) {
    try {
        // 返回模拟数据
        return mockPosts.find(post => post.slug === slug) || null;
    } catch (error) {
        console.error('Error in getPostBySlug:', error);
        return null;
    }
}

/**
 * 获取用户的所有博客文章
 * @param userId 用户ID
 * @returns 用户的博客文章列表
 */
export async function getUserPosts(userId: string) {
    try {
        // 返回模拟数据
        return mockPosts.filter(post => post.author_id === userId);
    } catch (error) {
        console.error('Error in getUserPosts:', error);
        return [];
    }
}

/**
 * 创建新的博客文章
 * @param postData 文章数据
 * @returns 创建的文章
 */
export async function createPost(postData: BlogPostInsert) {
    try {
        console.log('Creating post with data:', postData);
        // 模拟创建操作
        const newPost = {
            ...postData,
            id: Math.random().toString(36).substring(2, 9),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            view_count: 0,
        };

        return newPost as any;
    } catch (error) {
        console.error('Error in createPost:', error);
        throw error;
    }
}

/**
 * 更新博客文章
 * @param id 文章ID
 * @param postData 更新的文章数据
 * @returns 更新的文章
 */
export async function updatePost(id: string, postData: BlogPostUpdate) {
    try {
        console.log('Updating post:', id, postData);
        // 模拟更新操作
        const post = mockPosts.find(p => p.id === id);
        if (!post) {
            throw new Error('Post not found');
        }

        const updatedPost = {
            ...post,
            ...postData,
            updated_at: new Date().toISOString()
        };

        return updatedPost;
    } catch (error) {
        console.error('Error in updatePost:', error);
        throw error;
    }
}

/**
 * 删除博客文章
 * @param id 文章ID
 * @returns 是否成功删除
 */
export async function deletePost(id: string) {
    try {
        console.log('Deleting post:', id);
        // 模拟删除操作
        return true;
    } catch (error) {
        console.error('Error in deletePost:', error);
        throw error;
    }
}

/**
 * 获取所有分类
 */
export async function getCategories() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

    if (error) throw error;
    return data;
}

/**
 * 获取所有标签
 */
export async function getTags() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name');

    if (error) throw error;
    return data;
}

/**
 * 创建新分类
 * @param categoryData 分类数据
 */
export async function createCategory(categoryData: Partial<BlogCategory>) {
    const supabase = createClient();
    try {
        // 生成唯一的slug
        if (categoryData.name && !categoryData.slug) {
            categoryData.slug = createSlug(categoryData.name);
        }

        const { data, error } = await supabase
            .from('blog_categories')
            .insert({
                ...categoryData,
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('创建分类失败:', error);
        throw error;
    }
}

/**
 * 创建新标签
 * @param tagData 标签数据
 */
export async function createTag(tagData: Partial<BlogTag>) {
    const supabase = createClient();
    try {
        // 生成唯一的slug
        if (tagData.name && !tagData.slug) {
            tagData.slug = createSlug(tagData.name);
        }

        const { data, error } = await supabase
            .from('blog_tags')
            .insert({
                ...tagData,
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('创建标签失败:', error);
        throw error;
    }
}

/**
 * 获取文章的评论
 * @param postId 文章ID
 */
export async function getComments(postId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_comments')
        .select(`
        *,
        user:profiles(id, display_name, avatar_url)
      `)
        .eq('post_id', postId)
        .eq('status', 'approved')
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
}

/**
 * 创建新评论
 * @param commentData 评论数据
 */
export async function createComment(commentData: Partial<BlogComment>) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_comments')
        .insert({
            ...commentData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: 'approved' // 可以改为'pending'，需要审核
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * 搜索博客文章
 * @param query 搜索关键词
 * @param limit 限制返回的结果数量
 * @param offset 偏移量，用于分页
 */
export async function searchPosts(
    query: string,
    limit: number = 10,
    offset: number = 0
) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_posts')
        .select(`
        *,
        category:blog_categories(*),
        author:profiles(id, display_name, avatar_url)
      `)
        .eq('published', true)
        .ilike('title', `%${query}%`)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
}

/**
 * 获取热门/推荐文章
 * @param limit 限制返回的文章数量
 */
export async function getFeaturedPosts(limit: number = 5) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_posts')
        .select(`
        *,
        category:blog_categories(*),
        author:profiles(id, display_name, avatar_url)
      `)
        .eq('published', true)
        .order('view_count', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data;
}

/**
 * 生成一个基于标题的URL友好的slug
 * @param title 文章标题
 */
function createSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-') // 保留汉字和英文字母数字，其他用-替换
        .replace(/^-+|-+$/g, ''); // 去除首尾的-
}

/**
 * 生成唯一的slug，如果已存在则添加后缀
 * @param title 文章标题
 */
export async function generateUniqueSlug(title: string): Promise<string> {
    const supabase = createClient();
    let slug = createSlug(title);
    let isUnique = false;
    let attempt = 0;

    while (!isUnique) {
        const suffixedSlug = attempt === 0 ? slug : `${slug}-${attempt}`;
        const { data } = await supabase
            .from('blog_posts')
            .select('slug')
            .eq('slug', suffixedSlug)
            .maybeSingle();

        if (!data) {
            return suffixedSlug;
        }

        attempt++;
    }

    return slug;
}

// 获取文章的标签
export async function getPostTags(postId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_post_tags')
        .select(`
      tag_id,
      blog_tags:tag_id(id, name, slug)
    `)
        .eq('post_id', postId);

    if (error) throw new Error(error.message);
    return data.map(item => item.blog_tags);
}

// 管理文章标签
export async function updatePostTags(postId: string, tagIds: string[]) {
    const supabase = createClient();

    // 先删除所有现有的标签关联
    const { error: deleteError } = await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', postId);

    if (deleteError) throw new Error(deleteError.message);

    // 如果有新标签，添加它们
    if (tagIds.length > 0) {
        const tagConnections = tagIds.map(tagId => ({
            post_id: postId,
            tag_id: tagId
        }));

        const { error: insertError } = await supabase
            .from('blog_post_tags')
            .insert(tagConnections);

        if (insertError) throw new Error(insertError.message);
    }

    return true;
}

// 按分类获取文章
export async function getPostsByCategory(categorySlug: string) {
    const supabase = createClient();

    // 先获取分类ID
    const { data: categoryData, error: categoryError } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

    if (categoryError) throw new Error(categoryError.message);

    // 然后获取该分类下的所有文章
    const { data, error } = await supabase
        .from('blog_posts')
        .select(`
      *,
      author:profiles(username, avatar_url),
      category:blog_categories(name, slug)
    `)
        .eq('published', true)
        .eq('category_id', categoryData.id)
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
}

// 按标签获取文章
export async function getPostsByTag(tagSlug: string) {
    const supabase = createClient();

    // 先获取标签ID
    const { data: tagData, error: tagError } = await supabase
        .from('blog_tags')
        .select('id')
        .eq('slug', tagSlug)
        .single();

    if (tagError) throw new Error(tagError.message);

    // 然后获取拥有该标签的所有文章ID
    const { data: postTagData, error: postTagError } = await supabase
        .from('blog_post_tags')
        .select('post_id')
        .eq('tag_id', tagData.id);

    if (postTagError) throw new Error(postTagError.message);

    if (!postTagData || postTagData.length === 0) {
        return [];
    }

    // 获取这些文章的详细信息
    const postIds = postTagData.map(item => item.post_id);
    const { data, error } = await supabase
        .from('blog_posts')
        .select(`
      *,
      author:profiles(username, avatar_url),
      category:blog_categories(name, slug)
    `)
        .eq('published', true)
        .in('id', postIds)
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
}

// 获取相关文章（同一分类或拥有相同标签的其他文章）
export async function getRelatedPosts(postId: string, categoryId: string | null, limit = 3) {
    const supabase = createClient();

    let query = supabase
        .from('blog_posts')
        .select(`
      *,
      author:profiles(username, avatar_url),
      category:blog_categories(name, slug)
    `)
        .eq('published', true)
        .neq('id', postId)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (categoryId) {
        query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data;
} 