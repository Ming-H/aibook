import Link from 'next/link';
import {
    FiEdit3, FiImage, FiMusic, FiVideo, FiCode, FiUsers,
    FiLayers, FiCpu, FiGlobe, FiBarChart2, FiCloud, FiShield
} from 'react-icons/fi';

export default function Features() {
    return (
        <main className="min-h-screen bg-gray-900 text-white">
            {/* 英雄区域 */}
            <section className="py-20 px-4 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text opacity-0 animate-fade-in-down">
                    AIBook Studio 功能
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto opacity-0 animate-fade-in-down animation-delay-200">
                    深入了解我们如何革新创意工作流，提供全方位的AI辅助创作体验
                </p>
            </section>

            {/* 功能分类导航 */}
            <section className="mb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <a href="#creative" className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition">创作工具</a>
                        <a href="#workflow" className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition">工作流程</a>
                        <a href="#ai" className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition">AI 能力</a>
                        <a href="#collab" className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition">协作功能</a>
                    </div>
                </div>
            </section>

            {/* 创作工具功能 */}
            <section id="creative" className="py-16 px-4 bg-gray-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">创作工具</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FiEdit3 className="w-7 h-7 text-blue-400" />}
                            title="智能文本创作"
                            description="根据创意DNA分析，生成符合个人风格的文章、脚本和营销文案，支持多种写作风格和格式调整。"
                            link="/features/text-creation"
                        />
                        <FeatureCard
                            icon={<FiImage className="w-7 h-7 text-purple-400" />}
                            title="AI图像生成"
                            description="从文本描述或参考图像创建高质量视觉内容，支持风格迁移和品牌一致性，适用于各种创意项目。"
                            link="/features/image-creation"
                        />
                        <FeatureCard
                            icon={<FiMusic className="w-7 h-7 text-pink-400" />}
                            title="音频创作工作室"
                            description="生成专业配音、背景音乐和音效，提供情绪匹配和自定义混音，为视频和多媒体项目增添听觉体验。"
                            link="/features/audio-studio"
                        />
                    </div>
                </div>
            </section>

            {/* 工作流程功能 */}
            <section id="workflow" className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">工作流程</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FiLayers className="w-7 h-7 text-green-400" />}
                            title="可视化工作流编辑器"
                            description="通过直观的拖放界面创建自动化创意流程，连接多个AI工具，无需编程即可实现复杂工作流。"
                            link="/features/workflow-editor"
                        />
                        <FeatureCard
                            icon={<FiCpu className="w-7 h-7 text-yellow-400" />}
                            title="创意DNA系统"
                            description="分析创作习惯和风格偏好，形成个性化创意档案，确保AI辅助创作符合个人风格。"
                            link="/features/creative-dna"
                        />
                        <FeatureCard
                            icon={<FiGlobe className="w-7 h-7 text-red-400" />}
                            title="跨媒体转换"
                            description="在文本、图像、音频和视频格式之间无缝转换，保持一致的风格和创意连贯性。"
                            link="/features/media-conversion"
                        />
                    </div>
                </div>
            </section>

            {/* AI 能力功能 */}
            <section id="ai" className="py-16 px-4 bg-gray-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">AI 能力</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FiBarChart2 className="w-7 h-7 text-indigo-400" />}
                            title="内容效果分析"
                            description="AI驱动的内容表现分析，提供受众反应预测和优化建议，帮助创作者不断改进创意输出。"
                            link="/features/content-analysis"
                        />
                        <FeatureCard
                            icon={<FiVideo className="w-7 h-7 text-orange-400" />}
                            title="视频智能编辑"
                            description="自动剪辑、字幕生成和内容摘要，简化视频制作流程，让创作者专注于创意决策。"
                            link="/features/video-editing"
                        />
                        <FeatureCard
                            icon={<FiCloud className="w-7 h-7 text-teal-400" />}
                            title="AI模型个性化"
                            description="根据创作需求和项目性质，调整底层AI模型参数，获得更符合特定领域的创意输出。"
                            link="/features/ai-customization"
                        />
                    </div>
                </div>
            </section>

            {/* 协作功能 */}
            <section id="collab" className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">协作功能</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FiUsers className="w-7 h-7 text-blue-400" />}
                            title="团队协作空间"
                            description="多人实时协作环境，统一创意风格和项目愿景，支持角色管理和任务分配。"
                            link="/features/team-collaboration"
                        />
                        <FeatureCard
                            icon={<FiCode className="w-7 h-7 text-purple-400" />}
                            title="API与集成"
                            description="灵活的API接口，实现与现有工作流工具的无缝集成，扩展AIBook Studio的创意能力。"
                            link="/features/api-integration"
                        />
                        <FeatureCard
                            icon={<FiShield className="w-7 h-7 text-green-400" />}
                            title="版权保护系统"
                            description="内置版权管理和原创性验证，确保创意资产的合法使用和保护，支持水印和来源追踪。"
                            link="/features/copyright-protection"
                        />
                    </div>
                </div>
            </section>

            {/* 功能比较表 */}
            <section className="py-16 px-4 bg-gray-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">功能比较</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max table-auto">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="py-4 px-6 text-left">功能</th>
                                    <th className="py-4 px-6 text-center">起步版</th>
                                    <th className="py-4 px-6 text-center">专业版</th>
                                    <th className="py-4 px-6 text-center">团队版</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                <FeatureRow
                                    feature="智能文本创作"
                                    starter="基础"
                                    pro="完整"
                                    team="完整"
                                />
                                <FeatureRow
                                    feature="AI图像生成"
                                    starter="有限"
                                    pro="完整"
                                    team="完整"
                                />
                                <FeatureRow
                                    feature="音频创作工作室"
                                    starter="基础"
                                    pro="完整"
                                    team="完整"
                                />
                                <FeatureRow
                                    feature="可视化工作流编辑器"
                                    starter="-"
                                    pro="有限"
                                    team="完整"
                                />
                                <FeatureRow
                                    feature="创意DNA系统"
                                    starter="基础"
                                    pro="高级"
                                    team="团队版"
                                />
                                <FeatureRow
                                    feature="跨媒体转换"
                                    starter="有限"
                                    pro="完整"
                                    team="完整"
                                />
                                <FeatureRow
                                    feature="内容效果分析"
                                    starter="-"
                                    pro="基础"
                                    team="高级"
                                />
                                <FeatureRow
                                    feature="视频智能编辑"
                                    starter="基础"
                                    pro="完整"
                                    team="完整"
                                />
                                <FeatureRow
                                    feature="AI模型个性化"
                                    starter="-"
                                    pro="有限"
                                    team="完整"
                                />
                                <FeatureRow
                                    feature="团队协作空间"
                                    starter="-"
                                    pro="-"
                                    team="完整"
                                />
                                <FeatureRow
                                    feature="API与集成"
                                    starter="-"
                                    pro="有限"
                                    team="完整"
                                />
                                <FeatureRow
                                    feature="版权保护系统"
                                    starter="基础"
                                    pro="高级"
                                    team="高级"
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA部分 */}
            <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        准备开始使用AIBook Studio?
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        选择适合您需求的方案，立即体验AI驱动的创意工作流
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link
                            href="/signup"
                            className="inline-flex items-center px-8 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition"
                        >
                            免费注册
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center px-8 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition"
                        >
                            查看价格方案
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

