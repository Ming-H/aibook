/**
 * 管理员为用户开通订阅
 * POST /api/admin/subscription
 * 仅管理员可访问
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface CreateSubscriptionRequest {
  userId: string;
}

export async function POST(request: NextRequest) {
  try {
    // 验证用户登录和管理员权限
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    // 检查是否是管理员
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true },
    });

    if (!admin?.isAdmin) {
      return NextResponse.json({ error: '无管理员权限' }, { status: 403 });
    }

    const body = await request.json() as CreateSubscriptionRequest;
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: '缺少用户ID' }, { status: 400 });
    }

    // 检查目标用户是否存在
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    if (!targetUser) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 管理员不能给自己开通订阅（不需要）
    if (targetUser.isAdmin) {
      return NextResponse.json({ error: '管理员无需订阅' }, { status: 400 });
    }

    // 计算订阅日期（1年有效期）
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

    // 创建或更新订阅
    if (targetUser.subscription) {
      // 更新现有订阅
      await prisma.subscription.update({
        where: { userId },
        data: {
          status: 'ACTIVE',
          startDate,
          endDate,
        },
      });
    } else {
      // 创建新订阅
      await prisma.subscription.create({
        data: {
          userId,
          status: 'ACTIVE',
          startDate,
          endDate,
          paymentMethod: 'ADMIN',
          transactionId: `ADMIN_${Date.now()}`,
          amount: 0,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: '订阅开通成功',
      endDate: endDate.toISOString(),
    });
  } catch (error) {
    console.error('[Admin Subscription] Error:', error);
    return NextResponse.json(
      { error: '开通订阅失败' },
      { status: 500 }
    );
  }
}
