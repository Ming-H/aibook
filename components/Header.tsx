'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiUser, FiLogIn, FiLogOut, FiSettings, FiHelpCircle } from 'react-icons/fi';
import Image from 'next/image';
import { NAV_LINKS } from '@/app/lib/constants';
import ThemeToggle from './ThemeToggle';
import SearchButton from './blog/SearchButton';
import UserMenu from './UserMenu';

// 导入 AuthContext (假设已创建)
import { useAuth } from '../lib/context/AuthContext';

const Header = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    // 关闭菜单的函数
    const closeMenu = () => {
        setMenuOpen(false);
    };

    // 关闭用户菜单的函数
    const closeUserMenu = () => {
        setUserMenuOpen(false);
    };

    // 点击页面其他地方关闭菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('#main-menu') && !target.closest('#menu-button')) {
                setMenuOpen(false);
            }
            if (!target.closest('#user-menu') && !target.closest('#user-menu-button')) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 不在某些页面显示头部（比如登录页）
    const authPages = ['/signin', '/signup', '/reset-password'];
    if (pathname && authPages.includes(pathname)) {
        return null;
    }

    return (
        <header className="bg-background border-b sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="font-bold text-xl">
                        AIBook<span className="text-blue-600">博客</span>
                    </Link>

                    {/* 主导航 */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* 右侧工具栏 */}
                    <div className="flex items-center space-x-3">
                        <SearchButton />
                        <ThemeToggle />
                        <UserMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 