/**
 * 图片工具箱 - 图片转换工具
 * 支持尺寸调整、比例裁剪、格式转换、质量控制
 */

'use client';

import { useState, useRef } from 'react';
import { Select } from '@/components/ui/Select';

interface ConversionSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  aspectRatio: string;
  outputFormat: 'png' | 'jpeg' | 'webp';
  quality: number;
}

interface ProcessedImage {
  id: string;
  originalUrl: string;
  processedUrl: string;
  originalName: string;
  originalSize: { width: number; height: number };
  processedSize: { width: number; height: number };
  originalFormat: string;
  outputFormat: string;
  fileSize: string;
}

const ASPECT_RATIO_OPTIONS = [
  { value: 'original', label: '📐 原始比例', description: '保持原始图片比例' },
  { value: '1:1', label: '⬜ 正方形 (1:1)', description: '适合社交媒体头像' },
  { value: '16:9', label: '🖥️ 宽屏 (16:9)', description: '适合视频缩略图' },
  { value: '4:3', label: '📺 传统 (4:3)', description: '适合传统显示' },
  { value: '9:16', label: '📱 竖屏 (9:16)', description: '适合手机壁纸' },
  { value: '3:4', label: '📱 竖版 (3:4)', description: '适合社交媒体' },
];

const FORMAT_OPTIONS = [
  { value: 'png', label: '🖼️ PNG', description: '无损压缩，支持透明' },
  { value: 'jpeg', label: '📷 JPEG', description: '有损压缩，文件较小' },
  { value: 'webp', label: '⚡ WebP', description: '现代格式，压缩率高' },
];

