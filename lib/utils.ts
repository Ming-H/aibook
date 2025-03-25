import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 合并类名
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * 格式化日期为友好的显示格式
 * @param dateString 日期字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    // 如果是今天
    if (date.toDateString() === now.toDateString()) {
        return '今天';
    }

    // 如果是昨天
    if (date.toDateString() === yesterday.toDateString()) {
        return '昨天';
    }

    // 如果是今年
    if (date.getFullYear() === now.getFullYear()) {
        return `${date.getMonth() + 1}月${date.getDate()}日`;
    }

    // 其他情况，显示完整日期
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

/**
 * 从Markdown内容中提取纯文本
 * @param markdown Markdown格式的文本
 * @param maxLength 最大长度
 * @returns 提取的纯文本
 */
export function extractTextFromMarkdown(markdown: string, maxLength: number = 160): string {
    if (!markdown) return '';

    // 移除标题标记
    let text = markdown.replace(/#+\s/g, '');

    // 移除链接，保留链接文本
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // 移除图片
    text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

    // 移除粗体和斜体标记
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    text = text.replace(/(\*|_)(.*?)\1/g, '$2');

    // 移除代码块
    text = text.replace(/```[\s\S]*?```/g, '');

    // 移除行内代码
    text = text.replace(/`([^`]+)`/g, '$1');

    // 移除HTML标签
    text = text.replace(/<[^>]*>/g, '');

    // 移除多余空格和换行
    text = text.replace(/\s+/g, ' ').trim();

    // 截断到指定长度
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }

    return text;
}

/**
 * 从HTML内容中提取纯文本
 * @param html HTML格式的文本
 * @param maxLength 最大长度
 * @returns 提取的纯文本
 */
export function extractTextFromHtml(html: string, maxLength: number = 160): string {
    if (!html) return '';

    // 创建一个临时DOM元素来获取文本内容
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // 获取文本内容
    let text = tempDiv.textContent || tempDiv.innerText || '';

    // 移除多余空格和换行
    text = text.replace(/\s+/g, ' ').trim();

    // 截断到指定长度
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }

    return text;
} 