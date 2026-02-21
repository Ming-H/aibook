/**
 * 创意工坊首页 - AI 图片生成工具
 * 基于 ModelScope API 的图片生成功能
 */

'use client';

import { useState } from 'react';
import { Select } from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { AVAILABLE_MODELS, type ModelId } from '@/lib/modelscope-api';

interface GeneratedImage {
  url: string;
  taskId: string;
  model?: string;
  prompt?: string;
}

const STYLE_OPTIONS = [
  { value: 'landscape', label: '🎨 自然风景', description: '风景画风格' },
  { value: 'portrait', label: '📷 人像摄影', description: '专业人像摄影' },
  { value: 'cartoon', label: '🎭 卡通风格', description: '可爱卡通插画' },
  { value: 'cyberpunk', label: '🌆 赛博朋克', description: '未来科技感' },
  { value: 'watercolor', label: '💧 水彩画', description: '柔和水彩风格' },
  { value: 'render3d', label: '🎮 3D 渲染', description: '高质量3D渲染' },
];

const PROMPT_TEMPLATES: Record<string, string> = {
  landscape: 'A stunning landscape painting of',
  portrait: 'A beautiful portrait of',
  cartoon: 'A cute cartoon illustration of',
  cyberpunk: 'A cyberpunk style image of',
  watercolor: 'A watercolor painting of',
  render3d: 'A 3D render of',
};

