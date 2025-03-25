import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// 创建Supabase客户端
export const createSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('缺少Supabase环境变量')
    }

    return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// 服务器端Supabase客户端
export const supabase = createSupabaseClient()

// 获取博客文章
export async function getBlogPosts() {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_categories(*)')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('获取博客文章失败:', error)
        return []
    }

    return data || []
}

// 获取单个博客文章
export async function getBlogPost(slug: string) {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_categories(*), profiles(*)')
        .eq('slug', slug)
        .single()

    if (error) {
        console.error(`获取博客文章 ${slug} 失败:`, error)
        return null
    }

    return data
}

// 获取分类
export async function getCategories() {
    const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name', { ascending: true })

    if (error) {
        console.error('获取分类失败:', error)
        return []
    }

    return data || []
}

// 获取标签
export async function getTags() {
    const { data, error } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name', { ascending: true })

    if (error) {
        console.error('获取标签失败:', error)
        return []
    }

    return data || []
}

// 获取评论
export async function getComments(postId: string) {
    const { data, error } = await supabase
        .from('blog_comments')
        .select('*, profiles(username, display_name, avatar_url)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

    if (error) {
        console.error(`获取文章 ${postId} 的评论失败:`, error)
        return []
    }

    return data || []
}

// 添加评论
export async function addComment(postId: string, userId: string, content: string) {
    const { data, error } = await supabase
        .from('blog_comments')
        .insert([
            { post_id: postId, user_id: userId, content, status: 'pending' }
        ])
        .select()

    if (error) {
        console.error('添加评论失败:', error)
        return null
    }

    return data?.[0] || null
}

// 搜索文章
export async function searchPosts(query: string) {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_categories(*)')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('搜索文章失败:', error)
        return []
    }

    return data || []
}

// 获取分类文章
export async function getCategoryPosts(categorySlug: string) {
    const { data: category, error: categoryError } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', categorySlug)
        .single()

    if (categoryError || !category) {
        console.error(`获取分类 ${categorySlug} 失败:`, categoryError)
        return []
    }

    const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_categories(*)')
        .eq('category_id', category.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error(`获取分类 ${categorySlug} 的文章失败:`, error)
        return []
    }

    return data || []
}

// 获取标签文章
export async function getTagPosts(tagSlug: string) {
    const { data: tag, error: tagError } = await supabase
        .from('blog_tags')
        .select('id')
        .eq('slug', tagSlug)
        .single()

    if (tagError || !tag) {
        console.error(`获取标签 ${tagSlug} 失败:`, tagError)
        return []
    }

    const { data, error } = await supabase
        .from('blog_post_tags')
        .select('blog_posts(*)')
        .eq('tag_id', tag.id)

    if (error) {
        console.error(`获取标签 ${tagSlug} 的文章失败:`, error)
        return []
    }

    return data?.map(item => item.blog_posts) || []
}

// 获取相关文章
export async function getRelatedPosts(postId: string, categoryId: string) {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_categories(*)')
        .eq('category_id', categoryId)
        .neq('id', postId)
        .limit(3)

    if (error) {
        console.error('获取相关文章失败:', error)
        return []
    }

    return data || []
} 