'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import {
    FiSettings,
    FiBarChart2,
    FiUser,
    FiSliders,
    FiHash,
    FiClock,
    FiTrendingUp
} from 'react-icons/fi';

// 导入创意DNA相关组件
import DNAAnalyzer from '@/app/components/creative-dna/DNAAnalyzer';
import StyleVisualizer, { StylePreference } from '@/app/components/creative-dna/StyleVisualizer';
import RecommendationEngine from '@/app/components/creative-dna/RecommendationEngine';

// 定义创意习惯类型
type CreativeHabit = {
    id: string;
    name: string;
    value: string | number;
    description: string;
    icon: string;
    trend?: 'up' | 'down' | 'stable';
};

export default function CreativeDNA() {
    const { user, loading: authLoading } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const router = useRouter();

    // 创意DNA数据
    const [dnaData, setDnaData] = useState<{
        lastUpdated: string;
        confidenceScore: number;
        stylePreferences: StylePreference[];
        creativeHabits: CreativeHabit[];
        insights: string[];
    }>({
        lastUpdated: '',
        confidenceScore: 0,
        stylePreferences: [],
        creativeHabits: [],
        insights: [],
    });

    // 检查用户认证状态
    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/signin');
            return;
        }

        // 模拟加载数据
        fetchCreativeDNAData();
    }, [user, authLoading, router]);

    // 模拟获取创意DNA数据
    const fetchCreativeDNAData = () => {
        setIsLoading(true);

        // 模拟API请求延迟
        setTimeout(() => {
            // 模拟数据
            const mockData = {
                lastUpdated: new Date().toISOString(),
                confidenceScore: 85,
                stylePreferences: [
                    { id: 'sp1', name: '极简主义', value: 80, category: '视觉风格', color: '#3b82f6' },
                    { id: 'sp2', name: '色彩丰富', value: 65, category: '视觉风格', color: '#3b82f6' },
                    { id: 'sp3', name: '有机形状', value: 40, category: '视觉风格', color: '#3b82f6' },
                    { id: 'sp4', name: '几何形状', value: 70, category: '视觉风格', color: '#3b82f6' },
                    { id: 'sp5', name: '简洁表达', value: 85, category: '文字风格', color: '#8b5cf6' },
                    { id: 'sp6', name: '结构化', value: 75, category: '文字风格', color: '#8b5cf6' },
                    { id: 'sp7', name: '对话式', value: 60, category: '文字风格', color: '#8b5cf6' },
                    { id: 'sp8', name: '正式', value: 30, category: '文字风格', color: '#8b5cf6' },
                    { id: 'sp9', name: '功能优先', value: 90, category: '设计原则', color: '#ec4899' },
                    { id: 'sp10', name: '用户体验', value: 85, category: '设计原则', color: '#ec4899' },
                    { id: 'sp11', name: '创新', value: 60, category: '设计原则', color: '#ec4899' },
                    { id: 'sp12', name: '一致性', value: 75, category: '设计原则', color: '#ec4899' },
                ],
                creativeHabits: [
                    {
                        id: 'ch1',
                        name: '创作时段',
                        value: '晚间',
                        description: '您的创作活动主要集中在晚间（18:00-23:00）',
                        icon: 'clock',
                        trend: 'stable'
                    },
                    {
                        id: 'ch2',
                        name: '修改频率',
                        value: '中等',
                        description: '您平均每个项目会进行4-6次修改',
                        icon: 'repeat',
                        trend: 'up'
                    },
                    {
                        id: 'ch3',
                        name: '灵感来源',
                        value: '网络/对话',
                        description: '您的创意灵感主要来自网络浏览和与他人的对话',
                        icon: 'bulb',
                        trend: 'stable'
                    },
                    {
                        id: 'ch4',
                        name: '合作倾向',
                        value: '中等',
                        description: '您的项目中约40%涉及与他人合作',
                        icon: 'users',
                        trend: 'up'
                    },
                    {
                        id: 'ch5',
                        name: '专注度',
                        value: '较高',
                        description: '您的创作会话平均持续75分钟，专注度较高',
                        icon: 'target',
                        trend: 'up'
                    },
                    {
                        id: 'ch6',
                        name: '探索倾向',
                        value: '中等',
                        description: '您尝试新工具和技术的频率适中',
                        icon: 'compass',
                        trend: 'down'
                    },
                ],
                insights: [
                    "您的创作风格倾向于简洁清晰的视觉表达，注重功能性和用户体验",
                    "您在晚间时段的创作效率最高，专注度也达到峰值",
                    "您经常从网络浏览和与他人的对话中获取灵感",
                    "近期项目显示您正在增加与他人的协作频率",
                    "您的修改频率呈上升趋势，表明对完善作品的关注度提高"
                ]
            };

            setDnaData(mockData);
            setIsLoading(false);
        }, 1500);
    };

    // 处理分析完成后的回调
    const handleAnalysisComplete = (analysisResult: any) => {
        // 实际应用中，这里会根据分析结果更新数据
        setDnaData(prev => ({
            ...prev,
            lastUpdated: analysisResult.analyzedAt,
            stylePreferences: [
                // 转换风格偏好数据结构
                ...Object.entries(analysisResult.stylePreferences.visualStyle).map(([name, value]: [string, any], index) => ({
                    id: `visual-${index}`,
                    name,
                    value,
                    category: '视觉风格',
                    color: '#3b82f6'
                })),
                ...Object.entries(analysisResult.stylePreferences.writingStyle).map(([name, value]: [string, any], index) => ({
                    id: `writing-${index}`,
                    name,
                    value,
                    category: '文字风格',
                    color: '#8b5cf6'
                })),
                ...Object.entries(analysisResult.stylePreferences.designPrinciples).map(([name, value]: [string, any], index) => ({
                    id: `design-${index}`,
                    name,
                    value,
                    category: '设计原则',
                    color: '#ec4899'
                })),
            ],
            insights: analysisResult.insights,
            confidenceScore: analysisResult.confidenceScore,
        }));
    };

    // 处理标签选择
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    // 加载状态
    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <p className="mt-4 text-gray-300">加载您的创意DNA数据...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* 顶部标题和操作栏 */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center">
                            <FiHash className="mr-2 text-blue-500" />
                            创意DNA
                        </h1>
                        <p className="text-gray-400 mt-1">
                            探索您的创作风格和习惯，了解AI如何适应您的个性化创意需求
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-3">
                        <Link
                            href="/creative-dna/settings"
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center transition-colors"
                        >
                            <FiSettings className="mr-2" />
                            设置
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition-colors"
                        >
                            <FiBarChart2 className="mr-2" />
                            导出报告
                        </button>
                    </div>
                </div>

                {/* 信息卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-750 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">创意信心指数</h2>
                            <div className="w-12 h-12 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center">
                                <FiSliders className="text-blue-400 w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-400">指数值</span>
                                <span className="text-sm font-medium text-blue-400">{dnaData.confidenceScore}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${dnaData.confidenceScore}%` }}
                                ></div>
                            </div>
                            <p className="mt-4 text-gray-300 text-sm">
                                {dnaData.confidenceScore > 80
                                    ? '您的创意DNA分析已高度可信，AI将能有效适应您的风格。'
                                    : dnaData.confidenceScore > 50
                                        ? '您的创意DNA分析基本可信，随着更多项目的完成，准确度将进一步提高。'
                                        : '您的创意DNA分析仍在初期阶段，需要更多项目数据来提高准确度。'
                                }
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-750 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">最近分析</h2>
                            <div className="w-12 h-12 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center">
                                <FiClock className="text-purple-400 w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-300">
                                上次更新: {new Date(dnaData.lastUpdated).toLocaleString('zh-CN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                            <p className="mt-2 text-sm text-gray-400">
                                已分析 <span className="text-white font-medium">12</span> 个项目
                            </p>
                            <button
                                onClick={() => setActiveTab('analyze')}
                                className="mt-4 text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors"
                            >
                                立即更新分析
                                <FiTrendingUp className="ml-1" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-750 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">个人风格概览</h2>
                            <div className="w-12 h-12 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center">
                                <FiUser className="text-green-400 w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                    <span className="text-gray-300 text-sm">视觉风格:&nbsp;</span>
                                    <span className="text-white text-sm font-medium">极简主义</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                                    <span className="text-gray-300 text-sm">文字风格:&nbsp;</span>
                                    <span className="text-white text-sm font-medium">简洁直接</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    <span className="text-gray-300 text-sm">创作高峰:&nbsp;</span>
                                    <span className="text-white text-sm font-medium">晚间</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setActiveTab('style')}
                                className="mt-4 text-green-400 hover:text-green-300 text-sm font-medium flex items-center transition-colors"
                            >
                                查看完整风格
                                <FiTrendingUp className="ml-1" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 标签导航 */}
                <div className="mb-8 border-b border-gray-700">
                    <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
                        <button
                            onClick={() => handleTabChange('overview')}
                            className={`py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'overview'
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                }`}
                        >
                            总览
                        </button>
                        <button
                            onClick={() => handleTabChange('analyze')}
                            className={`py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'analyze'
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                }`}
                        >
                            分析
                        </button>
                        <button
                            onClick={() => handleTabChange('style')}
                            className={`py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'style'
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                }`}
                        >
                            风格偏好
                        </button>
                        <button
                            onClick={() => handleTabChange('habits')}
                            className={`py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'habits'
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                }`}
                        >
                            创作习惯
                        </button>
                        <button
                            onClick={() => handleTabChange('recommendations')}
                            className={`py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'recommendations'
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                }`}
                        >
                            推荐
                        </button>
                    </nav>
                </div>

                {/* 标签内容 */}
                <div className="mb-12">
                    {/* 总览 */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                                <h2 className="text-xl font-bold text-white mb-4">创意DNA洞察</h2>
                                <div className="bg-gray-750 rounded-lg p-4">
                                    <ul className="space-y-3">
                                        {dnaData.insights.map((insight, index) => (
                                            <li key={index} className="text-gray-300 flex items-start">
                                                <div className="flex-shrink-0 mt-0.5">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                </div>
                                                <span className="ml-3">{insight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                                    <h2 className="text-xl font-bold text-white mb-4">主要风格特征</h2>
                                    <div className="space-y-4">
                                        {dnaData.stylePreferences
                                            .sort((a, b) => b.value - a.value)
                                            .slice(0, 5)
                                            .map(pref => (
                                                <div key={pref.id} className="bg-gray-750 rounded-lg p-4">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-white font-medium">{pref.name}</span>
                                                        <span className="text-blue-400 font-medium">{pref.value}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className="rounded-full h-2"
                                                            style={{
                                                                width: `${pref.value}%`,
                                                                backgroundColor: pref.color
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="mt-1 text-xs text-gray-400">
                                                        {pref.category}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                                    <h2 className="text-xl font-bold text-white mb-4">关键创作习惯</h2>
                                    <div className="space-y-4">
                                        {dnaData.creativeHabits.slice(0, 5).map(habit => (
                                            <div key={habit.id} className="bg-gray-750 rounded-lg p-4">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="text-white font-medium">{habit.name}</h3>
                                                        <div className="flex items-center mt-1">
                                                            <span className="text-blue-400 font-medium">{habit.value}</span>
                                                            {habit.trend && (
                                                                <span
                                                                    className={`ml-2 text-xs ${habit.trend === 'up'
                                                                            ? 'text-green-400'
                                                                            : habit.trend === 'down'
                                                                                ? 'text-red-400'
                                                                                : 'text-gray-400'
                                                                        }`}
                                                                >
                                                                    {habit.trend === 'up'
                                                                        ? '↑ 上升'
                                                                        : habit.trend === 'down'
                                                                            ? '↓ 下降'
                                                                            : '→ 稳定'
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                                        {habit.icon === 'clock' && <FiClock className="text-gray-400" />}
                                                        {habit.icon === 'users' && <FiUser className="text-gray-400" />}
                                                        {/* 其他图标... */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 分析 */}
                    {activeTab === 'analyze' && (
                        <DNAAnalyzer
                            userId={user?.id || ''}
                            lastAnalyzed={dnaData.lastUpdated}
                            onAnalysisComplete={handleAnalysisComplete}
                        />
                    )}

                    {/* 风格偏好 */}
                    {activeTab === 'style' && (
                        <div className="space-y-8">
                            <StyleVisualizer
                                stylePreferences={dnaData.stylePreferences}
                                userName={user?.email?.split('@')[0] || 'User'}
                                lastUpdated={dnaData.lastUpdated}
                            />

                            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                                <div className="p-6 border-b border-gray-700">
                                    <h2 className="text-xl font-bold text-white">详细风格偏好</h2>
                                    <p className="text-gray-400 mt-1">
                                        您的创作风格细分与分析
                                    </p>
                                </div>

                                <div className="p-6">
                                    {/* 按类别分组显示风格偏好 */}
                                    {Object.entries(
                                        dnaData.stylePreferences.reduce<Record<string, StylePreference[]>>((acc, pref) => {
                                            if (!acc[pref.category]) {
                                                acc[pref.category] = [];
                                            }
                                            acc[pref.category].push(pref);
                                            return acc;
                                        }, {})
                                    ).map(([category, prefs]) => (
                                        <div key={category} className="mb-8 last:mb-0">
                                            <h3 className="text-lg font-medium text-white mb-4">
                                                {category}
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {prefs.map(pref => (
                                                    <div key={pref.id} className="bg-gray-750 rounded-lg p-4">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-white font-medium">{pref.name}</span>
                                                            <span
                                                                className="font-medium"
                                                                style={{ color: pref.color }}
                                                            >
                                                                {pref.value}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                                                            <div
                                                                className="h-2.5 rounded-full"
                                                                style={{
                                                                    width: `${pref.value}%`,
                                                                    backgroundColor: pref.color
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 创作习惯 */}
                    {activeTab === 'habits' && (
                        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-700">
                                <h2 className="text-xl font-bold text-white">创作习惯分析</h2>
                                <p className="text-gray-400 mt-1">
                                    您的创作过程和工作习惯特征
                                </p>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {dnaData.creativeHabits.map(habit => (
                                        <div key={habit.id} className="bg-gray-750 rounded-lg p-5">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-white font-medium text-lg">{habit.name}</h3>
                                                    <div className="mt-1 flex items-center">
                                                        <span className="text-blue-400 font-bold text-xl">{habit.value}</span>
                                                        {habit.trend && (
                                                            <span
                                                                className={`ml-2 text-sm ${habit.trend === 'up'
                                                                        ? 'text-green-400'
                                                                        : habit.trend === 'down'
                                                                            ? 'text-red-400'
                                                                            : 'text-gray-400'
                                                                    }`}
                                                            >
                                                                {habit.trend === 'up'
                                                                    ? '↑ 上升趋势'
                                                                    : habit.trend === 'down'
                                                                        ? '↓ 下降趋势'
                                                                        : '→ 保持稳定'
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                                    {habit.icon === 'clock' && <FiClock className="text-gray-400 w-6 h-6" />}
                                                    {habit.icon === 'users' && <FiUser className="text-gray-400 w-6 h-6" />}
                                                    {/* 其他图标... */}
                                                </div>
                                            </div>
                                            <p className="mt-3 text-gray-300 text-sm">
                                                {habit.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* 实用提示 */}
                                <div className="mt-8 bg-blue-900 bg-opacity-20 border border-blue-800 rounded-lg p-4">
                                    <h3 className="text-white font-medium mb-2">基于您习惯的实用提示</h3>
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            </div>
                                            <span className="ml-2">考虑在您的高效时段（晚间）安排重要创意工作</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            </div>
                                            <span className="ml-2">利用您的修改习惯，提前预留修改时间以达到最佳效果</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            </div>
                                            <span className="ml-2">您的创作模式适合使用番茄工作法，可尝试25分钟专注加5分钟休息的节奏</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            </div>
                                            <span className="ml-2">根据您的合作倾向，可以考虑每周至少安排一次团队协作会议</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 推荐 */}
                    {activeTab === 'recommendations' && (
                        <RecommendationEngine
                            userId={user?.id || ''}
                            stylePreferences={dnaData.stylePreferences.reduce<Record<string, number>>((acc, pref) => {
                                acc[pref.name.toLowerCase()] = pref.value;
                                return acc;
                            }, {})}
                            interests={['design', 'technology', 'web development']}
                        />
                    )}
                </div>
            </div>
        </div>
    );
} 