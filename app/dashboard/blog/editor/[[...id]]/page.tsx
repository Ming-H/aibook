'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { supabase } from '@/lib/supabase/client';
import {
    getPostById,
    createPost,
    updatePost,
    getCategories,
    getTags,
    createTag
} from '@/lib/services/blogService';
import BlogEditor from '@/components/blog/BlogEditor';
import CategorySelector from '@/components/blog/CategorySelector';
import TagSelector from '@/components/blog/TagSelector';
import UploadButton from '@/components/blog/UploadButton';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function BlogEditorPage({ params }: { params: { id?: string[] } }) {
    const postId = params.id?.[0];
    const router = useRouter();
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [published, setPublished] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    // 获取分类和标签数据
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategories();
                const tagsData = await getTags();
                setCategories(categoriesData);
                setTags(tagsData);
            } catch (err) {
                console.error('获取分类和标签失败:', err);
                setError('加载分类和标签失败');
            }
        };

        fetchData();
    }, []);

    // 如果是编辑模式，加载现有文章数据
    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) return;

            setIsLoading(true);
            setIsEditMode(true);

            try {
                const post = await getPostById(postId);

                if (!post) {
                    setError('文章未找到');
                    setIsLoading(false);
                    return;
                }

                // 检查当前用户是否是文章作者
                if (user?.id !== post.author_id) {
                    setError('您没有权限编辑此文章');
                    setIsLoading(false);
                    return;
                }

                // 填充表单数据
                setTitle(post.title);
                setContent(post.content);
                setExcerpt(post.excerpt || '');
                setFeaturedImage(post.featured_image || '');
                setCategoryId(post.category_id || null);
                setPublished(post.published);

                // 处理标签
                if (post.tags && post.tags.length > 0) {
                    const tagIds = post.tags.map((tagItem: any) => tagItem.blog_tags.id);
                    setSelectedTags(tagIds);
                }

            } catch (err) {
                console.error('获取文章失败:', err);
                setError('加载文章失败');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [postId, user?.id]);

    // 上传图片处理
    const uploadImage = async (file: File) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `blog/${user?.id}/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('上传图片失败:', error);
            throw new Error('上传图片失败');
        }
    };

    // 处理图片上传
    const handleImageUpload = async (file: File) => {
        try {
            const imageUrl = await uploadImage(file);
            setFeaturedImage(imageUrl);
            return imageUrl;
        } catch (err) {
            console.error('图片上传失败:', err);
            setError('上传图片失败');
            return null;
        }
    };

    // 处理编辑器中的图片上传
    const handleEditorImageUpload = async (file: File) => {
        try {
            return await uploadImage(file);
        } catch (err) {
            console.error('编辑器图片上传失败:', err);
            setError('上传图片失败');
            return null;
        }
    };

    // 创建新标签
    const handleCreateTag = async (name: string) => {
        try {
            const newTag = await createTag({ name });
            setTags([...tags, newTag]);
            return newTag;
        } catch (err) {
            console.error('创建标签失败:', err);
            setError('创建新标签失败');
            return null;
        }
    };

    // 保存文章
    const handleSave = async (publishStatus: boolean = published) => {
        if (!user) {
            setError('您需要登录才能保存文章');
            return;
        }

        if (!title.trim()) {
            setError('请输入文章标题');
            return;
        }

        if (!content.trim()) {
            setError('请输入文章内容');
            return;
        }

        setIsSaving(true);
        setError('');

        try {
            const postData = {
                title,
                content,
                excerpt: excerpt || content.substring(0, 160).replace(/#{1,6}\s?/g, ''),
                featured_image: featuredImage,
                published: publishStatus,
                author_id: user.id,
                category_id: categoryId,
            };

            let savedPost;

            if (isEditMode && postId) {
                // 更新现有文章
                savedPost = await updatePost(postId, postData, selectedTags);
            } else {
                // 创建新文章
                savedPost = await createPost(postData, selectedTags);
            }

            router.push(`/dashboard/blog`);
        } catch (err) {
            console.error('保存文章失败:', err);
            setError('保存文章失败');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-8 flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">
                        {isEditMode ? '编辑文章' : '创建新文章'}
                    </h1>

                    {error && (
                        <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-md mb-4">
                            {error}
                        </div>
                    )}
                </header>

                <div className="space-y-6">
                    {/* 标题输入 */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                            文章标题 *
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="输入文章标题"
                            required
                        />
                    </div>

                    {/* 特色图片上传 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            特色图片
                        </label>
                        <UploadButton
                            onUpload={handleImageUpload}
                            currentImage={featuredImage}
                            onRemove={() => setFeaturedImage('')}
                        />
                    </div>

                    {/* 分类选择 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            分类
                        </label>
                        <CategorySelector
                            categories={categories}
                            selectedCategory={categoryId}
                            onChange={setCategoryId}
                        />
                    </div>

                    {/* 标签选择 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            标签
                        </label>
                        <TagSelector
                            tags={tags}
                            selectedTags={selectedTags}
                            onChange={setSelectedTags}
                            onCreateTag={handleCreateTag}
                        />
                    </div>

                    {/* 摘要输入 */}
                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-1">
                            摘要 (可选)
                        </label>
                        <textarea
                            id="excerpt"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="输入文章摘要 (不填写将自动截取内容前160个字符)"
                            rows={3}
                        />
                    </div>

                    {/* 内容编辑器 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            文章内容 *
                        </label>
                        <BlogEditor
                            value={content}
                            onChange={setContent}
                            onImageUpload={handleEditorImageUpload}
                        />
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800"
                            disabled={isSaving}
                        >
                            取消
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSave(false)}
                            className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800"
                            disabled={isSaving}
                        >
                            {isSaving ? '保存中...' : '保存为草稿'}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSave(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md text-white"
                            disabled={isSaving}
                        >
                            {isSaving ? '发布中...' : (published ? '更新' : '发布')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 