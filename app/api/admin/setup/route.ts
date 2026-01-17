/**
 * 管理员设置 API
 * POST /api/admin/setup
 *
 * 用于设置用户为管理员
 * 注意：这是一个一次性设置接口，建议在生产环境中设置后删除或禁用
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { setUserAsAdmin } from '@/lib/subscription-check';
import bcrypt from 'bcryptjs';

interface SetupAdminRequest {
  email: string;
  password: string;
  adminSecret: string;
}

/**
 * 设置管理员账户
 * 1. 验证管理员密钥（防止滥用）
 * 2. 检查用户是否存在
 * 3. 设置用户为管理员
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as SetupAdminRequest;
    const { email, password, adminSecret } = body;

    // 验证管理员密钥（从环境变量获取）
    const expectedSecret = process.env.ADMIN_SETUP_SECRET;
    if (!expectedSecret || adminSecret !== expectedSecret) {
      return NextResponse.json(
        { error: '管理员密钥无效' },
        { status: 403 }
      );
    }

    // 验证邮箱和密码
    if (!email || !password) {
      return NextResponse.json(
        { error: '请提供邮箱和密码' },
        { status: 400 }
      );
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在，请先注册该邮箱' },
        { status: 404 }
      );
    }

    // 验证密码
    if (!user.password) {
      return NextResponse.json(
        { error: '该用户使用 OAuth 登录，无法设置密码' },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: '密码错误' },
        { status: 401 }
      );
    }

    // 检查是否已经是管理员
    if (user.isAdmin) {
      return NextResponse.json({
        success: true,
        message: '该用户已经是管理员',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: true,
        },
      });
    }

    // 设置为管理员
    const success = await setUserAsAdmin(user.id);

    if (!success) {
      return NextResponse.json(
        { error: '设置管理员失败' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '管理员设置成功',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: true,
      },
    });
  } catch (error) {
    console.error('[Admin Setup] Error:', error);
    return NextResponse.json(
      { error: '设置管理员失败' },
      { status: 500 }
    );
  }
}

/**
 * 获取当前用户信息
 * GET /api/admin/setup
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '未登录' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.error('[Admin Setup GET] Error:', error);
    return NextResponse.json(
      { error: '获取用户信息失败' },
      { status: 500 }
    );
  }
}
