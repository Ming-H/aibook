/**
 * 检查用户订阅状态 API
 * GET /api/subscription/check
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkSubscription } from '@/lib/subscription-check';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          valid: false,
          message: '请先登录',
        },
        { status: 401 }
      );
    }

    const result = await checkSubscription(session.user.id);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Subscription Check API] Error:', error);
    return NextResponse.json(
      {
        valid: false,
        message: '检查订阅状态时出错',
      },
      { status: 500 }
    );
  }
}
