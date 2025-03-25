'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import {
    FiGrid,
    FiList,
    FiChevronRight,
    FiStar,
    FiFilter,
    FiSearch,
    FiBookmark,
    FiLayers,
    FiTag,
    FiChevronsRight,
    FiFileText,
    FiImage,
    FiCode,
    FiBarChart2,
    FiDatabase,
    FiVideo
} from 'react-icons/fi';

// 模板类型定义
type Template = {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    imageUrl: string;
    complexity: 'beginner' | 'intermediate' | 'advanced';
    popularity: number;
    isFeatured: boolean;
    isNew: boolean;
    isPremium: boolean;
};

export default function TemplatesPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'name'>('popular');

    // 模板分类
    const categories = [
        { id: 'all', name: '全部', icon: FiLayers },
        { id: 'document', name: '文档', icon: FiFileText },
        { id: 'design', name: '设计', icon: FiImage },
        { id: 'development', name: '开发', icon: FiCode },
        { id: 'marketing', name: '营销', icon: FiBarChart2 },
        { id: 'data', name: '数据分析', icon: FiDatabase },
        { id: 'video', name: '视频制作', icon: FiVideo },
    ];

    // 加载模板
    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/signin');
            return;
        }

        fetchTemplates();
    }, [authLoading, user, router]);

    // 模拟获取模板
    const fetchTemplates = () => {
        setIsLoading(true);

        // 模拟API请求延迟
        setTimeout(() => {
            // 模拟模板数据
            const mockTemplates: Template[] = [
                {
                    id: 't1',
                    name: '长文章创作模板',
                    description: '适用于创作长篇文章、博客或报告的全流程模板，包含AI辅助大纲生成。',
                    category: 'document',
                    tags: ['内容创作', '文章', '博客'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'intermediate',
                    popularity: 95,
                    isFeatured: true,
                    isNew: false,
                    isPremium: false
                },
                {
                    id: 't2',
                    name: '社交媒体营销计划',
                    description: '完整的社交媒体营销计划模板，包含内容日历、绩效分析和AI文案生成。',
                    category: 'marketing',
                    tags: ['社交媒体', '营销', '文案'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'intermediate',
                    popularity: 88,
                    isFeatured: true,
                    isNew: true,
                    isPremium: false
                },
                {
                    id: 't3',
                    name: '网站开发项目模板',
                    description: '从设计到部署的完整网站开发流程，适合前端和全栈开发者。',
                    category: 'development',
                    tags: ['网站', '开发', '设计'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'advanced',
                    popularity: 76,
                    isFeatured: false,
                    isNew: false,
                    isPremium: true
                },
                {
                    id: 't4',
                    name: 'UI/UX设计系统',
                    description: '创建完整设计系统的模板，包含组件库、风格指南和设计原则。',
                    category: 'design',
                    tags: ['UI', 'UX', '设计系统'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'advanced',
                    popularity: 82,
                    isFeatured: false,
                    isNew: true,
                    isPremium: true
                },
                {
                    id: 't5',
                    name: '数据分析报告模板',
                    description: '数据收集、分析和可视化的完整工作流，包含常用图表和AI解读。',
                    category: 'data',
                    tags: ['分析', '数据', '报告'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'intermediate',
                    popularity: 78,
                    isFeatured: false,
                    isNew: false,
                    isPremium: false
                },
                {
                    id: 't6',
                    name: '短视频制作模板',
                    description: '高效创建短视频内容的模板，包含脚本、拍摄指南和后期制作流程。',
                    category: 'video',
                    tags: ['视频', '短视频', '内容创作'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'beginner',
                    popularity: 91,
                    isFeatured: true,
                    isNew: false,
                    isPremium: false
                },
                {
                    id: 't7',
                    name: '产品发布计划',
                    description: '产品从开发到市场的完整发布流程，包含营销、PR和发布后跟踪。',
                    category: 'marketing',
                    tags: ['产品', '发布', '营销'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'intermediate',
                    popularity: 85,
                    isFeatured: false,
                    isNew: true,
                    isPremium: false
                },
                {
                    id: 't8',
                    name: '电子书创作模板',
                    description: '从构思到发布的电子书创作全流程，包含AI辅助内容生成。',
                    category: 'document',
                    tags: ['电子书', '内容创作', '出版'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'intermediate',
                    popularity: 79,
                    isFeatured: false,
                    isNew: false,
                    isPremium: false
                },
                {
                    id: 't9',
                    name: '移动应用开发模板',
                    description: '移动应用从设计到上架的完整开发流程，适合iOS和Android开发。',
                    category: 'development',
                    tags: ['移动应用', '开发', 'APP'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'advanced',
                    popularity: 83,
                    isFeatured: false,
                    isNew: false,
                    isPremium: true
                },
                {
                    id: 't10',
                    name: '商业提案模板',
                    description: '专业商业提案的创建流程，包含结构指南和AI辅助内容优化。',
                    category: 'document',
                    tags: ['商业', '提案', '文档'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'beginner',
                    popularity: 87,
                    isFeatured: false,
                    isNew: false,
                    isPremium: false
                },
                {
                    id: 't11',
                    name: '品牌设计指南',
                    description: '创建全面品牌设计指南的模板，包含标识、配色、字体和应用示例。',
                    category: 'design',
                    tags: ['品牌', '设计', '指南'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'intermediate',
                    popularity: 81,
                    isFeatured: false,
                    isNew: false,
                    isPremium: false
                },
                {
                    id: 't12',
                    name: '数据可视化项目',
                    description: '创建交互式数据可视化项目的工作流，包含图表设计和交互实现。',
                    category: 'data',
                    tags: ['可视化', '数据', '交互'],
                    imageUrl: '/placeholder-template.jpg',
                    complexity: 'advanced',
                    popularity: 74,
                    isFeatured: false,
                    isNew: true,
                    isPremium: true
                },
            ];

            setTemplates(mockTemplates);
            setIsLoading(false);
        }, 1200);
    };

    // 过滤模板
    const filteredTemplates = templates.filter(template => {
        // 搜索过滤
        const matchesSearch =
            template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        // 分类过滤
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;

        // 复杂度过滤
        const matchesComplexity = selectedComplexity === 'all' || template.complexity === selectedComplexity;

        return matchesSearch && matchesCategory && matchesComplexity;
    });

    // 排序模板
    const sortedTemplates = [...filteredTemplates].sort((a, b) => {
        if (sortBy === 'popular') {
            return b.popularity - a.popularity;
        } else if (sortBy === 'newest') {
            return Number(b.isNew) - Number(a.isNew);
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    // 推荐的模板
    const featuredTemplates = templates.filter(template => template.isFeatured);

    // 加载状态
    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <p className="mt-4 text-gray-300">加载项目模板...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* 页面标题区域 */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">项目模板库</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        使用我们精心设计的模板快速启动您的项目，提高工作效率
                    </p>
                </div>

                {/* 特色模板轮播 */}
                <div className="mb-12 overflow-hidden">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        推荐模板
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredTemplates.map(template => (
                            <div
                                key={template.id}
                                className="bg-gradient-to-br from-gray-800 to-gray-750 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow group"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={template.imageUrl}
                                        alt={template.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {template.isNew && (
                                        <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                                            新模板
                                        </div>
                                    )}
                                    {template.isPremium && (
                                        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                                            高级模板
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {template.name}
                                    </h3>
                                    <p className="text-gray-400 mb-4 line-clamp-2">
                                        {template.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {template.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">
                                            {template.complexity === 'beginner' && '初级难度'}
                                            {template.complexity === 'intermediate' && '中级难度'}
                                            {template.complexity === 'advanced' && '高级难度'}
                                        </span>
                                        <Link
                                            href={`/templates/${template.id}`}
                                            className="text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors"
                                        >
                                            使用此模板
                                            <FiChevronRight className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 筛选工具栏 */}
                <div className="bg-gray-800 rounded-lg p-4 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex-grow flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                            {/* 搜索框 */}
                            <div className="md:w-64 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiSearch className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="搜索模板..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* 分类筛选 */}
                            <div className="relative">
                                <div className="flex items-center">
                                    <FiFilter className="h-5 w-5 text-gray-400 mr-2" />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="block pr-8 pl-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* 复杂度筛选 */}
                            <div className="relative">
                                <select
                                    value={selectedComplexity}
                                    onChange={(e) => setSelectedComplexity(e.target.value)}
                                    className="block pr-8 pl-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="all">所有难度</option>
                                    <option value="beginner">初级难度</option>
                                    <option value="intermediate">中级难度</option>
                                    <option value="advanced">高级难度</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-2 items-center">
                            {/* 排序选择 */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="block pr-8 pl-3 py-2 border border-gray-700 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="popular">热门程度</option>
                                    <option value="newest">最新</option>
                                    <option value="name">名称</option>
                                </select>
                            </div>

                            {/* 视图切换 */}
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

                {/* 模板列表 */}
                {sortedTemplates.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-10 text-center">
                        <div className="flex justify-center mb-4">
                            <FiBookmark className="h-12 w-12 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">未找到匹配的模板</h3>
                        <p className="text-gray-400 mb-6">
                            没有找到符合您筛选条件的模板。请尝试调整搜索条件或查看全部模板。
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                                setSelectedComplexity('all');
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md inline-flex items-center transition-colors"
                        >
                            查看所有模板
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedTemplates.map(template => (
                            <div
                                key={template.id}
                                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="h-40 bg-gray-700 relative">
                                    <img
                                        src={template.imageUrl}
                                        alt={template.name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* 标签 */}
                                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
                                        <div className="flex space-x-2">
                                            {template.isNew && (
                                                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                                                    新模板
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            {template.isPremium && (
                                                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                                                    高级版
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* 分类标签 */}
                                    <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                                        <FiTag className="mr-1 h-3 w-3" />
                                        {categories.find(c => c.id === template.category)?.name || template.category}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-white mb-1">
                                        {template.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                        {template.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {template.tags.slice(0, 3).map(tag => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-md"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <FiStar className="text-yellow-400 mr-1 h-4 w-4" />
                                            <span className="text-gray-300 text-sm">
                                                {template.popularity}% 推荐
                                            </span>
                                        </div>
                                        <Link
                                            href={`/templates/${template.id}`}
                                            className="text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors"
                                        >
                                            查看详情
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
                            {sortedTemplates.map(template => (
                                <li key={template.id} className="hover:bg-gray-750">
                                    <div className="px-6 py-4">
                                        <div className="flex flex-col md:flex-row md:items-center">
                                            <div className="flex-shrink-0 w-16 h-16 bg-gray-700 rounded-md overflow-hidden mr-4 mb-4 md:mb-0">
                                                <img
                                                    src={template.imageUrl}
                                                    alt={template.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                    <div>
                                                        <h3 className="text-white font-medium flex items-center">
                                                            {template.name}
                                                            {template.isNew && (
                                                                <span className="ml-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-md font-medium">
                                                                    新
                                                                </span>
                                                            )}
                                                            {template.isPremium && (
                                                                <span className="ml-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-md font-medium">
                                                                    高级版
                                                                </span>
                                                            )}
                                                        </h3>
                                                        <p className="text-gray-400 text-sm mt-1">
                                                            {template.description}
                                                        </p>
                                                    </div>

                                                    <div className="mt-3 md:mt-0">
                                                        <Link
                                                            href={`/templates/${template.id}`}
                                                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md inline-flex items-center transition-colors"
                                                        >
                                                            使用此模板
                                                            <FiChevronsRight className="ml-1" />
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                                                    <div className="flex items-center text-sm text-gray-400">
                                                        <FiTag className="mr-1 h-3 w-3" />
                                                        {categories.find(c => c.id === template.category)?.name || template.category}
                                                    </div>

                                                    <div className="flex items-center text-sm text-gray-400">
                                                        <FiStar className="text-yellow-400 mr-1 h-3 w-3" />
                                                        {template.popularity}% 推荐
                                                    </div>

                                                    <div className="text-sm text-gray-400">
                                                        {template.complexity === 'beginner' && '初级难度'}
                                                        {template.complexity === 'intermediate' && '中级难度'}
                                                        {template.complexity === 'advanced' && '高级难度'}
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                        {template.tags.slice(0, 3).map(tag => (
                                                            <span
                                                                key={tag}
                                                                className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded-md"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* 页脚区域 */}
                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        未找到您需要的模板？
                    </h2>
                    <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                        我们不断更新和添加新的模板。如果您有特定需求或建议，请告诉我们。
                    </p>
                    <Link
                        href="/contact"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md inline-flex items-center transition-colors"
                    >
                        联系我们提出建议
                    </Link>
                </div>
            </div>
        </div>
    );
} 