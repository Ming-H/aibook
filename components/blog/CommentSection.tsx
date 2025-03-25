'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { format, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { useAuth } from '@/lib/context/AuthContext';
import {
    getApprovedComments,
    getUserComments,
    createComment,
    deleteComment,
    buildCommentTree
} from '@/lib/services/commentService';
import { LuMessageSquare, LuTrash, LuRefreshCw, LuReply } from 'react-icons/lu';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { getSession } from '@/lib/services/authService';
import { useRouter } from 'next/navigation';

type User = {
    id: string;
    username: string;
    display_name: string;
    avatar_url?: string;
};

type Comment = {
    id: string;
    post_id: string;
    user_id: string;
    content: string;
    created_at: string;
    updated_at?: string;
    status: 'pending' | 'approved' | 'spam' | 'trash';
    parent_id?: string;
    user?: User;
    replies?: Comment[];
};

type CommentSectionProps = {
    postId: string;
    comments: Comment[];
};

export default function CommentSection({ postId, comments }: CommentSectionProps) {
    const router = useRouter();
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    // 检查用户登录状态
    const checkAuth = async () => {
        if (isLoggedIn === null) {
            try {
                const session = await getSession();
                setIsLoggedIn(session.isAuthenticated);
            } catch (err) {
                console.error('Failed to check auth status:', err);
                setIsLoggedIn(false);
            }
        }
    };

    checkAuth();

    const handleReply = (commentId: string) => {
        setReplyTo(commentId);
        // 滚动到评论表单
        document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCancelReply = () => {
        setReplyTo(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComment.trim()) {
            setError('评论内容不能为空');
            return;
        }

        if (!isLoggedIn) {
            // 重定向到登录页
            router.push('/login?redirect=' + encodeURIComponent(`/blog/${postId}`));
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // 在真实环境中，这里应该调用API提交评论
            // 现在我们使用模拟数据服务
            const session = await getSession();

            if (!session.user) {
                throw new Error('用户未登录');
            }

            const result = await createComment({
                post_id: postId,
                user_id: session.user.id,
                content: newComment,
                parent_id: replyTo || undefined,
                user: {
                    id: session.user.id,
                    username: session.user.username,
                    display_name: session.user.display_name,
                    avatar_url: session.user.avatar_url
                }
            });

            // 重置表单
            setNewComment('');
            setReplyTo(null);

            // 刷新页面以显示新评论
            router.refresh();
        } catch (err: any) {
            console.error('Error submitting comment:', err);
            setError(err.message || '提交评论失败');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 单个评论组件
    const CommentItem = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
        <div
            id={`comment-${comment.id}`}
            className={`${isReply ? 'ml-12 mt-4' : 'mb-8 border-b pb-6'}`}
        >
            <div className="flex items-start gap-3">
                {comment.user?.avatar_url ? (
                    <Image
                        src={comment.user.avatar_url}
                        alt={comment.user.display_name}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-lg">
                            {comment.user?.display_name?.charAt(0) || '?'}
                        </span>
                    </div>
                )}

                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-medium">{comment.user?.display_name}</span>
                        <span className="text-gray-500 text-sm">
                            {formatDate(comment.created_at)}
                        </span>
                    </div>

                    <div className="prose prose-sm">{comment.content}</div>

                    <button
                        onClick={() => handleReply(comment.id)}
                        className="text-blue-600 text-sm mt-2 hover:underline"
                    >
                        回复
                    </button>
                </div>
            </div>

            {/* 渲染回复 */}
            {comment.replies && comment.replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} isReply />
            ))}
        </div>
    );

    return (
        <div>
            {/* 显示已有评论 */}
            {comments.length > 0 ? (
                <div className="mb-8">
                    {comments.map(comment => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 mb-8">暂无评论，成为第一个评论的人！</p>
            )}

            {/* 评论表单 */}
            <div id="comment-form" className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                    {replyTo ? '回复评论' : '发表评论'}
                </h3>

                {replyTo && (
                    <div className="mb-4 p-3 bg-gray-100 rounded flex justify-between items-center">
                        <p className="text-sm">
                            正在回复评论
                        </p>
                        <button
                            onClick={handleCancelReply}
                            className="text-gray-500 text-sm hover:text-red-500"
                        >
                            取消回复
                        </button>
                    </div>
                )}

                {!isLoggedIn && (
                    <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded">
                        请先<button
                            onClick={() => router.push('/login?redirect=' + encodeURIComponent(`/blog/${postId}`))}
                            className="text-blue-600 hover:underline mx-1"
                        >登录</button>后再发表评论
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={5}
                            placeholder="写下你的评论..."
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 mb-4">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || !isLoggedIn}
                        className={`px-4 py-2 rounded ${isSubmitting || !isLoggedIn
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            } text-white`}
                    >
                        {isSubmitting ? '提交中...' : '发表评论'}
                    </button>
                </form>
            </div>
        </div>
    );
} 