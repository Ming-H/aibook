import { NewsItem } from '@/types/news';

// 这里使用示例数据，实际项目中应该从API获取数据
const demoNews: NewsItem[] = [
    {
        id: '1',
        slug: 'openai-gpt5-development',
        title: 'OpenAI正在开发GPT-5，性能将大幅提升',
        excerpt: 'OpenAI首席执行官Sam Altman透露，GPT-5的开发工作正在进行中，新模型将在多个关键领域实现重大突破。',
        content: 'OpenAI首席执行官Sam Altman近日在一次技术会议上透露，GPT-5的开发工作正在进行中，预计将在2024年下半年发布。\n\n据Altman介绍，GPT-5在多模态能力、逻辑推理、事实准确性和长文本处理等方面都将实现显著突破。特别是在科学研究和编程方面，新模型将具备更强的辅助能力。\n\n"GPT-5将拥有更深层次的理解能力，能够更好地把握用户意图，提供更准确、更有用的回应。"Altman表示，"我们正在努力解决现有模型的局限性，包括幻觉问题和逻辑推理能力不足的问题。"\n\n业内专家认为，随着GPT-5的发布，人工智能技术将迎来新一轮的发展浪潮，各行各业的AI应用场景也将进一步扩展。',
        image: '/images/news/ai-research-1.jpg',
        category: 'ai-research',
        publishedAt: '2024-03-15T10:00:00Z',
    },
    {
        id: '2',
        slug: 'google-ai-breakthrough',
        title: 'Google发布革命性AI芯片，性能提升10倍',
        excerpt: 'Google推出新一代TPU芯片，相比前代产品性能提升10倍，能耗降低50%，将推动AI技术发展。',
        content: 'Google在其年度I/O开发者大会上发布了第五代张量处理单元（TPU v5），这款专为AI计算优化的芯片相比上一代产品性能提升了10倍，同时能耗降低了50%。\n\n据Google AI部门负责人Jeff Dean介绍，新一代TPU采用了7纳米制程工艺，单芯片包含超过1000亿个晶体管，专为大规模神经网络训练和推理任务设计。\n\n"TPU v5的发布将极大降低AI模型的训练成本和时间，使研究人员能够尝试更多创新想法，企业也能更经济地部署AI解决方案。"Dean表示。\n\nGoogle还宣布将通过其云服务平台向企业和研究机构提供TPU v5的计算能力。分析师认为，这一举措将进一步巩固Google在AI基础设施领域的领先地位。',
        image: '/images/news/industry-news-1.jpg',
        category: 'industry-news',
        publishedAt: '2024-03-14T14:30:00Z',
    },
    {
        id: '3',
        slug: 'china-ai-regulations',
        title: '中国发布新版AI监管框架，强调安全与创新平衡',
        excerpt: '中国政府发布人工智能监管新框架，在保障安全的同时鼓励创新，为AI企业提供明确的合规指南。',
        content: '中国国家互联网信息办公室近日发布了《生成式人工智能服务管理规定》的修订版，进一步明确了AI发展的监管框架，旨在平衡安全监管与技术创新。\n\n新规定强调，生成式AI服务提供者应当加强对训练数据的审核，防止模型产生有害内容；同时，对于涉及国家安全和公共利益的重要决策，AI系统必须接受人类审核。\n\n值得注意的是，新规定还引入了分级管理机制，对不同规模和影响力的AI产品采取差异化监管措施，为中小企业减轻了合规负担。\n\n多位业内专家表示，新规定为中国AI企业提供了更加清晰的发展指南，有利于行业的长期健康发展。中国AI领域的头部企业如百度、阿里巴巴和腾讯均表示将积极配合新规定的实施。',
        image: '/images/news/policy-regulation-1.jpg',
        category: 'policy-regulation',
        publishedAt: '2024-03-10T09:15:00Z',
    },
    {
        id: '4',
        slug: 'microsoft-ai-integration',
        title: 'Microsoft将AI助手集成到所有Office应用，提升生产力',
        excerpt: 'Microsoft宣布将其AI助手Copilot深度集成到所有Office应用中，提供实时写作建议、数据分析和内容生成功能。',
        content: 'Microsoft日前宣布，将把其AI助手Copilot深度集成到所有Office应用程序中，包括Word、Excel、PowerPoint、Outlook和Teams等，提供全方位的智能辅助功能。\n\n根据Microsoft的介绍，Copilot将能够根据用户需求自动生成文档、电子邮件和演示文稿；在Excel中，它可以分析数据趋势并提供洞察；在会议中，它能够实时记录要点并生成摘要。\n\nMicrosoft CEO Satya Nadella表示："Copilot代表了我们与办公软件交互方式的根本性变革，它将成为每个知识工作者的得力助手，大幅提升工作效率。"\n\n分析师预测，这一举措将重新定义办公软件市场的竞争格局，Google和其他竞争对手可能面临更大压力，需要加速自己的AI集成计划。',
        image: '/images/news/ai-applications-1.jpg',
        category: 'ai-applications',
        publishedAt: '2024-03-08T15:45:00Z',
    },
    {
        id: '5',
        slug: 'anthropic-claude-3-release',
        title: 'Anthropic发布Claude 3模型，挑战OpenAI的市场地位',
        excerpt: 'AI公司Anthropic发布新一代语言模型Claude 3，在多项基准测试中超越GPT-4，引发行业关注。',
        content: 'AI创业公司Anthropic正式发布了其新一代大型语言模型Claude 3，该模型在包括数学推理、编程和知识问答在内的多项基准测试中超越了OpenAI的GPT-4。\n\nClaude 3提供三个不同规格的版本：Opus（最强大）、Sonnet（平衡性能与成本）和Haiku（速度最快），以满足不同场景的需求。\n\nAnthropic联合创始人Dario Amodei表示："Claude 3代表了我们在安全、诚实和有用性方面的重大突破。我们特别关注减少\'幻觉\'问题，确保模型能够准确区分事实和推测。"\n\n随着Claude 3的发布，AI大模型市场的竞争进一步加剧。分析师指出，这种良性竞争将推动整个行业的技术创新，最终受益的是企业和消费者。\n\nAnthropic已经与包括Zoom、Notion和Quora在内的多家科技公司建立了合作伙伴关系，将Claude 3集成到他们的产品中。',
        image: '/images/news/ai-research-2.jpg',
        category: 'ai-research',
        publishedAt: '2024-03-05T11:30:00Z',
    },
    {
        id: '6',
        slug: 'tesla-ai-robotaxi',
        title: 'Tesla宣布8月发布全自动驾驶机器人出租车，完全无人驾驶',
        excerpt: 'Tesla CEO埃隆·马斯克宣布将于今年8月发布全自动驾驶机器人出租车，不需要方向盘和踏板，完全依靠AI系统运行。',
        content: 'Tesla首席执行官埃隆·马斯克在社交媒体上宣布，Tesla将于2024年8月8日举行"Robotaxi Day"活动，正式发布其期待已久的全自动驾驶机器人出租车。\n\n根据马斯克的描述，这款机器人出租车将没有方向盘和踏板，完全依靠Tesla的全自动驾驶AI系统运行。用户可以通过手机应用呼叫车辆，类似于现有的打车服务，但无需人类司机。\n\n"这将彻底改变城市交通的经济模式，"马斯克表示，"Robotaxi的运营成本将低于公共交通，同时提供私人交通的便利性。"\n\n然而，分析师对Tesla能否如期实现这一宏伟目标表示谨慎。监管挑战、技术可靠性以及公众接受度都是潜在的障碍。尽管如此，Tesla股价在此消息发布后仍上涨了7%，显示了投资者对这一前景的乐观态度。',
        image: '/images/news/company-updates-1.jpg',
        category: 'company-updates',
        publishedAt: '2024-03-01T16:20:00Z',
    },
    {
        id: '7',
        slug: 'amazon-ai-shopping',
        title: 'Amazon推出AI购物助手，可根据对话理解消费者需求',
        excerpt: 'Amazon推出AI购物助手Rufus，能够理解自然语言查询，提供个性化购物建议，优化电商体验。',
        content: 'Amazon近日向部分美国用户推出了AI购物助手Rufus，这是一个基于大型语言模型的智能助手，能够理解自然语言查询，为用户提供产品建议和比较信息。\n\nRufus可以回答诸如"哪种跑步鞋适合马拉松训练"或"如何选择适合新手的咖啡机"等问题，根据用户的具体需求提供个性化建议。它还能解释产品特性、比较不同产品的优缺点，甚至提供使用指南。\n\nAmazon AI副总裁Trishul Chilimbi表示："Rufus代表了我们对AI技术的长期投入。它将大幅简化用户的购物决策过程，提供更加个性化和信息丰富的体验。"\n\n电商分析师认为，随着Amazon等巨头加速AI应用的落地，智能购物助手将成为电商平台的标配，改变消费者的购物习惯和期望。\n\nAmazon计划在未来几个月内向所有美国用户推出Rufus，并逐步扩展到其他国家和地区。',
        image: '/images/news/ai-applications-2.jpg',
        category: 'ai-applications',
        publishedAt: '2024-02-25T13:45:00Z',
    },
    {
        id: '8',
        slug: 'eu-ai-act-implementation',
        title: '欧盟AI法案正式生效，全球首个AI综合监管框架落地',
        excerpt: '欧盟AI法案正式生效，对高风险AI系统实施严格监管，对违规企业最高可处全球营收6%的罚款。',
        content: '欧盟理事会正式批准了《人工智能法案》(AI Act)，标志着全球首个AI综合监管框架正式生效。该法案采用基于风险的分级监管方法，对不同类型的AI系统实施差异化管理。\n\n根据该法案，高风险AI系统（如用于关键基础设施、教育、就业、执法等领域的系统）将面临最严格的监管要求，包括风险评估、数据质量控制、透明度和人类监督等。对于违反规定的企业，最高可处以全球年营收6%的罚款。\n\n欧盟委员会负责数字政策的执行副主席Margrethe Vestager表示："AI法案为负责任地发展和使用AI技术设定了明确的规则，同时保护欧盟公民的基本权利和安全。"\n\n全球科技巨头已开始调整其AI战略以适应新规。分析师预计，欧盟的这一监管框架可能成为全球AI监管的蓝图，影响其他国家和地区的政策制定。\n\n该法案将分阶段实施，大部分条款将在24个月的过渡期后全面生效。',
        image: '/images/news/policy-regulation-2.jpg',
        category: 'policy-regulation',
        publishedAt: '2024-02-20T10:30:00Z',
    },
    {
        id: '9',
        slug: 'meta-ai-llama3',
        title: 'Meta发布开源大模型Llama 3，性能媲美闭源商业模型',
        excerpt: 'Meta发布新一代开源大型语言模型Llama 3，在多项测试中与商业闭源模型表现接近，推动AI民主化进程。',
        content: 'Meta（前Facebook）正式发布了其新一代开源大型语言模型Llama 3，该模型在多项基准测试中表现出与顶级商业闭源模型相媲美的能力，同时保持开源的特性。\n\nLlama 3提供了70亿、340亿和700亿参数三种规格，适用于不同的应用场景和计算资源条件。与前代产品相比，新模型在多语言能力、指令遵循、编码能力和推理能力等方面都有显著提升。\n\nMeta首席AI科学家Yann LeCun表示："Llama 3代表了我们对开源AI的坚定承诺。我们相信，开放的创新和协作是推动AI民主化的关键，能够让更多研究人员和开发者参与到技术进步中来。"\n\n自Llama系列模型推出以来，已有超过10万名开发者基于它构建了各种应用。分析师认为，随着开源模型性能的不断提升，AI技术的准入门槛将进一步降低，创新生态将更加繁荣。\n\nMeta同时发布了Llama 3的商业许可，允许企业在一定条件下将其用于商业产品和服务。',
        image: '/images/news/ai-research-3.jpg',
        category: 'ai-research',
        publishedAt: '2024-02-15T14:20:00Z',
    },
    {
        id: '10',
        slug: 'nvidia-ai-chip-shortage',
        title: 'NVIDIA AI芯片供应紧张持续，交付周期延长至9个月',
        excerpt: '由于AI领域需求激增，NVIDIA高端AI芯片供应持续紧张，订单交付周期延长至9个月，影响AI创新步伐。',
        content: '据业内多家公司透露，NVIDIA高端AI芯片的供应紧张状况仍在持续，目前H100等高端GPU的订单交付周期已延长至9个月，远超正常的3-4个月水平。\n\n这一供应紧张局面主要由AI领域投资热潮引发。大型科技公司、云服务提供商以及AI创业公司都在积极扩充计算资源，以支持大型语言模型的训练和推理。\n\nNVIDIA首席财务官Colette Kress在最近的财报电话会议上表示："我们正在全力扩大产能，与台积电等合作伙伴密切合作，但短期内供需不平衡的情况可能会持续。"\n\n芯片供应紧张已经开始影响AI行业的创新步伐。多家AI创业公司表示，由于无法及时获得足够的计算资源，他们不得不推迟产品开发计划或寻找替代方案。\n\n分析师预计，随着英特尔、AMD等竞争对手加速推出AI芯片产品，以及专用AI芯片初创公司的崛起，这一局面可能在2024年下半年开始缓解。',
        image: '/images/news/industry-news-2.jpg',
        category: 'industry-news',
        publishedAt: '2024-02-10T09:40:00Z',
    },
];

export async function fetchNews({
    category = 'all',
    page = 1,
    search = '',
    pageSize = 10,
}: {
    category?: string;
    page?: number;
    search?: string;
    pageSize?: number;
}) {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    let filteredNews = [...demoNews];

    // 应用分类筛选
    if (category !== 'all') {
        filteredNews = filteredNews.filter(item => item.category === category);
    }

    // 应用搜索筛选
    if (search) {
        const searchLower = search.toLowerCase();
        filteredNews = filteredNews.filter(item =>
            item.title.toLowerCase().includes(searchLower) ||
            item.excerpt.toLowerCase().includes(searchLower)
        );
    }

    // 计算分页
    const total = filteredNews.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedNews = filteredNews.slice(start, end);

    return {
        news: paginatedNews,
        total,
    };
}

export async function fetchNewsItem(slug: string): Promise<NewsItem | null> {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    // 查找匹配的新闻
    const news = demoNews.find(item => item.slug === slug);

    // 返回找到的新闻，如果未找到则返回null
    return news || null;
} 