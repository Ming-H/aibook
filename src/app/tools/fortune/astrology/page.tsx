"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Download, Sparkles, Clock, HelpCircle, RefreshCw } from "lucide-react";

// 星座数据
const zodiacSigns = [
    {
        name: "白羊座",
        element: "火象",
        startDate: { month: 3, day: 21 },
        endDate: { month: 4, day: 19 },
        traits: ["热情", "勇敢", "冲动", "领导力", "直率"],
        strengths: ["充满活力", "富有创造力", "乐观向上", "勇于冒险"],
        weaknesses: ["急躁", "自我中心", "固执", "冲动"],
        description: "白羊座的人充满活力和热情，是天生的领导者。他们勇敢直率，喜欢接受挑战，但有时会显得过于冲动。"
    },
    {
        name: "金牛座",
        element: "土象",
        startDate: { month: 4, day: 20 },
        endDate: { month: 5, day: 20 },
        traits: ["稳重", "务实", "可靠", "享受", "固执"],
        strengths: ["可靠", "耐心", "实际", "决心强"],
        weaknesses: ["固执", "占有欲", "物质主义"],
        description: "金牛座的人性格稳重，注重实际，喜欢享受生活。他们可靠且有耐心，但有时会显得过于固执。"
    },
    {
        name: "双子座",
        element: "风象",
        startDate: { month: 5, day: 21 },
        endDate: { month: 6, day: 21 },
        traits: ["好奇", "适应力强", "灵活", "交际", "多变"],
        strengths: ["善于沟通", "学习能力强", "适应力强", "机智"],
        weaknesses: ["优柔寡断", "善变", "表面化", "分心"],
        description: "双子座的人思维敏捷，善于沟通，适应能力强。他们充满好奇心，但有时会显得优柔寡断。"
    },
    {
        name: "巨蟹座",
        element: "水象",
        startDate: { month: 6, day: 22 },
        endDate: { month: 7, day: 22 },
        traits: ["敏感", "情感丰富", "保护欲强", "直觉", "关心"],
        strengths: ["富有同情心", "忠诚", "有保护欲", "记忆力强"],
        weaknesses: ["情绪化", "多愁善感", "难以放手"],
        description: "巨蟹座的人情感丰富，重视家庭，具有强烈的保护欲。他们直觉敏锐，但容易受情绪影响。"
    },
    {
        name: "狮子座",
        element: "火象",
        startDate: { month: 7, day: 23 },
        endDate: { month: 8, day: 22 },
        traits: ["自信", "慷慨", "领导力", "创造力", "骄傲"],
        strengths: ["领导能力", "自信", "慷慨", "忠诚"],
        weaknesses: ["自负", "专制", "固执", "傲慢"],
        description: "狮子座的人充满自信，天生具有领导才能，慷慨大方。他们创造力强，但有时会显得过于骄傲。"
    },
    {
        name: "处女座",
        element: "土象",
        startDate: { month: 8, day: 23 },
        endDate: { month: 9, day: 22 },
        traits: ["完美主义", "分析能力", "实际", "细心", "谨慎"],
        strengths: ["分析能力强", "注重细节", "勤奋", "可靠"],
        weaknesses: ["挑剔", "过分忧虑", "完美主义"],
        description: "处女座的人注重细节，分析能力强，做事认真负责。他们追求完美，但有时会过分挑剔。"
    },
    {
        name: "天秤座",
        element: "风象",
        startDate: { month: 9, day: 23 },
        endDate: { month: 10, day: 23 },
        traits: ["公平", "和谐", "社交", "优雅", "犹豫"],
        strengths: ["外交能力", "公平", "社交能力强", "审美佳"],
        weaknesses: ["优柔寡断", "逃避冲突", "依赖他人"],
        description: "天秤座的人追求和谐，善于社交，具有良好的审美观。他们追求公平，但有时优柔寡断。"
    },
    {
        name: "天蝎座",
        element: "水象",
        startDate: { month: 10, day: 24 },
        endDate: { month: 11, day: 22 },
        traits: ["神秘", "热情", "洞察力", "意志力", "占有欲"],
        strengths: ["洞察力强", "热情", "决心", "忠诚"],
        weaknesses: ["多疑", "嫉妒", "固执", "报复心强"],
        description: "天蝎座的人具有强大的洞察力和意志力，感情深刻。他们充满神秘感，但有时会显得过于占有。"
    },
    {
        name: "射手座",
        element: "火象",
        startDate: { month: 11, day: 23 },
        endDate: { month: 12, day: 21 },
        traits: ["乐观", "冒险", "哲学", "直率", "自由"],
        strengths: ["乐观", "幽默", "诚实", "冒险精神"],
        weaknesses: ["轻率", "缺乏耐心", "说话不经过大脑"],
        description: "射手座的人乐观开朗，热爱自由，富有冒险精神。他们思想开放，但有时会显得过于直率。"
    },
    {
        name: "摩羯座",
        element: "土象",
        startDate: { month: 12, day: 22 },
        endDate: { month: 1, day: 19 },
        traits: ["务实", "野心", "耐心", "谨慎", "责任感"],
        strengths: ["责任心强", "自律", "实际", "野心"],
        weaknesses: ["悲观", "过于严肃", "过分注重地位"],
        description: "摩羯座的人务实稳重，具有强烈的责任感和事业心。他们做事谨慎，但有时会显得过于保守。"
    },
    {
        name: "水瓶座",
        element: "风象",
        startDate: { month: 1, day: 20 },
        endDate: { month: 2, day: 18 },
        traits: ["独特", "人道主义", "创新", "叛逆", "理性"],
        strengths: ["独创性", "人道主义", "智慧", "独立"],
        weaknesses: ["叛逆", "固执", "情感疏离"],
        description: "水瓶座的人思想前卫，追求独特，富有创造力。他们关心人类福祉，但有时会显得过于疏离。"
    },
    {
        name: "双鱼座",
        element: "水象",
        startDate: { month: 2, day: 19 },
        endDate: { month: 3, day: 20 },
        traits: ["富同情心", "艺术", "直觉", "梦幻", "敏感"],
        strengths: ["富有同情心", "艺术天赋", "直觉", "适应力"],
        weaknesses: ["逃避现实", "过分理想化", "优柔寡断"],
        description: "双鱼座的人富有同情心和艺术天赋，直觉敏锐。他们心思细腻，但有时会过于理想化。"
    }
];

