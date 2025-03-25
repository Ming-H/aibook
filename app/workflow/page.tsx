'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/context/AuthContext';
import {
    FiPlusCircle,
    FiEdit2,
    FiTrash2,
    FiPlay,
    FiSave,
    FiBook,
    FiLayout,
    FiGrid,
    FiList,
    FiCopy,
    FiShare2,
    FiX,
    FiCheck,
    FiArrowRight,
    FiSearch,
    FiFilter,
    FiChevronDown
} from 'react-icons/fi';

// 工作流类型定义
type Workflow = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    steps: WorkflowStep[];
    category: string;
    isTemplate: boolean;
    thumbnailUrl?: string;
    collaborators?: string[];
};

// 工作流步骤类型定义
type WorkflowStep = {
    id: string;
    name: string;
    description: string;
    type: 'input' | 'process' | 'output' | 'decision' | 'ai';
    order: number;
    settings?: Record<string, any>;
    nextSteps?: string[]; // 指向下一步的ID数组，用于非线性工作流
    aiPrompt?: string; // AI步骤的提示词
};

export default function WorkflowPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showTemplatesOnly, setShowTemplatesOnly] = useState(false);

    // 模拟分类
    const categories = [
        { id: 'all', name: '全部' },
        { id: 'content', name: '内容创作' },
        { id: 'design', name: '设计' },
        { id: 'development', name: '开发' },
        { id: 'marketing', name: '营销' },
        { id: 'research', name: '研究' },
    ];

    // 检查用户状态
    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/signin');
            return;
        }

        // 获取工作流列表
        fetchWorkflows();
    }, [authLoading, user, router]);

    // 模拟获取工作流列表
    const fetchWorkflows = () => {
        setIsLoading(true);

        // 模拟 API 请求延迟
        setTimeout(() => {
            // 模拟数据
            const mockWorkflows: Workflow[] = [
                {
                    id: 'w1',
                    name: '内容创作工作流',
                    description: '从创意到发布的内容创作完整流程',
                    createdAt: '2023-11-20T10:30:00Z',
                    updatedAt: '2023-12-10T14:45:00Z',
                    category: 'content',
                    isTemplate: true,
                    thumbnailUrl: '/placeholder-workflow.jpg',
                    steps: [
                        {
                            id: 's1',
                            name: '创意头脑风暴',
                            description: '使用AI辅助生成内容创意',
                            type: 'ai',
                            order: 1,
                            aiPrompt: '请根据我的内容主题生成10个潜在的内容创意点子'
                        },
                        {
                            id: 's2',
                            name: '内容大纲',
                            description: '创建内容结构大纲',
                            type: 'process',
                            order: 2,
                        },
                        {
                            id: 's3',
                            name: '内容创作',
                            description: '撰写主要内容',
                            type: 'process',
                            order: 3,
                        },
                        {
                            id: 's4',
                            name: '审核和修改',
                            description: '内容质量审核和必要修改',
                            type: 'process',
                            order: 4,
                        },
                        {
                            id: 's5',
                            name: 'AI辅助润色',
                            description: '使用AI助手改进文本质量',
                            type: 'ai',
                            order: 5,
                            aiPrompt: '请帮我润色以下内容，让它更加引人入胜和专业'
                        },
                        {
                            id: 's6',
                            name: '发布准备',
                            description: '准备发布内容',
                            type: 'output',
                            order: 6,
                        },
                    ]
                },
                {
                    id: 'w2',
                    name: 'UI设计工作流',
                    description: '从线框图到高保真UI的设计流程',
                    createdAt: '2023-12-05T09:15:00Z',
                    updatedAt: '2023-12-15T11:30:00Z',
                    category: 'design',
                    isTemplate: true,
                    thumbnailUrl: '/placeholder-workflow.jpg',
                    steps: [
                        {
                            id: 's1',
                            name: '用户研究',
                            description: '了解用户需求和痛点',
                            type: 'input',
                            order: 1,
                        },
                        {
                            id: 's2',
                            name: '线框图设计',
                            description: '创建低保真线框图',
                            type: 'process',
                            order: 2,
                        },
                        // 更多步骤...
                    ]
                },
                {
                    id: 'w3',
                    name: '产品发布工作流',
                    description: '产品从开发到市场的发布流程',
                    createdAt: '2023-12-12T15:45:00Z',
                    updatedAt: '2023-12-18T10:20:00Z',
                    category: 'marketing',
                    isTemplate: false,
                    thumbnailUrl: '/placeholder-workflow.jpg',
                    steps: [
                        {
                            id: 's1',
                            name: '发布计划',
                            description: '创建产品发布计划和时间表',
                            type: 'process',
                            order: 1,
                        },
                        {
                            id: 's2',
                            name: '营销材料准备',
                            description: '准备产品营销材料',
                            type: 'process',
                            order: 2,
                        },
                        // 更多步骤...
                    ]
                },
                {
                    id: 'w4',
                    name: '调研报告工作流',
                    description: '从数据收集到最终报告的研究流程',
                    createdAt: '2023-12-08T13:25:00Z',
                    updatedAt: '2023-12-16T09:40:00Z',
                    category: 'research',
                    isTemplate: false,
                    thumbnailUrl: '/placeholder-workflow.jpg',
                    steps: [
                        {
                            id: 's1',
                            name: '研究问题定义',
                            description: '定义研究问题和目标',
                            type: 'input',
                            order: 1,
                        },
                        {
                            id: 's2',
                            name: '数据收集',
                            description: '收集研究数据',
                            type: 'process',
                            order: 2,
                        },
                        // 更多步骤...
                    ]
                },
                {
                    id: 'w5',
                    name: '前端开发工作流',
                    description: '从设计到代码实现的前端开发流程',
                    createdAt: '2023-12-03T14:10:00Z',
                    updatedAt: '2023-12-14T16:35:00Z',
                    category: 'development',
                    isTemplate: true,
                    thumbnailUrl: '/placeholder-workflow.jpg',
                    steps: [
                        {
                            id: 's1',
                            name: '需求分析',
                            description: '分析项目需求和技术要求',
                            type: 'input',
                            order: 1,
                        },
                        {
                            id: 's2',
                            name: '组件设计',
                            description: '设计UI组件结构',
                            type: 'process',
                            order: 2,
                        },
                        // 更多步骤...
                    ]
                },
            ];

            setWorkflows(mockWorkflows);
            setIsLoading(false);
        }, 1200);
    };

    // 创建新工作流
    const createNewWorkflow = () => {
        router.push('/workflow/new');
    };

    // 复制工作流
    const duplicateWorkflow = (workflow: Workflow) => {
        // 模拟复制操作
        const duplicatedWorkflow: Workflow = {
            ...workflow,
            id: `duplicate-${workflow.id}`,
            name: `${workflow.name} (副本)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isTemplate: false,
        };

        setWorkflows(prev => [...prev, duplicatedWorkflow]);
    };

    // 删除工作流
    const deleteWorkflow = (id: string) => {
        if (confirm('确定要删除这个工作流吗？此操作不可撤销。')) {
            setWorkflows(prev => prev.filter(workflow => workflow.id !== id));
        }
    };

    // 过滤工作流
    const filteredWorkflows = workflows.filter(workflow => {
        // 搜索过滤
        const matchesSearch =
            workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            workflow.description.toLowerCase().includes(searchQuery.toLowerCase());

        // 分类过滤
        const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory;

        // 模板过滤
        const matchesTemplate = !showTemplatesOnly || workflow.isTemplate;

        return matchesSearch && matchesCategory && matchesTemplate;
    });

    // 加载状态
    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <p className="mt-4 text-gray-300">加载工作流...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* 页面标题和操作栏 */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center">
                            <FiLayout className="mr-2 text-blue-500" />
                            工作流
                        </h1>
                        <p className="text-gray-400 mt-1">
                            创建和管理您的项目工作流程，提高创作效率
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <button
                            onClick={createNewWorkflow}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition-colors"
                        >
                            <FiPlusCircle className="mr-2" />
                            创建工作流
                        </button>
                    </div>
                </div>

                {/* 筛选栏 */}
                <div className="bg-gray-800 rounded-lg p-4 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        {/* 搜索框 */}
                        <div className="flex-grow relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="搜索工作流..."
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

                        {/* 模板切换 */}
                        <div className="flex items-center">
                            <input
                                id="templates-toggle"
                                type="checkbox"
                                checked={showTemplatesOnly}
                                onChange={() => setShowTemplatesOnly(!showTemplatesOnly)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded"
                            />
                            <label htmlFor="templates-toggle" className="ml-2 text-gray-300">
                                仅显示模板
                            </label>
                        </div>

                        {/* 视图模式切换 */}
                        <div className="flex items-center space-x-2">
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

                {/* 工作流列表 */}
                {filteredWorkflows.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-10 text-center">
                        <div className="flex justify-center mb-4">
                            <FiBook className="h-12 w-12 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">暂无工作流</h3>
                        <p className="text-gray-400 mb-6">
                            {searchQuery || selectedCategory !== 'all' || showTemplatesOnly
                                ? '没有找到符合条件的工作流。请尝试调整筛选条件。'
                                : '您尚未创建任何工作流。创建一个工作流来提高您的项目效率。'
                            }
                        </p>
                        <button
                            onClick={createNewWorkflow}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md inline-flex items-center transition-colors"
                        >
                            <FiPlusCircle className="mr-2" />
                            创建第一个工作流
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredWorkflows.map(workflow => (
                            <div key={workflow.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                {/* 缩略图 */}
                                <div className="h-40 bg-gray-700 relative">
                                    {workflow.thumbnailUrl ? (
                                        <img
                                            src={workflow.thumbnailUrl}
                                            alt={workflow.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                                            <FiLayout className="text-gray-500 w-12 h-12" />
                                        </div>
                                    )}

                                    {/* 模板标签 */}
                                    {workflow.isTemplate && (
                                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                                            模板
                                        </div>
                                    )}

                                    {/* 类别标签 */}
                                    <div className="absolute bottom-2 left-2 bg-gray-900 bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
                                        {categories.find(c => c.id === workflow.category)?.name || workflow.category}
                                    </div>
                                </div>

                                {/* 内容 */}
                                <div className="p-4">
                                    <h3 className="text-white font-medium text-lg mb-1 truncate">
                                        {workflow.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {workflow.description}
                                    </p>

                                    {/* 步骤计数和更新日期 */}
                                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                                        <span>{workflow.steps.length} 个步骤</span>
                                        <span>更新于 {new Date(workflow.updatedAt).toLocaleDateString()}</span>
                                    </div>

                                    {/* 操作按钮 */}
                                    <div className="flex justify-between">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => duplicateWorkflow(workflow)}
                                                className="p-2 rounded-md bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors"
                                                title="复制工作流"
                                            >
                                                <FiCopy className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => deleteWorkflow(workflow.id)}
                                                className="p-2 rounded-md bg-gray-700 text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                                                title="删除工作流"
                                            >
                                                <FiTrash2 className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/workflow/${workflow.id}/edit`}
                                                className="p-2 rounded-md bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors"
                                                title="编辑工作流"
                                            >
                                                <FiEdit2 className="h-5 w-5" />
                                            </Link>
                                            <Link
                                                href={`/workflow/${workflow.id}/run`}
                                                className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                                title="运行工作流"
                                            >
                                                <FiPlay className="h-5 w-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-750">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        工作流
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        类别
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        步骤
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        更新时间
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        类型
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {filteredWorkflows.map(workflow => (
                                    <tr key={workflow.id} className="hover:bg-gray-750">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-md flex items-center justify-center">
                                                    <FiLayout className="text-gray-500" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-white">{workflow.name}</div>
                                                    <div className="text-sm text-gray-400 line-clamp-1">{workflow.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-700 text-gray-300">
                                                {categories.find(c => c.id === workflow.category)?.name || workflow.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {workflow.steps.length} 个步骤
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                            {new Date(workflow.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {workflow.isTemplate ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900 text-blue-300">
                                                    模板
                                                </span>
                                            ) : (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-700 text-gray-300">
                                                    自定义
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => duplicateWorkflow(workflow)}
                                                    className="p-1.5 rounded-md bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors"
                                                    title="复制工作流"
                                                >
                                                    <FiCopy className="h-4 w-4" />
                                                </button>
                                                <Link
                                                    href={`/workflow/${workflow.id}/edit`}
                                                    className="p-1.5 rounded-md bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors"
                                                    title="编辑工作流"
                                                >
                                                    <FiEdit2 className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteWorkflow(workflow.id)}
                                                    className="p-1.5 rounded-md bg-gray-700 text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                                                    title="删除工作流"
                                                >
                                                    <FiTrash2 className="h-4 w-4" />
                                                </button>
                                                <Link
                                                    href={`/workflow/${workflow.id}/run`}
                                                    className="p-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                                    title="运行工作流"
                                                >
                                                    <FiPlay className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* 推荐工作流模板 */}
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">推荐工作流模板</h2>
                        <Link
                            href="/workflow/templates"
                            className="text-blue-400 hover:text-blue-300 flex items-center transition-colors"
                        >
                            查看全部
                            <FiChevronDown className="ml-1 transform rotate-270" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* 模板1 */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                            <div className="h-32 bg-gradient-to-br from-blue-700 to-purple-700 p-4 flex items-center justify-center">
                                <h3 className="text-white font-bold text-lg text-center">AI内容创作工作流</h3>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-400 text-sm mb-4">
                                    利用AI辅助完成从创意到发布的内容创作全流程
                                </p>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">6个步骤</span>
                                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center transition-colors">
                                        使用模板
                                        <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 模板2 */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                            <div className="h-32 bg-gradient-to-br from-green-700 to-teal-700 p-4 flex items-center justify-center">
                                <h3 className="text-white font-bold text-lg text-center">原型设计工作流</h3>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-400 text-sm mb-4">
                                    从线框图到交互原型的完整设计流程
                                </p>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">5个步骤</span>
                                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center transition-colors">
                                        使用模板
                                        <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 模板3 */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                            <div className="h-32 bg-gradient-to-br from-yellow-700 to-orange-700 p-4 flex items-center justify-center">
                                <h3 className="text-white font-bold text-lg text-center">营销活动工作流</h3>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-400 text-sm mb-4">
                                    从策划到数据分析的营销活动全流程
                                </p>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">8个步骤</span>
                                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center transition-colors">
                                        使用模板
                                        <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 模板4 */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                            <div className="h-32 bg-gradient-to-br from-red-700 to-pink-700 p-4 flex items-center justify-center">
                                <h3 className="text-white font-bold text-lg text-center">研究调查工作流</h3>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-400 text-sm mb-4">
                                    从问题定义到数据分析的研究调查流程
                                </p>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">7个步骤</span>
                                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center transition-colors">
                                        使用模板
                                        <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 