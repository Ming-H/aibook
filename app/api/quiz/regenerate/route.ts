/**
 * 重新生成单个题目 API 路由
 * POST /api/quiz/regenerate
 */

import { NextRequest, NextResponse } from 'next/server';
import { regenerateQuestion, validateGLMConfig, Question } from '@/lib/glm-api';

// 使用 Edge Runtime 以获得 30 秒超时（Vercel 免费计划）
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    // 验证 GLM API 配置
    const configValidation = validateGLMConfig();
    if (!configValidation.valid) {
      return NextResponse.json(
        { error: 'GLM API not configured', details: configValidation.error },
        { status: 500 }
      );
    }

    // 解析请求体
    const body = await request.json();
    const { question, quizContext } = body;

    // 验证必要字段
    if (!question || !quizContext) {
      return NextResponse.json(
        {
          error: 'Invalid request',
          details: 'Please provide both question and quizContext',
        },
        { status: 400 }
      );
    }

    if (!quizContext.subject || !quizContext.grade || !quizContext.topics) {
      return NextResponse.json(
        {
          error: 'Invalid quizContext',
          details: 'quizContext must include subject, grade, and topics',
        },
        { status: 400 }
      );
    }

    // 重新生成题目
    const newQuestion = await regenerateQuestion(question, quizContext);

    return NextResponse.json(
      {
        success: true,
        question: newQuestion,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Question regeneration error:', error);

    return NextResponse.json(
      {
        error: 'Failed to regenerate question',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
