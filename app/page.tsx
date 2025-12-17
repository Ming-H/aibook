"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-12 px-4 py-16 text-center">
      {/* 主标题 */}
      <div className="space-y-6">
        <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-6xl font-bold text-transparent md:text-7xl lg:text-8xl">
          AI Book
        </h1>
        <h2 className="text-3xl font-semibold text-slate-200 md:text-4xl lg:text-5xl">
          一站式机器学习平台
        </h2>
        <p className="mx-auto max-w-3xl text-xl text-slate-400 md:text-2xl">
          无需编程，通过可视化拖拽工作流，完成从数据上传到模型训练再到报告生成的完整机器学习流程
        </p>
      </div>

      {/* 核心特性 */}
      <div className="grid w-full max-w-5xl gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
          <div className="mb-4 text-4xl">📊</div>
          <h3 className="mb-2 text-xl font-semibold text-slate-100">数据上传</h3>
          <p className="text-slate-400">支持 CSV 格式，自动识别数据类型</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
          <div className="mb-4 text-4xl">🔧</div>
          <h3 className="mb-2 text-xl font-semibold text-slate-100">可视化工作流</h3>
          <p className="text-slate-400">拖拽式配置，直观易懂</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
          <div className="mb-4 text-4xl">🚀</div>
          <h3 className="mb-2 text-xl font-semibold text-slate-100">自动训练</h3>
          <p className="text-slate-400">多种算法可选，一键生成报告</p>
        </div>
      </div>

      {/* CTA 按钮 */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/workflow">
          <Button size="lg" className="px-8 py-4 text-lg">
            开始使用工作流
          </Button>
        </Link>
        <Link href="/experiments">
          <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
            查看实验历史
          </Button>
        </Link>
      </div>

      {/* 使用说明 */}
      <div className="mt-8 max-w-2xl space-y-4 text-left">
        <h3 className="text-center text-2xl font-semibold text-slate-200">如何使用</h3>
        <div className="space-y-3 text-slate-400">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-400">
              1
            </span>
            <p>点击"开始使用工作流"进入可视化工作流编辑器</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-400">
              2
            </span>
            <p>从左侧功能栏拖拽模块到右侧画布</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-400">
              3
            </span>
            <p>通过连线配置模块之间的数据流</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-400">
              4
            </span>
            <p>点击运行按钮执行完整工作流</p>
          </div>
        </div>
      </div>
    </div>
  );
}
