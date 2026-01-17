/**
 * 图片生成任务状态查询 API 路由
 * GET /api/image/status/[taskId]
 *
 * 客户端轮询此接口获取任务状态和结果
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTaskStatus, validateModelScopeConfig } from '@/lib/modelscope-api';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

interface RouteParams {
  params: Promise<{ taskId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // 验证 ModelScope API 配置
    const configValidation = validateModelScopeConfig();
    if (!configValidation.valid) {
      return NextResponse.json(
        { error: 'ModelScope API not configured', details: configValidation.error },
        { status: 500 }
      );
    }

    // 获取任务 ID
    const { taskId } = await params;

    if (!taskId || typeof taskId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    // 查询任务状态
    const result = await getTaskStatus(taskId);

    // 返回结果
    return NextResponse.json(
      {
        success: true,
        taskId,
        status: result.status,
        outputImages: result.outputImages,
        error: result.error,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Task status check error:', error);

    return NextResponse.json(
      {
        error: 'Failed to check task status',
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
