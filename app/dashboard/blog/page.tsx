import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserPosts } from '@/lib/services/blogService';
import { Button } from '@/components/ui/button';
import { createServerClient } from '@/lib/supabase/server';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { LuPlus, LuPencil, LuEye, LuArchive, LuSend } from 'react-icons/lu';

// 辅助函数：格式化日期
function formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // 格式：YYYY-MM-DD
}

export const metadata: Metadata = {
    title: '管理博客文章 - AIBook Studio',
    description: '创建、编辑和管理您的博客文章',
};

export default async function BlogManagePage() {
    // 获取当前登录用户
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        // 如果用户未登录，重定向到登录页面
        redirect('/signin?redirectTo=/dashboard/blog');
    }

    // 获取用户的文章列表
    const posts = await getUserPosts(session.user.id);

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">博客管理</h1>
                    <p className="text-muted-foreground mt-1">创建、编辑和管理您的博客文章</p>
                </div>
                <Link href="/dashboard/blog/new">
                    <Button>
                        <LuPlus className="mr-2 h-4 w-4" />
                        写新文章
                    </Button>
                </Link>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-16 border rounded-lg">
                    <h3 className="text-xl font-medium mb-2">您还没有创建任何文章</h3>
                    <p className="text-muted-foreground mb-6">
                        开始创建您的第一篇博客文章吧
                    </p>
                    <Link href="/dashboard/blog/new">
                        <Button>
                            <LuPlus className="mr-2 h-4 w-4" />
                            写新文章
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableCaption>您共有 {posts.length} 篇文章</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">标题</TableHead>
                                <TableHead>分类</TableHead>
                                <TableHead className="text-center">状态</TableHead>
                                <TableHead>创建日期</TableHead>
                                <TableHead className="text-center">阅读量</TableHead>
                                <TableHead className="text-right">操作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">
                                        <div className="truncate max-w-[300px]" title={post.title}>
                                            {post.title}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {post.blog_categories?.name || '无分类'}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.published
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                            }`}>
                                            {post.published ? '已发布' : '草稿'}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(post.created_at)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {post.view_count}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link href={`/dashboard/blog/edit/${post.id}`}>
                                                <Button variant="outline" size="icon" title="编辑">
                                                    <LuPencil className="h-4 w-4" />
                                                    <span className="sr-only">编辑</span>
                                                </Button>
                                            </Link>
                                            <Link href={`/blog/${post.slug}`} target="_blank">
                                                <Button variant="outline" size="icon" title="查看">
                                                    <LuEye className="h-4 w-4" />
                                                    <span className="sr-only">查看</span>
                                                </Button>
                                            </Link>
                                            <PostStatusToggleButton
                                                postId={post.id}
                                                currentStatus={post.published}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}

// 这是一个客户端组件，用于切换文章的发布状态
'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updatePost } from '@/lib/services/blogService';

function PostStatusToggleButton({
    postId,
    currentStatus
}: {
    postId: string;
    currentStatus: boolean;
}) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const toggleStatus = async () => {
        setIsPending(true);
        try {
            const { data, error } = await updatePost(postId, {
                published: !currentStatus
            });

            if (error) throw error;

            toast.success(
                currentStatus
                    ? '文章已设为草稿'
                    : '文章已发布'
            );

            // 刷新页面数据
            router.refresh();
        } catch (error) {
            console.error('更新文章状态失败:', error);
            toast.error('更新文章状态失败');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleStatus}
            disabled={isPending}
            title={currentStatus ? '转为草稿' : '发布文章'}
        >
            {currentStatus ? (
                <LuArchive className="h-4 w-4" />
            ) : (
                <LuSend className="h-4 w-4" />
            )}
            <span className="sr-only">
                {currentStatus ? '转为草稿' : '发布文章'}
            </span>
        </Button>
    );
} 