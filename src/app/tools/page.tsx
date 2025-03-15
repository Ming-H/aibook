"use client";

import React from "react";
import Link from "next/link";
import {
  PenTool,
  ImageIcon,
  VideoIcon,
  Mic,
  Sparkles,
  Moon,
  Star,
  BookOpen,
} from "lucide-react";
import SearchBox from "@/components/search-box"; // 导入SearchBox组件

export default function ToolsPage() {
  return (
    <div
      className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900"
      data-oid="v9di.pi"
    >
      <div className="container mx-auto px-4" data-oid="yvsqvmp">
        <div className="max-w-4xl mx-auto text-center mb-12" data-oid="patllb7">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            data-oid="418i4.:"
          >
            AI工具集合
          </h1>
          <p
            className="text-xl text-gray-600 dark:text-gray-400"
            data-oid="rpvq87d"
          >
            探索我们精选的AI工具，提升创作效率和内容质量
          </p>

          {/* 搜索框 - 使用我们的客户端组件 */}
          <div className="max-w-2xl mx-auto mt-8" data-oid="uel4_o.">
            <SearchBox data-oid="jh1r_3y" />
          </div>
        </div>

        {/* 工具分类 */}
        <div className="grid gap-8 mt-12" data-oid="zdm5ikh">
          {/* 文本处理类工具 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
            data-oid="nuiemgg"
          >
            <div className="flex items-center mb-6" data-oid="nj0mvpn">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4"
                data-oid="la3t.gs"
              >
                <PenTool className="w-6 h-6" data-oid="lr73rx6" />
              </div>
              <h2
                className="text-2xl font-bold text-gray-900 dark:text-white"
                data-oid="ra4x:7q"
              >
                文本处理
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400 mb-6"
              data-oid="hikc6u."
            >
              内容创作、润色和翻译工具
            </p>

            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              data-oid="qmg.06v"
            >
              <Link
                href="/tools/text/article-generator"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="t82qvjp"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="wi5lk9g"
                >
                  AI文章生成
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="0-.qvnu"
                >
                  使用AI快速生成高质量文章内容
                </p>
              </Link>

              <Link
                href="/tools/text/translator"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="q8lo0qn"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="ugchpe8"
                >
                  智能翻译
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="by:ya4g"
                >
                  多语言智能翻译，保留原文语气和风格
                </p>
              </Link>

              <Link
                href="/tools/text/content-polish"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="gmdch3d"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="-l6s2yl"
                >
                  内容润色与改写
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="sdrc.l2"
                >
                  提升文本质量，优化语言表达
                </p>
              </Link>
            </div>
          </div>

          {/* 图像创作类工具 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
            data-oid="p6_u4-1"
          >
            <div className="flex items-center mb-6" data-oid="67zrsay">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4"
                data-oid="r-bj6zu"
              >
                <ImageIcon className="w-6 h-6" data-oid="a755-t0" />
              </div>
              <h2
                className="text-2xl font-bold text-gray-900 dark:text-white"
                data-oid="adej8.c"
              >
                图像创作
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400 mb-6"
              data-oid="da:w-ie"
            >
              AI图像生成和处理工具
            </p>

            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              data-oid="7m16f56"
            >
              <Link
                href="/tools/image/ai-drawing"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="dfsqssp"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="sd3.yxr"
                >
                  AI绘画
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="3zl:gey"
                >
                  通过文字描述生成精美图像
                </p>
              </Link>

              <Link
                href="/tools/image/background-remover"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="9e4b3be"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="x3mi5:p"
                >
                  背景去除
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="o_ep4:z"
                >
                  一键去除图片背景，生成透明图像
                </p>
              </Link>

              <Link
                href="/tools/image/style-transfer"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="ydqbw:x"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="apqt-42"
                >
                  风格迁移
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid=".2e.zux"
                >
                  将照片转化为艺术风格图像
                </p>
              </Link>
            </div>
          </div>

          {/* 视频处理类工具 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
            data-oid="y43ijti"
          >
            <div className="flex items-center mb-6" data-oid="4clphzs">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4"
                data-oid="8ytkgij"
              >
                <VideoIcon className="w-6 h-6" data-oid="6z46p4m" />
              </div>
              <h2
                className="text-2xl font-bold text-gray-900 dark:text-white"
                data-oid="4jk.j6b"
              >
                视频制作
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400 mb-6"
              data-oid="8-1f:k_"
            >
              视频处理与字幕生成工具
            </p>

            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              data-oid="gr9ee21"
            >
              <Link
                href="/tools/video/subtitle-generator"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="uldifpc"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="f6_l_pm"
                >
                  字幕生成器
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="j..61bv"
                >
                  自动从视频中提取并生成字幕
                </p>
              </Link>

              <Link
                href="/tools/video/video-summary"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="4f662m6"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="yvd9k36"
                >
                  视频内容总结
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="t2_25_r"
                >
                  自动生成视频内容的文字摘要
                </p>
              </Link>
            </div>
          </div>

          {/* 音频处理类工具 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
            data-oid="1:s4l2z"
          >
            <div className="flex items-center mb-6" data-oid="btx9mc4">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mr-4"
                data-oid="tyy4a8n"
              >
                <Mic className="w-6 h-6" data-oid=":wf8k__" />
              </div>
              <h2
                className="text-2xl font-bold text-gray-900 dark:text-white"
                data-oid="i17:wek"
              >
                音频处理
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400 mb-6"
              data-oid="_kopp-m"
            >
              语音识别和音频处理工具
            </p>

            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              data-oid=".2-sj64"
            >
              <Link
                href="/tools/speech-to-text"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="ncxvyk8"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid=":dynwtb"
                >
                  语音转文字
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="1x-xn0s"
                >
                  将语音准确转换为文本内容
                </p>
              </Link>

              <Link
                href="/tools/audio/noise-reduction"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="hfrvt80"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="v:omf:q"
                >
                  音频降噪
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="jswow8s"
                >
                  智能去除音频背景噪音，提高清晰度
                </p>
              </Link>
            </div>
          </div>

          {/* AI算卦类工具 - 新增加的部分 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
            data-oid=":-j2mhk"
          >
            <div className="flex items-center mb-6" data-oid="k3qm9rs">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-4"
                data-oid="88r57.2"
              >
                <Sparkles className="w-6 h-6" data-oid="86-g_6e" />
              </div>
              <h2
                className="text-2xl font-bold text-gray-900 dark:text-white"
                data-oid="vopbf5."
              >
                AI算卦
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400 mb-6"
              data-oid="yq_syzh"
            >
              结合AI技术的现代占卜与命理分析工具
            </p>

            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              data-oid="_8eaaer"
            >
              <Link
                href="/tools/fortune/bagua"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="1zoo714"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="mspu79e"
                >
                  八卦预测
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="kqff4_g"
                >
                  结合传统八卦理论与AI分析的现代命理工具
                </p>
              </Link>

              <Link
                href="/tools/fortune/tarot"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="eymvqc9"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="jwx4iyj"
                >
                  塔罗牌解读
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="m-t6yss"
                >
                  AI辅助的塔罗牌阅读与人生指引
                </p>
              </Link>

              <Link
                href="/tools/fortune/astrology"
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                data-oid="ohk8d95"
              >
                <h3
                  className="font-bold text-gray-900 dark:text-white mb-2"
                  data-oid="5qx.0v8"
                >
                  星座分析
                </h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-oid="-gv_.-."
                >
                  基于出生日期的个性特质与运势分析
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
