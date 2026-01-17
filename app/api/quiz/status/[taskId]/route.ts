/**
 * 智能出题任务状态查询 API 路由
 * GET /api/quiz/status/[taskId]
 *
 * 客户端轮询此接口获取任务状态和结果
 */

import { NextRequest, NextResponse } from 'next/server';
import { getQuizTaskStatus } from '@/lib/glm-api';

export const runtime = 'nodejs';

interface RouteParams {
  params: Promise<{ taskId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { taskId } = await params;

    console.log('[Quiz Status API] Checking task:', taskId);

    if (!taskId || typeof taskId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    // 查询任务状态
    const result = await getQuizTaskStatus(taskId);

    console.log('[Quiz Status API] Task status:', result.status);

    // 返回结果
    return NextResponse.json(
      {
        success: true,
        taskId,
        ...result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Quiz Status API] Error:', error);

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
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
