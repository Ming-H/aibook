/**
 * 图片转换 API
 * 支持尺寸调整、比例裁剪、格式转换、质量控制
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface ConvertRequest {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  aspectRatio: string;
  outputFormat: 'png' | 'jpeg' | 'webp';
  quality: number;
}

// 计算目标尺寸
function calculateTargetSize(
  originalWidth: number,
  originalHeight: number,
  settings: ConvertRequest
): { width: number; height: number } {
  let targetWidth = settings.width;
  let targetHeight = settings.height;

  // 如果需要保持宽高比
  if (settings.maintainAspectRatio) {
    // 如果选择了特定比例
    if (settings.aspectRatio !== 'original') {
      const [ratioW, ratioH] = settings.aspectRatio.split(':').map(Number);
      const targetRatio = ratioW / ratioH;
      const originalRatio = originalWidth / originalHeight;

      // 计算基于目标比例的尺寸
      if (originalRatio > targetRatio) {
        // 原图更宽，以宽度为准
        targetHeight = Math.round(targetWidth / targetRatio);
      } else {
        // 原图更高，以高度为准
        targetWidth = Math.round(targetHeight * targetRatio);
      }
    } else {
      // 保持原始比例
      const originalRatio = originalWidth / originalHeight;
      const targetRatio = targetWidth / targetHeight;

      if (targetRatio > originalRatio) {
        // 目标比例更宽，以高度为准
        targetWidth = Math.round(targetHeight * originalRatio);
      } else {
        // 目标比例更高，以宽度为准
        targetHeight = Math.round(targetWidth / originalRatio);
      }
    }
  }

  return { width: targetWidth, height: targetHeight };
}

// 解析比例并计算裁剪区域
function calculateCropArea(
  originalWidth: number,
  originalHeight: number,
  aspectRatio: string
): { left: number; top: number; width: number; height: number } {
  if (aspectRatio === 'original') {
    return { left: 0, top: 0, width: originalWidth, height: originalHeight };
  }

  const [ratioW, ratioH] = aspectRatio.split(':').map(Number);
  const targetRatio = ratioW / ratioH;
  const originalRatio = originalWidth / originalHeight;

  let cropWidth: number;
  let cropHeight: number;

  if (originalRatio > targetRatio) {
    // 原图更宽，裁剪宽度
    cropHeight = originalHeight;
    cropWidth = Math.round(originalHeight * targetRatio);
  } else {
    // 原图更高，裁剪高度
    cropWidth = originalWidth;
    cropHeight = Math.round(originalWidth / targetRatio);
  }

  const left = Math.round((originalWidth - cropWidth) / 2);
  const top = Math.round((originalHeight - cropHeight) / 2);

  return { left, top, width: cropWidth, height: cropHeight };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: '未提供图片文件' },
        { status: 400 }
      );
    }

    // 解析参数
    const settings: ConvertRequest = {
      width: parseInt(formData.get('width') as string) || 1920,
      height: parseInt(formData.get('height') as string) || 1080,
      maintainAspectRatio: formData.get('maintainAspectRatio') === 'true',
      aspectRatio: (formData.get('aspectRatio') as string) || 'original',
      outputFormat: ((formData.get('outputFormat') as string) || 'png') as 'png' | 'jpeg' | 'webp',
      quality: parseInt(formData.get('quality') as string) || 90,
    };

    // 验证参数
    if (settings.width < 1 || settings.width > 4096 || settings.height < 1 || settings.height > 4096) {
      return NextResponse.json(
        { error: '尺寸必须在 1-4096 像素之间' },
        { status: 400 }
      );
    }

    // 读取图片
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 使用 sharp 处理图片（如果可用），否则使用 Canvas API
    let processedBuffer: Buffer;
    let processedWidth: number;
    let processedHeight: number;

    // 检测原始图片尺寸
    let originalSize: { width: number; height: number };
    try {
      originalSize = await getImageSize(buffer);
      if (originalSize.width === 0 || originalSize.height === 0) {
        throw new Error('无法读取图片尺寸');
      }
    } catch (sizeError) {
      console.error('Get image size error:', sizeError);
      return NextResponse.json(
        {
          error: '无法读取图片信息',
          details: sizeError instanceof Error ? sizeError.message : '未知错误',
        },
        { status: 400 }
      );
    }

    const originalFormat = getImageFormat(image.type);

    // 计算目标尺寸
    const targetSize = calculateTargetSize(originalSize.width, originalSize.height, settings);

    try {
      // 尝试使用 sharp
      const sharp = (await import('sharp')).default;
      let processor = sharp(buffer, { failOnError: false });

      // 如果需要比例裁剪
      if (settings.aspectRatio !== 'original') {
        const cropArea = calculateCropArea(originalSize.width, originalSize.height, settings.aspectRatio);
        processor = processor.extract(cropArea);
      }

      // 调整尺寸
      processor = processor.resize(targetSize.width, targetSize.height, {
        fit: settings.maintainAspectRatio ? 'inside' : 'fill',
        withoutEnlargement: false,
      });

      // 设置输出格式和质量
      switch (settings.outputFormat) {
        case 'jpeg':
          processor = processor.jpeg({ quality: settings.quality, mozjpeg: true });
          break;
        case 'png':
          processor = processor.png({ compressionLevel: 9 });
          break;
        case 'webp':
          processor = processor.webp({ quality: settings.quality });
          break;
      }

      const output = await processor.toBuffer();
      processedBuffer = output;
      processedWidth = targetSize.width;
      processedHeight = targetSize.height;
    } catch (sharpError) {
      console.error('Sharp processing error:', sharpError);
      // 返回更详细的错误信息
      return NextResponse.json(
        {
          error: '图片处理失败',
          details: sharpError instanceof Error ? sharpError.message : '未知错误',
        },
        { status: 500 }
      );
    }

    // 转换为 base64
    const base64 = processedBuffer.toString('base64');

    // 获取 MIME 类型
    const mimeTypeMap: Record<string, string> = {
      png: 'image/png',
      jpeg: 'image/jpeg',
      webp: 'image/webp',
    };

    return NextResponse.json({
      base64,
      mimeType: mimeTypeMap[settings.outputFormat],
      originalSize,
      processedSize: { width: processedWidth, height: processedHeight },
      originalFormat,
      outputFormat: settings.outputFormat,
      fileSize: processedBuffer.length,
    });
  } catch (error) {
    console.error('Image conversion error:', error);
    return NextResponse.json(
      { error: '图片处理失败，请检查图片格式是否正确' },
      { status: 500 }
    );
  }
}

// 获取图片尺寸
async function getImageSize(buffer: Buffer): Promise<{ width: number; height: number }> {
  const sharp = (await import('sharp')).default;
  const metadata = await sharp(buffer).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('无效的图片尺寸');
  }

  return {
    width: metadata.width,
    height: metadata.height,
  };
}

// 获取图片格式
function getImageFormat(mimeType: string): string {
  const formatMap: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpeg',
    'image/webp': 'webp',
  };
  return formatMap[mimeType] || 'unknown';
}