// 运势类别
const fortuneCategories = [
    { id: 1, name: "爱情运势" },
    { id: 2, name: "事业运势" },
    { id: 3, name: "财运分析" },
    { id: 4, name: "健康提醒" },
    { id: 5, name: "学业运势" }
];

export default function AstrologyPage() {
    const [birthDate, setBirthDate] = useState("");
    const [zodiacSign, setZodiacSign] = useState<any>(null);
    const [analysis, setAnalysis] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [readingTime, setReadingTime] = useState<string | null>(null);

    // 根据日期判断星座
    const determineZodiacSign = (date: string) => {
        const [year, month, day] = date.split("-").map(Number);

        for (const sign of zodiacSigns) {
            const start = sign.startDate;
            const end = sign.endDate;

            if (
                (month === start.month && day >= start.day) ||
                (month === end.month && day <= end.day)
            ) {
                return sign;
            }

            // 处理跨年的摩羯座特殊情况
            if (sign.name === "摩羯座" && month === 12 && day >= 22) {
                return sign;
            }
        }

        return zodiacSigns[9]; // 默认返回摩羯座（处理跨年情况）
    };

    // 生成运势分析
    const generateAnalysis = () => {
        if (!birthDate) return;

        setIsGenerating(true);
        const sign = determineZodiacSign(birthDate);
        setZodiacSign(sign);

        // 记录分析时间
        const now = new Date();
        setReadingTime(now.toLocaleString());

        // 生成分析文本
        setTimeout(() => {
            const analysisText = generateZodiacAnalysis(sign);
            setAnalysis(analysisText);
            setIsGenerating(false);
        }, 1500);
    };

    // 生成星座分析文本
    const generateZodiacAnalysis = (sign: any) => {
        let analysisText = `【${sign.name}星座分析】\n\n`;

        // 基本特质分析
        analysisText += `作为${sign.element}星座的${sign.name}，${sign.description}\n\n`;

        // 性格优势
        analysisText += "【性格优势】\n";
        analysisText += sign.strengths.map((s: string) => "• " + s).join("\n");
        analysisText += "\n\n";

        // 性格短板
        analysisText += "【性格短板】\n";
        analysisText += sign.weaknesses.map((w: string) => "• " + w).join("\n");
        analysisText += "\n\n";

        // 运势分析
        analysisText += "【运势分析】\n\n";

        // 爱情运势
        analysisText += "爱情运势：\n";
        if (sign.element === "火象") {
            analysisText += "您的感情态度积极主动，容易吸引异性的注意。建议在表达热情的同时，也要留意对方的感受，保持适度的空间。\n\n";
        } else if (sign.element === "土象") {
            analysisText += "您在感情中注重稳定和承诺，会是一个忠实可靠的伴侣。建议适当表达情感，避免过于保守。\n\n";
        } else if (sign.element === "风象") {
            analysisText += "您在感情中追求自由和沟通，善于表达自己的想法。建议在关系中保持稳定性，避免过于善变。\n\n";
        } else {
            analysisText += "您在感情中敏感细腻，容易与伴侣产生深度连接。建议适当控制情绪波动，保持理性思考。\n\n";
        }

        // 事业运势
        analysisText += "事业运势：\n";
        if (sign.element === "火象") {
            analysisText += "工作中充满创造力和领导潜质，适合开创性的工作。近期可能会遇到新的发展机会，建议积极把握。\n\n";
        } else if (sign.element === "土象") {
            analysisText += "工作态度认真踏实，善于处理细节问题。职业发展稳定，通过持续努力会获得良好回报。\n\n";
        } else if (sign.element === "风象") {
            analysisText += "思维灵活，善于沟通和协调，适合需要交际的工作。近期工作中要注意细节的把控。\n\n";
        } else {
            analysisText += "直觉敏锐，善于把握机会，适合创意类工作。近期工作中要注意理性分析，避免过于感性。\n\n";
        }

        // 财运分析
        analysisText += "财运分析：\n";
        if (sign.element === "火象") {
            analysisText += "财运活跃，容易获得意外收入，但要注意控制冲动消费的倾向。\n\n";
        } else if (sign.element === "土象") {
            analysisText += "财运稳定，善于理财和积累，适合进行长期投资。\n\n";
        } else if (sign.element === "风象") {
            analysisText += "财运多变，收入来源可能较为多样，建议做好资金规划。\n\n";
        } else {
            analysisText += "财运起伏较大，直觉可能带来投资机会，但要注意风险控制。\n\n";
        }

        // 健康提醒
        analysisText += "健康提醒：\n";
        if (sign.element === "火象") {
            analysisText += "要注意情绪管理，避免过度劳累，保持规律的运动习惯。\n\n";
        } else if (sign.element === "土象") {
            analysisText += "注意保持运动习惯，避免久坐，关注消化系统健康。\n\n";
        } else if (sign.element === "风象") {
            analysisText += "注意呼吸系统保养，保持充足睡眠，避免过度疲劳。\n\n";
        } else {
            analysisText += "关注情绪健康，保持良好的作息规律，适当进行放松活动。\n\n";
        }

        // 建议
        analysisText += "【运势建议】\n";
        analysisText += `1. ${getZodiacAdvice(sign)}\n`;
        analysisText += `2. ${getElementAdvice(sign.element)}\n`;
        analysisText += "3. 保持开放和积极的心态，相信自己的直觉和判断。\n";

        return analysisText;
    };

    // 获取星座建议
    const getZodiacAdvice = (sign: any) => {
        const advices = {
            "白羊座": "在行动前稍作思考，避免过于冲动的决定。",
            "金牛座": "适当放松对物质的追求，关注精神层面的满足。",
            "双子座": "集中注意力在重要事项上，避免同时进行太多任务。",
            "巨蟹座": "学会适度表达自己的需求，不要过分压抑情感。",
            "狮子座": "倾听他人的意见，培养谦逊的品质。",
            "处女座": "放下完美主义，接纳生活中的不完美。",
            "天秤座": "培养独立决策的能力，减少对他人意见的依赖。",
            "天蝎座": "学会适度放手，不要过分钻牛角尖。",
            "射手座": "增加耐心，注意细节的把控。",
            "摩羯座": "适当放松，给自己一些休息和娱乐的时间。",
            "水瓶座": "加强情感交流，增进与他人的联系。",
            "双鱼座": "保持现实感，避免过分理想化。"
        };
        return advices[sign.name as keyof typeof advices] || "保持积极乐观的心态，相信自己的判断。";
    };

    // 获取元素相关建议
    const getElementAdvice = (element: string) => {
        const advices = {
            "火象": "注意控制脾气和冲动，将热情转化为持续的动力。",
            "土象": "适当提高冒险精神，尝试突破舒适区。",
            "风象": "加强行动力，将想法转化为具体计划。",
            "水象": "培养理性思维，避免过分感性的决定。"
        };
        return advices[element as keyof typeof advices] || "保持平衡的心态，在理性和感性之间找到适当的平衡点。";
    };

    // 重置
    const resetAnalysis = () => {
        setBirthDate("");
        setZodiacSign(null);
        setAnalysis("");
        setReadingTime(null);
    };

    // 下载分析结果
    const downloadAnalysis = () => {
        alert("星座分析已保存为PDF！（模拟功能）");
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <Link
                        href="/tools"
                        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        返回工具页面
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            AI星座分析
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            基于出生日期的个性特质与运势分析
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                请选择您的出生日期
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                />
                                {birthDate && (
                                    <button
                                        onClick={resetAnalysis}
                                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    >
                                        重置
                                    </button>
                                )}
                            </div>
                        </div>

                        {!analysis ? (
                            <button
                                onClick={generateAnalysis}
                                disabled={!birthDate}
                                className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center ${!birthDate ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Sparkles className="mr-2 h-5 w-5" />
                                开始星座分析
                            </button>
                        ) : (
                            <div className="mt-6">
                                {isGenerating ? (
                                    <div className="text-center py-8">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                                            <RefreshCw className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            AI正在分析您的星座...
                                        </p>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                分析结果
                                            </h3>
                                            {readingTime && (
                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {readingTime}
                                                </div>
                                            )}
                                        </div>
                                        <div className="prose dark:prose-invert max-w-none">
                                            {analysis.split('\n\n').map((paragraph, i) => (
                                                <p key={i}>{paragraph}</p>
                                            ))}
                                        </div>
                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <button
                                                onClick={downloadAnalysis}
                                                className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                保存分析结果
                                            </button>
                                            <button
                                                onClick={generateAnalysis}
                                                className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/70"
                                            >
                                                <RefreshCw className="w-4 h-4 mr-2" />
                                                重新分析
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            关于星座分析
                        </h2>
                        <div className="prose dark:prose-invert max-w-none">
                            <p>
                                星座分析基于古老的占星学理论，结合现代心理学和AI技术，为您提供个性化的性格特质和运势分析。
                                通过解读您的星座特征，帮助您更好地认识自己，把握机遇。
                            </p>

                            <div className="flex items-center my-4 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                                <HelpCircle className="w-6 h-6 mr-2 flex-shrink-0" />
                                <p className="text-sm m-0">
                                    <strong>注意：</strong> 星座分析仅供娱乐和参考，不应作为专业建议的替代。重要决策仍应基于您自己的判断和专业咨询。
                                </p>
                            </div>

                            <h3>如何使用</h3>
                            <ol>
                                <li>选择您的出生日期</li>
                                <li>点击"开始星座分析"，系统将自动判断您的星座</li>
                                <li>AI将基于您的星座信息生成个性化分析</li>
                                <li>您可以保存分析结果或重新进行分析</li>
                            </ol>

                            <h3>分析内容包括</h3>
                            <ul>
                                <li>性格特质分析</li>
                                <li>星座优势和短板</li>
                                <li>各领域运势预测</li>
                                <li>个性化发展建议</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 