export default function CreativeWorkshopPage() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('landscape');
  const [selectedModel, setSelectedModel] = useState<ModelId>(AVAILABLE_MODELS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入描述内容');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // 使用模板构建完整的提示词
      const template = PROMPT_TEMPLATES[selectedStyle];
      const fullPrompt = `${template} ${prompt}`.trim();

      // 第一步：创建任务
      const createResponse = await fetch('/api/image/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          model: selectedModel,
        }),
      });

      if (!createResponse.ok) {
        let errorMessage = '生成失败，请稍后重试';
        try {
          const data = await createResponse.json();
          errorMessage = data.details || data.error || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }

      const createData = await createResponse.json();
      const taskId = createData.taskId;

      // 第二步：客户端轮询任务状态
      const pollInterval = 3000; // 3秒轮询一次
      const maxPollAttempts = 120; // 最多轮询 120 次（6分钟）
      let attempts = 0;

      while (attempts < maxPollAttempts) {
        const statusResponse = await fetch(`/api/image/status/${taskId}`);

        if (!statusResponse.ok) {
          let errorDetails = '查询任务状态失败';
          try {
            const errorData = await statusResponse.json();
            errorDetails = errorData.details || errorData.error || errorDetails;
          } catch {}
          throw new Error(`${errorDetails} (HTTP ${statusResponse.status})`);
        }

        const statusData = await statusResponse.json();

        if (statusData.status === 'SUCCEED') {
          if (!statusData.outputImages || statusData.outputImages.length === 0) {
            throw new Error('任务完成但没有返回图片');
          }

          setGeneratedImages([{
            url: statusData.outputImages[0],
            taskId: statusData.taskId,
            model: selectedModel,
            prompt: fullPrompt,
          }, ...generatedImages]);
          return;
        }

        if (statusData.status === 'FAILED') {
          throw new Error(statusData.error || '图片生成失败');
        }

        // 任务仍在进行中（PENDING 或 RUNNING），等待后继续轮询
        attempts++;
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }

      throw new Error('图片生成超时，请稍后重试');
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `creative-workshop-${Date.now()}-${index}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 获取当前选中的模型信息
  const currentModel = AVAILABLE_MODELS.find(m => m.id === selectedModel);

  return (
    <div className="page-surface">

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] surface-soft px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                基于 ModelScope AI
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--text-primary)]">
              创意工坊
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              AI 驱动的图片生成工具
            </p>
            <p className="mt-6 text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              用 AI 创造无限可能，将你的想象力转化为精美的图像。
            </p>
          </div>
        </div>
      </section>

      {/* 生成器界面 */}
      <section className="max-w-6xl mx-auto px-6 pb-24 sm:px-8 lg:px-12">
        <div className="card p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-[var(--text-primary)]">
            开始创作
          </h2>

          {/* 输入区域 */}
          <div className="space-y-6">
            {/* 模型选择 */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                选择 AI 模型
                <span className="ml-2 text-xs text-[var(--text-muted)]">(官方模型，稳定可靠)</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {AVAILABLE_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`
                      px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left relative
                      ${selectedModel === model.id
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] shadow-md'
                        : 'border-[var(--border-default)] hover:border-[var(--border-strong)] bg-[var(--background-secondary)]'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`font-semibold text-sm ${
                            selectedModel === model.id ? 'text-[var(--color-accent)]' : 'text-[var(--text-primary)]'
                          }`}>
                            {model.name}
                          </div>
                          {model.recommended && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-medium">
                              推荐
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">
                          {model.description}
                        </div>
                      </div>
                      {selectedModel === model.id && (
                        <div className="w-5 h-5 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0 ml-2">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                💡 所有模型均来自通义实验室/Qwen团队官方，稳定可靠
              </p>
            </div>

            {/* 风格选择 */}
            <Select
              label="选择风格"
              options={STYLE_OPTIONS}
              value={selectedStyle}
              onChange={setSelectedStyle}
              placeholder="选择图片风格"
            />

            {/* 提示词输入 */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                描述你想要生成的内容
                <span className="text-[var(--color-red)] ml-1">*</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：一只可爱的小猫、未来的城市景观、山水风景..."
                rows={4}
                className="w-full px-6 py-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--color-brand)]/20 outline-none transition-all resize-none"
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-red)]/10 border border-[var(--color-red)]/20 text-[var(--color-red)]">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* 生成按钮 */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="btn-primary w-full px-8 py-4 text-base flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>生成中...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>开始生成</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 生成的图片展示 */}
        {generatedImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-[var(--text-primary)]">
              生成结果
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {generatedImages.map((image, index) => {
                const modelInfo = image.model ? AVAILABLE_MODELS.find(m => m.id === image.model) : null;
                return (
                  <div
                    key={image.taskId}
                    className="card overflow-hidden group animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative aspect-square bg-[var(--background-secondary)]">
                      <img
                        src={image.url}
                        alt={`Generated ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* 模型标签 */}
                      {modelInfo && (
                        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full surface-soft text-xs font-semibold text-[var(--text-primary)]">
                          {modelInfo.name}
                        </div>
                      )}
                      {/* 悬停遮罩 */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => handleDownload(image.url, index)}
                          className="btn-primary px-6 py-2 text-sm"
                        >
                          下载图片
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-[var(--text-primary)]">
            核心功能
          </h2>
          <p className="text-[var(--text-secondary)]">
            强大的 AI，简单的操作
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '🎨',
              title: '多种风格',
              desc: '支持风景、人像、卡通、赛博朋克等多种艺术风格',
              gradient: 'var(--gradient-primary)',
            },
            {
              icon: '⚡',
              title: '快速生成',
              desc: '基于 ModelScope 高性能 AI 模型，快速生成高质量图片',
              gradient: 'var(--gradient-neon-purple)',
            },
            {
              icon: '💾',
              title: '一键下载',
              desc: '生成的图片可直接下载保存，方便分享和使用',
              gradient: 'var(--gradient-neon-blue)',
            },
            {
              icon: '🆓',
              title: '免费使用',
              desc: '使用魔搭免费 API，无限制创作',
              gradient: 'var(--gradient-neon-pink)',
            },
            {
              icon: '🎯',
              title: '智能优化',
              desc: '自动优化提示词，提升生成质量',
              gradient: 'var(--gradient-neon-green)',
            },
            {
              icon: '🔄',
              title: '持续创作',
              desc: '支持连续生成，不断探索创意',
              gradient: 'var(--gradient-gold)',
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="card p-8"
            >
              <div
                className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform"
                style={{ background: feature.gradient }}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">
                {feature.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
