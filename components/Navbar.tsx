'use client';

import { useState } from 'react';
import Link from 'next/link';
// Remove framer-motion import temporarily
// import { motion } from 'framer-motion';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle'; // 导入主题切换组件

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    // 模拟用户登录状态，实际应用中应该从认证系统获取
    const isLoggedIn = false;

    // Replace framer-motion variants with regular styles
    // const menuVariants = {
    //     closed: {
    //         opacity: 0,
    //         height: 0,
    //         transition: {
    //             duration: 0.2
    //         }
    //     },
    //     open: {
    //         opacity: 1,
    //         height: 'auto',
    //         transition: {
    //             duration: 0.3
    //         }
    //     }
    // };

    const links = [
        { name: '功能', href: '/features' },
        { name: '工作流', href: '/workflow' },
        { name: '案例', href: '/showcase' },
        { name: '价格', href: '/pricing' },
        { name: '资源', href: '/resources' },
    ];

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">AIBook Studio</span>
                        </Link>
                    </div>

                    {/* 桌面导航 */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex items-center space-x-2">
                            <ThemeToggle /> {/* 添加主题切换按钮 */}

                            {isLoggedIn ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
                                    >
                                        <FiUser className="h-5 w-5 mr-1" />
                                        <span>我的账户</span>
                                    </button>
                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                                            <Link
                                                href="/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                控制台
                                            </Link>
                                            <Link
                                                href="/projects"
                                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                我的项目
                                            </Link>
                                            <Link
                                                href="/settings"
                                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                设置
                                            </Link>
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                退出登录
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex space-x-2">
                                    <Link
                                        href="/signin"
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        登录
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        注册
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 移动端菜单按钮 */}
                    <div className="flex items-center md:hidden">
                        <ThemeToggle /> {/* 移动端也添加主题切换按钮 */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                        >
                            <span className="sr-only">打开主菜单</span>
                            {isOpen ? (
                                <FiX className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <FiMenu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 移动端菜单 */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {!isLoggedIn && (
                            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                                <div className="space-y-1">
                                    <Link
                                        href="/signin"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        登录
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        注册
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
} 