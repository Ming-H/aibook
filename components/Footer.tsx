'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiTwitter, FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi';
import { LuGithub, LuTwitter, LuFacebook, LuLinkedin } from 'react-icons/lu';
import { NAV_LINKS, SOCIAL_LINKS, SITE_NAME } from '@/app/lib/constants';

const Footer = () => {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    // 不在某些页面显示底部（比如登录页）
    const authPages = ['/signin', '/signup', '/reset-password'];
    if (pathname && authPages.includes(pathname)) {
        return null;
    }

    return (
        <footer className="bg-background border-t py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 关于我们 */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">关于我们</h3>
                        <p className="text-muted-foreground text-sm">
                            AIBook博客是一个分享AI和编程知识的平台，我们致力于提供高质量的技术内容，帮助开发者更好地理解和应用AI技术。
                        </p>
                    </div>

                    {/* 导航链接 */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">快速链接</h3>
                        <ul className="space-y-2">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 博客分类 */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">博客分类</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/blog/category/ai"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    人工智能
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog/category/web-development"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    Web开发
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog/category/programming"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    编程技巧
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog/category/tutorials"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    教程
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 联系我们 */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">联系我们</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            关注我们的社交媒体或发送邮件至 contact@aibook.com
                        </p>

                        {/* 社交媒体图标 */}
                        <div className="flex space-x-4">
                            <a
                                href={SOCIAL_LINKS.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="GitHub"
                            >
                                <LuGithub size={20} />
                            </a>
                            <a
                                href={SOCIAL_LINKS.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Twitter"
                            >
                                <LuTwitter size={20} />
                            </a>
                            <a
                                href={SOCIAL_LINKS.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Facebook"
                            >
                                <LuFacebook size={20} />
                            </a>
                            <a
                                href={SOCIAL_LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="LinkedIn"
                            >
                                <LuLinkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* 版权信息 */}
                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {currentYear} {SITE_NAME}. 保留所有权利。</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 