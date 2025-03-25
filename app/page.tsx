'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiEdit3, FiImage, FiMusic, FiVideo, FiCode, FiUsers } from 'react-icons/fi';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12 lg:p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold mb-6">AIBook Studio</h1>
                    <p className="text-xl mb-8">
                        创建、协作和发布您的AI驱动内容
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/dashboard"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md"
                        >
                            进入工作台
                        </Link>
                        <Link
                            href="/blog"
                            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 px-4 rounded-md"
                        >
                            浏览博客
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 border rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">内容创作</h2>
                        <p className="mb-4">
                            利用AI辅助创作工具，轻松创建高质量内容。从构思到完成，AIBook Studio提供端到端解决方案。
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>AI驱动的内容生成</li>
                            <li>智能编辑与修改建议</li>
                            <li>多媒体内容集成</li>
                        </ul>
                    </div>

                    <div className="p-6 border rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">知识管理</h2>
                        <p className="mb-4">
                            将您的想法、研究和内容组织成结构化的知识库，轻松检索和分享。
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>智能分类与标签</li>
                            <li>全文搜索</li>
                            <li>关联内容推荐</li>
                        </ul>
                    </div>

                    <div className="p-6 border rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">团队协作</h2>
                        <p className="mb-4">
                            无缝协作，共同创建和编辑内容，实时跟踪更改和进度。
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>实时协作编辑</li>
                            <li>项目与任务管理</li>
                            <li>权限与角色控制</li>
                        </ul>
                    </div>

                    <div className="p-6 border rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">发布与分享</h2>
                        <p className="mb-4">
                            一键将内容发布到博客、电子书或其他平台，轻松分享您的创作。
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>多平台发布</li>
                            <li>SEO优化</li>
                            <li>内容分析与反馈</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold mb-4">开始您的创作之旅</h2>
                    <p className="mb-6">
                        立即注册，体验AI辅助内容创作的全新方式
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/signin"
                            className="bg-primary/10 hover:bg-primary/20 text-primary py-2 px-4 rounded-md"
                        >
                            登录
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md"
                        >
                            注册
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

// 注释掉不使用的组件，避免引起服务器组件错误
// 以下组件因为使用了动画和复杂的客户端功能，应该在客户端组件中使用
/*
// 特性卡片组件
function FeatureCard({ icon, title, description, delay = 0 }) {
    return (
        <div
            className={`bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition opacity-0 animate-fade-in animation-delay-${delay * 100}`}
        >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    );
}

// 工作流步骤组件
function WorkflowStep({ number, title, description, delay = 0 }) {
    return (
        <div
            className={`relative flex flex-col items-center opacity-0 animate-fade-in animation-delay-${delay * 100}`}
        >
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold mb-4 z-10">
                {number}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
            <p className="text-gray-400 text-center text-sm">{description}</p>
        </div>
    );
}

// DNA特性组件
function DNAFeature({ text }) {
    return (
        <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center mt-0.5">
                <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
            <span className="ml-3 text-gray-300">{text}</span>
        </li>
    );
}

// DNA指标组件
function DNAMeter({ label, value, description }) {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">{label}</span>
                <span className="text-sm text-blue-400">{value}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
    );
}

// 价格卡片组件
function PricingCard({ title, price, period, description, features, buttonText, buttonLink, highlighted = false, delay = 0 }) {
    return (
        <div
            className={`rounded-lg p-6 ${highlighted ? 'bg-gradient-to-b from-blue-900 to-purple-900 border border-blue-500' : 'bg-gray-800'} opacity-0 animate-fade-in animation-delay-${delay * 100}`}
        >
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">{price}</span>
                <span className="text-gray-400 ml-1">{period}</span>
            </div>
            <p className="text-gray-400 mb-6">{description}</p>
            <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                    </li>
                ))}
            </ul>
            <Link
                href={buttonLink}
                className={`block text-center py-2 px-4 rounded ${highlighted ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} transition`}
            >
                {buttonText}
            </Link>
        </div>
    );
}
*/ 