"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  RefreshCw,
  Book,
  Download,
  Sparkles,
  Clock,
  HelpCircle,
} from "lucide-react";

// 塔罗牌数据
const tarotCards = [
  {
    id: 0,
    name: "愚者",
    image: "fool.jpg",
    meaning: "新的开始，冒险，无忧无虑",
  },
  {
    id: 1,
    name: "魔术师",
    image: "magician.jpg",
    meaning: "创造力，专注，技能",
  },
  {
    id: 2,
    name: "女祭司",
    image: "high-priestess.jpg",
    meaning: "直觉，潜意识，神秘",
  },
  { id: 3, name: "女皇", image: "empress.jpg", meaning: "丰收，滋养，自然" },
  { id: 4, name: "皇帝", image: "emperor.jpg", meaning: "权威，控制，结构" },
  { id: 5, name: "教皇", image: "hierophant.jpg", meaning: "传统，信仰，教育" },
  { id: 6, name: "恋人", image: "lovers.jpg", meaning: "选择，爱情，关系" },
  { id: 7, name: "战车", image: "chariot.jpg", meaning: "决心，意志力，成功" },
  { id: 8, name: "力量", image: "strength.jpg", meaning: "勇气，耐心，控制" },
  { id: 9, name: "隐士", image: "hermit.jpg", meaning: "沉思，内省，指导" },
  {
    id: 10,
    name: "命运之轮",
    image: "wheel-of-fortune.jpg",
    meaning: "变化，周期，命运",
  },
  { id: 11, name: "正义", image: "justice.jpg", meaning: "平衡，真相，清晰" },
  {
    id: 12,
    name: "倒吊人",
    image: "hanged-man.jpg",
    meaning: "牺牲，释放，新视角",
  },
  { id: 13, name: "死神", image: "death.jpg", meaning: "结束，转变，重生" },
  {
    id: 14,
    name: "节制",
    image: "temperance.jpg",
    meaning: "平衡，和谐，治愈",
  },
  {
    id: 15,
    name: "恶魔",
    image: "devil.jpg",
    meaning: "束缚，物质主义，黑暗面",
  },
  { id: 16, name: "塔", image: "tower.jpg", meaning: "突变，破坏，启示" },
  { id: 17, name: "星星", image: "star.jpg", meaning: "希望，灵感，宁静" },
  { id: 18, name: "月亮", image: "moon.jpg", meaning: "幻想，恐惧，潜意识" },
  { id: 19, name: "太阳", image: "sun.jpg", meaning: "快乐，活力，成就" },
  { id: 20, name: "审判", image: "judgement.jpg", meaning: "复苏，更新，决策" },
  { id: 21, name: "世界", image: "world.jpg", meaning: "完成，整合，成就" },
];

// 牌阵数据
const spreads = [
  {
    id: 1,
    name: "单卡阅读",
    description: "抽取一张牌提供简单的指引或回答",
    cards: 1,
  },
  {
    id: 2,
    name: "三卡阵",
    description: "过去、现在和未来的简单分析",
    cards: 3,
  },
  {
    id: 3,
    name: "凯尔特十字阵",
    description: "详细的情况分析和潜在结果",
    cards: 10,
  },
];

// 常见问题类别
const questionCategories = [
  { id: 1, name: "事业运势", placeholder: "我的职业发展方向如何？" },
  { id: 2, name: "情感关系", placeholder: "我与TA的感情发展如何？" },
  { id: 3, name: "个人成长", placeholder: "我应该如何克服当前的困难？" },
  { id: 4, name: "生活选择", placeholder: "我应该做出什么决定？" },
];

