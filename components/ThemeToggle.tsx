'use client';

import { useEffect, useState } from 'react';
import { LuSun, LuMoon } from 'react-icons/lu';
import { STORAGE_KEYS } from '@/app/lib/constants';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    // 初始化主题
    useEffect(() => {
        setMounted(true);

        // 获取存储的主题或系统主题偏好
        const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark' | null;
        const systemTheme: 'light' | 'dark' = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        const initialTheme = storedTheme || systemTheme;
        setTheme(initialTheme);

        // 应用主题到HTML元素
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // 如果没有挂载完成，返回null避免水合不匹配
    if (!mounted) {
        return null;
    }

    // 切换主题
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem(STORAGE_KEYS.THEME, newTheme);

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
        >
            {theme === 'light' ? (
                <LuMoon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            ) : (
                <LuSun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            )}
        </button>
    );
} 