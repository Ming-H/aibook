import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并classnames的工具函数，结合clsx和tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

/**
 * 格式化日期
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    // 使用本地时间格式
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * 将文本截断为指定长度
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * 获取友好的时间显示
 */
export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // 不同时间单位的秒数
    const intervals = {
        年: 31536000,
        月: 2592000,
        周: 604800,
        天: 86400,
        小时: 3600,
        分钟: 60
    };

    // 遍历并找到最合适的时间单位
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}前`;
        }
    }

    return '刚刚';
} 