export default function TarotPage() {
  const [selectedSpread, setSelectedSpread] = useState<number | null>(null);
  const [questionCategory, setQuestionCategory] = useState(1);
  const [question, setQuestion] = useState("");
  const [drawnCards, setDrawnCards] = useState<any[]>([]);
  const [reading, setReading] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [readingTime, setReadingTime] = useState<string | null>(null);

  // 选择牌阵
  const selectSpread = (id: number) => {
    setSelectedSpread(id);
    setDrawnCards([]);
    setReading("");
  };

  // 抽牌
  const drawCards = () => {
    if (!selectedSpread) return;

    const spread = spreads.find((s) => s.id === selectedSpread);
    if (!spread) return;

    setIsGenerating(true);

    // 获取随机牌
    const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
    // 取所需数量的牌
    const selected = shuffled.slice(0, spread.cards);
    // 随机添加正逆位
    const withOrientation = selected.map((card) => ({
      ...card,
      isReversed: Math.random() > 0.5,
    }));

    setDrawnCards(withOrientation);

    // 模拟AI分析过程
    setTimeout(() => {
      generateReading(withOrientation, spread);
    }, 1500);
  };

  // 生成解读
  const generateReading = (cards: any[], spread: any) => {
    // 记录解读时间
    const now = new Date();
    setReadingTime(now.toLocaleString());

    // 生成不同牌阵的解读
    let readingText = "";

    if (spread.id === 1) {
      readingText = generateSingleCardReading(cards[0], questionCategory);
    } else if (spread.id === 2) {
      readingText = generateThreeCardReading(cards, questionCategory);
    } else {
      readingText = generateCelticCrossReading(cards, questionCategory);
    }

    setReading(readingText);
    setIsGenerating(false);
  };

  // 单卡解读
  const generateSingleCardReading = (card: any, categoryId: number) => {
    const categories = {
      1: "事业",
      2: "情感",
      3: "个人成长",
      4: "生活选择",
    };
    const category = categories[categoryId as keyof typeof categories];

    let readingText = `【塔罗单卡解读】\n\n`;
    readingText += `您的问题: "${question || questionCategories.find((c) => c.id === questionCategory)?.placeholder}"\n\n`;
    readingText += `您抽到了${card.isReversed ? "逆位的" : "正位的"}「${card.name}」。\n\n`;

    // 根据牌的含义和问题类别生成解读
    readingText += `这张牌代表${card.meaning}。${card.isReversed ? "逆位暗示着这种能量可能受到阻碍或向内转化。" : "正位显示这种能量积极地在您的生活中发挥作用。"}\n\n`;

    // 根据问题类别添加具体解读
    readingText += `在${category}方面，`;

    if (categoryId === 1) {
      // 事业
      readingText += card.isReversed
        ? `您可能正面临一些职业挑战或停滞。建议重新评估当前方向，关注内在成长而非外在成就。暂时的困难将带来新的见解和机会。`
        : `您的创造力和主动性将带来积极的职业发展。现在是推进计划和展示能力的好时机，相信自己的判断和能力。`;
    } else if (categoryId === 2) {
      // 情感
      readingText += card.isReversed
        ? `您的情感关系可能遇到一些障碍或误解。建议更深入地关注自己的需求和感受，坦诚沟通对解决当前问题至关重要。`
        : `您的情感生活正朝着积极的方向发展。保持开放和真诚，将带来更深层次的连接和理解。`;
    } else if (categoryId === 3) {
      // 个人成长
      readingText += card.isReversed
        ? `您可能正在经历内在的挣扎或自我怀疑。这是深入自我了解的机会，接纳自己的不完美是成长的重要一步。`
        : `您正处于个人成长的良好阶段，保持好奇心和学习态度将带来新的视角和机会。信任自己的直觉和能力。`;
    } else {
      // 生活选择
      readingText += card.isReversed
        ? `做决定时，确保您不是出于恐惧或外部压力。可能需要更多时间反思和收集信息，避免仓促决定。`
        : `现在是做出决定并采取行动的好时机。相信自己的判断，勇敢地朝着目标前进将带来积极的结果。`;
    }

    return readingText;
  };

  // 三卡解读
  const generateThreeCardReading = (cards: any[], categoryId: number) => {
    const positions = ["过去", "现在", "未来"];
    const categories = {
      1: "事业发展",
      2: "情感关系",
      3: "个人成长之旅",
      4: "决策过程",
    };
    const category = categories[categoryId as keyof typeof categories];

    let readingText = `【三卡阵解读】\n\n`;
    readingText += `您的问题: "${question || questionCategories.find((c) => c.id === questionCategory)?.placeholder}"\n\n`;
    readingText += `这个三卡阵代表您${category}的过去、现在和未来：\n\n`;

    // 为每个位置生成解读
    cards.forEach((card, index) => {
      readingText += `${positions[index]}（${card.name}${card.isReversed ? "逆位" : "正位"}）：`;

      // 根据位置和牌的含义生成解读
      if (index === 0) {
        // 过去
        readingText += `您曾经经历了${card.meaning}的阶段，${card.isReversed ? "这可能给您带来了一些挑战或教训" : "这为您的当前状况奠定了基础"}。`;
      } else if (index === 1) {
        // 现在
        readingText += `您现在正面对${card.meaning}的能量，${card.isReversed ? "这可能是当前面临的困难或需要克服的障碍" : "这是您当前的优势或机遇"}。`;
      } else {
        // 未来
        readingText += `向前发展，您可能会经历${card.meaning}的时期，${card.isReversed ? "需要注意潜在的挑战和阻碍" : "这预示着积极的发展和可能性"}。`;
      }

      readingText += `\n\n`;
    });

    // 添加综合解读
    readingText += `【综合解读】\n`;
    readingText += `从整体来看，您的${category}显示出从`;

    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];

    // 根据三张牌的正逆位组合给出趋势判断
    const positiveCount = cards.filter((c) => !c.isReversed).length;

    if (positiveCount >= 2) {
      readingText += `挑战逐渐转向机遇的过程。即使面临困难，整体发展趋势是积极的。`;
    } else {
      readingText += `相对顺利逐渐进入需要更多努力的阶段。这是一个深入反思和调整策略的好时机。`;
    }

    // 根据问题类别添加具体建议
    readingText += `\n\n【建议】\n`;

    if (categoryId === 1) {
      // 事业
      readingText += `在职业发展方面，专注于${futureCard.isReversed ? "提升适应能力和内在价值" : "把握外部机会和展示才能"}将帮助您取得更好的成果。`;
    } else if (categoryId === 2) {
      // 情感
      readingText += `在情感关系中，重视${futureCard.isReversed ? "自我认知和心灵成长" : "沟通与共同经历"}将为您带来更满足的关系体验。`;
    } else if (categoryId === 3) {
      // 个人成长
      readingText += `在个人成长道路上，${futureCard.isReversed ? "接纳不完美和内在冲突" : "勇于尝试和走出舒适区"}是您进步的关键。`;
    } else {
      // 生活选择
      readingText += `在做决定时，综合考虑${futureCard.isReversed ? "长期影响和潜在风险" : "直觉感受和个人价值观"}将帮助您做出更适合自己的选择。`;
    }

    return readingText;
  };

  // 凯尔特十字阵解读
  const generateCelticCrossReading = (cards: any[], categoryId: number) => {
    let readingText = `【凯尔特十字阵解读】\n\n`;
    readingText += `您的问题: "${question || questionCategories.find((c) => c.id === questionCategory)?.placeholder}"\n\n`;

    // 位置含义
    const positions = [
      "当前情况",
      "当前挑战",
      "过去基础",
      "将来可能",
      "意识层面",
      "潜意识影响",
      "您自身",
      "外部环境",
      "希望或恐惧",
      "最终结果",
    ];

    readingText += `这个凯尔特十字阵提供了详细的情况分析：\n\n`;

    // 简化版解读，只解读关键位置
    readingText += `核心情况（${cards[0].name}${cards[0].isReversed ? "逆位" : "正位"}和${cards[1].name}${cards[1].isReversed ? "逆位" : "正位"}）：\n`;
    readingText += `您当前的状况体现为${cards[0].meaning}，面临的主要挑战是${cards[1].meaning}。${
      cards[0].isReversed && cards[1].isReversed
        ? "这表明您可能正处于内外交困的复杂局面。"
        : !cards[0].isReversed && !cards[1].isReversed
          ? "整体情况较为顺利，挑战在可控范围内。"
          : "内外状况有所不同，需要平衡和调整。"
    }\n\n`;

    readingText += `时间脉络（${cards[2].name}、${cards[3].name}）：\n`;
    readingText += `过去的${cards[2].name}${cards[2].isReversed ? "逆位" : "正位"}奠定了当前局面的基础，未来可能朝着${cards[3].name}${cards[3].isReversed ? "逆位" : "正位"}的方向发展。这表明${
      cards[2].isReversed !== cards[3].isReversed
        ? "您的情况正在经历转变，趋势发生着明显变化。"
        : "当前的发展趋势相对稳定，延续了过去的模式。"
    }\n\n`;

    readingText += `内外影响（${cards[4].name}、${cards[5].name}）：\n`;
    readingText += `您意识层面的${cards[4].name}${cards[4].isReversed ? "逆位" : "正位"}与潜意识中的${cards[5].name}${cards[5].isReversed ? "逆位" : "正位"}显示${
      cards[4].isReversed === cards[5].isReversed
        ? "您的显意识和潜意识相对一致，有助于实现内在和谐。"
        : "您的意识和潜意识存在某种冲突，可能导致内心纠结或矛盾。"
    }\n\n`;

    readingText += `环境因素（${cards[6].name}、${cards[7].name}）：\n`;
    readingText += `您自身状态表现为${cards[6].name}${cards[6].isReversed ? "逆位" : "正位"}，外部环境呈现${cards[7].name}${cards[7].isReversed ? "逆位" : "正位"}的特质。${
      cards[6].isReversed !== cards[7].isReversed
        ? "自身状态与环境存在一定的不匹配，可能需要调整适应。"
        : "您的状态与环境相对和谐，有利于目标实现。"
    }\n\n`;

    readingText += `结果展望（${cards[8].name}、${cards[9].name}）：\n`;
    readingText += `您的希望或担忧体现为${cards[8].name}${cards[8].isReversed ? "逆位" : "正位"}，最终可能的结果是${cards[9].name}${cards[9].isReversed ? "逆位" : "正位"}。${
      cards[8].isReversed === cards[9].isReversed
        ? "您的期待与可能的结果有一定关联，心态将影响最终发展。"
        : "实际结果可能与您的预期有所不同，保持开放心态很重要。"
    }\n\n`;

    // 根据问题类别添加具体建议
    readingText += `【综合建议】\n`;
    const finalCard = cards[9];

    if (categoryId === 1) {
      // 事业
      readingText += `在职业发展方面，充分利用${finalCard.isReversed ? "挑战中蕴含的学习机会" : "当前环境提供的有利条件"}，同时注意${cards[5].isReversed ? "潜意识中的自我限制" : "内心深处的真实渴望"}，将帮助您在职业道路上取得更好的成果。`;
    } else if (categoryId === 2) {
      // 情感
      readingText += `在情感关系中，关注${finalCard.isReversed ? "内心需求和自我成长" : "沟通和相互理解"}，同时正视${cards[8].isReversed ? "内心的恐惧和不安" : "对关系的期待和理想"}，将有助于建立更健康和满足的关系。`;
    } else if (categoryId === 3) {
      // 个人成长
      readingText += `在个人成长旅程中，重视${finalCard.isReversed ? "内在和解与自我接纳" : "外在实践与积极行动"}，同时平衡${cards[4].isReversed && cards[5].isReversed ? "意识和潜意识的分歧" : "理性思考与情感需求"}，将促进全面和谐的发展。`;
    } else {
      // 生活选择
      readingText += `在做出决策时，考虑${finalCard.isReversed ? "长远影响和隐藏因素" : "直观感受和明显优势"}，同时评估${cards[7].isReversed ? "外部环境的局限性" : "周围环境提供的支持"}，将有助于做出更明智的选择。`;
    }

    return readingText;
  };

  // 重置
  const resetReading = () => {
    setSelectedSpread(null);
    setDrawnCards([]);
    setReading("");
    setQuestion("");
  };

  // 下载解读结果
  const downloadReading = () => {
    alert("塔罗牌解读已保存为PDF！（模拟功能）");
  };

  return (
    <div
      className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900"
      data-oid="b7g_hl8"
    >
      <div className="container mx-auto px-4" data-oid="2dnbyji">
        <div className="mb-8" data-oid="lmweiu6">
          <Link
            href="/tools"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            data-oid="y7n2-mb"
          >
            <ArrowLeft className="w-4 h-4 mr-2" data-oid="4e6-:th" />
            返回工具页面
          </Link>
        </div>

        <div className="max-w-4xl mx-auto" data-oid="y97n2re">
          <div className="text-center mb-8" data-oid="_gnf46b">
            <h1
              className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
              data-oid="z1cce3p"
            >
              AI塔罗牌解读
            </h1>
            <p
              className="text-lg text-gray-600 dark:text-gray-400"
              data-oid="3abhmwo"
            >
              结合人工智能的现代塔罗牌解读，为您的问题提供指引
            </p>
          </div>

          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8"
            data-oid="mpr21o5"
          >
            {selectedSpread === null ? (
              <>
                <h2
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                  data-oid="ols:ytj"
                >
                  选择牌阵
                </h2>
                <div
                  className="grid md:grid-cols-3 gap-4 mb-6"
                  data-oid="q:-fk5m"
                >
                  {spreads.map((spread) => (
                    <button
                      key={spread.id}
                      onClick={() => selectSpread(spread.id)}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-left hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                      data-oid="m1.970y"
                    >
                      <h3
                        className="font-bold text-gray-900 dark:text-white mb-1"
                        data-oid="xj9..7g"
                      >
                        {spread.name}
                      </h3>
                      <p
                        className="text-sm text-gray-600 dark:text-gray-400"
                        data-oid="9rxhh3w"
                      >
                        {spread.description}
                      </p>
                      <div
                        className="mt-2 text-xs text-gray-500 dark:text-gray-500"
                        data-oid="revot.0"
                      >
                        {spread.cards} 张牌
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex justify-between items-center mb-4"
                  data-oid="m57.o4v"
                >
                  <h2
                    className="text-xl font-bold text-gray-900 dark:text-white"
                    data-oid="-cbdx9j"
                  >
                    {spreads.find((s) => s.id === selectedSpread)?.name}
                  </h2>
                  <button
                    onClick={resetReading}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    data-oid="my2yjtp"
                  >
                    选择其他牌阵
                  </button>
                </div>

                <div className="mb-6" data-oid="yn.4lgs">
                  <label
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                    data-oid="2z0uqth"
                  >
                    选择问题类型
                  </label>
                  <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4"
                    data-oid="t-p8vwt"
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
                        data-oid="p84.noa"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>

                  <label
                    className="block text-gray-700 dark:text-gray-300 mb-2"
                    data-oid="-8jho.b"
                  >
                    输入您想要咨询的具体问题（可选）
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
                    data-oid="c:v1gd:"
                  />
                </div>

                {drawnCards.length === 0 ? (
                  <button
                    onClick={drawCards}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center"
                    data-oid="csxzze2"
                  >
                    <Sparkles className="mr-2 h-5 w-5" data-oid="0d.0c21" />
                    开始塔罗牌解读
                  </button>
                ) : (
                  <div className="mt-6" data-oid=":y91why">
                    <h3
                      className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                      data-oid="phjjga9"
                    >
                      您的塔罗牌
                    </h3>

                    <div
                      className="flex flex-wrap gap-4 justify-center mb-6"
                      data-oid="pww-yrg"
                    >
                      {drawnCards.map((card, index) => (
                        <div
                          key={index}
                          className="text-center"
                          data-oid="p7f9qgd"
                        >
                          <div
                            className={`w-32 h-48 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-2 ${card.isReversed ? "transform rotate-180" : ""}`}
                            data-oid="1f4-a9m"
                          >
                            <span
                              className="text-indigo-600 dark:text-indigo-400 font-semibold"
                              data-oid="7txa45j"
                            >
                              {card.name}
                            </span>
                          </div>
                          <span
                            className="text-sm text-gray-600 dark:text-gray-400"
                            data-oid="t3mo8ns"
                          >
                            {card.name} {card.isReversed ? "(逆位)" : "(正位)"}
                          </span>
                        </div>
                      ))}
                    </div>

                    {isGenerating ? (
                      <div className="text-center py-8" data-oid="ymvgotg">
                        <div
                          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4"
                          data-oid="a-et4mv"
                        >
                          <RefreshCw
                            className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin"
                            data-oid="wps8sq9"
                          />
                        </div>
                        <p
                          className="text-gray-600 dark:text-gray-400"
                          data-oid=":va5t0r"
                        >
                          AI正在解读您的塔罗牌...
                        </p>
                      </div>
                    ) : reading ? (
                      <div
                        className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6"
                        data-oid=":gbq6uh"
                      >
                        <div
                          className="flex justify-between items-center mb-4"
                          data-oid="3w0re-b"
                        >
                          <h3
                            className="text-lg font-semibold text-gray-900 dark:text-white"
                            data-oid="b:kl09:"
                          >
                            塔罗解读结果
                          </h3>
                          {readingTime && (
                            <div
                              className="flex items-center text-sm text-gray-500 dark:text-gray-500"
                              data-oid="-m37xh1"
                            >
                              <Clock
                                className="w-4 h-4 mr-1"
                                data-oid="8d3.ji3"
                              />

                              {readingTime}
                            </div>
                          )}
                        </div>
                        <div
                          className="prose dark:prose-invert max-w-none"
                          data-oid="nt8ysf5"
                        >
                          {reading.split("\n\n").map((paragraph, i) => (
                            <p key={i} data-oid="z1t-2ht">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        <div
                          className="mt-6 flex flex-wrap gap-3"
                          data-oid="5unlps:"
                        >
                          <button
                            onClick={downloadReading}
                            className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                            data-oid="k-f.24x"
                          >
                            <Download
                              className="w-4 h-4 mr-2"
                              data-oid="uyjhhl9"
                            />
                            保存为PDF
                          </button>
                          <button
                            onClick={drawCards}
                            className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/70"
                            data-oid="dcp0olc"
                          >
                            <RefreshCw
                              className="w-4 h-4 mr-2"
                              data-oid="bauthu4"
                            />
                            重新抽牌
                          </button>
                          <button
                            onClick={() =>
                              window.open(
                                "/tools/fortune/tarot/guide",
                                "_blank",
                              )
                            }
                            className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                            data-oid="_iw3quk"
                          >
                            <Book className="w-4 h-4 mr-2" data-oid="64bjijl" />
                            塔罗牌指南
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
            data-oid="l8jdk3v"
          >
            <h2
              className="text-xl font-bold text-gray-900 dark:text-white mb-4"
              data-oid="pmqwai2"
            >
              关于AI塔罗牌解读
            </h2>
            <div
              className="prose dark:prose-invert max-w-none"
              data-oid="knrb:sh"
            >
              <p data-oid="_v64c.q">
                我们的AI塔罗牌解读工具结合了传统塔罗牌的智慧与现代人工智能技术，为您提供个性化的指引和见解。
              </p>

              <div
                className="flex items-center my-4 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg"
                data-oid="e28nzxq"
              >
                <HelpCircle
                  className="w-6 h-6 mr-2 flex-shrink-0"
                  data-oid="p1r8uy-"
                />

                <p className="text-sm m-0" data-oid="kj51.ri">
                  <strong data-oid="jpnzhgi">注意：</strong>{" "}
                  塔罗牌解读仅供娱乐和参考，不应作为专业建议的替代。重要决策仍应基于您自己的判断和专业咨询。
                </p>
              </div>

              <h3 data-oid="u7zw4ma">如何使用</h3>
              <ol data-oid="tap99us">
                <li data-oid="clud9a6">
                  选择一种牌阵（单卡、三卡或凯尔特十字阵）
                </li>
                <li data-oid="la:es6k">选择问题类别并可选择输入您的具体问题</li>
                <li data-oid="0b:eeja">
                  点击"开始塔罗牌解读"，系统将随机抽取适量的塔罗牌
                </li>
                <li data-oid="6jzloy.">
                  AI将基于抽取的牌和您的问题生成个性化解读
                </li>
                <li data-oid="7pd8w9w">您可以将解读保存为PDF或重新抽牌</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
