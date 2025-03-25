import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostTags, getRelatedPosts } from '@/lib/services/blogService';
import CommentSection from '@/components/blog/CommentSection';
import BlogCard from '@/components/blog/BlogCard';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LuCalendar, LuEye, LuUser, LuTag, LuFolder, LuArrowLeft, LuShare2 } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPostComments } from '@/lib/services/commentService';
import { recordPostView } from '@/lib/services/statService';
import { formatDate } from '@/lib/utils';
import ShareButtons from '@/components/blog/ShareButtons';
import RelatedPosts from '@/components/blog/RelatedPosts';

// 辅助函数：格式化日期
function formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // 格式：YYYY-MM-DD
}

// 动态生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {
            title: '文章未找到 | AIBook Studio',
            description: '您请求的文章不存在或已被移除。',
        };
    }

    return {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        openGraph: {
            title: post.meta_title || post.title,
            description: post.meta_description || post.excerpt,
            images: post.featured_image ? [post.featured_image] : [],
        },
    };
}

export const revalidate = 3600; // 每小时重新生成页面

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    // 记录文章浏览量
    await recordPostView(post.id);

    // 获取文章标签和评论
    const tags = await getPostTags(post.id);
    const comments = await getPostComments(post.id, true);

    return (
        <div className="container mx-auto px-4 py-8">
            <article className="max-w-4xl mx-auto">
                {/* 文章头部 */}
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                        <div className="flex items-center">
                            {post.author?.avatar_url && (
                                <Image
                                    src={post.author.avatar_url}
                                    alt={post.author.display_name}
                                    width={32}
                                    height={32}
                                    className="rounded-full mr-2"
                                />
                            )}
                            <span>{post.author?.display_name}</span>
                        </div>

                        <div>发布于: {formatDate(post.created_at)}</div>

                        {post.updated_at && post.updated_at !== post.created_at && (
                            <div>更新于: {formatDate(post.updated_at)}</div>
                        )}

                        {post.category && (
                            <div>
                                分类:
                                <Link
                                    href={`/blog/category/${post.category.slug}`}
                                    className="text-blue-600 hover:underline ml-1"
                                >
                                    {post.category.name}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* 特色图片 */}
                    {post.featured_image && (
                        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
                            <Image
                                src={post.featured_image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </header>

                {/* 文章内容 */}
                <div
                    className="prose prose-lg max-w-none mb-8"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* 文章底部 */}
                <footer className="border-t border-b py-6 my-8">
                    {/* 标签列表 */}
                    {tags.length > 0 && (
                        <div className="mb-6">
                            <span className="font-semibold mr-2">标签:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map(tag => (
                                    <Link
                                        key={tag.id}
                                        href={`/blog/tag/${tag.slug}`}
                                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                                    >
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 分享按钮 */}
                    <ShareButtons
                        title={post.title}
                        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/blog/${post.slug}`}
                    />
                </footer>

                {/* 评论区 */}
                <section className="my-12">
                    <h2 className="text-2xl font-bold mb-6">评论 ({comments.length})</h2>
                    <CommentSection postId={post.id} comments={comments} />
                </section>

                {/* 相关文章 */}
                <RelatedPosts currentPostId={post.id} categoryId={post.category_id} />
            </article>
        </div>
    );
} 