'use client';

import React, { useState, useEffect } from 'react';
import {
    FiArrowRight,
    FiBookOpen,
    FiLayers,
    FiTrendingUp,
    FiUsers,
    FiFilm,
    FiImage,
    FiMusic,
    FiBook,
    FiRefreshCw,
    FiThumbsUp,
    FiThumbsDown
} from 'react-icons/fi';
import Link from 'next/link';

// 推荐类型
export type RecommendationType = 'template' | 'tool' | 'resource' | 'collaborator' | 'inspiration';

// 推荐内容类型
export type Recommendation = {
    id: string;
    title: string;
    description: string;
    type: RecommendationType;
    thumbnailUrl?: string;
    url: string;
    relevance: number; // 0-100
    tags: string[];
    category: string;
};

// 组件属性类型
type RecommendationEngineProps = {
    userId: string;
    stylePreferences?: Record<string, number>; // 风格偏好，如 { minimalist: 80, colorful: 60 }
    interests?: string[]; // 用户兴趣标签
    recentProjects?: { id: string; name: string; type: string }[]; // 最近的项目
};

export default function RecommendationEngine({
    userId,
    stylePreferences = {},
    interests = [],
    recentProjects = []
}: RecommendationEngineProps) {
    // 推荐内容
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    // 加载状态
    const [isLoading, setIsLoading] = useState(true);
    // 错误状态
    const [error, setError] = useState<string | null>(null);
    // 活跃类别
    const [activeCategory, setActiveCategory] = useState('all');
    // 反馈状态
    const [feedback, setFeedback] = useState<Record<string, 'like' | 'dislike' | null>>({});

    // 分类列表
    const categories = [
        { id: 'all', name: '全部', icon: FiLayers },
        { id: 'templates', name: '模板', icon: FiBookOpen },
        { id: 'tools', name: '工具', icon: FiTrendingUp },
        { id: 'collaborators', name: '协作者', icon: FiUsers },
        { id: 'inspiration', name: '灵感', icon: FiFilm },
    ];

    // 模拟获取推荐内容
    useEffect(() => {
        setIsLoading(true);
        setError(null);

        // 模拟API请求延迟
        const timer = setTimeout(() => {
            try {
                // 生成模拟数据
                const mockRecommendations: Recommendation[] = [
                    {
                        id: 'tem1',
                        title: '极简产品介绍模板',
                        description: '基于您对简洁风格的偏好推荐，适用于产品宣传页面。',
                        type: 'template',
                        thumbnailUrl: '/placeholder-template.jpg',
                        url: '/templates/minimalist-product',
                        relevance: 92,
                        tags: ['minimalist', 'product', 'landing-page'],
                        category: 'templates'
                    },
                    {
                        id: 'tool1',
                        title: 'ColorMind AI调色工具',
                        description: '智能配色工具，根据您的色彩偏好提供和谐的配色方案。',
                        type: 'tool',
                        thumbnailUrl: '/placeholder-tool.jpg',
                        url: '/tools/colormind',
                        relevance: 85,
                        tags: ['color', 'design', 'ai'],
                        category: 'tools'
                    },
                    {
                        id: 'res1',
                        title: '高质量创意素材库',
                        description: '包含超过1000种创意元素，与您的视觉风格高度匹配。',
                        type: 'resource',
                        thumbnailUrl: '/placeholder-resource.jpg',
                        url: '/resources/creative-assets',
                        relevance: 78,
                        tags: ['assets', 'elements', 'design'],
                        category: 'tools'
                    },
                    {
                        id: 'col1',
                        title: '艾米设计师',
                        description: '风格相似的设计师，专注于简约设计，可能是理想的协作伙伴。',
                        type: 'collaborator',
                        thumbnailUrl: '/placeholder-collaborator.jpg',
                        url: '/connect/designer-amy',
                        relevance: 88,
                        tags: ['designer', 'minimalist', 'professional'],
                        category: 'collaborators'
                    },
                    {
                        id: 'col2',
                        title: '内容编辑团队Beta',
                        description: '专业内容团队，擅长创作与您风格相符的营销文案。',
                        type: 'collaborator',
                        thumbnailUrl: '/placeholder-team.jpg',
                        url: '/connect/team-beta',
                        relevance: 72,
                        tags: ['team', 'content', 'marketing'],
                        category: 'collaborators'
                    },
                    {
                        id: 'ins1',
                        title: '2024设计趋势报告',
                        description: '最新设计趋势分析，包含与您风格相关的未来发展方向。',
                        type: 'inspiration',
                        thumbnailUrl: '/placeholder-inspiration.jpg',
                        url: '/inspiration/design-trends-2024',
                        relevance: 95,
                        tags: ['trends', 'design', '2024'],
                        category: 'inspiration'
                    },
                    {
                        id: 'ins2',
                        title: '创意案例: 品牌重塑',
                        description: '成功品牌重塑案例研究，包含与您创作模式相似的设计思路。',
                        type: 'inspiration',
                        thumbnailUrl: '/placeholder-casestudy.jpg',
                        url: '/inspiration/rebrand-casestudy',
                        relevance: 89,
                        tags: ['case-study', 'rebrand', 'identity'],
                        category: 'inspiration'
                    },
                    {
                        id: 'tem2',
                        title: '交互式故事板模板',
                        description: '基于您最近项目风格的动态内容展示模板。',
                        type: 'template',
                        thumbnailUrl: '/placeholder-template2.jpg',
                        url: '/templates/interactive-storytelling',
                        relevance: 83,
                        tags: ['interactive', 'storytelling', 'multimedia'],
                        category: 'templates'
                    },
                ];

                // 根据相关性排序
                const sortedRecommendations = mockRecommendations.sort(
                    (a, b) => b.relevance - a.relevance
                );

                setRecommendations(sortedRecommendations);
                setIsLoading(false);
            } catch (err) {
                setError('无法加载推荐内容');
                setIsLoading(false);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [userId, stylePreferences, interests]);

    // 刷新推荐
    const refreshRecommendations = () => {
        setIsLoading(true);

        // 模拟API请求
        setTimeout(() => {
            // 随机打乱现有推荐的顺序，并稍微调整相关度
            const shuffled = [...recommendations]
                .sort(() => Math.random() - 0.5)
                .map(rec => ({
                    ...rec,
                    relevance: Math.min(100, Math.max(50, rec.relevance + Math.floor(Math.random() * 10) - 5))
                }));

            setRecommendations(shuffled);
            setIsLoading(false);
        }, 1000);
    };

    // 提交反馈
    const submitFeedback = (id: string, type: 'like' | 'dislike') => {
        setFeedback(prev => ({
            ...prev,
            [id]: type
        }));

        // 实际应用中这里会向API发送反馈数据
        console.log(`用户对推荐 ${id} 的反馈: ${type}`);
    };

    // 过滤推荐内容
    const filteredRecommendations = activeCategory === 'all'
        ? recommendations
        : recommendations.filter(rec => rec.category === activeCategory);

    // 渲染推荐项
    const renderRecommendationItem = (recommendation: Recommendation) => {
        // 获取反馈状态
        const userFeedback = feedback[recommendation.id];

        // 选择合适的图标
        const TypeIcon = recommendation.type === 'template'
            ? FiBookOpen
            : recommendation.type === 'tool'
                ? FiTrendingUp
                : recommendation.type === 'collaborator'
                    ? FiUsers
                    : recommendation.type === 'resource'
                        ? FiImage
                        : FiFilm;

        return (
            <div
                key={recommendation.id}
                className="bg-gray-750 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
                {/* 缩略图 */}
                <div className="h-40 bg-gray-700 relative">
                    {recommendation.thumbnailUrl ? (
                        <img
                            src={recommendation.thumbnailUrl}
                            alt={recommendation.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                            <TypeIcon className="text-gray-500 w-12 h-12" />
                        </div>
                    )}

                    {/* 类型标签 */}
                    <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                        <TypeIcon className="mr-1 w-3 h-3" />
                        <span>{
                            recommendation.type === 'template'
                                ? '模板'
                                : recommendation.type === 'tool'
                                    ? '工具'
                                    : recommendation.type === 'collaborator'
                                        ? '协作者'
                                        : recommendation.type === 'resource'
                                            ? '资源'
                                            : '灵感'
                        }</span>
                    </div>

                    {/* 相关度 */}
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                        匹配度 {recommendation.relevance}%
                    </div>
                </div>

                {/* 内容 */}
                <div className="p-4">
                    <h3 className="text-white font-medium text-lg mb-1 truncate">
                        {recommendation.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {recommendation.description}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mb-4">
                        {recommendation.tags.slice(0, 3).map(tag => (
                            <span
                                key={tag}
                                className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => submitFeedback(recommendation.id, 'like')}
                                className={`p-2 rounded-full ${userFeedback === 'like'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                                title="喜欢这个推荐"
                            >
                                <FiThumbsUp className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => submitFeedback(recommendation.id, 'dislike')}
                                className={`p-2 rounded-full ${userFeedback === 'dislike'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                                title="不喜欢这个推荐"
                            >
                                <FiThumbsDown className="w-4 h-4" />
                            </button>
                        </div>

                        <Link
                            href={recommendation.url}
                            className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium transition-colors"
                        >
                            查看详情
                            <FiArrowRight className="ml-1" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* 头部 */}
            <div className="p-6 border-b border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <FiTrendingUp className="mr-2 text-purple-400" />
                            个性化推荐
                        </h2>
                        <p className="text-gray-400 mt-1">
                            基于您的创意DNA，为您推荐相关内容和工具
                        </p>
                    </div>
                    <button
                        onClick={refreshRecommendations}
                        disabled={isLoading}
                        className="mt-4 md:mt-0 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <FiRefreshCw className="animate-spin mr-2" />
                                刷新中...
                            </>
                        ) : (
                            <>
                                <FiRefreshCw className="mr-2" />
                                刷新推荐
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* 分类导航 */}
            <div className="border-b border-gray-700 bg-gray-750 px-6 py-3 overflow-x-auto">
                <div className="flex space-x-2">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${activeCategory === category.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            <category.icon className="mr-1.5" />
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* 内容区域 */}
            <div className="p-6">
                {isLoading ? (
                    // 加载状态
                    <div className="min-h-[300px] flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-4 text-gray-400">加载个性化推荐中...</p>
                    </div>
                ) : error ? (
                    // 错误状态
                    <div className="min-h-[300px] flex flex-col items-center justify-center">
                        <p className="text-red-400">{error}</p>
                        <button
                            onClick={refreshRecommendations}
                            className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center"
                        >
                            <FiRefreshCw className="mr-2" />
                            重试
                        </button>
                    </div>
                ) : filteredRecommendations.length === 0 ? (
                    // 无内容状态
                    <div className="min-h-[300px] flex flex-col items-center justify-center">
                        <p className="text-gray-400">暂无符合条件的推荐内容</p>
                        {activeCategory !== 'all' && (
                            <button
                                onClick={() => setActiveCategory('all')}
                                className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
                            >
                                查看所有推荐
                            </button>
                        )}
                    </div>
                ) : (
                    // 推荐内容网格
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRecommendations.map(renderRecommendationItem)}
                    </div>
                )}
            </div>

            {/* 底部信息 */}
            <div className="p-6 bg-gray-750 border-t border-gray-700">
                <div className="flex items-start text-sm text-gray-400">
                    <div className="flex-grow">
                        <h3 className="text-white font-medium mb-1">关于推荐系统</h3>
                        <p>
                            推荐基于您的创意DNA、项目历史和风格偏好生成。提供反馈可以帮助系统更好地了解您的需求，提供更精准的推荐。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 