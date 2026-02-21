/**
 * 图片工具箱 - 图片转换工具
 * 支持手动裁剪选择、尺寸调整、格式转换、质量控制
 */

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Select } from '@/components/ui/Select';

interface ConversionSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  aspectRatio: string;
  outputFormat: 'png' | 'jpeg' | 'webp';
  quality: number;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
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
  { value: 'free', label: '✋ 自由选择', description: '手动选择裁剪区域' },
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

  // 图片预览和裁剪相关状态
  const [imagePreviews, setImagePreviews] = useState<Array<{
    file: File;
    url: string;
    width: number;
    height: number;
    cropArea: CropArea;
  }>>([]);

  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0);

  const [settings, setSettings] = useState<ConversionSettings>({
    width: 1920,
    height: 1080,
    maintainAspectRatio: true,
    aspectRatio: 'free',
    outputFormat: 'png',
    quality: 90,
  });

  // 裁剪相关状态
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<'tl' | 'tr' | 'bl' | 'br' | null>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);

  // 加载图片并获取尺寸
  const loadImage = useCallback((file: File): Promise<{ url: string; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        resolve({ url, width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = url;
    });
  }, []);

  // 当文件被选择时，创建预览
  useEffect(() => {
    const loadPreviews = async () => {
      const previews = await Promise.all(
        selectedFiles.map(async (file) => {
          const { url, width, height } = await loadImage(file);
          // 默认裁剪区域为整个图片
          const initialCrop: CropArea = { x: 0, y: 0, width, height };
          return { file, url, width, height, cropArea: initialCrop };
        })
      );
      setImagePreviews(previews);
      if (previews.length > 0) {
        setCurrentPreviewIndex(0);
      }
    };

    if (selectedFiles.length > 0) {
      loadPreviews();
    } else {
      setImagePreviews([]);
    }
  }, [selectedFiles, loadImage]);

  // 当比例改变时，更新裁剪区域
  useEffect(() => {
    if (imagePreviews.length === 0) return;

    const preview = imagePreviews[currentPreviewIndex];
    if (!preview) return;

    const { width, height } = preview;
    let newCrop: CropArea;

    if (settings.aspectRatio === 'free') {
      // 自由模式，保持当前裁剪
      newCrop = preview.cropArea;
    } else if (settings.aspectRatio === 'original') {
      newCrop = { x: 0, y: 0, width, height };
    } else {
      // 计算指定比例的裁剪区域
      const [ratioW, ratioH] = settings.aspectRatio.split(':').map(Number);
      const targetRatio = ratioW / ratioH;
      const originalRatio = width / height;

      let cropWidth: number;
      let cropHeight: number;

      if (originalRatio > targetRatio) {
        cropHeight = height;
        cropWidth = Math.round(height * targetRatio);
      } else {
        cropWidth = width;
        cropHeight = Math.round(width / targetRatio);
      }

      const x = Math.round((width - cropWidth) / 2);
      const y = Math.round((height - cropHeight) / 2);

      newCrop = { x, y, width: cropWidth, height: cropHeight };
    }

    setImagePreviews(prev => prev.map((p, i) =>
      i === currentPreviewIndex ? { ...p, cropArea: newCrop } : p
    ));
  }, [settings.aspectRatio, currentPreviewIndex, imagePreviews]);

  // 计算裁剪区域在容器中的显示位置
  const getCropStyle = (preview: typeof imagePreviews[0]) => {
    if (!preview || !cropContainerRef.current) return {};

    const containerRect = cropContainerRef.current.getBoundingClientRect();
    const scaleX = containerRect.width / preview.width;
    const scaleY = containerRect.height / preview.height;

    return {
      left: `${preview.cropArea.x * scaleX}px`,
      top: `${preview.cropArea.y * scaleY}px`,
      width: `${preview.cropArea.width * scaleX}px`,
      height: `${preview.cropArea.height * scaleY}px`,
    };
  };

  // 处理鼠标事件 - 裁剪框拖拽
  const handleMouseDown = (e: React.MouseEvent, handle?: 'tl' | 'tr' | 'bl' | 'br') => {
    e.preventDefault();
    e.stopPropagation();

    if (handle) {
      setIsResizing(true);
      setResizeHandle(handle);
    } else {
      setIsDragging(true);
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!imagePreviews[currentPreviewIndex]) return;

    const preview = imagePreviews[currentPreviewIndex];
    const containerRect = cropContainerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const scaleX = preview.width / containerRect.width;
    const scaleY = preview.height / containerRect.height;
    const deltaX = (e.clientX - dragStart.x) * scaleX;
    const deltaY = (e.clientY - dragStart.y) * scaleY;

    let newCrop = { ...preview.cropArea };

    if (isResizing && resizeHandle) {
      // 调整大小
      const minSize = 50;

      if (resizeHandle === 'br') {
        newCrop.width = Math.max(minSize, preview.cropArea.width + deltaX);
        newCrop.height = Math.max(minSize, preview.cropArea.height + deltaY);
      } else if (resizeHandle === 'bl') {
        newCrop.x = Math.min(preview.cropArea.x + preview.cropArea.width - minSize, preview.cropArea.x + deltaX);
        newCrop.width = Math.max(minSize, preview.cropArea.width - deltaX);
        newCrop.height = Math.max(minSize, preview.cropArea.height + deltaY);
      } else if (resizeHandle === 'tr') {
        newCrop.y = Math.min(preview.cropArea.y + preview.cropArea.height - minSize, preview.cropArea.y + deltaY);
        newCrop.width = Math.max(minSize, preview.cropArea.width + deltaX);
        newCrop.height = Math.max(minSize, preview.cropArea.height - deltaY);
      } else if (resizeHandle === 'tl') {
        newCrop.x = Math.min(preview.cropArea.x + preview.cropArea.width - minSize, preview.cropArea.x + deltaX);
        newCrop.y = Math.min(preview.cropArea.y + preview.cropArea.height - minSize, preview.cropArea.y + deltaY);
        newCrop.width = Math.max(minSize, preview.cropArea.width - deltaX);
        newCrop.height = Math.max(minSize, preview.cropArea.height - deltaY);
      }

      // 边界检查
      newCrop.x = Math.max(0, Math.min(newCrop.x, preview.width - newCrop.width));
      newCrop.y = Math.max(0, Math.min(newCrop.y, preview.height - newCrop.height));
    } else if (isDragging) {
      // 移动位置
      newCrop.x = Math.max(0, Math.min(preview.cropArea.x + deltaX, preview.width - preview.cropArea.width));
      newCrop.y = Math.max(0, Math.min(preview.cropArea.y + deltaY, preview.height - preview.cropArea.height));
    }

    setImagePreviews(prev => prev.map((p, i) =>
      i === currentPreviewIndex ? { ...p, cropArea: newCrop } : p
    ));

    setDragStart({ x: e.clientX, y: e.clientY });
  }, [imagePreviews, currentPreviewIndex, isDragging, isResizing, resizeHandle, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length !== files.length) {
      setError('部分文件不是图片格式，已自动过滤');
    } else {
      setError(null);
    }
    setSelectedFiles(prev => [...prev, ...imageFiles]);
    // 重置预览
    setImagePreviews([]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setSelectedFiles(prev => [...prev, ...imageFiles]);
    setImagePreviews([]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    if (currentPreviewIndex >= imagePreviews.length - 1) {
      setCurrentPreviewIndex(Math.max(0, imagePreviews.length - 2));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const processImage = async (file: File, cropArea: CropArea, index: number): Promise<ProcessedImage | null> => {
    try {
      // 纯前端处理 - 使用 Canvas API
      const img = new Image();
      const originalUrl = URL.createObjectURL(file);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = originalUrl;
      });

      // 计算目标尺寸
      let targetWidth = settings.width;
      let targetHeight = settings.height;

      const cropRatio = cropArea.width / cropArea.height;

      if (settings.maintainAspectRatio) {
        const targetRatio = targetWidth / targetHeight;

        if (targetRatio > cropRatio) {
          targetWidth = Math.round(targetHeight * cropRatio);
        } else {
          targetHeight = Math.round(targetWidth / cropRatio);
        }
      }

      // 创建 Canvas
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('无法创建 Canvas 上下文');
      }

      // 使用用户选择的裁剪区域
      ctx.drawImage(
        img,
        cropArea.x, cropArea.y, cropArea.width, cropArea.height,
        0, 0, targetWidth, targetHeight
      );

      // 转换为目标格式
      const mimeType = settings.outputFormat === 'png' ? 'image/png' :
                       settings.outputFormat === 'jpeg' ? 'image/jpeg' : 'image/webp';

      const quality = settings.outputFormat === 'png' ? undefined : settings.quality / 100;
      const processedUrl = canvas.toDataURL(mimeType, quality);

      const base64Data = processedUrl.split(',')[1];
      const fileSize = Math.round(base64Data.length * 0.75);

      return {
        id: `${Date.now()}-${index}`,
        originalUrl,
        processedUrl,
        originalName: file.name,
        originalSize: { width: img.width, height: img.height },
        processedSize: { width: targetWidth, height: targetHeight },
        originalFormat: file.type.split('/')[1] || 'unknown',
        outputFormat: settings.outputFormat,
        fileSize: formatFileSize(fileSize),
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      console.error(`Error processing ${file.name}:`, errorMessage);
      setError(`"${file.name}" 处理失败: ${errorMessage}`);
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
        imagePreviews.map((preview, index) =>
          processImage(preview.file, preview.cropArea, index)
        )
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
      setImagePreviews([]);
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

  const currentPreview = imagePreviews[currentPreviewIndex];

  return (
    <div className="page-surface">

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6 py-20 sm:px-8 lg:px-12">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] surface-soft px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                纯前端处理 · 本地运行
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--text-primary)]">
              图片工具箱
            </h1>

            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              手动选择裁剪区域，精确控制输出效果
            </p>
          </div>
        </div>
      </section>

      {/* 工具界面 */}
      <section className="max-w-7xl mx-auto px-6 pb-24 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧 - 设置面板 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 设置卡片 */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-6 text-[var(--text-primary)]">
                输出设置
              </h3>

              <div className="space-y-5">
                {/* 输出格式 */}
                <Select
                  label="输出格式"
                  options={FORMAT_OPTIONS}
                  value={settings.outputFormat}
                  onChange={(value) => setSettings(prev => ({ ...prev, outputFormat: value as any }))}
                  placeholder="选择输出格式"
                />

                {/* 裁剪比例 */}
                <Select
                  label="裁剪模式"
                  options={ASPECT_RATIO_OPTIONS}
                  value={settings.aspectRatio}
                  onChange={(value) => setSettings(prev => ({ ...prev, aspectRatio: value }))}
                  placeholder="选择裁剪模式"
                />

                {/* 输出尺寸 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      宽度
                    </label>
                    <input
                      type="number"
                      value={settings.width}
                      onChange={(e) => setSettings(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--color-brand)]/20 outline-none transition-all text-sm"
                      min="1"
                      max="4096"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      高度
                    </label>
                    <input
                      type="number"
                      value={settings.height}
                      onChange={(e) => setSettings(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--color-brand)]/20 outline-none transition-all text-sm"
                      min="1"
                      max="4096"
                    />
                  </div>
                </div>

                {/* 保持宽高比 */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="maintainAspectRatio"
                    checked={settings.maintainAspectRatio}
                    onChange={(e) => setSettings(prev => ({ ...prev, maintainAspectRatio: e.target.checked }))}
                    className="w-4 h-4 rounded border-[var(--border-default)] bg-[var(--background-secondary)] text-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20"
                  />
                  <label htmlFor="maintainAspectRatio" className="text-sm text-[var(--text-secondary)]">
                    保持裁剪区域比例
                  </label>
                </div>

                {/* 质量控制 */}
                {settings.outputFormat !== 'png' && (
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      质量: {settings.quality}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={settings.quality}
                      onChange={(e) => setSettings(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-[var(--background-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--color-brand)]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 文件上传 */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`
                border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer
                ${error && selectedFiles.length === 0
                  ? 'border-[var(--color-red)] bg-[var(--color-red)]/5'
                  : 'border-[var(--border-default)] hover:border-[var(--border-strong)] bg-[var(--background-secondary)]'
                }
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept="image/*"
                multiple
                className="hidden"
              />
              <div className="mb-3">
                <svg className="w-12 h-12 mx-auto text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-[var(--text-primary)] mb-1">
                点击或拖拽上传图片
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                支持 PNG、JPEG、WebP 等格式
              </p>
            </div>

            {/* 已选择的文件 */}
            {selectedFiles.length > 0 && (
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                    已选择 {selectedFiles.length} 张
                  </h4>
                  <button
                    onClick={() => {
                      setSelectedFiles([]);
                      setImagePreviews([]);
                    }}
                    className="text-xs text-[var(--color-red)] hover:underline"
                  >
                    清空
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentPreviewIndex(index)}
                      className={`
                        flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all
                        ${currentPreviewIndex === index
                          ? 'bg-[var(--color-brand)]/20 border border-[var(--color-brand)]'
                          : 'bg-[var(--background-secondary)] border border-transparent hover:border-[var(--border-subtle]'
                        }
                      `}
                    >
                      <svg className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs text-[var(--text-primary)] truncate flex-1">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 右侧 - 裁剪预览 */}
          <div className="lg:col-span-2">
            {currentPreview ? (
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    调整裁剪区域
                  </h3>
                  {settings.aspectRatio === 'free' && (
                    <span className="text-xs text-[var(--text-muted)]">
                      拖拽移动 · 拖拽边角调整大小
                    </span>
                  )}
                </div>

                {/* 图片预览和裁剪框 */}
                <div
                  ref={cropContainerRef}
                  className="relative bg-[var(--background-secondary)] rounded-xl overflow-hidden"
                  style={{
                    aspectRatio: `${currentPreview.width}/${currentPreview.height}`,
                    maxHeight: '500px'
                  }}
                >
                  <img
                    src={currentPreview.url}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    draggable={false}
                  />

                  {/* 裁剪框 */}
                  <div
                    className="absolute border-2 border-[var(--color-brand)] bg-[var(--color-brand)]/10"
                    style={getCropStyle(currentPreview)}
                    onMouseDown={(e) => handleMouseDown(e)}
                  >
                    {/* 裁剪框信息 */}
                    <div className="absolute -top-6 left-0 text-xs text-[var(--text-primary)] bg-[var(--background-secondary)] px-2 py-1 rounded">
                      {Math.round(currentPreview.cropArea.width)} × {Math.round(currentPreview.cropArea.height)}
                    </div>

                    {/* 调整大小的手柄 */}
                    {settings.aspectRatio === 'free' && (
                      <>
                        <div
                          className="absolute -top-1 -left-1 w-3 h-3 bg-[var(--color-brand)] cursor-tl-resize"
                          onMouseDown={(e) => handleMouseDown(e, 'tl')}
                        />
                        <div
                          className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--color-brand)] cursor-tr-resize"
                          onMouseDown={(e) => handleMouseDown(e, 'tr')}
                        />
                        <div
                          className="absolute -bottom-1 -left-1 w-3 h-3 bg-[var(--color-brand)] cursor-bl-resize"
                          onMouseDown={(e) => handleMouseDown(e, 'bl')}
                        />
                        <div
                          className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--color-brand)] cursor-br-resize"
                          onMouseDown={(e) => handleMouseDown(e, 'br')}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* 提示信息 */}
                <div className="mt-4 p-3 bg-[var(--background-secondary)] rounded-lg">
                  <p className="text-sm text-[var(--text-secondary)]">
                    {settings.aspectRatio === 'free'
                      ? '✋ 拖拽裁剪框移动位置，拖拽四角调整大小'
                      : '📐 当前使用预设比例，切换到"自由选择"可手动调整'
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="card p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl bg-[var(--background-tertiary)]">
                  🖼️
                </div>
                <p className="text-[var(--text-secondary)]">
                  上传图片后可调整裁剪区域
                </p>
              </div>
            )}
          </div>
        </div>

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
        <div className="mt-6 card p-6">
          <button
            onClick={handleProcess}
            disabled={imagePreviews.length === 0 || isProcessing}
            className="btn-primary w-full px-8 py-4 text-base flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                <span>处理中...</span>
              </>
            ) : imagePreviews.length === 0 ? (
              <>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>请先上传图片</span>
              </>
            ) : (
              <>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>开始处理 {imagePreviews.length > 0 && `(${imagePreviews.length}张)`}</span>
              </>
            )}
          </button>
          {imagePreviews.length === 0 && (
            <p className="text-center text-sm text-[var(--text-muted)] mt-3">
              上传图片后，调整裁剪区域，然后点击按钮开始处理
            </p>
          )}
        </div>

        {/* 处理结果 */}
        {processedImages.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                处理结果 ({processedImages.length})
              </h2>
              <button
                onClick={handleDownloadAll}
                className="btn-primary px-6 py-2 text-sm flex items-center gap-2"
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
                  className="card overflow-hidden group"
                >
                  <div className="grid grid-cols-2 gap-0">
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
                    </div>
                  </div>
                  <div className="p-4 border-t border-[var(--border-subtle)]">
                    <p className="text-sm text-[var(--text-primary)] truncate mb-2">{image.originalName}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                        <span>{image.originalFormat.toUpperCase()} → {image.outputFormat.toUpperCase()}</span>
                        <span>{image.fileSize}</span>
                      </div>
                      <button
                        onClick={() => handleDownload(image)}
                        className="btn-primary px-4 py-2 text-xs flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        保存
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
