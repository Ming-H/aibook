"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, Sparkles } from "lucide-react";

// 模拟搜索结果
const mockTools = [
  {
    id: 1,
    name: "AI文章生成器",
    description: "使用先进的AI模型生成高质量文章，支持多种内容风格",
    category: "text",
    path: "/tools/text/article-generator",
    tags: ["文章生成", "AI写作", "内容创作"],
  },
  {
    id: 2,
    name: "AI绘画工具",
    description: "通过文本描述生成精美图像，支持多种艺术风格和调整选项",
    category: "image",
    path: "/tools/image/ai-drawing",
    tags: ["AI绘画", "图像生成", "创意设计"],
  },
  {
    id: 3,
    name: "语音转文字",
    description: "将音频自动转换为文字，支持多种语言和高精度识别",
    category: "audio",
    path: "/tools/speech-to-text",
    tags: ["语音转文字", "音频处理", "转录"],
  },
  {
    id: 4,
    name: "多语言翻译",
    description: "智能翻译工具，支持全球40多种语言，准确传达原文含义",
    category: "text",
    path: "/tools/text/translator",
    tags: ["翻译", "多语言", "国际化"],
  },
  {
    id: 5,
    name: "视频字幕生成",
    description: "自动为视频生成精准字幕，支持多种语言和格式导出",
    category: "video",
    path: "/tools/video/subtitle-generator",
    tags: ["字幕生成", "视频处理", "内容制作"],
  },
];

// 分类颜色映射
const categoryColors = {
  text: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
  },
  image: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
  },
  video: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
  },
  audio: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-600 dark:text-amber-400",
  },
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<typeof mockTools>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟搜索API调用
    setIsLoading(true);

    setTimeout(() => {
      if (query) {
        const lowercaseQuery = query.toLowerCase();
        const filteredResults = mockTools.filter(
          (tool) =>
            tool.name.toLowerCase().includes(lowercaseQuery) ||
            tool.description.toLowerCase().includes(lowercaseQuery) ||
            tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
        );
        setResults(filteredResults);
      } else {
        setResults([]);
      }
      setIsLoading(false);
    }, 500); // 模拟网络延迟
  }, [query]);

  return (
    <div
      className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900"
      data-oid="b1tl:7p"
    >
      <div className="container mx-auto px-4" data-oid="9brdydx">
        <div className="mb-8" data-oid="hvafxw8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            data-oid="2apmdps"
          >
            <ArrowLeft className="w-4 h-4 mr-2" data-oid="gvd0-z0" />
            返回首页
          </Link>
        </div>

        <div className="mb-8" data-oid="-:k.b2k">
          <h1
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2"
            data-oid="fpb:px8"
          >
            搜索结果:{" "}
            <span
              className="text-blue-600 dark:text-blue-400"
              data-oid="t9sepq9"
            >
              &ldquo;{query}&rdquo;
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400" data-oid="mq.kul5">
            {isLoading
              ? "正在搜索中..."
              : results.length > 0
                ? `找到 ${results.length} 个相关工具`
                : "未找到相关工具，请尝试其他关键词"}
          </p>
        </div>

        {/* 搜索结果列表 */}
        {isLoading ? (
          <div className="flex justify-center py-12" data-oid="tjp5qw8">
            <div
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
              data-oid="cve94ts"
            ></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6" data-oid="hxgetgq">
            {results.map((tool) => (
              <Link
                key={tool.id}
                href={tool.path}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="--fthbk"
              >
                <div className="flex items-start mb-4" data-oid="7vy2exq">
                  <div
                    className={`${categoryColors[tool.category as keyof typeof categoryColors].bg} p-2 rounded-lg mr-4`}
                    data-oid="tqa6cug"
                  >
                    <Sparkles
                      className={`w-6 h-6 ${categoryColors[tool.category as keyof typeof categoryColors].text}`}
                      data-oid="0v3p9bt"
                    />
                  </div>
                  <div data-oid="ycj5a-y">
                    <h3
                      className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                      data-oid="-8a::hi"
                    >
                      {tool.name}
                    </h3>
                    <p
                      className="text-gray-600 dark:text-gray-400 mt-1"
                      data-oid="uopdf44"
                    >
                      {tool.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2" data-oid="wkpv0wh">
                  {tool.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      data-oid="fn3vz3t"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16" data-oid="l04zyno">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-6"
              data-oid="r33cto9"
            >
              <Search className="w-10 h-10 text-gray-400" data-oid="d4i9ud0" />
            </div>
            <h3
              className="text-xl font-bold text-gray-900 dark:text-white mb-2"
              data-oid="0c-h5uk"
            >
              未找到相关工具
            </h3>
            <p
              className="text-gray-600 dark:text-gray-400 max-w-md mx-auto"
              data-oid="bhwfhc2"
            >
              尝试使用不同的关键词，或浏览我们的
              <Link
                href="/tools"
                className="text-blue-600 dark:text-blue-400 hover:underline mx-1"
                data-oid="j338ppd"
              >
                工具导航
              </Link>
              页面查看所有可用工具。
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
