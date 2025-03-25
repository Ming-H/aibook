'use client';

import React, { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

// 定义价格方案类型
type PricingPlan = {
    name: string;
    description: string;
    price: string;
    frequency: string;
    features: {
        text: string;
        included: boolean;
    }[];
    popularPlan?: boolean;
    buttonText: string;
    buttonLink: string;
};

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    // 定义价格方案
    const plans: PricingPlan[] = [
        {
            name: '免费版',
            description: '适合个人用户使用和尝试',
            price: '0',
            frequency: '永久免费',
            features: [
                { text: '基础AI内容生成', included: true },
                { text: '每月10篇文章', included: true },
                { text: '基本模板库', included: true },
                { text: '社区支持', included: true },
                { text: '创意DNA分析', included: false },
                { text: '高级AI模型', included: false },
                { text: '团队协作', included: false },
                { text: '优先支持', included: false },
            ],
            buttonText: '开始免费使用',
            buttonLink: '/signup',
        },
        {
            name: '标准版',
            description: '适合内容创作者和小型团队',
            price: isAnnual ? '79' : '89',
            frequency: isAnnual ? '/月（年付）' : '/月',
            features: [
                { text: '高级AI内容生成', included: true },
                { text: '每月100篇文章', included: true },
                { text: '完整模板库', included: true },
                { text: '创意DNA分析', included: true },
                { text: 'AI风格训练', included: true },
                { text: '3人团队协作', included: true },
                { text: '标准支持', included: true },
                { text: 'API集成', included: false },
            ],
            popularPlan: true,
            buttonText: '选择标准版',
            buttonLink: '/signup?plan=standard',
        },
        {
            name: '专业版',
            description: '适合专业创作者和中大型团队',
            price: isAnnual ? '199' : '259',
            frequency: isAnnual ? '/月（年付）' : '/月',
            features: [
                { text: '顶级AI内容生成', included: true },
                { text: '无限文章', included: true },
                { text: '所有模板和工具', included: true },
                { text: '深度创意DNA分析', included: true },
                { text: '完整AI风格训练', included: true },
                { text: '无限团队协作', included: true },
                { text: '优先支持和培训', included: true },
                { text: 'API和高级集成', included: true },
            ],
            buttonText: '选择专业版',
            buttonLink: '/signup?plan=pro',
        },
    ];

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                        简单透明的价格
                    </h1>
                    <p className="mt-5 text-xl text-gray-400">
                        选择最适合您需求的方案，开启AI创作之旅
                    </p>
                </div>

                {/* 价格开关（年付/月付） */}
                <div className="mt-12 flex justify-center">
                    <div className="relative bg-gray-800 p-0.5 rounded-lg flex">
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`relative py-2 px-6 border-gray-700 rounded-md ${isAnnual
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:text-white'
                                }`}
                        >
                            年付
                            {isAnnual && <span className="absolute -top-3 -right-3 bg-green-600 text-xs text-white px-2 py-0.5 rounded-full">省20%</span>}
                        </button>
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`relative py-2 px-6 border-gray-700 rounded-md ${!isAnnual
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:text-white'
                                }`}
                        >
                            月付
                        </button>
                    </div>
                </div>

                {/* 价格卡片 */}
                <div className="mt-16 grid gap-8 lg:grid-cols-3">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden 
                ${plan.popularPlan ? 'ring-4 ring-blue-500 transform scale-105 z-10' : ''}`}
                        >
                            {plan.popularPlan && (
                                <div className="bg-blue-600 text-white py-2 px-6 text-center text-sm font-medium">
                                    最受欢迎
                                </div>
                            )}
                            <div className="px-6 py-8">
                                <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                                <p className="mt-2 text-gray-400">{plan.description}</p>
                                <div className="mt-6">
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-extrabold text-white">¥{plan.price}</span>
                                        <span className="ml-1 text-gray-400">{plan.frequency}</span>
                                    </div>
                                </div>

                                <ul className="mt-8 space-y-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            {feature.included ? (
                                                <FiCheck className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                            ) : (
                                                <FiX className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                                            )}
                                            <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8">
                                    <a
                                        href={plan.buttonLink}
                                        className={`block w-full px-6 py-3 border border-transparent rounded-md text-center font-medium ${plan.popularPlan
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                : 'bg-gray-700 hover:bg-gray-600 text-white'
                                            }`}
                                    >
                                        {plan.buttonText}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 企业版 */}
                <div className="mt-16 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-8 sm:p-10 sm:pb-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                            <div>
                                <h3 className="text-3xl font-extrabold text-white">企业版</h3>
                                <p className="mt-3 text-gray-300">
                                    为大型企业和内容团队提供定制化解决方案，包括专属模型训练和集成服务。
                                </p>
                                <div className="mt-6">
                                    <a
                                        href="/contact"
                                        className="inline-flex px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-900 bg-white hover:bg-gray-100"
                                    >
                                        联系我们获取报价
                                    </a>
                                </div>
                            </div>
                            <div>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-start">
                                        <FiCheck className="h-5 w-5 text-green-300 mt-0.5 mr-3 flex-shrink-0" />
                                        <span>定制AI模型训练</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheck className="h-5 w-5 text-green-300 mt-0.5 mr-3 flex-shrink-0" />
                                        <span>专属客户成功经理</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheck className="h-5 w-5 text-green-300 mt-0.5 mr-3 flex-shrink-0" />
                                        <span>企业API和高级集成</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheck className="h-5 w-5 text-green-300 mt-0.5 mr-3 flex-shrink-0" />
                                        <span>SLA保障及全天候支持</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-16">
                    <h2 className="text-3xl font-extrabold text-white text-center">常见问题</h2>
                    <div className="mt-10 grid gap-8 md:grid-cols-2">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white">如何选择合适的方案？</h3>
                            <p className="mt-2 text-gray-400">
                                免费版适合初次尝试或内容需求较少的用户；标准版适合定期创作内容的个人或小团队；专业版适合内容创作需求大的专业团队；企业版适合需要定制化服务的大型组织。
                            </p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white">可以随时更改或取消订阅吗？</h3>
                            <p className="mt-2 text-gray-400">
                                是的，您可以随时升级、降级或取消您的订阅。升级会立即生效，而降级或取消将在当前计费周期结束后生效。
                            </p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white">有没有退款政策？</h3>
                            <p className="mt-2 text-gray-400">
                                我们提供7天无条件退款保证。如果您在付款后7天内不满意，可以联系我们的客户支持团队获得全额退款。
                            </p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-white">团队协作功能如何使用？</h3>
                            <p className="mt-2 text-gray-400">
                                您可以邀请团队成员加入您的工作区，共享项目和资源。标准版支持最多3名团队成员，专业版支持无限团队成员，并提供更多高级协作功能。
                            </p>
                        </div>
                    </div>
                </div>

                {/* 联系我们 */}
                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold text-white">还有其他问题？</h2>
                    <p className="mt-3 text-gray-400">我们的团队随时为您提供帮助</p>
                    <div className="mt-6">
                        <a
                            href="/contact"
                            className="inline-flex px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            联系客户支持
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
} 