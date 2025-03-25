'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave, FiSliders, FiToggleLeft, FiToggleRight, FiPlus, FiX, FiInfo } from 'react-icons/fi';
import { useAuth } from '@/lib/context/AuthContext';

export default function DNASettings() {
    const { user, loading: authLoading } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    // 分析设置
    const [settings, setSettings] = useState({
        analysisFrequency: 'weekly',
        includedProjects: 'all',
        maxProjectsToAnalyze: 20,
        analysisDepth: 'deep',
        privateMode: false,
        notifications: true,
        aiIntegration: true,
        styleCategories: [
            { id: 'visual', name: '视觉', enabled: true },
            { id: 'text', name: '文字', enabled: true },
            { id: 'audio', name: '音频', enabled: true },
            { id: 'design', name: '设计', enabled: true },
            { id: 'custom', name: '自定义', enabled: false }
        ],
        dataRetention: 90, // 天数
        customParameters: [
            { name: '项目完成时间', importance: 75 },
            { name: '修改频率', importance: 60 }
        ]
    });

    // 当用户认证状态改变时检查登录状态
    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/signin');
            return;
        }

        // 模拟加载用户设置
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [user, authLoading, router]);

    // 更新设置处理程序
    const handleSettingChange = (setting: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            [setting]: value
        }));
    };

    // 更新类别开关
    const handleCategoryToggle = (id: string) => {
        setSettings(prev => ({
            ...prev,
            styleCategories: prev.styleCategories.map(cat =>
                cat.id === id ? { ...cat, enabled: !cat.enabled } : cat
            )
        }));
    };

    // 更新自定义参数权重
    const handleParameterChange = (index: number, importance: number) => {
        setSettings(prev => {
            const updatedParams = [...prev.customParameters];
            updatedParams[index] = { ...updatedParams[index], importance };
            return { ...prev, customParameters: updatedParams };
        });
    };

    // 添加新的自定义参数
    const handleAddParameter = () => {
        setSettings(prev => ({
            ...prev,
            customParameters: [...prev.customParameters, { name: '', importance: 50 }]
        }));
    };

    // 删除自定义参数
    const handleRemoveParameter = (index: number) => {
        setSettings(prev => {
            const updatedParams = [...prev.customParameters];
            updatedParams.splice(index, 1);
            return { ...prev, customParameters: updatedParams };
        });
    };

    // 自定义参数名称更改
    const handleParameterNameChange = (index: number, name: string) => {
        setSettings(prev => {
            const updatedParams = [...prev.customParameters];
            updatedParams[index] = { ...updatedParams[index], name };
            return { ...prev, customParameters: updatedParams };
        });
    };

    // 保存设置
    const handleSaveSettings = async () => {
        setIsSaving(true);
        // 模拟保存到API
        setTimeout(() => {
            setIsSaving(false);
            setSuccessMessage('设置已成功保存');
            // 3秒后清除成功消息
            setTimeout(() => setSuccessMessage(''), 3000);
        }, 1500);
    };

    // 加载状态
    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <p className="mt-4 text-gray-300">加载设置...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* 头部信息 */}
                <div className="flex items-center mb-8">
                    <Link
                        href="/creative-dna"
                        className="mr-4 p-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">创意DNA设置</h1>
                        <p className="text-gray-400 mt-1">自定义您的创意DNA分析参数和偏好</p>
                    </div>
                </div>

                {/* 成功消息 */}
                {successMessage && (
                    <div className="mb-6 bg-green-900 bg-opacity-20 border border-green-800 text-green-400 px-4 py-3 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <FiCheck className="h-5 w-5 text-green-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium">{successMessage}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 主要内容区域 */}
                <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6">
                        <div className="space-y-8">
                            {/* 基本设置 */}
                            <section>
                                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                                    <FiSliders className="mr-2 text-blue-400" />
                                    基本设置
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            分析频率
                                        </label>
                                        <select
                                            value={settings.analysisFrequency}
                                            onChange={(e) => handleSettingChange('analysisFrequency', e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="daily">每日</option>
                                            <option value="weekly">每周</option>
                                            <option value="monthly">每月</option>
                                            <option value="manual">手动触发</option>
                                        </select>
                                        <p className="mt-1 text-xs text-gray-400">
                                            设置系统自动更新您的创意DNA的频率
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            包含的项目
                                        </label>
                                        <select
                                            value={settings.includedProjects}
                                            onChange={(e) => handleSettingChange('includedProjects', e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="all">所有项目</option>
                                            <option value="completed">仅已完成项目</option>
                                            <option value="selected">仅选定项目</option>
                                        </select>
                                        <p className="mt-1 text-xs text-gray-400">
                                            选择哪些项目将被用于创意DNA分析
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            最大分析项目数
                                        </label>
                                        <input
                                            type="number"
                                            value={settings.maxProjectsToAnalyze}
                                            onChange={(e) => handleSettingChange('maxProjectsToAnalyze', parseInt(e.target.value))}
                                            min="5"
                                            max="50"
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <p className="mt-1 text-xs text-gray-400">
                                            设置系统分析的最大项目数量（5-50）
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            分析深度
                                        </label>
                                        <select
                                            value={settings.analysisDepth}
                                            onChange={(e) => handleSettingChange('analysisDepth', e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="light">轻度（更快，较少细节）</option>
                                            <option value="standard">标准</option>
                                            <option value="deep">深度（更慢，更多细节）</option>
                                        </select>
                                        <p className="mt-1 text-xs text-gray-400">
                                            决定分析的深度和详细程度
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* 隐私与集成 */}
                            <section className="pt-6 border-t border-gray-700">
                                <h2 className="text-xl font-semibold text-white mb-6">隐私与集成</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-white font-medium">隐私模式</h3>
                                            <p className="text-sm text-gray-400">
                                                启用后，您的创意DNA将仅对您可见，不会用于协作推荐
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleSettingChange('privateMode', !settings.privateMode)}
                                            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${settings.privateMode ? 'bg-blue-600' : 'bg-gray-600'
                                                }`}
                                        >
                                            <span className="sr-only">使用隐私模式</span>
                                            <span
                                                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${settings.privateMode ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-white font-medium">分析通知</h3>
                                            <p className="text-sm text-gray-400">
                                                接收创意DNA分析完成和重要变化的通知
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleSettingChange('notifications', !settings.notifications)}
                                            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${settings.notifications ? 'bg-blue-600' : 'bg-gray-600'
                                                }`}
                                        >
                                            <span className="sr-only">接收分析通知</span>
                                            <span
                                                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${settings.notifications ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-white font-medium">AI助手集成</h3>
                                            <p className="text-sm text-gray-400">
                                                允许AI助手根据您的创意DNA定制生成内容
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleSettingChange('aiIntegration', !settings.aiIntegration)}
                                            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${settings.aiIntegration ? 'bg-blue-600' : 'bg-gray-600'
                                                }`}
                                        >
                                            <span className="sr-only">AI助手集成</span>
                                            <span
                                                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${settings.aiIntegration ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* 数据保留 */}
                            <section className="pt-6 border-t border-gray-700">
                                <h2 className="text-xl font-semibold text-white mb-6">数据保留</h2>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        保留分析数据时长（天）
                                    </label>
                                    <input
                                        type="range"
                                        min="30"
                                        max="365"
                                        step="1"
                                        value={settings.dataRetention}
                                        onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between mt-2">
                                        <span className="text-sm text-gray-400">30天</span>
                                        <span className="text-sm text-white">{settings.dataRetention}天</span>
                                        <span className="text-sm text-gray-400">365天</span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-400">
                                        设置系统保留您的创意DNA历史数据的时间。较长的保留期可以提供更准确的长期趋势分析。
                                    </p>
                                </div>
                            </section>

                            {/* 分析类别 */}
                            <section className="pt-6 border-t border-gray-700">
                                <h2 className="text-xl font-semibold text-white mb-6">风格分析类别</h2>
                                <p className="text-sm text-gray-400 mb-4">
                                    选择要包含在创意DNA分析中的风格类别
                                </p>
                                <div className="space-y-4">
                                    {settings.styleCategories.map((category) => (
                                        <div key={category.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                                            <div>
                                                <h3 className="text-white font-medium">{category.name}风格</h3>
                                                <p className="text-sm text-gray-400">
                                                    分析您的{category.name}风格偏好和特点
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleCategoryToggle(category.id)}
                                                className="flex items-center text-white"
                                            >
                                                {category.enabled ? (
                                                    <FiToggleRight className="w-10 h-10 text-blue-500" />
                                                ) : (
                                                    <FiToggleLeft className="w-10 h-10 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 自定义分析参数 */}
                            <section className="pt-6 border-t border-gray-700">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-white">自定义分析参数</h2>
                                    <button
                                        onClick={handleAddParameter}
                                        className="flex items-center text-blue-400 hover:text-blue-300 transition"
                                    >
                                        <FiPlus className="mr-1" />
                                        添加参数
                                    </button>
                                </div>
                                <p className="text-sm text-gray-400 mb-4">
                                    自定义参数可以让系统根据您的特定需求分析创意DNA
                                </p>
                                <div className="space-y-4">
                                    {settings.customParameters.map((param, index) => (
                                        <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                            <div className="flex justify-between mb-3">
                                                <input
                                                    type="text"
                                                    value={param.name}
                                                    onChange={(e) => handleParameterNameChange(index, e.target.value)}
                                                    placeholder="参数名称"
                                                    className="bg-gray-600 border border-gray-600 rounded-md py-1 px-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
                                                />
                                                <button
                                                    onClick={() => handleRemoveParameter(index)}
                                                    className="text-gray-400 hover:text-red-400 transition"
                                                >
                                                    <FiX className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <label className="text-sm text-gray-300">重要性</label>
                                                    <span className="text-sm text-blue-400">{param.importance}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="100"
                                                    value={param.importance}
                                                    onChange={(e) => handleParameterChange(index, parseInt(e.target.value))}
                                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {settings.customParameters.length === 0 && (
                                        <div className="bg-gray-700 p-4 rounded-lg text-center text-gray-400">
                                            尚未添加自定义参数
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* 高级设置提示 */}
                        <div className="mt-8 bg-blue-900 bg-opacity-20 border border-blue-800 rounded-lg p-4 flex items-start">
                            <FiInfo className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="text-white font-medium mb-1">关于高级设置</h3>
                                <p className="text-sm text-gray-300">
                                    修改这些设置可能会影响创意DNA的精确度。如果您不确定某个选项的作用，建议保留默认设置或咨询我们的支持团队。
                                </p>
                            </div>
                        </div>

                        {/* 保存按钮 */}
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleSaveSettings}
                                disabled={isSaving}
                                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                        保存中...
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="w-5 h-5 mr-2" />
                                        保存设置
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 检查图标组件
function FiCheck(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    );
} 