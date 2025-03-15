"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  RefreshCw,
  Download,
  Sparkles,
  Clock,
  HelpCircle,
} from "lucide-react";

// 八卦数据
const baguaSymbols = [
  {
    id: 1,
    name: "乾卦",
    symbol: "☰",
    meaning: "天",
    nature: "刚健中正",
    description: "象征天，代表力量、创造和领导力",
  },
  {
    id: 2,
    name: "坤卦",
    symbol: "☷",
    meaning: "地",
    nature: "柔顺厚德",
    description: "象征地，代表包容、接纳和滋养",
  },
  {
    id: 3,
    name: "震卦",
    symbol: "☳",
    meaning: "雷",
    nature: "动而生阳",
    description: "象征雷，代表行动、活力和新生",
  },
  {
    id: 4,
    name: "艮卦",
    symbol: "☶",
    meaning: "山",
    nature: "止而不进",
    description: "象征山，代表稳定、停止和保守",
  },
  {
    id: 5,
    name: "坎卦",
    symbol: "☵",
    meaning: "水",
    nature: "险陷无咎",
    description: "象征水，代表危险、困难和智慧",
  },
  {
    id: 6,
    name: "离卦",
    symbol: "☲",
    meaning: "火",
    nature: "丽而明察",
    description: "象征火，代表光明、美丽和洞察力",
  },
  {
    id: 7,
    name: "巽卦",
    symbol: "☴",
    meaning: "风",
    nature: "入而信顺",
    description: "象征风，代表柔和、渗透和顺从",
  },
  {
    id: 8,
    name: "兑卦",
    symbol: "☱",
    meaning: "泽",
    nature: "说而悦人",
    description: "象征泽，代表喜悦、愉快和交流",
  },
];

// 卦象变化方法
const divnationMethods = [
  {
    id: 1,
    name: "六爻占卜",
    description: "传统的六爻预测法，可提供详细的卦象解析",
  },
  { id: 2, name: "简易卦象", description: "随机生成卦象，快速解读吉凶" },
  {
    id: 3,
    name: "周易起卦",
    description: "根据日期和时间演算卦象，提供深度解读",
  },
];

// 常见问题类别
const questionCategories = [
  { id: 1, name: "事业运势", placeholder: "我的职业发展方向如何？" },
  { id: 2, name: "情感关系", placeholder: "我与TA的感情发展如何？" },
  { id: 3, name: "健康状况", placeholder: "我近期的健康状况如何？" },
  { id: 4, name: "财富命理", placeholder: "我近期的财富状况如何？" },
  { id: 5, name: "人生方向", placeholder: "我应该选择哪条人生道路？" },
];

