'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import {
    FiSearch,
    FiFilter,
    FiStar,
    FiChevronRight,
    FiTool,
    FiGrid,
    FiList,
    FiFeather,
    FiCommand,
    FiImage,
    FiCode,
    FiBarChart2,
    FiMessageSquare,
    FiSettings,
    FiTerminal,
    FiMusic,
    FiCpu,
    FiLayout,
    FiBook,
    FiBookmark,
    FiPlay,
    FiLock,
    FiExternalLink,
    FiAlertTriangle
} from 'react-icons/fi';

// 工具类型定义
type Tool = {
    id: string;
    name: string;
    description: string;
    category: string;
    features: string[];
    imageUrl: string;
    rating: number;
    reviewCount: number;
    isPremium: boolean;
    isNew: boolean;
    isPopular: boolean;
    usageLimit?: string;
    integrations?: string[];
    tutorialUrl?: string;
};

export default function ToolsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [tools, setTools] = useState<Tool[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showPremiumOnly, setShowPremiumOnly] = useState(false);

    // 工具分类
    const categories = [
        { id: 'all', name: '全部工具', icon: FiTool },
        { id: 'text', name: '文本创作', icon: FiFeather },
        { id: 'ai', name: 'AI助手', icon: FiCpu },
        { id: 'design', name: '设计工具', icon: FiImage },
        { id: 'code', name: '代码辅助', icon: FiCode },
        { id: 'analytics', name: '分析工具', icon: FiBarChart2 },
        { id: 'media', name: '媒体处理', icon: FiMusic },
        { id: 'productivity', name: '效率工具', icon: FiCommand },
    ];

    // 加载工具
    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/signin');
            return;
        }

        fetchTools();
    }, [authLoading, user, router]);

    // 模拟获取工具
    const fetchTools = () => {
        setIsLoading(true);

        // 模拟API请求延迟
        setTimeout(() => {
            // 模拟工具数据
            const mockTools: Tool[] = [
                {
                    id: 'tool1',
                    name: 'AI文本助手',
                    description: '强大的AI文本生成和编辑工具，帮助创作各类文案和内容',
                    category: 'text',
                    features: ['智能文案生成', '内容改写', '风格转换', '语法校对', '多语言支持'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.8,
                    reviewCount: 486,
                    isPremium: false,
                    isNew: false,
                    isPopular: true,
                    integrations: ['Markdown编辑器', '创意DNA系统'],
                    tutorialUrl: '/tutorials/ai-text-assistant',
                },
                {
                    id: 'tool2',
                    name: 'Smart图像编辑器',
                    description: '基于AI的图像编辑工具，提供智能裁剪、风格转换和背景移除等功能',
                    category: 'design',
                    features: ['智能裁剪', '风格转换', '背景移除', '图像增强', '尺寸调整'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.6,
                    reviewCount: 312,
                    isPremium: true,
                    isNew: false,
                    isPopular: true,
                    usageLimit: '免费版每月20次操作',
                    integrations: ['项目库', '设计系统'],
                },
                {
                    id: 'tool3',
                    name: 'Code Copilot',
                    description: '智能代码辅助工具，提供代码补全、重构建议和问题诊断',
                    category: 'code',
                    features: ['代码补全', '语法检查', '重构建议', '性能优化', '问题诊断'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.7,
                    reviewCount: 276,
                    isPremium: true,
                    isNew: false,
                    isPopular: false,
                    integrations: ['代码编辑器', 'GitHub'],
                },
                {
                    id: 'tool4',
                    name: '内容分析助手',
                    description: '分析内容质量、受众匹配度和SEO优化建议',
                    category: 'analytics',
                    features: ['内容质量评分', '受众匹配分析', 'SEO优化建议', '竞品比较', '热门话题发现'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.5,
                    reviewCount: 198,
                    isPremium: false,
                    isNew: true,
                    isPopular: false,
                    tutorialUrl: '/tutorials/content-analyzer',
                },
                {
                    id: 'tool5',
                    name: '创意头脑风暴',
                    description: '帮助生成创意思路，突破思维瓶颈的工具',
                    category: 'ai',
                    features: ['关键词扩展', '概念联想', '创意组合', '随机启发', '头脑风暴指南'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.9,
                    reviewCount: 421,
                    isPremium: false,
                    isNew: false,
                    isPopular: true,
                    integrations: ['工作流引擎', '项目看板'],
                },
                {
                    id: 'tool6',
                    name: '音频处理套件',
                    description: '多功能音频处理工具，支持降噪、转录和音效添加',
                    category: 'media',
                    features: ['噪音消除', '音频转录', '音效添加', '音频格式转换', '声音均衡'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.4,
                    reviewCount: 167,
                    isPremium: true,
                    isNew: true,
                    isPopular: false,
                    usageLimit: '免费版每月10分钟处理时长',
                },
                {
                    id: 'tool7',
                    name: '会议助手',
                    description: '自动记录会议内容，生成摘要和行动项',
                    category: 'productivity',
                    features: ['实时转录', '自动摘要', '行动项提取', '关键点标记', '会议回顾'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.7,
                    reviewCount: 234,
                    isPremium: true,
                    isNew: true,
                    isPopular: true,
                    integrations: ['日历', '任务管理系统'],
                    tutorialUrl: '/tutorials/meeting-assistant',
                },
                {
                    id: 'tool8',
                    name: 'Multi-AI对话',
                    description: '支持与多个专业AI角色同时对话的工具',
                    category: 'ai',
                    features: ['多角色对话', '专业领域AI', '角色定制', '对话导出', '上下文管理'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.8,
                    reviewCount: 352,
                    isPremium: true,
                    isNew: false,
                    isPopular: true,
                    usageLimit: '免费版每日5次对话',
                    integrations: ['创意DNA系统', '工作流引擎'],
                },
                {
                    id: 'tool9',
                    name: '数据可视化生成器',
                    description: '将数据转化为交互式图表和可视化的工具',
                    category: 'analytics',
                    features: ['多种图表类型', '交互式设计', '数据导入导出', '自定义主题', '实时更新'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.6,
                    reviewCount: 189,
                    isPremium: false,
                    isNew: false,
                    isPopular: false,
                    integrations: ['数据分析工具', '项目报告系统'],
                },
                {
                    id: 'tool10',
                    name: '网页设计助手',
                    description: '辅助网页设计的工具，提供布局建议和样式生成',
                    category: 'design',
                    features: ['布局建议', '色彩方案', '响应式设计', '组件库', '代码生成'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.5,
                    reviewCount: 210,
                    isPremium: false,
                    isNew: true,
                    isPopular: false,
                    tutorialUrl: '/tutorials/web-design-assistant',
                },
                {
                    id: 'tool11',
                    name: '知识库管理',
                    description: '管理和组织研究资料和知识的工具',
                    category: 'productivity',
                    features: ['智能分类', '全文搜索', '内容链接', '标签管理', '知识图谱'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.7,
                    reviewCount: 176,
                    isPremium: true,
                    isNew: false,
                    isPopular: false,
                    integrations: ['文档系统', '研究助手'],
                },
                {
                    id: 'tool12',
                    name: '视频编辑AI',
                    description: '智能视频编辑工具，提供自动剪辑和特效添加',
                    category: 'media',
                    features: ['自动剪辑', '字幕生成', '特效模板', '场景识别', '一键导出'],
                    imageUrl: '/placeholder-tool.jpg',
                    rating: 4.6,
                    reviewCount: 245,
                    isPremium: true,
                    isNew: true,
                    isPopular: true,
                    usageLimit: '免费版每月30分钟处理时长',
                    tutorialUrl: '/tutorials/video-ai-editor',
                },
            ];

            setTools(mockTools);
            setIsLoading(false);
        }, 1200);
    };

    // 过滤工具
    const filteredTools = tools.filter(tool => {
        // 搜索过滤
        const matchesSearch =
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));

        // 分类过滤
        const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;

        // 高级版过滤
        const matchesPremium = !showPremiumOnly || tool.isPremium;

        return matchesSearch && matchesCategory && matchesPremium;
    });

    // 热门工具
    const popularTools = tools.filter(tool => tool.isPopular);

    // 新工具
    const newTools = tools.filter(tool => tool.isNew);

    // 加载状态
    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <p className="mt-4 text-gray-300">加载工具集...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* 页面标题区域 */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-white mb-4">创作工具集</h1>
                    <p className="text-xl text-gray-400">
                        精选的创作和项目管理工具，帮助您提高效率和质量
                    </p>
                </div>

                {/* 工具搜索和筛选 */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="md:w-96 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="搜索工具..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <input
                                id="premium-toggle"
                                type="checkbox"
                                checked={showPremiumOnly}
                                onChange={() => setShowPremiumOnly(!showPremiumOnly)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded"
                            />
                            <label htmlFor="premium-toggle" className="ml-2 text-gray-300">
                                仅显示高级工具
                            </label>
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md ${viewMode === 'grid'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                            >
                                <FiGrid className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md ${viewMode === 'list'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                            >
                                <FiList className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 分类导航 */}
                <div className="mb-8 overflow-x-auto">
                    <div className="flex space-x-2 pb-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-md flex items-center whitespace-nowrap ${selectedCategory === category.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                <category.icon className="mr-2 h-4 w-4" />
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 热门工具 */}
                {selectedCategory === 'all' && searchQuery === '' && !showPremiumOnly && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <FiStar className="mr-2 text-yellow-400" />
                            热门工具
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {popularTools.slice(0, 3).map(tool => (
                                <div
                                    key={tool.id}
                                    className="bg-gradient-to-br from-gray-800 to-gray-750 rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="w-12 h-12 rounded-lg bg-blue-600 bg-opacity-20 flex items-center justify-center">
                                                {tool.category === 'text' && <FiFeather className="h-6 w-6 text-blue-400" />}
                                                {tool.category === 'design' && <FiImage className="h-6 w-6 text-purple-400" />}
                                                {tool.category === 'code' && <FiCode className="h-6 w-6 text-green-400" />}
                                                {tool.category === 'analytics' && <FiBarChart2 className="h-6 w-6 text-yellow-400" />}
                                                {tool.category === 'ai' && <FiCpu className="h-6 w-6 text-red-400" />}
                                                {tool.category === 'media' && <FiMusic className="h-6 w-6 text-pink-400" />}
                                                {tool.category === 'productivity' && <FiCommand className="h-6 w-6 text-teal-400" />}
                                            </div>
                                            <div className="flex items-center">
                                                <FiStar className="text-yellow-400 h-5 w-5" />
                                                <span className="ml-1 text-white font-medium">{tool.rating}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mt-4 mb-2">
                                            {tool.name}
                                        </h3>
                                        <p className="text-gray-400 mb-4 line-clamp-2">
                                            {tool.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {tool.features.slice(0, 3).map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center mt-6">
                                            {tool.isPremium ? (
                                                <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-md flex items-center">
                                                    <FiLock className="mr-1" />
                                                    高级版
                                                </span>
                                            ) : (
                                                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-md">
                                                    免费工具
                                                </span>
                                            )}
                                            <Link
                                                href={`/tools/${tool.id}`}
                                                className="text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors group-hover:translate-x-1 transition-transform duration-300"
                                            >
                                                立即使用
                                                <FiChevronRight className="ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 新工具 */}
                {selectedCategory === 'all' && searchQuery === '' && !showPremiumOnly && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <FiBookmark className="mr-2 text-green-400" />
                            新增工具
                        </h2>

                        <div className="bg-gray-800 rounded-xl overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-gray-700">
                                {newTools.slice(0, 4).map(tool => (
                                    <div key={tool.id} className="p-4 hover:bg-gray-750 transition-colors">
                                        <div className="flex items-center mb-2">
                                            {tool.category === 'text' && <FiFeather className="h-5 w-5 text-blue-400 mr-2" />}
                                            {tool.category === 'design' && <FiImage className="h-5 w-5 text-purple-400 mr-2" />}
                                            {tool.category === 'code' && <FiCode className="h-5 w-5 text-green-400 mr-2" />}
                                            {tool.category === 'analytics' && <FiBarChart2 className="h-5 w-5 text-yellow-400 mr-2" />}
                                            {tool.category === 'ai' && <FiCpu className="h-5 w-5 text-red-400 mr-2" />}
                                            {tool.category === 'media' && <FiMusic className="h-5 w-5 text-pink-400 mr-2" />}
                                            {tool.category === 'productivity' && <FiCommand className="h-5 w-5 text-teal-400 mr-2" />}
                                            <h3 className="text-white font-medium">{tool.name}</h3>
                                            <span className="ml-2 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-md">新</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                                            {tool.description}
                                        </p>
                                        <Link
                                            href={`/tools/${tool.id}`}
                                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center transition-colors"
                                        >
                                            了解更多
                                            <FiChevronRight className="ml-1" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 所有工具 */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">
                        {selectedCategory === 'all' ? '所有工具' : categories.find(c => c.id === selectedCategory)?.name || '工具'}
                    </h2>

                    {filteredTools.length === 0 ? (
                        <div className="bg-gray-800 rounded-lg p-10 text-center">
                            <div className="flex justify-center mb-4">
                                <FiAlertTriangle className="h-12 w-12 text-gray-500" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">未找到匹配的工具</h3>
                            <p className="text-gray-400 mb-6">
                                没有找到符合您筛选条件的工具。请尝试调整搜索条件或查看全部工具。
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                    setShowPremiumOnly(false);
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md inline-flex items-center transition-colors"
                            >
                                查看所有工具
                            </button>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTools.map(tool => (
                                <div
                                    key={tool.id}
                                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-lg font-medium text-white">
                                                {tool.name}
                                                {tool.isNew && (
                                                    <span className="ml-2 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-md">新</span>
                                                )}
                                            </h3>
                                            <div className="flex items-center">
                                                <FiStar className="text-yellow-400 h-4 w-4" />
                                                <span className="ml-1 text-white text-sm">{tool.rating}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 text-sm mt-2 mb-4 line-clamp-2">
                                            {tool.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {tool.features.slice(0, 3).map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                            {tool.features.length > 3 && (
                                                <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md">
                                                    +{tool.features.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {tool.usageLimit && (
                                            <div className="bg-gray-750 rounded-md p-2 mb-4">
                                                <p className="text-xs text-gray-400">
                                                    {tool.usageLimit}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-center mt-3">
                                            <div>
                                                {tool.isPremium ? (
                                                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-md flex items-center">
                                                        <FiLock className="mr-1" />
                                                        高级版
                                                    </span>
                                                ) : (
                                                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-md">
                                                        免费工具
                                                    </span>
                                                )}
                                            </div>
                                            <Link
                                                href={`/tools/${tool.id}`}
                                                className="text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors"
                                            >
                                                使用工具
                                                <FiChevronRight className="ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <ul className="divide-y divide-gray-700">
                                {filteredTools.map(tool => (
                                    <li key={tool.id} className="hover:bg-gray-750 transition-colors">
                                        <div className="p-4">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                                <div>
                                                    <div className="flex items-center">
                                                        <h3 className="text-white font-medium flex items-center">
                                                            {tool.name}
                                                            {tool.isNew && (
                                                                <span className="ml-2 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-md">新</span>
                                                            )}
                                                        </h3>
                                                        <div className="ml-3 flex items-center">
                                                            <FiStar className="text-yellow-400 h-4 w-4" />
                                                            <span className="ml-1 text-gray-400 text-xs">{tool.rating} ({tool.reviewCount})</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        {tool.description}
                                                    </p>
                                                </div>

                                                <div className="mt-3 md:mt-0 flex space-x-3">
                                                    {tool.isPremium ? (
                                                        <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-md flex items-center h-min">
                                                            <FiLock className="mr-1" />
                                                            高级版
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-md h-min">
                                                            免费工具
                                                        </span>
                                                    )}
                                                    <Link
                                                        href={`/tools/${tool.id}`}
                                                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md inline-flex items-center transition-colors"
                                                    >
                                                        使用工具
                                                        <FiChevronRight className="ml-1" />
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {tool.features.slice(0, 4).map((feature, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                                {tool.features.length > 4 && (
                                                    <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md">
                                                        +{tool.features.length - 4}
                                                    </span>
                                                )}
                                            </div>

                                            {tool.usageLimit && (
                                                <div className="mt-2">
                                                    <p className="text-xs text-gray-500">
                                                        {tool.usageLimit}
                                                    </p>
                                                </div>
                                            )}

                                            {tool.tutorialUrl && (
                                                <div className="mt-2">
                                                    <Link
                                                        href={tool.tutorialUrl}
                                                        className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center"
                                                    >
                                                        查看教程
                                                        <FiExternalLink className="ml-1 h-3 w-3" />
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* 页脚卡片 */}
                <div className="mt-16">
                    <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            需要自定义工具？
                        </h2>
                        <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                            如果您需要特定的工具来满足您的创作需求，我们的团队可以为您定制专属工具。
                        </p>
                        <Link
                            href="/contact"
                            className="px-6 py-3 bg-white text-blue-900 hover:bg-gray-100 font-medium rounded-md inline-flex items-center transition-colors"
                        >
                            联系我们咨询
                            <FiChevronRight className="ml-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 