import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/services/blogService';
import { getAllCategories } from '@/lib/services/categoryService';
import { getTagsWithPostCount } from '@/lib/services/tagService';
import BlogCard from '@/components/blog/BlogCard';
import { LuSearch, LuTag, LuFolder, LuArrowRight, LuCalendar } from 'react-icons/lu';
import SearchForm from '@/components/blog/SearchForm';

export const metadata: Metadata = {
    title: '博客 - AIBook Studio',
    description: '探索AI、前端开发、React和Next.js的最新文章和教程',
};

export const revalidate = 3600; // 每小时重新生成页面

export default async function BlogPage() {
    try {
        // 获取文章列表
        const posts = await getPublishedPosts();

        // 获取分类列表
        const categories = await getAllCategories();

        // 获取标签列表及其文章数量
        const tags = await getTagsWithPostCount();

        // 分离出特色文章
        const featuredPost = posts.length > 0 ? posts[0] : null;
        const regularPosts = posts.length > 1 ? posts.slice(1) : [];

        return (
            <div className="container py-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-2">博客</h1>
                    <p className="text-xl text-muted-foreground">探索AI、前端开发、React和Next.js的最新文章和教程</p>
                </div>

                {/* 搜索栏 */}
                <div className="relative mb-10">
                    <SearchForm />
                </div>

                {/* 布局：左侧文章列表，右侧边栏 */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <div className="lg:col-span-3">
                        {/* 特色文章 */}
                        {featuredPost && (
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">推荐文章</h2>
                                <BlogCard post={featuredPost} variant="featured" />
                            </div>
                        )}

                        {/* 文章列表 */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold mb-4">最新文章</h2>
                            {regularPosts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {regularPosts.map(post => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 border rounded-md">
                                    <p className="text-muted-foreground">暂无文章</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 侧边栏 */}
                    <div className="space-y-8">
                        {/* 分类列表 */}
                        <div className="border rounded-md p-5">
                            <div className="flex items-center mb-4">
                                <LuFolder className="mr-2 h-5 w-5" />
                                <h3 className="text-lg font-semibold">分类</h3>
                            </div>
                            <ul className="space-y-2">
                                {categories.map(category => (
                                    <li key={category.id}>
                                        <Link
                                            href={`/blog/category/${category.slug}`}
                                            className="flex items-center justify-between text-sm hover:text-primary transition-colors"
                                        >
                                            <span>{category.name}</span>
                                            <span className="text-muted-foreground text-xs">
                                                {category.postCount || 0}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 pt-4 border-t">
                                <Link href="/blog/categories" className="text-sm text-primary flex items-center">
                                    查看全部分类
                                    <LuArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* 标签云 */}
                        <div className="border rounded-md p-5">
                            <div className="flex items-center mb-4">
                                <LuTag className="mr-2 h-5 w-5" />
                                <h3 className="text-lg font-semibold">标签</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.slice(0, 15).map(tag => (
                                    <Link
                                        key={tag.id}
                                        href={`/blog/tag/${tag.slug}`}
                                        className="px-2 py-1 border rounded-md text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                        {tag.name} ({tag.postCount || 0})
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <Link href="/blog/tags" className="text-sm text-primary flex items-center">
                                    查看全部标签
                                    <LuArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* 博客归档 */}
                        <div className="border rounded-md p-5">
                            <div className="flex items-center mb-4">
                                <LuCalendar className="mr-2 h-5 w-5" />
                                <h3 className="text-lg font-semibold">归档</h3>
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <Link href="/blog/archives" className="text-sm text-primary flex items-center">
                                    查看文章归档
                                    <LuArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Blog page error:", error);
        return (
            <div className="container py-8">
                <div className="text-center py-10">
                    <h1 className="text-2xl font-bold mb-4">加载博客内容时出错</h1>
                    <p className="text-muted-foreground mb-4">抱歉，我们无法加载博客内容。请稍后再试。</p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        返回首页
                    </Link>
                </div>
            </div>
        );
    }
} 