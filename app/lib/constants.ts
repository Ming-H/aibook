/**
 * 站点配置常量
 */
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'AIBook博客';
export const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '分享AI和编程知识的博客';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/**
 * 分页配置
 */
export const POSTS_PER_PAGE = 10;
export const RELATED_POSTS_LIMIT = 3;
export const RECENT_POSTS_LIMIT = 5;
export const POPULAR_POSTS_LIMIT = 5;

/**
 * 博客分类颜色映射
 */
export const CATEGORY_COLORS: Record<string, string> = {
    'ai': 'bg-purple-100 text-purple-800',
    'web-development': 'bg-blue-100 text-blue-800',
    'design': 'bg-pink-100 text-pink-800',
    'tutorials': 'bg-green-100 text-green-800',
    'programming': 'bg-orange-100 text-orange-800',
    'productivity': 'bg-yellow-100 text-yellow-800',
    'news': 'bg-red-100 text-red-800',
    'tips': 'bg-teal-100 text-teal-800',
    'default': 'bg-gray-100 text-gray-800',
};

/**
 * 导航链接
 */
export const NAV_LINKS = [
    { href: '/', label: '首页' },
    { href: '/blog', label: '博客' },
    { href: '/about', label: '关于' },
    { href: '/contact', label: '联系' },
];

/**
 * 认证相关常量
 */
export const AUTH_REDIRECT_URL = '/dashboard';
export const AUTH_ERROR_MESSAGES = {
    INVALID_CREDENTIALS: '邮箱或密码不正确',
    EMAIL_TAKEN: '该邮箱已被注册',
    WEAK_PASSWORD: '密码强度不足',
    DEFAULT: '认证过程中出现错误，请稍后再试',
};

/**
 * 社交媒体链接
 */
export const SOCIAL_LINKS = {
    twitter: 'https://twitter.com/aibook',
    facebook: 'https://facebook.com/aibook',
    github: 'https://github.com/aibook',
    linkedin: 'https://linkedin.com/in/aibook',
};

/**
 * 日期格式
 */
export const DATE_FORMATS = {
    LONG: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    } as Intl.DateTimeFormatOptions,
    SHORT: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    } as Intl.DateTimeFormatOptions,
    YEAR_MONTH: {
        year: 'numeric',
        month: 'long',
    } as Intl.DateTimeFormatOptions,
};

/**
 * 博客评论状态
 */
export enum CommentStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    SPAM = 'spam',
    TRASH = 'trash',
}

/**
 * 用户角色
 */
export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    AUTHOR = 'author',
    SUBSCRIBER = 'subscriber',
}

/**
 * 本地存储键
 */
export const STORAGE_KEYS = {
    USER: 'aibook_user',
    THEME: 'aibook_theme',
    AUTH_TOKEN: 'aibook-auth-token',
}; 