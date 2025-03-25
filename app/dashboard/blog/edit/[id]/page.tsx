'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { updatePost, updatePostTags, getPostTags } from '@/lib/services/blogService';
import BlogEditor from '@/components/blog/BlogEditor';
import CategorySelector from '@/components/blog/CategorySelector';
import TagSelector from '@/components/blog/TagSelector';
import { LuArrowLeft, LuSave, LuSend, LuTrash2 } from 'react-icons/lu';
import Link from 'next/link';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();

    // 文章表单状态
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [published, setPublished] = useState(false);
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');

    // UI状态
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('content');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // 获取文章详情
    useEffect(() => {
        const fetchPost = async () => {
            if (!user) return;

            try {
                setIsLoading(true);
                const supabase = createClient();

                // 获取文章详情
                const { data: post, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('id', params.id)
                    .single();

                if (error) {
                    throw error;
                }

                // 如果不是文章作者，跳转回列表页
                if (post.author_id !== user.id) {
                    toast.error('您没有权限编辑此文章');
                    router.push('/dashboard/blog');
                    return;
                }

                // 加载文章标签
                const tags = await getPostTags(post.id);
                setSelectedTags(tags.map((tag: any) => tag.id));

                // 设置表单数据
                setTitle(post.title);
                setSlug(post.slug);
                setContent(post.content);
                setExcerpt(post.excerpt || '');
                setFeaturedImage(post.featured_image || '');
                setCategoryId(post.category_id || '');
                setPublished(post.published);
                setMetaTitle(post.meta_title || '');
                setMetaDescription(post.meta_description || '');
            } catch (error) {
                console.error('加载文章失败:', error);
                toast.error('加载文章失败');
                router.push('/dashboard/blog');
            } finally {
                setIsLoading(false);
            }
        };

        if (!authLoading && user) {
            fetchPost();
        }
    }, [params.id, user, authLoading, router]);

    // 检查用户是否已登录
    useEffect(() => {
        if (!authLoading && !user) {
            router.push(`/signin?redirectTo=/dashboard/blog/edit/${params.id}`);
        }
    }, [user, authLoading, router, params.id]);

    // 提交表单
    const handleSubmit = async (publish?: boolean) => {
        if (!user) {
            toast.error('请先登录');
            return;
        }

        if (!title) {
            toast.error('标题不能为空');
            return;
        }

        if (!slug) {
            toast.error('别名不能为空');
            return;
        }

        if (!content) {
            toast.error('内容不能为空');
            return;
        }

        setIsSubmitting(true);

        try {
            // 更新文章
            const updates = {
                title,
                slug,
                content,
                excerpt: excerpt || null,
                featured_image: featuredImage || null,
                category_id: categoryId || null,
                meta_title: metaTitle || null,
                meta_description: metaDescription || null
            };

            // 如果明确指定了发布状态，添加到更新中
            if (publish !== undefined) {
                Object.assign(updates, { published: publish });
            }

            const { data, error } = await updatePost(params.id, updates);

            if (error) {
                throw error;
            }

            if (data) {
                // 更新文章标签关联
                await updatePostTags(data.id, selectedTags);

                toast.success('文章已更新');

                // 如果明确要发布，显示不同的消息
                if (publish === true && !published) {
                    toast.success('文章已发布成功');
                } else if (publish === false && published) {
                    toast.success('文章已保存为草稿');
                }

                // 更新本地状态
                if (publish !== undefined) {
                    setPublished(publish);
                }
            }
        } catch (error: any) {
            console.error('更新文章失败:', error);
            toast.error(`更新文章失败: ${error.message || '未知错误'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 删除文章
    const handleDeletePost = async () => {
        if (!user) {
            toast.error('请先登录');
            return;
        }

        try {
            setIsSubmitting(true);
            const supabase = createClient();

            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', params.id)
                .eq('author_id', user.id);

            if (error) {
                throw error;
            }

            toast.success('文章已删除');
            router.push('/dashboard/blog');
        } catch (error: any) {
            console.error('删除文章失败:', error);
            toast.error(`删除文章失败: ${error.message || '未知错误'}`);
        } finally {
            setIsSubmitting(false);
            setIsDeleteDialogOpen(false);
        }
    };

    if (authLoading || isLoading) {
        return (
            <div className="container flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <Link href="/dashboard/blog" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
                        <LuArrowLeft className="mr-1 h-4 w-4" />
                        返回文章列表
                    </Link>
                    <h1 className="text-3xl font-bold">编辑文章</h1>
                </div>
                <div className="flex items-center gap-2">
                    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <LuTrash2 className="mr-2 h-4 w-4" />
                                删除文章
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>您确定要删除这篇文章吗？</AlertDialogTitle>
                                <AlertDialogDescription>
                                    此操作不可撤销。文章将被永久删除，且无法恢复。
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>取消</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeletePost}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    删除
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    {published ? (
                        <Button
                            variant="outline"
                            onClick={() => handleSubmit(false)}
                            disabled={isSubmitting}
                        >
                            <LuSave className="mr-2 h-4 w-4" />
                            转为草稿
                        </Button>
                    ) : (
                        <Button
                            onClick={() => handleSubmit(true)}
                            disabled={isSubmitting}
                        >
                            <LuSend className="mr-2 h-4 w-4" />
                            发布文章
                        </Button>
                    )}

                    <Button
                        onClick={() => handleSubmit()}
                        disabled={isSubmitting}
                    >
                        <LuSave className="mr-2 h-4 w-4" />
                        保存更新
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="space-y-6">
                        {/* 标题和别名 */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">文章标题</Label>
                                <Input
                                    id="title"
                                    placeholder="输入文章标题"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">文章别名</Label>
                                <Input
                                    id="slug"
                                    placeholder="输入文章别名（用于URL）"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    别名用于URL中，例如：https://aibook.studio/blog/<strong>{slug || 'article-name'}</strong>
                                </p>
                            </div>
                        </div>

                        {/* 内容/SEO选项卡 */}
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="content">文章内容</TabsTrigger>
                                <TabsTrigger value="seo">SEO设置</TabsTrigger>
                            </TabsList>

                            <TabsContent value="content" className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="content">文章内容 (Markdown)</Label>
                                    <BlogEditor content={content} onChange={setContent} />
                                </div>
                            </TabsContent>

                            <TabsContent value="seo" className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="meta-title">Meta 标题</Label>
                                    <Input
                                        id="meta-title"
                                        placeholder="SEO标题（可选）"
                                        value={metaTitle}
                                        onChange={(e) => setMetaTitle(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        如果不填写，将使用文章标题
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="meta-description">Meta 描述</Label>
                                    <Textarea
                                        id="meta-description"
                                        placeholder="SEO描述（可选）"
                                        value={metaDescription}
                                        onChange={(e) => setMetaDescription(e.target.value)}
                                        rows={3}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        如果不填写，将使用文章摘要
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* 发布设置 */}
                    <div className="border rounded-md p-6">
                        <h3 className="text-lg font-medium mb-4">发布设置</h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="published">发布状态</Label>
                                    <p className="text-sm text-muted-foreground">
                                        {published ? '文章已发布' : '文章为草稿状态'}
                                    </p>
                                </div>
                                <Switch
                                    id="published"
                                    checked={published}
                                    onCheckedChange={(checked) => handleSubmit(checked)}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="featured-image">特色图片</Label>
                                <Input
                                    id="featured-image"
                                    placeholder="输入图片URL"
                                    value={featuredImage}
                                    onChange={(e) => setFeaturedImage(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    输入图片URL或使用编辑器上传图片后粘贴链接
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">文章摘要</Label>
                                <Textarea
                                    id="excerpt"
                                    placeholder="输入文章摘要"
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    rows={3}
                                />
                                <p className="text-xs text-muted-foreground">
                                    文章摘要会显示在列表页和SEO描述中
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 分类和标签 */}
                    <div className="border rounded-md p-6">
                        <h3 className="text-lg font-medium mb-4">分类和标签</h3>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="category">分类</Label>
                                <CategorySelector
                                    value={categoryId}
                                    onChange={setCategoryId}
                                />
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <TagSelector
                                    postId={params.id}
                                    selectedTags={selectedTags}
                                    onChange={setSelectedTags}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 