export const aiModels = [
    {
        id: 'gpt-4',
        name: 'GPT-4',
        company: 'OpenAI',
        description: 'OpenAI最新的大语言模型，具有强大的自然语言理解和生成能力。支持图像理解，可以处理更长的上下文，推理能力显著提升。',
        features: [
            '支持多模态输入（图片和文本）',
            '上下文窗口长度达32K tokens',
            '更强的推理能力和创造力',
            '更好的指令遵循能力'
        ],
        releaseDate: '2023-03-14',
        apiEndpoint: 'https://api.openai.com/v1/chat/completions',
        website: 'https://openai.com/gpt-4'
    },
    {
        id: 'deepseek',
        name: 'DeepSeek',
        company: 'DeepSeek',
        description: 'DeepSeek推出的开源大语言模型系列，包括DeepSeek-MoE、DeepSeek-Coder和DeepSeek-VL等，在代码生成和多模态理解方面表现出色。',
        features: [
            '开源可商用',
            '强大的代码生成能力',
            '支持中英双语和多语言',
            '创新的MoE架构',
            '优秀的多模态理解'
        ],
        releaseDate: '2023-10-16',
        apiEndpoint: 'https://api.deepseek.com/v1/chat/completions',
        website: 'https://deepseek.com'
    },
    {
        id: 'claude-3',
        name: 'Claude 3',
        company: 'Anthropic',
        description: 'Anthropic推出的新一代AI助手，在多个基准测试中表现优异。包含Opus、Sonnet和Haiku三个版本，支持多模态理解。',
        features: [
            '支持多模态理解和生成',
            '更强的推理和分析能力',
            '更好的事实准确性',
            '更自然的对话能力'
        ],
        releaseDate: '2024-03-04',
        apiEndpoint: 'https://api.anthropic.com/v1/messages',
        website: 'https://www.anthropic.com/claude'
    },
    {
        id: 'gemini',
        name: 'Gemini',
        company: 'Google',
        description: 'Google最新推出的多模态大语言模型，整合了Google强大的AI技术。分为Ultra、Pro和Nano三个版本。',
        features: [
            '原生多模态设计',
            '强大的代码理解和生成能力',
            '与Google服务深度集成',
            '支持多语言理解和生成'
        ],
        releaseDate: '2023-12-06',
        apiEndpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro',
        website: 'https://deepmind.google/technologies/gemini/'
    },
    {
        id: 'qianwen',
        name: '通义千问',
        company: '阿里云',
        description: '阿里云推出的大规模语言模型，专注于中文理解和生成。支持多模态输入，提供全面的API服务。',
        features: [
            '优秀的中文理解能力',
            '丰富的知识图谱支持',
            '多场景应用支持',
            '持续迭代更新'
        ],
        releaseDate: '2023-04-11',
        apiEndpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
        website: 'https://qianwen.aliyun.com'
    },
    {
        id: 'ernie',
        name: '文心一言',
        company: '百度',
        description: '百度推出的知识增强大语言模型，具有强大的中文理解和生成能力。支持多模态交互，提供丰富的API能力。',
        features: [
            '中文优先的设计理念',
            '知识增强的训练方法',
            '多模态理解能力',
            '行业特定优化'
        ],
        releaseDate: '2023-03-16',
        apiEndpoint: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat',
        website: 'https://yiyan.baidu.com'
    },
    {
        id: 'spark',
        name: '讯飞星火',
        company: '科大讯飞',
        description: '科大讯飞推出的大语言模型，专注于中文场景，具有强大的语音交互能力和行业应用能力。',
        features: [
            '中文语音交互优化',
            '垂直领域深度适配',
            '多模态理解能力',
            '丰富的行业经验'
        ],
        releaseDate: '2023-05-06',
        apiEndpoint: 'https://spark-api.xf-yun.com/v1.1/chat',
        website: 'https://xinghuo.xfyun.cn'
    },
    {
        id: 'llama',
        name: 'LLaMA 2',
        company: 'Meta',
        description: 'Meta开源的大语言模型，支持商业使用，具有强大的性能和广泛的社区支持。提供多种规模的模型供选择。',
        features: [
            '完全开源可商用',
            '多种规模模型可选',
            '强大的社区生态',
            '持续的模型优化'
        ],
        releaseDate: '2023-07-18',
        apiEndpoint: 'Self-hosted',
        website: 'https://ai.meta.com/llama/'
    },
    {
        id: 'mistral',
        name: 'Mistral AI',
        company: 'Mistral',
        description: 'Mistral AI推出的高性能开源模型，包括Mistral-7B和Mixtral-8x7B等，在多个基准测试中表现出色。',
        features: [
            '创新的混合专家架构',
            '出色的性能表现',
            '高效的推理速度',
            '开源社区支持'
        ],
        releaseDate: '2023-09-27',
        apiEndpoint: 'https://api.mistral.ai/v1/chat',
        website: 'https://mistral.ai'
    },
    {
        id: 'claude-2',
        name: 'Claude 2',
        company: 'Anthropic',
        description: 'Anthropic的第二代AI助手，具有更强的分析能力和更好的安全性，支持更长的上下文窗口。',
        features: [
            '100K tokens上下文窗口',
            '更强的分析能力',
            '更好的安全性设计',
            '优秀的代码能力'
        ],
        releaseDate: '2023-07-11',
        apiEndpoint: 'https://api.anthropic.com/v1/complete',
        website: 'https://www.anthropic.com/claude'
    },
    {
        id: 'yi',
        name: '01-Yi',
        company: '零一万物',
        description: '零一万物推出的开源大语言模型，在多个基准测试中展现出强大实力，支持中英双语和多模态能力。',
        features: [
            '开源可商用',
            '中英双语优化',
            '多模态理解',
            '持续迭代优化'
        ],
        releaseDate: '2023-11-20',
        apiEndpoint: 'Self-hosted',
        website: 'https://01.ai'
    }
]; 