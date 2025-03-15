"use client";

import { useState } from "react";
import { FileText, Loader2, Copy, Download, CheckCircle } from "lucide-react";

export default function ArticleGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [length, setLength] = useState("medium");
  const [tone, setTone] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [copied, setCopied] = useState(false);

  // 模拟生成文章的函数
  const generateArticle = async () => {
    if (!topic) return;

    setIsGenerating(true);
    setGeneratedContent("");

    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 模拟生成文章
    const demoContent = `# ${topic}\n\n## 引言\n\n在当今快速发展的科技世界中，${topic}正逐渐成为人们关注的焦点。本文将深入探讨${topic}的各个方面，以及它对未来的潜在影响。\n\n## 1. ${topic}的背景\n\n${topic}并非凭空出现，它有着深厚的历史背景和发展脉络。从最初的概念提出，到如今的广泛应用，${topic}经历了多次重大变革。\n\n## 2. 主要特点\n\n- 创新性: ${topic}带来了前所未有的创新体验\n- 实用性: 解决了传统方法无法解决的多种问题\n- 前瞻性: 为未来发展奠定了坚实基础\n\n## 3. 应用场景\n\n${topic}的应用范围极为广泛，从日常生活到专业领域，都能看到它的身影。尤其在${keywords}等领域，更是发挥了重要作用。\n\n## 结论\n\n综上所述，${topic}不仅代表了当前技术的最高水平，更预示着未来发展的方向。随着研究的深入和应用的拓展，我们有理由相信，${topic}将在未来创造更大的价值。`;

    setGeneratedContent(demoContent);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/\s+/g, "-").toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 mt-16" data-oid="66..vii">
      <div className="container mx-auto px-4" data-oid="d.0o5kg">
        <div className="max-w-5xl mx-auto" data-oid="09vmtnx">
          <div className="flex items-center gap-3 mb-6" data-oid="pl:78ky">
            <div
              className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center"
              data-oid="066janf"
            >
              <FileText
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                data-oid="92_ovna"
              />
            </div>
            <h1
              className="text-3xl font-bold text-gray-900 dark:text-white"
              data-oid="fu8g:m0"
            >
              AI文章生成器
            </h1>
          </div>

          <p
            className="text-gray-600 dark:text-gray-400 mb-8 ml-14"
            data-oid="wz16qxa"
          >
            输入主题和关键词，AI将为您生成高质量的文章内容。可用于博客文章、产品描述、新闻稿等。
          </p>

          <div className="grid md:grid-cols-2 gap-8" data-oid="2lddt9c">
            {/* 输入区域 */}
            <div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
              data-oid="krecxkt"
            >
              <h2
                className="text-xl font-semibold mb-4 text-gray-900 dark:text-white"
                data-oid="uday.9t"
              >
                文章参数
              </h2>

              <div className="space-y-4" data-oid="y_m:7vn">
                <div data-oid="-7n93hn">
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    data-oid="_xros1k"
                  >
                    主题 *
                  </label>
                  <input
                    id="topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="例如：人工智能在医疗领域的应用"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                    data-oid="uch:t1g"
                  />
                </div>

                <div data-oid="n6.a-5p">
                  <label
                    htmlFor="keywords"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    data-oid="xspqazs"
                  >
                    关键词（可选）
                  </label>
                  <input
                    id="keywords"
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="用逗号分隔，例如：医疗诊断,病患监测,数据分析"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    data-oid="bz:qn6r"
                  />
                </div>

                <div data-oid="u:khmp1">
                  <label
                    htmlFor="length"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    data-oid="doouq0g"
                  >
                    文章长度
                  </label>
                  <select
                    id="length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    data-oid="rdmt.qg"
                  >
                    <option value="short" data-oid="dousdmb">
                      短文（300-500字）
                    </option>
                    <option value="medium" data-oid="fiqt7hs">
                      中等（500-800字）
                    </option>
                    <option value="long" data-oid="8xq5kt.">
                      长文（800-1200字）
                    </option>
                    <option value="verylong" data-oid="txte7uv">
                      深度文章（1200字以上）
                    </option>
                  </select>
                </div>

                <div data-oid="aeykqje">
                  <label
                    htmlFor="tone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    data-oid="37cb5l:"
                  >
                    写作风格
                  </label>
                  <select
                    id="tone"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    data-oid="c97ctc-"
                  >
                    <option value="professional" data-oid="qmi4_je">
                      专业
                    </option>
                    <option value="casual" data-oid="y-qq.av">
                      轻松随意
                    </option>
                    <option value="humorous" data-oid="vs:z80w">
                      幽默
                    </option>
                    <option value="formal" data-oid="7s9tmud">
                      正式
                    </option>
                    <option value="informative" data-oid="hqnrm::">
                      信息丰富
                    </option>
                  </select>
                </div>

                <button
                  onClick={generateArticle}
                  disabled={!topic || isGenerating}
                  className={`w-full mt-4 px-4 py-3 rounded-lg font-medium text-white ${!topic || isGenerating ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"} transition-colors flex items-center justify-center`}
                  data-oid="rcxdpt2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2
                        className="animate-spin mr-2 h-5 w-5"
                        data-oid="vs2:f.f"
                      />
                      生成中...
                    </>
                  ) : (
                    "生成文章"
                  )}
                </button>
              </div>
            </div>

            {/* 输出区域 */}
            <div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
              data-oid="lre.apk"
            >
              <div
                className="flex items-center justify-between mb-4"
                data-oid="oiqj6pv"
              >
                <h2
                  className="text-xl font-semibold text-gray-900 dark:text-white"
                  data-oid="swnogsc"
                >
                  生成结果
                </h2>

                {generatedContent && (
                  <div className="flex space-x-2" data-oid="7ie4rqy">
                    <button
                      onClick={handleCopy}
                      className="p-2 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                      title="复制到剪贴板"
                      data-oid="0hc3.pr"
                    >
                      {copied ? (
                        <CheckCircle className="h-5 w-5" data-oid="5vla.v7" />
                      ) : (
                        <Copy className="h-5 w-5" data-oid="t58u4lc" />
                      )}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-2 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                      title="下载为Markdown文件"
                      data-oid="bc7qkwn"
                    >
                      <Download className="h-5 w-5" data-oid="folnjm_" />
                    </button>
                  </div>
                )}
              </div>

              {isGenerating ? (
                <div
                  className="flex flex-col items-center justify-center h-64"
                  data-oid="w9wzv5d"
                >
                  <Loader2
                    className="animate-spin h-10 w-10 text-purple-600 dark:text-purple-400 mb-4"
                    data-oid=":15r_du"
                  />

                  <p
                    className="text-gray-600 dark:text-gray-400"
                    data-oid="ja1j9u:"
                  >
                    正在生成文章，请稍候...
                  </p>
                </div>
              ) : generatedContent ? (
                <div
                  className="h-96 overflow-y-auto prose dark:prose-invert max-w-none"
                  data-oid="3p2z7em"
                >
                  <pre
                    className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-sans text-sm"
                    data-oid="x0jo5-e"
                  >
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400"
                  data-oid="mihmxxq"
                >
                  <FileText
                    className="h-12 w-12 mb-4 opacity-20"
                    data-oid="r5akh9z"
                  />

                  <p data-oid="vfie1al">文章内容将显示在这里</p>
                  <p className="text-sm mt-2" data-oid="77.8oby">
                    请填写主题并点击生成按钮
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 使用提示 */}
          <div
            className="mt-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6"
            data-oid="651.8b4"
          >
            <h3
              className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4"
              data-oid="pspfltc"
            >
              使用提示
            </h3>
            <ul
              className="space-y-2 text-gray-700 dark:text-gray-300"
              data-oid="g:r_65m"
            >
              <li data-oid="_0v.sd:">
                • 提供具体的主题，可以获得更加精准的文章内容
              </li>
              <li data-oid="i291223">
                • 添加关键词可以帮助AI更好地理解您想要的内容方向
              </li>
              <li data-oid="qprq3js">• 生成后的内容可以进一步编辑和调整</li>
              <li data-oid="1q7dsse">• 基础版每日可生成5篇文章，Pro版无限制</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
