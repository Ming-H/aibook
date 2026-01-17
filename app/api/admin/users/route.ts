/**
 * 获取所有用户列表
 * GET /api/admin/users
 * 仅管理员可访问
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // 验证用户登录和管理员权限
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    // 检查是否是管理员
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true },
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: '无管理员权限' }, { status: 403 });
    }

    // 获取所有用户及其订阅信息
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        createdAt: true,
        subscription: {
          select: {
            id: true,
            status: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('[Admin Users] Error:', error);
    return NextResponse.json(
      { error: '获取用户列表失败' },
      { status: 500 }
    );
  }
}
