/**
 * 图片生成 API 路由
 * POST /api/image/generate
 *
 * 仅创建任务并返回 task_id，客户端需要轮询 /api/image/status/[taskId] 获取结果
 * 避免服务器超时问题
 */

import { NextRequest, NextResponse } from 'next/server';
import { createImageTaskOnly, validateModelScopeConfig, ImageGenerationConfig } from '@/lib/modelscope-api';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

/**
 * 验证图片生成配置
 */
function validateImageConfig(config: any): config is ImageGenerationConfig {
  if (!config.prompt || typeof config.prompt !== 'string') {
    return false;
  }

  if (config.prompt.length < 1 || config.prompt.length > 2000) {
    return false;
  }

  return true;
}

export async function POST(request: NextRequest) {
  try {
    // 验证 ModelScope API 配置
    const configValidation = validateModelScopeConfig();
    if (!configValidation.valid) {
      return NextResponse.json(
        { error: 'ModelScope API not configured', details: configValidation.error },
        { status: 500 }
      );
    }

    // 解析请求体
    const body = await request.json();

    // 验证配置
    if (!validateImageConfig(body)) {
      return NextResponse.json(
        {
          error: 'Invalid image generation configuration',
          details: 'Please provide a valid prompt (1-2000 characters)',
        },
        { status: 400 }
      );
    }

    // 创建图片生成任务（不等待结果，避免服务器超时）
    const result = await createImageTaskOnly(body);

    // 返回任务 ID，客户端需要轮询获取结果
    return NextResponse.json(
      {
        success: true,
        taskId: result.taskId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Image generation error:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate image',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// OPTIONS 方法支持 CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
