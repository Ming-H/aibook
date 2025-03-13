export default function AiModelsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                AI大模型导航
            </h1>

            <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg mb-6">
                    欢迎来到AI大模型导航！这里收集了当前最流行和最具影响力的AI大语言模型，
                    帮助你了解它们的特点、应用场景和使用方法。
                </p>

                <h2>为什么需要了解不同的AI大模型？</h2>
                <p>
                    不同的AI大模型各有特色和优势。了解它们的特点可以帮助你：
                </p>
                <ul>
                    <li>选择最适合你需求的模型</li>
                    <li>了解最新的AI技术发展趋势</li>
                    <li>掌握不同模型的使用方法和最佳实践</li>
                    <li>比较不同模型的性能和特点</li>
                </ul>

                <h2>如何使用本导航？</h2>
                <p>
                    在左侧边栏中，你可以看到当前最受欢迎的AI大模型列表。
                    点击任何一个模型名称，即可查看该模型的详细信息，包括：
                </p>
                <ul>
                    <li>模型的基本介绍和特点</li>
                    <li>主要功能和适用场景</li>
                    <li>使用方法和API接口说明</li>
                    <li>相关资源和参考文档</li>
                </ul>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-6">
                    <h3 className="text-purple-600 dark:text-purple-400">提示</h3>
                    <p className="mt-2">
                        我们会持续更新这个导航，添加新的模型和最新的使用信息。
                        如果你发现任何需要补充或更正的内容，欢迎联系我们。
                    </p>
                </div>
            </div>
        </div>
    )
} 