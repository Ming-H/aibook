"use client";

import { useState, useRef } from "react";
import {
  Download,
  Copy,
  Image,
  Sparkles,
  Info,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AIDrawingPage() {
  // 状态管理
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [stylePreset, setStylePreset] = useState("photographic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const downloadRef = useRef(null);

  // 风格预设列表
  const stylePresets = [
    { id: "photographic", name: "摄影风格", description: "逼真的摄影效果" },
    { id: "digital-art", name: "数字艺术", description: "现代数字艺术风格" },
    { id: "anime", name: "动漫风格", description: "日本动漫插画风格" },
    { id: "cinematic", name: "电影风格", description: "电影场景效果" },
    { id: "fantasy", name: "奇幻风格", description: "奇幻世界艺术" },
    { id: "oil-painting", name: "油画风格", description: "传统油画效果" },
    { id: "watercolor", name: "水彩风格", description: "水彩画效果" },
    { id: "pixel-art", name: "像素艺术", description: "复古像素游戏风格" },
  ];

  // 纵横比选项
  const aspectRatios = [
    { id: "1:1", name: "正方形", width: 512, height: 512 },
    { id: "4:3", name: "横向", width: 640, height: 480 },
    { id: "3:4", name: "纵向", width: 480, height: 640 },
    { id: "16:9", name: "宽屏", width: 640, height: 360 },
    { id: "9:16", name: "手机", width: 360, height: 640 },
  ];

  // 示例提示词
  const examplePrompts = [
    "一只可爱的柴犬正在看星空，数字艺术风格",
    "一座位于瑞士山脉中的未来风格城市，黄昏时分，细节丰富",
    "一个令人惊叹的水下古代城市遗迹，有珊瑚和热带鱼，阳光穿透水面",
    "一个身着传统服装的女孩在樱花树下，水彩风格",
  ];

  // 清除内容
  const handleClear = () => {
    setPrompt("");
    setNegativePrompt("");
    setStylePreset("photographic");
    setAspectRatio("1:1");
    setGeneratedImage("");
    setError("");
  };

  // 复制图像链接
  const handleCopy = () => {
    if (generatedImage) {
      navigator.clipboard.writeText(generatedImage);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // 下载图像
  const handleDownload = () => {
    if (generatedImage && downloadRef.current) {
      downloadRef.current.click();
    }
  };

  // 选择示例提示词
  const selectExample = (example) => {
    setPrompt(example);
  };

  // 生成图像
  const generateImage = async () => {
    if (!prompt) {
      setError("请输入描述文字");
      return;
    }

    setIsGenerating(true);
    setError("");
    setGeneratedImage("");

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 当前环境无法真实调用API，使用模拟图片
      // 真实情况下，这里应该调用AI图像生成API
      const demoImages = [
        "/images/ai-drawing-demo-1.jpg",
        "/images/ai-drawing-demo-2.jpg",
        "/images/ai-drawing-demo-3.jpg",
        "/images/ai-drawing-demo-4.jpg",
      ];

      // 模拟生成的图片（在实际应用中，应替换为真实API返回的URL）
      const mockImage = demoImages[generationCount % demoImages.length];
      setGeneratedImage(mockImage);
      setGenerationCount((prev) => prev + 1);
    } catch (err) {
      setError("图像生成失败，请稍后再试");
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // 获取所选纵横比的宽高
  const getSelectedAspectRatio = () => {
    return aspectRatios.find((ratio) => ratio.id === aspectRatio);
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-oid="7sac1uk"
    >
      <div className="mb-8" data-oid="4tpk.hm">
        <h1 className="text-3xl font-bold mb-2" data-oid="2q3:_j0">
          AI智能绘画
        </h1>
        <p className="text-gray-600 dark:text-gray-300" data-oid="u_bfd5t">
          通过文字描述生成精美图像，让您的创意立即可视化
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6" data-oid="-rpq.3v">
        {/* 控制面板 */}
        <div className="w-full xl:w-1/2 space-y-6" data-oid=".-83uvv">
          {/* 主提示输入 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            data-oid="jrvdaat"
          >
            <label
              htmlFor="prompt"
              className="block text-sm font-medium mb-2"
              data-oid="npotxzu"
            >
              描述您想要的图像{" "}
              <span className="text-red-500" data-oid="g42dao8">
                *
              </span>
            </label>
            <textarea
              id="prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如：一只可爱的柴犬正在看星空，数字艺术风格"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              data-oid="7wg.5x1"
            />

            <div className="mt-2" data-oid="0ol:dlw">
              <p
                className="text-sm text-gray-500 dark:text-gray-400 flex items-center"
                data-oid="9dsju3e"
              >
                <Info className="h-4 w-4 mr-1" data-oid="n3o2uat" />
                描述越详细，生成的图像效果越好
              </p>
            </div>

            {/* 示例提示词 */}
            <div className="mt-4" data-oid="f7_-u59">
              <p className="text-sm font-medium mb-2" data-oid="e._rslq">
                示例：
              </p>
              <div className="flex flex-wrap gap-2" data-oid="c9fppl.">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => selectExample(example)}
                    className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
                    data-oid="cy6r10l"
                  >
                    {example.length > 25
                      ? example.substring(0, 25) + "..."
                      : example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 样式和尺寸选项 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            data-oid="2akdwjt"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-oid="on:edkf"
            >
              {/* 风格选择 */}
              <div data-oid="itq8xey">
                <label
                  htmlFor="style"
                  className="block text-sm font-medium mb-2"
                  data-oid="ndimx6z"
                >
                  图像风格
                </label>
                <select
                  id="style"
                  value={stylePreset}
                  onChange={(e) => setStylePreset(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  data-oid="7ht-m7y"
                >
                  {stylePresets.map((style) => (
                    <option key={style.id} value={style.id} data-oid="yjugzj2">
                      {style.name}
                    </option>
                  ))}
                </select>
                {stylePreset && (
                  <p
                    className="mt-1 text-xs text-gray-500 dark:text-gray-400"
                    data-oid="0jrqv6s"
                  >
                    {
                      stylePresets.find((s) => s.id === stylePreset)
                        ?.description
                    }
                  </p>
                )}
              </div>

              {/* 纵横比选择 */}
              <div data-oid="4mu1vsq">
                <label
                  className="block text-sm font-medium mb-2"
                  data-oid="z2xh:y6"
                >
                  图像比例
                </label>
                <div className="grid grid-cols-5 gap-2" data-oid="chjh2e-">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.id}
                      type="button"
                      onClick={() => setAspectRatio(ratio.id)}
                      className={`flex flex-col items-center justify-center p-2 border rounded ${
                        aspectRatio === ratio.id
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                          : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      data-oid="x-gafg4"
                    >
                      <div
                        className="bg-gray-200 dark:bg-gray-600"
                        style={{
                          width: `${ratio.width / 10}px`,
                          height: `${ratio.height / 10}px`,
                          maxWidth: "40px",
                          maxHeight: "40px",
                          minWidth: "20px",
                          minHeight: "20px",
                        }}
                        data-oid="sj2ajcc"
                      ></div>
                      <span className="text-xs mt-1" data-oid="m6-2opz">
                        {ratio.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 高级选项 */}
            <div className="mt-6" data-oid="20:gykw">
              <button
                type="button"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400"
                data-oid="-szy:0o"
              >
                <ArrowRight
                  className={`h-4 w-4 mr-1 transition-transform ${isAdvancedOpen ? "rotate-90" : ""}`}
                  data-oid="j9mvbkt"
                />
                高级选项
              </button>

              {isAdvancedOpen && (
                <div className="mt-4 space-y-4" data-oid="f2r_dhd">
                  <div data-oid="b4i8thz">
                    <label
                      htmlFor="negative-prompt"
                      className="block text-sm font-medium mb-2"
                      data-oid=".0_qgze"
                    >
                      负面提示 (不希望出现的元素)
                    </label>
                    <input
                      type="text"
                      id="negative-prompt"
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder="例如：模糊, 扭曲, 低质量"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      data-oid="w6.vk-b"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex space-x-4" data-oid="3qrc_aw">
            <button
              type="button"
              onClick={generateImage}
              disabled={isGenerating}
              className={`flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isGenerating ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
              data-oid="9ayp5z0"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    data-oid="51wqr82"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      data-oid="szpxono"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      data-oid="rvjx.aw"
                    ></path>
                  </svg>
                  正在生成...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" data-oid="zpfpx8r" />
                  生成图像
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              data-oid="wjmvya-"
            >
              清除
            </button>
          </div>

          {/* 非会员提示 */}
          <div
            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4"
            data-oid="2r2vb-l"
          >
            <div className="flex" data-oid="yw0fl0:">
              <div className="flex-shrink-0" data-oid="l2hw116">
                <AlertCircle
                  className="h-5 w-5 text-yellow-400"
                  data-oid="udzhcnq"
                />
              </div>
              <div className="ml-3" data-oid="6x5-9ve">
                <h3
                  className="text-sm font-medium text-yellow-800 dark:text-yellow-300"
                  data-oid="o06xftc"
                >
                  免费版限制
                </h3>
                <div
                  className="mt-2 text-sm text-yellow-700 dark:text-yellow-200"
                  data-oid="l4az:-c"
                >
                  <p data-oid="r9v3n1n">
                    免费用户每天可生成5张图像。升级到
                    <Link
                      href="/pricing"
                      className="font-medium underline hover:text-yellow-800 dark:hover:text-yellow-100"
                      data-oid="lfwnqgd"
                    >
                      Pro版
                    </Link>
                    获取无限生成次数和更高质量的图像。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 预览区域 */}
        <div className="w-full xl:w-1/2" data-oid="6m-zrsn">
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full"
            data-oid="aavyx57"
          >
            <div
              className="flex items-center justify-between mb-4"
              data-oid="xvec_qw"
            >
              <h2 className="text-lg font-medium" data-oid="vi-rvp4">
                生成结果
              </h2>

              {generatedImage && (
                <div className="flex space-x-2" data-oid="sw46zm0">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    data-oid="l8w9jhy"
                  >
                    <Copy className="h-4 w-4 mr-1" data-oid="m0e1iec" />
                    {isCopied ? "已复制" : "复制"}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    data-oid="watzxz."
                  >
                    <Download className="h-4 w-4 mr-1" data-oid="xfljz:p" />
                    下载
                  </button>
                  {/* 隐藏的下载链接 */}
                  <a
                    ref={downloadRef}
                    href={generatedImage}
                    download={`ai-drawing-${Date.now()}.jpg`}
                    className="hidden"
                    data-oid="joq593m"
                  >
                    下载
                  </a>
                </div>
              )}
            </div>

            {error && (
              <div
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-md p-4 mb-4"
                data-oid="qdheg:s"
              >
                <div className="flex" data-oid="l6nqci3">
                  <div className="flex-shrink-0" data-oid="7z4912n">
                    <AlertCircle
                      className="h-5 w-5 text-red-400"
                      data-oid="gse_4ox"
                    />
                  </div>
                  <div className="ml-3" data-oid="xhwnl2z">
                    <p
                      className="text-sm text-red-700 dark:text-red-300"
                      data-oid="hij6y00"
                    >
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`h-80 flex items-center justify-center border-2 border-dashed rounded-lg ${generatedImage ? "border-transparent" : "border-gray-300 dark:border-gray-600"}`}
              data-oid="tx54-2i"
            >
              {generatedImage ? (
                <img
                  src={generatedImage}
                  alt="AI生成的图像"
                  className="max-w-full max-h-full object-contain rounded-lg"
                  data-oid="8etfxzt"
                />
              ) : isGenerating ? (
                <div className="text-center" data-oid="mkij1y:">
                  <svg
                    className="animate-spin mx-auto h-10 w-10 text-purple-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    data-oid="_snj.f8"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      data-oid="h13h8_k"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      data-oid="38x4326"
                    ></path>
                  </svg>
                  <p
                    className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    data-oid="tz:q5.3"
                  >
                    正在生成您的图像...
                  </p>
                </div>
              ) : (
                <div className="text-center" data-oid="q-13nm2">
                  <Image
                    className="mx-auto h-12 w-12 text-gray-400"
                    data-oid="2uvl:ia"
                  />

                  <p
                    className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                    data-oid=".plo61d"
                  >
                    输入描述并点击"生成图像"按钮
                  </p>
                </div>
              )}
            </div>

            {/* 图像信息 */}
            {generatedImage && (
              <div className="mt-4" data-oid="-obum1z">
                <div className="flex flex-wrap gap-2" data-oid="0r1mhll">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                    data-oid="fmoxnq6"
                  >
                    {stylePresets.find((s) => s.id === stylePreset)?.name}
                  </span>
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                    data-oid=".mdg_ax"
                  >
                    {getSelectedAspectRatio()?.name} (
                    {getSelectedAspectRatio()?.width} x{" "}
                    {getSelectedAspectRatio()?.height})
                  </span>
                </div>

                <p
                  className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
                  data-oid="auv4_1-"
                >
                  <span className="font-medium" data-oid="c66xtln">
                    描述：
                  </span>{" "}
                  {prompt}
                </p>
              </div>
            )}
          </div>

          {/* 使用指南 */}
          <div
            className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            data-oid="0jcwf3r"
          >
            <h3 className="text-lg font-medium mb-4" data-oid="0f1gh9v">
              绘画指南
            </h3>

            <div className="space-y-4" data-oid="fh1f02s">
              <div data-oid="ybzwghi">
                <h4 className="text-sm font-medium mb-1" data-oid="ayesqp2">
                  🎨 提示词技巧
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-300"
                  data-oid="n.ybrxk"
                >
                  提示词越详细，生成的图像越符合您的期望。尝试描述：主体、环境、光线、风格、情绪等。
                </p>
              </div>

              <div data-oid="kif4fhs">
                <h4 className="text-sm font-medium mb-1" data-oid="dac5c9u">
                  💡 风格指导
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-300"
                  data-oid="zpryfgg"
                >
                  选择不同的风格预设可以显著改变图像的视觉效果。尝试同一描述下的不同风格，找到您喜欢的效果。
                </p>
              </div>

              <div data-oid="-2b:nl0">
                <h4 className="text-sm font-medium mb-1" data-oid="-dwycsg">
                  ⚠️ 负面提示
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-300"
                  data-oid="81p8f4-"
                >
                  利用负面提示排除您不希望出现的元素，例如："模糊, 畸变, 低质量,
                  多余的肢体"等。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