// 功能卡片组件
function FeatureCard({ icon, title, description, link }) {
    return (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition">
            <div className="rounded-full bg-gray-800 w-14 h-14 flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-gray-400 mb-5">{description}</p>
            <Link href={link} className="text-blue-400 hover:text-blue-300 flex items-center">
                了解更多
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </Link>
        </div>
    );
}

// 功能比较表行组件
function FeatureRow({ feature, starter, pro, team }) {
    return (
        <tr className="hover:bg-gray-750">
            <td className="py-4 px-6 text-left">{feature}</td>
            <td className="py-4 px-6 text-center">
                {starter === "-" ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 text-gray-500">—</span>
                ) : (
                    <span className={`text-sm ${starter === "基础" ? "text-yellow-400" : starter === "有限" ? "text-orange-400" : "text-green-400"}`}>
                        {starter}
                    </span>
                )}
            </td>
            <td className="py-4 px-6 text-center">
                {pro === "-" ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 text-gray-500">—</span>
                ) : (
                    <span className={`text-sm ${pro === "基础" ? "text-yellow-400" : pro === "有限" ? "text-orange-400" : "text-green-400"}`}>
                        {pro}
                    </span>
                )}
            </td>
            <td className="py-4 px-6 text-center">
                {team === "-" ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 text-gray-500">—</span>
                ) : (
                    <span className={`text-sm ${team === "基础" ? "text-yellow-400" : team === "有限" ? "text-orange-400" : "text-green-400"}`}>
                        {team}
                    </span>
                )}
            </td>
        </tr>
    );
} 