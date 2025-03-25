'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LuUser, LuLogIn, LuLogOut, LuSettings, LuPlus } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/context/AuthContext';

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { user, signOut } = useAuth();

    // 关闭菜单的点击外部处理函数
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('#user-menu-container')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // 切换菜单显示状态
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // 处理登出
    const handleSignOut = async () => {
        await signOut();
        setIsOpen(false);
        router.push('/');
    };

    return (
        <div className="relative" id="user-menu-container">
            {/* 用户头像或登录按钮 */}
            <button
                onClick={toggleMenu}
                className="flex items-center p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={user ? '用户菜单' : '登录'}
            >
                {user ? (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar_url || ''} alt={user.display_name} />
                        <AvatarFallback>{user.display_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                ) : (
                    <LuUser className="w-5 h-5" />
                )}
            </button>

            {/* 下拉菜单 */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg border overflow-hidden">
                    {user ? (
                        <>
                            {/* 已登录用户信息 */}
                            <div className="p-3 border-b">
                                <p className="font-semibold truncate">{user.display_name}</p>
                                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                            </div>

                            {/* 菜单选项 */}
                            <div className="py-1">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LuSettings className="mr-2 w-4 h-4" />
                                    控制面板
                                </Link>
                                <Link
                                    href="/blog/new"
                                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LuPlus className="mr-2 w-4 h-4" />
                                    写博客
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600"
                                >
                                    <LuLogOut className="mr-2 w-4 h-4" />
                                    退出登录
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* 未登录菜单选项 */}
                            <div className="py-1">
                                <Link
                                    href="/login"
                                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LuLogIn className="mr-2 w-4 h-4" />
                                    登录
                                </Link>
                                <Link
                                    href="/register"
                                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LuUser className="mr-2 w-4 h-4" />
                                    注册
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
} 