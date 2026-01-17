/**
 * 记录试卷生成使用 API
 * POST /api/quiz/record-usage
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { recordQuizUsage } from '@/lib/subscription-check';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '未登录' },
        { status: 401 }
      );
    }

    const success = await recordQuizUsage(session.user.id);

    if (!success) {
      return NextResponse.json(
        { error: '记录使用失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Record Usage API] Error:', error);
    return NextResponse.json(
      { error: '记录使用失败' },
      { status: 500 }
    );
  }
}
