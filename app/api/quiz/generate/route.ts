/**
 * 出题 API 路由（流式响应版本）
 * POST /api/quiz/generate
 *
 * 使用流式响应避免 Vercel 免费计划的 10 秒超时限制
 */

import { NextRequest } from 'next/server';
import { generateQuizWithProgress, validateGLMConfig, QuizConfig } from '@/lib/glm-api';

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
  console.log('[Quiz Generate API] Request received (streaming)');

  try {
    // 验证 GLM API 配置
    const configValidation = validateGLMConfig();
    if (!configValidation.valid) {
      console.error('[Quiz Generate API] Config validation failed:', configValidation.error);
      return new Response(JSON.stringify({ error: 'GLM API not configured', details: configValidation.error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 解析请求体
    const body = await request.json();

    // 验证配置
    if (!validateQuizConfig(body)) {
      console.error('[Quiz Generate API] Validation failed');
      return new Response(JSON.stringify({
        error: 'Invalid quiz configuration',
        details: 'Please provide valid subject, grade, topics, difficulty, question counts, and points',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('[Quiz Generate API] Starting quiz generation...');

    // 创建流式响应
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 发送开始标记（立即发送，避免超时）
          controller.enqueue(encoder.encode('data: {"type":"start"}\n\n'));

          // 调用带进度的生成函数
          await generateQuizWithProgress(body, (progress) => {
            console.log('[Quiz Generate API] Sending progress:', progress.type);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(progress)}\n\n`));
          });

          console.log('[Quiz Generate API] Stream completed');
          controller.close();
        } catch (error) {
          console.error('[Quiz Generate API] Stream error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          controller.enqueue(encoder.encode(`data: {"type":"error","error":"${errorMessage}"}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[Quiz Generate API] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return new Response(JSON.stringify({
      error: 'Failed to generate quiz',
      details: errorMessage,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
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
