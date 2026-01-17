/**
 * 出题 API 路由（异步任务版本）
 * POST /api/quiz/generate
 *
 * 使用异步任务模式避免 Vercel 免费计划的 10 秒超时限制
 * 客户端需要轮询 /api/quiz/status/[taskId] 获取结果
 */

import { NextRequest, NextResponse } from 'next/server';
import { createQuizTask, validateGLMConfig, QuizConfig } from '@/lib/glm-api';

export const runtime = 'nodejs';

/**
 * 验证出题配置
 */
function validateQuizConfig(config: any): config is QuizConfig {
  if (!config.subject || typeof config.subject !== 'string') {
    return false;
  }

  if (!config.grade || typeof config.grade !== 'string') {
    return false;
  }

  if (!config.topics || !Array.isArray(config.topics) || config.topics.length === 0) {
    return false;
  }

  if (!['easy', 'medium', 'hard'].includes(config.difficulty)) {
    return false;
  }

  if (!config.questionCounts || typeof config.questionCounts !== 'object') {
    return false;
  }

  const { choice = 0, fillBlank = 0, shortAnswer = 0 } = config.questionCounts;

  if (typeof choice !== 'number' || choice < 0) return false;
  if (typeof fillBlank !== 'number' || fillBlank < 0) return false;
  if (typeof shortAnswer !== 'number' || shortAnswer < 0) return false;

  if (choice + fillBlank + shortAnswer === 0) {
    return false;
  }

  if (!config.points || typeof config.points !== 'object') {
    return false;
  }

  const { choice: choicePoints = 0, fillBlank: fillBlankPoints = 0, shortAnswer: shortAnswerPoints = 0 } = config.points;

  if (typeof choicePoints !== 'number' || choicePoints <= 0) return false;
  if (typeof fillBlankPoints !== 'number' || fillBlankPoints <= 0) return false;
  if (typeof shortAnswerPoints !== 'number' || shortAnswerPoints <= 0) return false;

  return true;
}

export async function POST(request: NextRequest) {
  console.log('[Quiz Generate API] Request received (async task)');

  try {
    // 验证 GLM API 配置
    const configValidation = validateGLMConfig();
    if (!configValidation.valid) {
      console.error('[Quiz Generate API] Config validation failed:', configValidation.error);
      return NextResponse.json(
        { error: 'GLM API not configured', details: configValidation.error },
        { status: 500 }
      );
    }

    // 解析请求体
    const body = await request.json();

    // 验证配置
    if (!validateQuizConfig(body)) {
      console.error('[Quiz Generate API] Validation failed');
      return NextResponse.json(
        {
          error: 'Invalid quiz configuration',
          details: 'Please provide valid subject, grade, topics, difficulty, question counts, and points',
        },
        { status: 400 }
      );
    }

    console.log('[Quiz Generate API] Creating task...');

    // 创建异步任务（立即返回，不等待结果）
    const { taskId } = await createQuizTask(body);

    console.log('[Quiz Generate API] Task created:', taskId);

    // 返回任务 ID，客户端需要轮询获取结果
    return NextResponse.json(
      {
        success: true,
        taskId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Quiz Generate API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to create quiz task',
        details: errorMessage,
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
