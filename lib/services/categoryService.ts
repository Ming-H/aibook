'use server';

export type BlogCategory = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    created_at: string;
    postCount?: number;
};

// 模拟分类数据
const mockCategories: BlogCategory[] = [
    {
        id: 'cat1',
        name: '技术',
        slug: 'technology',
        description: '技术相关文章和教程',
        created_at: new Date().toISOString(),
        postCount: 2
    },
    {
        id: 'cat2',
        name: 'AI',
        slug: 'ai',
        description: '人工智能相关内容',
        created_at: new Date().toISOString(),
        postCount: 0
    },
    {
        id: 'cat3',
        name: '教程',
        slug: 'tutorials',
        description: '各类实用教程',
        created_at: new Date().toISOString(),
        postCount: 1
    }
];

/**
 * 获取所有博客分类
 * @returns 分类列表
 */
export async function getAllCategories() {
    try {
        console.log('Getting all categories with mock data');
        return mockCategories;
    } catch (error) {
        console.error('Error in getAllCategories:', error);
        return [];
    }
}

/**
 * 根据ID获取分类
 * @param id 分类ID
 * @returns 分类详情
 */
export async function getCategoryById(id: string) {
    try {
        return mockCategories.find(category => category.id === id) || null;
    } catch (error) {
        console.error('Error in getCategoryById:', error);
        return null;
    }
}

/**
 * 根据slug获取分类
 * @param slug 分类slug
 * @returns 分类详情
 */
export async function getCategoryBySlug(slug: string) {
    try {
        return mockCategories.find(category => category.slug === slug) || null;
    } catch (error) {
        console.error('Error in getCategoryBySlug:', error);
        return null;
    }
}

/**
 * 创建新分类
 * @param categoryData 分类数据
 * @returns 创建的分类
 */
export async function createCategory(categoryData: any) {
    try {
        console.log('Creating category with data:', categoryData);
        const newCategory = {
            ...categoryData,
            id: Math.random().toString(36).substring(2, 9),
            created_at: new Date().toISOString(),
            postCount: 0
        };

        return newCategory;
    } catch (error) {
        console.error('Error in createCategory:', error);
        throw error;
    }
}

/**
 * 更新分类
 * @param id 分类ID
 * @param categoryData 更新的分类数据
 * @returns 更新的分类
 */
export async function updateCategory(id: string, categoryData: any) {
    try {
        console.log('Updating category:', id, categoryData);
        const category = mockCategories.find(c => c.id === id);
        if (!category) {
            throw new Error('Category not found');
        }

        const updatedCategory = {
            ...category,
            ...categoryData
        };

        return updatedCategory;
    } catch (error) {
        console.error('Error in updateCategory:', error);
        throw error;
    }
}

/**
 * 删除分类
 * @param id 分类ID
 * @returns 是否成功删除
 */
export async function deleteCategory(id: string) {
    try {
        console.log('Deleting category:', id);
        return true;
    } catch (error) {
        console.error('Error in deleteCategory:', error);
        throw error;
    }
}

// 获取分类文章数量
export async function getCategoryPostCount(categoryId: string): Promise<number> {
    const supabase = createClient();
    const { count, error } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', categoryId)
        .eq('published', true);

    if (error) throw new Error(error.message);
    return count || 0;
}

// 获取所有分类及其文章数量
export async function getCategoriesWithPostCount() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_categories')
        .select(`
      *,
      blog_posts:blog_posts(count)
    `)
        .eq('blog_posts.published', true);

    if (error) throw new Error(error.message);

    return data.map(category => ({
        ...category,
        postCount: category.blog_posts.length || 0
    }));
} 