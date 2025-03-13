import { aiModels } from '@/config/ai-models'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'

export default function ModelPage({ params }: { params: { modelId: string } }) {
    const model = aiModels.find((m) => m.id === params.modelId)

    if (!model) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                            {model.name}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            由 {model.company} 开发
                        </p>
                    </div>
                    <a
                        href={model.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        访问官网
                        <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-semibold mb-4">模型简介</h2>
                    <p>{model.description}</p>
                    <div className="mt-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            发布日期：{model.releaseDate}
                        </span>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-semibold mb-4">主要特点</h2>
                    <ul className="space-y-2">
                        {model.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-semibold mb-4">API接口</h2>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                        <code className="text-sm break-all">{model.apiEndpoint}</code>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        请注意：使用API需要申请相应的API密钥，详细使用方法请参考官方文档。
                    </p>
                </div>

                <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">
                        使用建议
                    </h3>
                    <p>
                        在使用{model.name}时，建议：
                    </p>
                    <ul className="mt-2">
                        <li>仔细阅读API文档和使用条款</li>
                        <li>注意API调用频率限制</li>
                        <li>合理设置超时和重试机制</li>
                        <li>做好错误处理和日志记录</li>
                    </ul>
                </div>
            </div>
        </div>
    )
} 