export default function BaguaPage() {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [questionCategory, setQuestionCategory] = useState(1);
  const [generatedHexagram, setGeneratedHexagram] = useState<Array<0 | 1>>([]);
  const [reading, setReading] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [readingTime, setReadingTime] = useState<string | null>(null);

  // 选择占卜方法
  const selectMethod = (id: number) => {
    setSelectedMethod(id);
    setGeneratedHexagram([]);
    setReading("");
  };

  // 生成卦象
  const generateHexagram = () => {
    setIsGenerating(true);

    // 生成六爻卦象 (0表示阴爻，1表示阳爻)
    const hexagram: Array<0 | 1> = [];
    for (let i = 0; i < 6; i++) {
      hexagram.push(Math.random() > 0.5 ? 1 : 0);
    }

    setGeneratedHexagram(hexagram);

    // 模拟AI分析过程
    setTimeout(() => {
      generateReading(hexagram);
    }, 1500);
  };

  // 生成解读
  const generateReading = (hexagram: Array<0 | 1>) => {
    // 计算上卦和下卦
    const upperTrigramIndex = convertTrigramToIndex(hexagram.slice(0, 3));
    const lowerTrigramIndex = convertTrigramToIndex(hexagram.slice(3, 6));

    const upperTrigram = baguaSymbols[upperTrigramIndex - 1];
    const lowerTrigram = baguaSymbols[lowerTrigramIndex - 1];

    // 记录解读时间
    const now = new Date();
    setReadingTime(now.toLocaleString());

    // 根据问题类别和卦象生成解读
    let readingText = `【八卦解读】\n\n`;
    readingText += `您的问题: "${question || questionCategories.find((c) => c.id === questionCategory)?.placeholder}"\n\n`;
    readingText += `上卦为${upperTrigram.name}（${upperTrigram.symbol}），代表${upperTrigram.meaning}，性质为${upperTrigram.nature}。\n`;
    readingText += `下卦为${lowerTrigram.name}（${lowerTrigram.symbol}），代表${lowerTrigram.meaning}，性质为${lowerTrigram.nature}。\n\n`;

    // 根据问题类别生成不同的解读
    const categories = {
      1: generateCareerReading(upperTrigram, lowerTrigram, hexagram),
      2: generateRelationshipReading(upperTrigram, lowerTrigram, hexagram),
      3: generateHealthReading(upperTrigram, lowerTrigram, hexagram),
      4: generateWealthReading(upperTrigram, lowerTrigram, hexagram),
      5: generateLifePathReading(upperTrigram, lowerTrigram, hexagram),
    };

    readingText += categories[questionCategory as keyof typeof categories];

    // 总体建议
    readingText += `\n\n【总体建议】\n`;
    const advice = getAdvice(hexagram);
    readingText += advice;

    setReading(readingText);
    setIsGenerating(false);
  };

  // 辅助函数：将三爻转换为卦象索引
  const convertTrigramToIndex = (trigram: Array<0 | 1>): number => {
    let index = 0;
    for (let i = 0; i < 3; i++) {
      index = index * 2 + trigram[i];
    }
    return index + 1;
  };

  // 各类解读生成函数
  const generateCareerReading = (
    upperTrigram: any,
    lowerTrigram: any,
    hexagram: Array<0 | 1>,
  ) => {
    // 职业解读逻辑
    const yangCount = hexagram.filter((y) => y === 1).length;
    const yinCount = 6 - yangCount;

    let careerText = `【事业解读】\n`;

    if (yangCount > yinCount) {
      careerText += `当前卦象阳爻占多，显示事业发展趋势积极向上。${upperTrigram.name}与${lowerTrigram.name}的组合显示您具有良好的发展潜力和创新能力。\n\n`;
      careerText += `近期工作中可能会遇到新的机会或项目，建议积极把握。您的领导力和决策能力将在团队中得到体现，有望获得上级的认可。`;
    } else {
      careerText += `当前卦象阴爻占多，显示事业发展需要稳扎稳打。${upperTrigram.name}与${lowerTrigram.name}的组合提示您需要更多耐心和沉淀。\n\n`;
      careerText += `近期工作可能遇到一些挑战或阻碍，建议调整心态，积累经验。这是蓄势待发的时期，不适合冒进，而应该完善自身能力，为未来机会做好准备。`;
    }

    return careerText;
  };

  const generateRelationshipReading = (
    upperTrigram: any,
    lowerTrigram: any,
    hexagram: Array<0 | 1>,
  ) => {
    // 情感解读逻辑
    const topYang = hexagram[0] === 1;
    const bottomYang = hexagram[5] === 1;

    let relationshipText = `【情感解读】\n`;

    if (upperTrigram.name === "离卦" || lowerTrigram.name === "离卦") {
      relationshipText += `卦象中有离卦出现，代表光明与温暖，您的情感生活将充满活力和热情。\n\n`;
      relationshipText += `当前关系中，双方沟通顺畅，能够相互理解和支持。是表达真实感受和加深感情的好时机。`;
    } else if (upperTrigram.name === "坎卦" || lowerTrigram.name === "坎卦") {
      relationshipText += `卦象中有坎卦出现，代表潜藏的困难与挑战，您的情感生活可能正经历一些波折。\n\n`;
      relationshipText += `当前关系中可能存在沟通障碍或理解偏差，建议保持耐心，避免冲动决定。这段关系需要更多的包容和理解，度过难关后将更加牢固。`;
    } else {
      relationshipText += `${upperTrigram.name}与${lowerTrigram.name}的组合显示您的情感生活处于稳定发展阶段。\n\n`;
      relationshipText +=
        topYang && bottomYang
          ? `首尾皆为阳爻，表示关系有良好的基础和发展前景，双方能够相互支持和成长。`
          : `卦象提示您需要在关系中保持真诚和耐心，避免因小事引发不必要的冲突。`;
    }

    return relationshipText;
  };

  const generateHealthReading = (
    upperTrigram: any,
    lowerTrigram: any,
    hexagram: Array<0 | 1>,
  ) => {
    // 健康解读逻辑
    let healthText = `【健康解读】\n`;

    if (upperTrigram.name === "艮卦" || lowerTrigram.name === "艮卦") {
      healthText += `卦象中有艮卦出现，艮为山，代表稳定与停止，提示您需要注意休息和调整。\n\n`;
      healthText += `近期身体状况可能略显疲惫，建议增加休息时间，避免过度劳累。特别注意脊椎和背部的保养，定期进行适当的伸展运动。`;
    } else if (upperTrigram.name === "坎卦") {
      healthText += `上卦为坎卦，坎为水，代表肾脏和循环系统，提示您需要关注这些方面的健康。\n\n`;
      healthText += `建议保持充分的水分摄入，避免过度劳累和熬夜。近期可能需要更多关注泌尿系统健康，保持良好的作息习惯将有助于提升整体健康状况。`;
    } else {
      healthText += `${upperTrigram.name}与${lowerTrigram.name}的组合显示您的整体健康状况稳定。\n\n`;
      healthText += `保持均衡饮食和适当运动将有助于维持这种状态。建议关注精神健康，适当放松心情，避免过度焦虑和压力。`;
    }

    return healthText;
  };

  const generateWealthReading = (
    upperTrigram: any,
    lowerTrigram: any,
    hexagram: Array<0 | 1>,
  ) => {
    // 财富解读逻辑
    const middleYang = hexagram[2] === 1 && hexagram[3] === 1;

    let wealthText = `【财富解读】\n`;

    if (upperTrigram.name === "乾卦" || lowerTrigram.name === "乾卦") {
      wealthText += `卦象中有乾卦出现，乾为天，代表强大的创造力和资源，财运总体向好。\n\n`;
      wealthText += `近期可能会有意外收入或投资机会，但仍需谨慎评估风险。您的创造力和行动力将是财富增长的关键因素。`;
    } else if (upperTrigram.name === "坤卦" || lowerTrigram.name === "坤卦") {
      wealthText += `卦象中有坤卦出现，坤为地，代表稳健的积累和丰收，财务状况趋于稳定。\n\n`;
      wealthText += `近期适合稳健理财和长期投资，不宜冒险或大额消费。踏实工作和持续积累将为您带来长期的财务安全。`;
    } else {
      wealthText += `${upperTrigram.name}与${lowerTrigram.name}的组合显示您的财富状况处于${middleYang ? "上升" : "平稳"}阶段。\n\n`;
      wealthText += middleYang
        ? `中间两爻为阳，表示核心财运强劲，近期财务状况有望改善，可能通过工作或投资获得收益。`
        : `建议保持理性消费和规划，避免冲动投资，稳步提升财务管理能力将带来长期收益。`;
    }

    return wealthText;
  };

  const generateLifePathReading = (
    upperTrigram: any,
    lowerTrigram: any,
    hexagram: Array<0 | 1>,
  ) => {
    // 人生方向解读逻辑
    let lifePathText = `【人生方向解读】\n`;

    if (upperTrigram.name === "震卦") {
      lifePathText += `上卦为震卦，震为雷，代表行动和新生，您的人生正处于变革和突破阶段。\n\n`;
      lifePathText += `当前是采取行动和开始新项目的好时机。您的勇气和决断力将带来积极的改变，建议不要惧怕未知，勇敢探索新的可能性。`;
    } else if (lowerTrigram.name === "巽卦") {
      lifePathText += `下卦为巽卦，巽为风，代表柔和的渗透和改变，您的人生道路需要灵活调整和适应。\n\n`;
      lifePathText += `当前阶段适合调整方向和策略，而非固执己见。保持开放的心态和灵活的思维将帮助您发现更适合的道路和机会。`;
    } else {
      lifePathText += `${upperTrigram.name}与${lowerTrigram.name}的组合显示您的人生道路正朝着${hexagram.filter((y) => y === 1).length > 3 ? "积极" : "稳健"}的方向发展。\n\n`;
      lifePathText += `建议在决策时兼顾内心的渴望和现实的可能性，寻找能够同时满足心灵需求和实际发展的方向。保持自我觉察和持续学习的态度将有助于找到真正适合的人生道路。`;
    }

    return lifePathText;
  };

  // 根据卦象生成总体建议
  const getAdvice = (hexagram: Array<0 | 1>) => {
    const yangCount = hexagram.filter((y) => y === 1).length;
    const advice = [
      "保持内心平静，不急不躁，顺应时势而行动。",
      "当下是观察和积累的阶段，不宜贸然行动。",
      "保持开放的心态，接纳不同的观点和可能性。",
      "相信自己的直觉和判断，适时表达自我。",
      "关注当下，脚踏实地，一步一个脚印向前推进。",
      "寻求可靠的人给予建议和支持，集思广益。",
      "改变始于自身，调整自己的态度和行为模式。",
      "保持耐心和恒心，持之以恒才能见成效。",
    ];

    // 根据阳爻数量选择建议
    return advice[yangCount % advice.length];
  };

  // 重置
  const resetDivination = () => {
    setSelectedMethod(null);
    setGeneratedHexagram([]);
    setReading("");
    setQuestion("");
  };

  // 下载解读结果
  const downloadReading = () => {
    alert("八卦解读已保存为PDF！（模拟功能）");
  };

  // 渲染六爻图形
  const renderHexagram = () => {
    return (
      <div className="flex flex-col items-center gap-2 my-6" data-oid="ps3toin">
        {generatedHexagram.map((line, index) => (
          <div
            key={index}
            className="w-24 flex justify-center"
            data-oid="uv13el8"
          >
            {line === 1 ? (
              <div
                className="h-2 w-full bg-indigo-600 dark:bg-indigo-400 rounded"
                data-oid="qz:ol:g"
              ></div>
            ) : (
              <div
                className="h-2 w-full flex justify-between"
                data-oid="4:7swk9"
              >
                <div
                  className="h-2 w-[45%] bg-indigo-600 dark:bg-indigo-400 rounded"
                  data-oid="7:3d3ch"
                ></div>
                <div
                  className="h-2 w-[45%] bg-indigo-600 dark:bg-indigo-400 rounded"
                  data-oid="mk495m7"
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900"
      data-oid=".082ieq"
    >
      <div className="container mx-auto px-4" data-oid="ihv88wz">
        <div className="mb-8" data-oid="icbu7-u">
          <Link
            href="/tools"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            data-oid="m0:vbnt"
          >
            <ArrowLeft className="w-4 h-4 mr-2" data-oid="wl:uu54" />
            返回工具页面
          </Link>
        </div>

        <div className="max-w-4xl mx-auto" data-oid="2nmg2gq">
          <div className="text-center mb-8" data-oid="jv7rur_">
            <h1
              className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
              data-oid="welwm_z"
            >
              AI八卦预测
            </h1>
            <p
              className="text-lg text-gray-600 dark:text-gray-400"
              data-oid="qwu5s.p"
            >
              结合传统八卦智慧与现代AI技术，为您提供个性化的命理解读
            </p>
          </div>

          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8"
            data-oid="n75394m"
          >
            {selectedMethod === null ? (
              <>
                <h2
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                  data-oid="n011ipd"
                >
                  选择占卜方法
                </h2>
                <div
                  className="grid md:grid-cols-3 gap-4 mb-6"
                  data-oid="eflsi1h"
                >
                  {divnationMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => selectMethod(method.id)}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-left hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                      data-oid=":d.l_3t"
                    >
                      <h3
                        className="font-bold text-gray-900 dark:text-white mb-1"
                        data-oid="f2a.41r"
                      >
                        {method.name}
                      </h3>
                      <p
                        className="text-sm text-gray-600 dark:text-gray-400"
                        data-oid="v1xqydx"
                      >
                        {method.description}
                      </p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex justify-between items-center mb-4"
                  data-oid="4rlpw2u"
                >
                  <h2
                    className="text-xl font-bold text-gray-900 dark:text-white"
                    data-oid="y3yam94"
                  >
                    {
                      divnationMethods.find((m) => m.id === selectedMethod)
                        ?.name
                    }
                  </h2>
                  <button
                    onClick={resetDivination}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    data-oid="5hn25r8"
                  >
                    选择其他方法
                  </button>
                </div>

                <div className="mb-6" data-oid="1xk21h-">
                  <label
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                    data-oid="2grgd4o"
                  >
                    选择问题类型
                  </label>
                  <div
                    className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4"
                    data-oid="yor.l2h"
                  >
                    {questionCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setQuestionCategory(category.id)}
                        className={`py-2 px-3 rounded-lg border ${
                          questionCategory === category.id
                            ? "bg-indigo-100 dark:bg-indigo-900/30 border-indigo-400 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300"
                            : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                        data-oid="qqjiv2l"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>

                  <label
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                    data-oid="46_khli"
                  >
                    输入您的具体问题（可选）
                  </label>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={
                      questionCategories.find((c) => c.id === questionCategory)
                        ?.placeholder
                    }
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    data-oid="-zbsn9g"
                  />
                </div>

                {generatedHexagram.length === 0 ? (
                  <button
                    onClick={generateHexagram}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center"
                    data-oid="1x:kbvb"
                  >
                    <Sparkles className="mr-2 h-5 w-5" data-oid="fk5wmjh" />
                    开始八卦预测
                  </button>
                ) : (
                  <div className="mt-6" data-oid="14cqwnh">
                    <h3
                      className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center"
                      data-oid=":pj1ahl"
                    >
                      您的卦象
                    </h3>

                    {renderHexagram()}

                    {isGenerating ? (
                      <div className="text-center py-8" data-oid="590fhdm">
                        <div
                          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4"
                          data-oid="xkke7y-"
                        >
                          <RefreshCw
                            className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin"
                            data-oid="4hhz:7p"
                          />
                        </div>
                        <p
                          className="text-gray-600 dark:text-gray-400"
                          data-oid="r-kazrl"
                        >
                          AI正在解读卦象...
                        </p>
                      </div>
                    ) : reading ? (
                      <div
                        className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6"
                        data-oid="q4zndln"
                      >
                        <div
                          className="flex justify-between items-center mb-4"
                          data-oid="cidvz.2"
                        >
                          <h3
                            className="text-lg font-semibold text-gray-900 dark:text-white"
                            data-oid="ss0e1wp"
                          >
                            解读结果
                          </h3>
                          {readingTime && (
                            <div
                              className="flex items-center text-sm text-gray-500 dark:text-gray-500"
                              data-oid="5_g7fd8"
                            >
                              <Clock
                                className="w-4 h-4 mr-1"
                                data-oid="16:ukt0"
                              />

                              {readingTime}
                            </div>
                          )}
                        </div>
                        <div
                          className="prose dark:prose-invert max-w-none"
                          data-oid="m3pkebi"
                        >
                          {reading.split("\n\n").map((paragraph, i) => (
                            <p key={i} data-oid="bgbpo1s">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        <div
                          className="mt-6 flex flex-wrap gap-3"
                          data-oid="36aznxo"
                        >
                          <button
                            onClick={downloadReading}
                            className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                            data-oid="9cusly:"
                          >
                            <Download
                              className="w-4 h-4 mr-2"
                              data-oid="9f6oq7-"
                            />
                            保存解读结果
                          </button>
                          <button
                            onClick={generateHexagram}
                            className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/70"
                            data-oid="dj1b568"
                          >
                            <RefreshCw
                              className="w-4 h-4 mr-2"
                              data-oid="qofeyaf"
                            />
                            重新起卦
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </>
            )}
          </div>

          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6"
            data-oid=":kpd2_t"
          >
            <h2
              className="text-xl font-bold text-gray-900 dark:text-white mb-4"
              data-oid="w1pvej6"
            >
              关于八卦预测
            </h2>
            <div
              className="prose dark:prose-invert max-w-none"
              data-oid="dmxhvvr"
            >
              <p data-oid="224-:k_">
                八卦预测是源自中国古代《周易》的一种预测方法，八卦指天地、雷风、水火、山泽八种自然现象，
                用阴阳爻相重叠组合成六十四卦，以推测事物的发展变化。
              </p>

              <div
                className="flex items-center my-4 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg"
                data-oid="ny.:lpq"
              >
                <HelpCircle
                  className="w-6 h-6 mr-2 flex-shrink-0"
                  data-oid="kv5cx9j"
                />

                <p className="text-sm m-0" data-oid="-:kttin">
                  <strong data-oid="4ijgdh0">注意：</strong>{" "}
                  本工具仅供娱乐和参考，不应作为专业建议的替代。重要决策仍应基于您自己的判断和专业咨询。
                </p>
              </div>

              <h3 data-oid="edd47lg">如何使用</h3>
              <ol data-oid="uu2s-1t">
                <li data-oid="ke3xvkp">
                  选择一种占卜方法（六爻占卜、简易卦象或周易起卦）
                </li>
                <li data-oid="9xc1qe2">选择问题类型并输入您的具体问题</li>
                <li data-oid="ghftgi1">
                  点击"开始八卦预测"，系统将为您生成卦象
                </li>
                <li data-oid="fq8ph3_">
                  AI将基于生成的卦象和您的问题提供个性化解读
                </li>
                <li data-oid="1cc8xqy">您可以将解读结果保存或重新起卦</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
