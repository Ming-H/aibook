"use client";

import { useState } from "react";
import {
  PenTool,
  Loader2,
  Download,
  RefreshCw,
  ZoomIn,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

export default function AIImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [size, setSize] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  // 预设风格选项
  const styleOptions = [
    { id: "realistic", name: "写实风格", description: "逼真的照片级效果" },
    { id: "anime", name: "动漫风格", description: "日式动漫插画效果" },
    { id: "digital-art", name: "数字艺术", description: "现代数字艺术效果" },
    { id: "watercolor", name: "水彩画", description: "柔和的水彩画风格" },
    { id: "oil-painting", name: "油画", description: "经典油画风格" },
    { id: "sketch", name: "素描", description: "手绘素描效果" },
  ];

  // 模拟生成图像的函数
  const generateImage = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    setGeneratedImage("");

    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 模拟返回的图像（使用随机占位图）
    const placeholderImages = [
      "https://source.unsplash.com/random/800x800?landscape",
      "https://source.unsplash.com/random/800x800?portrait",
      "https://source.unsplash.com/random/800x800?abstract",
      "https://source.unsplash.com/random/800x800?nature",
      "https://source.unsplash.com/random/800x800?city",
    ];

    const randomImage =
      placeholderImages[Math.floor(Math.random() * placeholderImages.length)];

    setGeneratedImage(randomImage);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    // 创建一个临时链接用于下载图像
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `ai-image-${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-12 mt-16" data-oid="65xv4bq">
      <div className="container mx-auto px-4" data-oid=":26ddl9">
        <div className="max-w-5xl mx-auto" data-oid="jrpatjh">
          <div className="flex items-center gap-3 mb-6" data-oid="tv0zs:5">
            <div
              className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
              data-oid="d2do4pt"
            >
              <PenTool
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                data-oid="nsfwqpb"
              />
            </div>
            <h1
              className="text-3xl font-bold text-gray-900 dark:text-white"
              data-oid="ztnafof"
            >
              AI图像生成器
            </h1>
          </div>

          <p
            className="text-gray-600 dark:text-gray-400 mb-8 ml-14"
            data-oid="k5qe_x8"
          >
            通过文本描述创建独特的AI图像。输入您想要的场景、风格和细节，AI将为您生成相应的图像。
          </p>

          <div className="grid lg:grid-cols-2 gap-8" data-oid="bmeakm:">
            {/* 输入区域 */}
            <div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
              data-oid="8-toq4x"
            >
              <h2
                className="text-xl font-semibold mb-4 text-gray-900 dark:text-white"
                data-oid="7n3yo:c"
              >
                创建图像
              </h2>

              <div className="space-y-4" data-oid="hjt6:w0">
                <div data-oid="t58.z4b">
                  <label
                    htmlFor="prompt"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    data-oid="0n:6:my"
                  >
                    详细描述 *
                  </label>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="例如：一只金色的柴犬站在一片紫色薰衣草田中，背景是日落，柔和的阳光洒在狗狗毛茸茸的背上"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-32"
                    required
                    data-oid="youqit9"
                  />

                  <p
                    className="mt-1 text-xs text-gray-500 dark:text-gray-400"
                    data-oid="bz7fy.v"
                  >
                    描述越详细，生成的图像质量越高
                  </p>
                </div>

                <div data-oid="n-g70vo">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    data-oid="nwqs08:"
                  >
                    图像风格
                  </label>
                  <div
                    className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                    data-oid="y6_rt:n"
                  >
                    {styleOptions.map((styleOption) => (
                      <div
                        key={styleOption.id}
                        onClick={() => setStyle(styleOption.id)}
                        className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                          style === styleOption.id
                            ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                        }`}
                        data-oid="q54bnad"
                      >
                        <p
                          className="font-medium text-gray-900 dark:text-white text-sm"
                          data-oid="qwktnjl"
                        >
                          {styleOption.name}
                        </p>
                        <p
                          className="text-gray-500 dark:text-gray-400 text-xs mt-1"
                          data-oid="fcbsh9d"
                        >
                          {styleOption.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div data-oid="d-wn38o">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    data-oid="ga4l5-s"
                  >
                    图像比例
                  </label>
                  <div className="flex space-x-2" data-oid="wbaew5t">
                    {[
                      { id: "1:1", label: "正方形 1:1" },
                      { id: "4:3", label: "标准 4:3" },
                      { id: "16:9", label: "宽屏 16:9" },
                      { id: "3:4", label: "竖版 3:4" },
                    ].map((ratio) => (
                      <button
                        key={ratio.id}
                        type="button"
                        onClick={() => setSize(ratio.id)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          size === ratio.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                        data-oid="vuv6w:-"
                      >
                        {ratio.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateImage}
                  disabled={!prompt || isGenerating}
                  className={`w-full mt-4 px-4 py-3 rounded-lg font-medium text-white ${
                    !prompt || isGenerating
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors flex items-center justify-center`}
                  data-oid="c_9r7q."
                >
                  {isGenerating ? (
                    <>
                      <Loader2
                        className="animate-spin mr-2 h-5 w-5"
                        data-oid="e-xu4:k"
                      />
                      生成中...
                    </>
                  ) : (
                    "生成图像"
                  )}
                </button>
              </div>
            </div>

            {/* 输出区域 */}
            <div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
              data-oid="wjb6qke"
            >
              <div
                className="flex items-center justify-between mb-4"
                data-oid="ruiv-rs"
              >
                <h2
                  className="text-xl font-semibold text-gray-900 dark:text-white"
                  data-oid="08__hn2"
                >
                  生成结果
                </h2>

                {generatedImage && (
                  <div className="flex space-x-2" data-oid="p000pbp">
                    <button
                      onClick={() => setPreviewOpen(true)}
                      className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      title="查看大图"
                      data-oid="k1rqumz"
                    >
                      <ZoomIn className="h-5 w-5" data-oid="4.ivxvk" />
                    </button>
                    <button
                      onClick={generateImage}
                      disabled={isGenerating}
                      className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      title="重新生成"
                      data-oid="v7t_3md"
                    >
                      <RefreshCw
                        className={`h-5 w-5 ${isGenerating ? "animate-spin" : ""}`}
                        data-oid="i:-:6jx"
                      />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      title="下载图像"
                      data-oid="btyah.s"
                    >
                      <Download className="h-5 w-5" data-oid="t:48bb0" />
                    </button>
                  </div>
                )}
              </div>

              <div
                className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden aspect-square relative"
                data-oid="8je:yq0"
              >
                {isGenerating ? (
                  <div
                    className="flex flex-col items-center justify-center h-full"
                    data-oid="-9kl752"
                  >
                    <Loader2
                      className="animate-spin h-10 w-10 text-blue-600 dark:text-blue-400 mb-4"
                      data-oid="9zgsi5r"
                    />

                    <p
                      className="text-gray-600 dark:text-gray-400"
                      data-oid="anubofl"
                    >
                      正在生成图像，请稍候...
                    </p>
                    <p
                      className="text-gray-500 dark:text-gray-500 text-sm mt-2"
                      data-oid=".tkl2mx"
                    >
                      这可能需要几秒钟时间
                    </p>
                  </div>
                ) : generatedImage ? (
                  <Image
                    src={generatedImage}
                    alt="AI生成的图像"
                    fill
                    className="object-contain"
                    data-oid="44muy0o"
                  />
                ) : (
                  <div
                    className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400"
                    data-oid="4:p9uwv"
                  >
                    <ImageIcon
                      className="h-16 w-16 mb-4 opacity-20"
                      data-oid="tuos1c_"
                    />

                    <p data-oid="_8tu:7w">生成的图像将显示在这里</p>
                    <p className="text-sm mt-2" data-oid="hoak0mh">
                      请填写描述并点击生成按钮
                    </p>
                  </div>
                )}
              </div>

              {generatedImage && (
                <div className="mt-4" data-oid="64034n:">
                  <p
                    className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                    data-oid="k6-f.wb"
                  >
                    生成提示:
                  </p>
                  <p
                    className="text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-gray-700 dark:text-gray-300"
                    data-oid="hry50bw"
                  >
                    {prompt}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 使用提示 */}
          <div
            className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6"
            data-oid="0he4yeo"
          >
            <h3
              className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4"
              data-oid="ya7u9it"
            >
              图像生成提示
            </h3>
            <ul
              className="space-y-2 text-gray-700 dark:text-gray-300"
              data-oid="obv5:o."
            >
              <li data-oid="-p5qh:k">
                • 尽可能详细描述您想要的图像，包括场景、对象、风格、颜色、光线等
              </li>
              <li data-oid="diremu_">• 试验不同的艺术风格以获得多样化的结果</li>
              <li data-oid="3f4fp.z">
                • 如果结果不满意，尝试调整描述，添加或移除某些细节
              </li>
              <li data-oid="2dejlp1">
                • 基础版每日可生成10张图像，Pro版每日可生成50张图像
              </li>
              <li data-oid="1bid_ok">
                • 生成的图像仅供个人使用，如需商业用途请升级到Pro方案
              </li>
            </ul>
          </div>

          {/* 图像预览模态框 */}
          {previewOpen && generatedImage && (
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setPreviewOpen(false)}
              data-oid="a0n_wt3"
            >
              <div
                className="relative max-w-5xl max-h-[90vh] bg-white dark:bg-gray-800 p-2 rounded-lg overflow-hidden"
                data-oid="hn6_caq"
              >
                <Image
                  src={generatedImage}
                  alt="AI生成的图像"
                  width={1024}
                  height={1024}
                  className="max-h-[85vh] object-contain"
                  data-oid="mkbyk48"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewOpen(false);
                  }}
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white hover:bg-black/70"
                  data-oid="bbm.wab"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid=":uaijoi"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                      data-oid="243w4rv"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                  className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 rounded-full p-2 text-white"
                  data-oid="-zo0h_k"
                >
                  <Download className="h-6 w-6" data-oid="av6asio" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