export default function ImageToolsPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState<ConversionSettings>({
    width: 1920,
    height: 1080,
    maintainAspectRatio: true,
    aspectRatio: 'original',
    outputFormat: 'png',
    quality: 90,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length !== files.length) {
      setError('部分文件不是图片格式，已自动过滤');
    } else {
      setError(null);
    }
    setSelectedFiles(prev => [...prev, ...imageFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setSelectedFiles(prev => [...prev, ...imageFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const processImage = async (file: File, index: number): Promise<ProcessedImage | null> => {
    try {
      // 创建 FormData
      const formData = new FormData();
      formData.append('image', file);
      formData.append('width', settings.width.toString());
      formData.append('height', settings.height.toString());
      formData.append('maintainAspectRatio', settings.maintainAspectRatio.toString());
      formData.append('aspectRatio', settings.aspectRatio);
      formData.append('outputFormat', settings.outputFormat);
      formData.append('quality', settings.quality.toString());

      const response = await fetch('/api/image/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `处理失败 (HTTP ${response.status})`);
      }

      const data = await response.json();

      // 创建处理后的图片 URL
      const processedUrl = `data:${data.mimeType};base64,${data.base64}`;

      return {
        id: `${Date.now()}-${index}`,
        originalUrl: URL.createObjectURL(file),
        processedUrl,
        originalName: file.name,
        originalSize: data.originalSize,
        processedSize: data.processedSize,
        originalFormat: data.originalFormat,
        outputFormat: data.outputFormat,
        fileSize: formatFileSize(data.fileSize),
      };
    } catch (err) {
      console.error(`Error processing ${file.name}:`, err);
      return null;
    }
  };

  const handleProcess = async () => {
    if (selectedFiles.length === 0) {
      setError('请先选择图片');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const results = await Promise.all(
        selectedFiles.map((file, index) => processImage(file, index))
      );

      const successfulResults = results.filter((r): r is ProcessedImage => r !== null);

      if (successfulResults.length === 0) {
        throw new Error('所有图片处理失败');
      }

      if (successfulResults.length < selectedFiles.length) {
        setError(`部分图片处理失败 (${successfulResults.length}/${selectedFiles.length} 成功)`);
      }

      setProcessedImages(prev => [...successfulResults, ...prev]);
      setSelectedFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (image: ProcessedImage) => {
    const link = document.createElement('a');
    link.href = image.processedUrl;
    const ext = image.outputFormat === 'jpeg' ? 'jpg' : image.outputFormat;
    const baseName = image.originalName.replace(/\.[^/.]+$/, '');
    link.download = `${baseName}_converted.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    processedImages.forEach((image, index) => {
      setTimeout(() => handleDownload(image), index * 200);
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background-primary)] bg-noise">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(78, 205, 196, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animationDelay: '1s'
          }}
        />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 107, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-32 sm:px-8 lg:px-12">
          <div className="text-center">
            {/* 顶部徽章 */}
            <div className="mb-10 flex justify-center animate-fade-in-down">
              <div className="inline-flex items-center gap-3 rounded-full glass-card px-6 py-3 pulse-ring">
                <div className="relative flex h-2 w-2">
                  <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon-cyan)] opacity-75" />
                  <div className="relative inline-flex h-2 w-2 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
                </div>
                <span className="text-sm font-bold tracking-wide" style={{
                  background: 'var(--gradient-text-neon)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  纯前端处理
                </span>
              </div>
            </div>

            {/* 标题 */}
            <h1 className="mb-8 text-6xl sm:text-7xl lg:text-8xl font-black animate-fade-in-up" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="block animate-gradient bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-purple)] to-[var(--color-pink)] bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%' }}>
                图片工具箱
              </span>
              <span className="block mt-4 text-[var(--text-primary)]" style={{ fontSize: '0.5em' }}>
                专业图片转换与处理工具
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-16 max-w-3xl mx-auto leading-relaxed">
              调整尺寸、裁剪比例、转换格式，一站式图片处理方案
            </p>
          </div>
        </div>
      </section>

      {/* 工具界面 */}
      <section className="max-w-6xl mx-auto px-6 pb-24 sm:px-8 lg:px-12">
        <div className="glass-card border border-[var(--border-default)] rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            开始处理
          </h2>

          {/* 设置区域 */}
          <div className="space-y-6 mb-8">
            {/* 输出格式选择 */}
            <Select
              label="输出格式"
              options={FORMAT_OPTIONS}
              value={settings.outputFormat}
              onChange={(value) => setSettings(prev => ({ ...prev, outputFormat: value as any }))}
              placeholder="选择输出格式"
            />

            {/* 比例裁剪 */}
            <Select
              label="比例裁剪"
              options={ASPECT_RATIO_OPTIONS}
              value={settings.aspectRatio}
              onChange={(value) => setSettings(prev => ({ ...prev, aspectRatio: value }))}
              placeholder="选择裁剪比例"
            />

            {/* 尺寸设置 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  宽度 (像素)
                </label>
                <input
                  type="number"
                  value={settings.width}
                  onChange={(e) => setSettings(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--color-brand)]/20 outline-none transition-all"
                  min="1"
                  max="4096"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  高度 (像素)
                </label>
                <input
                  type="number"
                  value={settings.height}
                  onChange={(e) => setSettings(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--color-brand)]/20 outline-none transition-all"
                  min="1"
                  max="4096"
                />
              </div>
            </div>

            {/* 保持宽高比 */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="maintainAspectRatio"
                checked={settings.maintainAspectRatio}
                onChange={(e) => setSettings(prev => ({ ...prev, maintainAspectRatio: e.target.checked }))}
                className="w-5 h-5 rounded border-[var(--border-default)] bg-[var(--background-secondary)] text-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20"
              />
              <label htmlFor="maintainAspectRatio" className="text-sm text-[var(--text-secondary)]">
                保持宽高比 (根据比例自动调整)
              </label>
            </div>

            {/* 质量控制 (仅 JPEG/WebP) */}
            {settings.outputFormat !== 'png' && (
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  压缩质量: {settings.quality}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={settings.quality}
                  onChange={(e) => setSettings(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-[var(--background-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--color-brand)]"
                />
                <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1">
                  <span>更小文件</span>
                  <span>更高质量</span>
                </div>
              </div>
            )}
          </div>

          {/* 文件上传区域 */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`
              border-2 border-dashed rounded-2xl p-8 text-center transition-all
              ${error && selectedFiles.length === 0
                ? 'border-[var(--color-red)] bg-[var(--color-red)]/5'
                : 'border-[var(--border-default)] hover:border-[var(--border-strong)] bg-[var(--background-secondary)]'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept="image/*"
              multiple
              className="hidden"
            />
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[var(--text-primary)] mb-2">
              拖拽图片到这里，或
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-[var(--color-brand)] hover:underline ml-1"
              >
                点击选择
              </button>
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              支持 PNG、JPEG、WebP 等常见格式，可多选
            </p>
          </div>

          {/* 已选择的文件列表 */}
          {selectedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] font-mono">
                  已选择 {selectedFiles.length} 张图片
                </h3>
                <button
                  onClick={() => setSelectedFiles([])}
                  className="text-sm text-[var(--color-red)] hover:underline"
                >
                  清空全部
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--background-secondary)] border border-[var(--border-subtle)]"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <svg className="w-8 h-8 text-[var(--text-muted)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--text-primary)] truncate">{file.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 text-[var(--text-muted)] hover:text-[var(--color-red)] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 错误提示 */}
          {error && (
            <div className="mt-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-red)]/10 border border-[var(--color-red)]/20 text-[var(--color-red)]">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* 处理按钮 */}
          <button
            onClick={handleProcess}
            disabled={selectedFiles.length === 0 || isProcessing}
            className="w-full mt-6 px-8 py-5 bg-[var(--gradient-primary)] text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover-glow-brand-strong hover:shadow-3d-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>处理中...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>开始处理</span>
              </>
            )}
          </button>
        </div>

        {/* 处理结果 */}
        {processedImages.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
                处理结果 ({processedImages.length})
              </h2>
              <button
                onClick={handleDownloadAll}
                className="px-6 py-3 bg-[var(--gradient-primary)] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载全部
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {processedImages.map((image) => (
                <div
                  key={image.id}
                  className="glass-card border border-[var(--border-default)] rounded-2xl overflow-hidden group"
                >
                  <div className="grid grid-cols-2 gap-0">
                    {/* 原始图片 */}
                    <div className="relative aspect-square bg-[var(--background-secondary)]">
                      <img
                        src={image.originalUrl}
                        alt="原始图片"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-black/60 backdrop-blur-sm">
                        <p className="text-xs text-white font-medium">原始</p>
                        <p className="text-xs text-white/70">{image.originalSize.width} × {image.originalSize.height}</p>
                      </div>
                    </div>
                    {/* 处理后图片 */}
                    <div className="relative aspect-square bg-[var(--background-secondary)]">
                      <img
                        src={image.processedUrl}
                        alt="处理后图片"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-black/60 backdrop-blur-sm">
                        <p className="text-xs text-white font-medium">处理后</p>
                        <p className="text-xs text-white/70">{image.processedSize.width} × {image.processedSize.height}</p>
                      </div>
                      {/* 下载按钮 */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => handleDownload(image)}
                          className="px-4 py-2 bg-[var(--gradient-primary)] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
                        >
                          下载
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* 文件信息 */}
                  <div className="p-4 border-t border-[var(--border-subtle)]">
                    <p className="text-sm text-[var(--text-primary)] truncate mb-1">{image.originalName}</p>
                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                      <span>{image.originalFormat.toUpperCase()} → {image.outputFormat.toUpperCase()}</span>
                      <span>{image.fileSize}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            核心功能
          </h2>
          <p className="text-lg text-[var(--text-muted)]">
            简单易用，功能强大
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '📐',
              title: '尺寸调整',
              desc: '自由指定输出宽度与高度，支持 1-4096 像素范围',
              gradient: 'var(--gradient-primary)',
            },
            {
              icon: '✂️',
              title: '比例裁剪',
              desc: '支持正方形、宽屏、竖屏等多种常用比例',
              gradient: 'var(--gradient-neon-purple)',
            },
            {
              icon: '🔄',
              title: '格式转换',
              desc: '支持 PNG、JPEG、WebP 三种主流格式互转',
              gradient: 'var(--gradient-neon-blue)',
            },
            {
              icon: '💎',
              title: '质量控制',
              desc: 'JPEG/WebP 格式支持 10-100% 质量调节',
              gradient: 'var(--gradient-neon-pink)',
            },
            {
              icon: '📦',
              title: '批量处理',
              desc: '一次选择多张图片，统一处理并下载',
              gradient: 'var(--gradient-neon-green)',
            },
            {
              icon: '🔒',
              title: '隐私安全',
              desc: '纯前端处理，图片不上传服务器',
              gradient: 'var(--gradient-gold)',
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="card-3d-interactive group p-8 glass-card border border-[var(--border-default)] rounded-3xl transition-all duration-500 hover:border-[var(--border-strong)] hover-glow"
            >
              <div
                className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform"
                style={{ background: feature.gradient }}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
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
