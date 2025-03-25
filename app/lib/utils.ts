import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并Tailwind CSS类名
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * 格式化日期
 * @param date 日期对象或日期字符串
 * @param options 格式化选项
 * @returns 格式化后的日期字符串
 */
export function formatDate(
    date: Date | string,
    options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    }
) {
    const d = typeof date === "string" ? new Date(date) : date
    return d.toLocaleDateString("zh-CN", options)
}

/**
 * 截断文本
 * @param text 要截断的文本
 * @param length 最大长度
 * @returns 截断后的文本
 */
export function truncateText(text: string, length: number): string {
    if (text.length <= length) return text
    return text.slice(0, length) + "..."
}

/**
 * 生成随机ID
 * @returns 随机ID字符串
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9)
}

/**
 * 从URL中获取slug
 * @param url URL字符串
 * @returns slug字符串
 */
export function getSlugFromUrl(url: string): string {
    const parts = url.split("/")
    return parts[parts.length - 1]
}

/**
 * 计算阅读时间
 * @param content 文章内容
 * @returns 阅读时间（分钟）
 */
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200
    const wordCount = content.trim().split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * 将HTML字符串转换为纯文本
 * @param html HTML字符串
 * @returns 纯文本
 */
export function htmlToPlainText(html: string): string {
    return html.replace(/<[^>]*>?/gm, "")
}

/**
 * 检查是否为客户端
 * @returns 是否为客户端
 */
export const isClient = typeof window !== "undefined"

/**
 * 检查是否为服务器
 * @returns 是否为服务器
 */
export const isServer = typeof window === "undefined"

/**
 * 延迟函数
 * @param ms 延迟毫秒数
 * @returns Promise
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * 获取随机元素
 * @param array 数组
 * @returns 随机元素
 */
export function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
}

/**
 * 洗牌数组
 * @param array 要洗牌的数组
 * @returns 洗牌后的新数组
 */
export function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
} 