'use client';

import React, { useState } from 'react';
import {
    FiActivity,
    FiBarChart2,
    FiRefreshCw,
    FiTrendingUp,
    FiClock,
    FiCheckCircle,
    FiInfo,
    FiAlertTriangle
} from 'react-icons/fi';

// 定义创意DNA分析组件的属性类型
type DNAAnalyzerProps = {
    userId: string;
    lastAnalyzed?: string; // ISO日期字符串
    onAnalysisComplete?: (data: any) => void;
};

// 定义分析状态类型
type AnalysisStatus = 'idle' | 'analyzing' | 'complete' | 'error';

// 定义项目类型
type Project = {
    id: string;
    name: string;
    thumbnailUrl?: string;
    lastEdited: string;
    type: string;
};

export default function DNAAnalyzer({ userId, lastAnalyzed, onAnalysisComplete }: DNAAnalyzerProps) {
    // 分析状态
    const [status, setStatus] = useState<AnalysisStatus>('idle');
    // 分析进度（0-100）
    const [progress, setProgress] = useState(0);
    // 分析结果洞察
    const [insights, setInsights] = useState<string[]>([]);
    // 分析错误信息
    const [error, setError] = useState<string | null>(null);
    // 是否显示高级分析选项
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    // 选中的项目
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    // 分析深度
    const [analysisDepth, setAnalysisDepth] = useState<'light' | 'standard' | 'deep'>('standard');

    // 模拟的用户项目
    const [userProjects] = useState<Project[]>([
        {
            id: 'p1',
            name: '科幻小说草稿',
            lastEdited: '2023-12-18T15:30:00Z',
            thumbnailUrl: '/placeholder-project.jpg',
            type: '文本'
        },
        {
            id: 'p2',
            name: '网站设计方案',
            lastEdited: '2023-12-15T09:20:00Z',
            thumbnailUrl: '/placeholder-project.jpg',
            type: '设计'
        },
        {
            id: 'p3',
            name: '产品宣传视频',
            lastEdited: '2023-12-10T14:45:00Z',
            thumbnailUrl: '/placeholder-project.jpg',
            type: '视频'
        },
        {
            id: 'p4',
            name: '营销活动策划',
            lastEdited: '2023-12-05T11:10:00Z',
            thumbnailUrl: '/placeholder-project.jpg',
            type: '文档'
        },
    ]);

    // 启动分析函数
    const startAnalysis = () => {
        // 重置状态
        setStatus('analyzing');
        setProgress(0);
        setInsights([]);
        setError(null);

        // 模拟分析进度
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 5;
            });
        }, 300);

        // 模拟分析步骤和洞察
        setTimeout(() => {
            setInsights(prev => [...prev, "正在收集项目数据..."]);
        }, 1000);

        setTimeout(() => {
            setInsights(prev => [...prev, "分析创作模式和风格特征..."]);
        }, 3000);

        setTimeout(() => {
            setInsights(prev => [...prev, "比对历史数据，寻找变化和趋势..."]);
        }, 5000);

        setTimeout(() => {
            setInsights(prev => [...prev, "生成风格特征图谱..."]);
        }, 7000);

        // 模拟分析完成
        setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            setStatus('complete');

            // 生成分析结果
            const analysisResult = {
                userId,
                analyzedAt: new Date().toISOString(),
                stylePreferences: {
                    visualStyle: {
                        minimalist: 80,
                        detailed: 20,
                        colorful: 65,
                        monochrome: 35
                    },
                    writingStyle: {
                        concise: 60,
                        elaborate: 40,
                        formal: 25,
                        conversational: 75
                    },
                    designPrinciples: {
                        functionality: 85,
                        aesthetics: 70,
                        innovation: 60,
                        consistency: 75
                    }
                },
                creativeHabits: {
                    workingHours: {
                        morning: 20,
                        afternoon: 30,
                        evening: 40,
                        night: 10
                    },
                    revisionFrequency: "medium",
                    ideationSources: ["web", "books", "conversations", "nature"],
                    collaborationTendency: "moderate"
                },
                insights: [
                    "您的创作风格倾向于简洁清晰的视觉表达",
                    "您在晚间时段的创作效率最高",
                    "您经常从对话和网络中获取灵感",
                    "您的设计注重功能性和一致性"
                ],
                confidenceScore: 85
            };

            // 调用完成回调
            if (onAnalysisComplete) {
                onAnalysisComplete(analysisResult);
            }

            setInsights(prev => [...prev, "分析完成！已生成创意DNA报告"]);
        }, 9000);
    };

    // 处理项目选择
    const toggleProjectSelection = (projectId: string) => {
        setSelectedProjects(prev =>
            prev.includes(projectId)
                ? prev.filter(id => id !== projectId)
                : [...prev, projectId]
        );
    };

    // 格式化上次分析日期
    const formatLastAnalyzed = (dateString?: string) => {
        if (!dateString) return '尚未分析';

        const date = new Date(dateString);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* 分析器头部 */}
            <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <FiActivity className="mr-2 text-blue-400" />
                            创意DNA分析器
                        </h2>
                        <p className="text-gray-400 mt-1">
                            分析您的创作习惯和风格偏好，形成个性化创意档案
                        </p>
                    </div>

                    <div className="mt-4 md:mt-0 flex items-center">
                        <div className="text-right mr-6">
                            <p className="text-sm text-gray-400">上次分析</p>
                            <p className="text-white font-medium">
                                {formatLastAnalyzed(lastAnalyzed)}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                            className="px-4 py-2 bg-gray-700 text-white rounded-md mr-2 hover:bg-gray-600 transition-colors"
                        >
                            设置
                        </button>
                        <button
                            onClick={startAnalysis}
                            disabled={status === 'analyzing'}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'analyzing' ? (
                                <>
                                    <FiRefreshCw className="animate-spin mr-2" />
                                    分析中...
                                </>
                            ) : (
                                <>
                                    <FiBarChart2 className="mr-2" />
                                    开始分析
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 高级分析选项 */}
            {showAdvancedOptions && (
                <div className="p-6 bg-gray-750 border-b border-gray-700">
                    <h3 className="text-white font-medium mb-4">高级分析选项</h3>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            分析深度
                        </label>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setAnalysisDepth('light')}
                                className={`px-4 py-2 rounded-md ${analysisDepth === 'light'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                轻度分析
                            </button>
                            <button
                                onClick={() => setAnalysisDepth('standard')}
                                className={`px-4 py-2 rounded-md ${analysisDepth === 'standard'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                标准分析
                            </button>
                            <button
                                onClick={() => setAnalysisDepth('deep')}
                                className={`px-4 py-2 rounded-md ${analysisDepth === 'deep'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                深度分析
                            </button>
                        </div>
                        <p className="mt-2 text-sm text-gray-400">
                            深度分析将分析更多项目细节，但需要更长时间
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            选择要分析的项目
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userProjects.map(project => (
                                <div
                                    key={project.id}
                                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedProjects.includes(project.id)
                                            ? 'border-blue-500 bg-blue-900 bg-opacity-20'
                                            : 'border-gray-700 bg-gray-700 hover:bg-gray-650'
                                        }`}
                                    onClick={() => toggleProjectSelection(project.id)}
                                >
                                    <div className="flex items-start">
                                        <div className="h-10 w-10 bg-gray-600 rounded flex-shrink-0 flex items-center justify-center text-gray-400">
                                            {project.thumbnailUrl ? (
                                                <img
                                                    src={project.thumbnailUrl}
                                                    alt={project.name}
                                                    className="h-full w-full object-cover rounded"
                                                />
                                            ) : (
                                                project.name.substring(0, 2)
                                            )}
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <h4 className="text-white font-medium">{project.name}</h4>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-xs text-gray-400">{project.type}</span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(project.lastEdited).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {userProjects.length === 0 && (
                            <p className="text-gray-400 text-center py-4">没有可分析的项目</p>
                        )}
                    </div>
                </div>
            )}

            {/* 分析进度显示 */}
            {status === 'analyzing' && (
                <div className="p-6 border-b border-gray-700">
                    <div className="mb-4">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm text-white font-medium">分析进度</span>
                            <span className="text-sm text-blue-400">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
                        <h3 className="text-white font-medium mb-2 flex items-center">
                            <FiInfo className="mr-2" />
                            分析洞察
                        </h3>
                        <ul className="space-y-2">
                            {insights.map((insight, index) => (
                                <li key={index} className="text-gray-300 flex items-center py-1">
                                    <FiCheckCircle className="text-green-400 mr-2 flex-shrink-0" />
                                    <span>{insight}</span>
                                </li>
                            ))}
                            {insights.length > 0 && status === 'analyzing' && (
                                <li className="text-gray-300 flex items-center py-1">
                                    <div className="animate-pulse text-blue-400 mr-2">
                                        <FiClock />
                                    </div>
                                    <span>正在处理...</span>
                                </li>
                            )}
                        </ul>
                        {insights.length === 0 && (
                            <p className="text-gray-400 text-center py-4">等待分析开始...</p>
                        )}
                    </div>
                </div>
            )}

            {/* 分析完成状态 */}
            {status === 'complete' && (
                <div className="p-6 border-b border-gray-700">
                    <div className="bg-green-900 bg-opacity-20 border border-green-800 rounded-lg p-4 flex items-center mb-4">
                        <FiCheckCircle className="text-green-400 mr-3 flex-shrink-0 w-5 h-5" />
                        <div>
                            <h3 className="text-white font-medium">分析完成</h3>
                            <p className="text-green-400 text-sm">
                                您的创意DNA已更新，可以查看最新的创作特征和风格偏好
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-700 rounded-lg p-4">
                            <h3 className="text-white font-medium mb-3 flex items-center">
                                <FiBarChart2 className="mr-2 text-blue-400" />
                                分析洞察
                            </h3>
                            <ul className="space-y-2">
                                {insights.map((insight, index) => (
                                    <li key={index} className="text-gray-300 text-sm py-1">
                                        {insight}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-700 rounded-lg p-4">
                            <h3 className="text-white font-medium mb-3 flex items-center">
                                <FiTrendingUp className="mr-2 text-purple-400" />
                                主要发现
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="py-1">
                                    您的创作风格倾向于简洁清晰的视觉表达
                                </li>
                                <li className="py-1">
                                    您在晚间时段的创作效率最高
                                </li>
                                <li className="py-1">
                                    您经常从对话和网络中获取灵感
                                </li>
                                <li className="py-1">
                                    您的设计注重功能性和一致性
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* 错误状态 */}
            {status === 'error' && (
                <div className="p-6 border-b border-gray-700">
                    <div className="bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-4 flex items-center">
                        <FiAlertTriangle className="text-red-400 mr-3 flex-shrink-0 w-5 h-5" />
                        <div>
                            <h3 className="text-white font-medium">分析过程中遇到错误</h3>
                            <p className="text-red-400 text-sm">{error || '发生未知错误，请稍后再试'}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 信息提示 */}
            <div className="p-6 bg-gray-850 text-sm text-gray-400">
                <div className="flex items-start">
                    <FiInfo className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p>
                        创意DNA分析器会分析您的创作习惯和风格偏好，帮助您了解自己的创作特征，
                        并让AI辅助功能能够根据您的风格生成更符合个人特色的内容。分析频率可在设置中调整。
                    </p>
                </div>
            </div>
        </div>
    );
} 