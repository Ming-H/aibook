/**
 * 订阅验证和管理工具
 */

import { prisma } from './prisma';

export interface SubscriptionCheckResult {
  valid: boolean;
  message?: string;
  isAdmin?: boolean;
  subscription?: {
    status: string;
    endDate: Date;
    quizzesGenerated: number;
  };
}

/**
 * 检查用户订阅状态
 * 管理员自动通过验证，无需订阅
 */
export async function checkSubscription(userId: string): Promise<SubscriptionCheckResult> {
  try {
    // 获取用户信息（包含管理员状态）
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });

    if (!user) {
      return {
        valid: false,
        message: '用户不存在',
      };
    }

    // ✅ 管理员自动通过验证
    if (user.isAdmin) {
      return {
        valid: true,
        isAdmin: true,
        message: '管理员账户',
      };
    }

    // 普通用户检查订阅
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    // 没有订阅记录
    if (!subscription) {
      return {
        valid: false,
        message: '请先订阅才能使用智能出题功能',
      };
    }

    // 订阅未激活或已取消
    if (subscription.status !== 'ACTIVE') {
      return {
        valid: false,
        message: '订阅未激活，请先完成支付',
      };
    }

    // 订阅已过期
    if (subscription.endDate < new Date()) {
      // 更新状态为过期
      await prisma.subscription.update({
        where: { userId },
        data: { status: 'INACTIVE' },
      });

      return {
        valid: false,
        message: '订阅已过期，请续费',
      };
    }

    // 订阅有效（无次数限制）
    return {
      valid: true,
      isAdmin: false,
      subscription: {
        status: subscription.status,
        endDate: subscription.endDate,
        quizzesGenerated: subscription.quizzesGenerated,
      },
    };
  } catch (error) {
    console.error('[Subscription Check] Error:', error);
    return {
      valid: false,
      message: '检查订阅状态时出错，请稍后重试',
    };
  }
}

/**
 * 记录试卷生成使用
 * 管理员不记录，只统计订阅用户
 */
export async function recordQuizUsage(userId: string): Promise<boolean> {
  try {
    // 获取用户信息
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });

    // 管理员不记录使用次数
    if (user?.isAdmin) {
      return true;
    }

    // 只更新订阅的使用次数（不限制）
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (existingSubscription) {
      await prisma.subscription.update({
        where: { userId },
        data: {
          quizzesGenerated: {
            increment: 1,
          },
        },
      });
    }

    return true;
  } catch (error) {
    console.error('[Record Usage] Error:', error);
    return false;
  }
}

/**
 * 获取用户订阅信息
 */
export async function getUserSubscription(userId: string) {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            isAdmin: true,
          },
        },
      },
    });

    return subscription;
  } catch (error) {
    console.error('[Get Subscription] Error:', error);
    return null;
  }
}

/**
 * 创建新订阅（支付成功后调用）
 * 默认1年有效期
 */
export async function createSubscription(params: {
  userId: string;
  paymentMethod: 'alipay' | 'wechat';
  transactionId: string;
  amount: number;
  years?: number; // 订阅年数，默认1年
}) {
  const { userId, paymentMethod, transactionId, amount, years = 1 } = params;

  const startDate = new Date();
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + years); // 1年后过期

  try {
    // 检查是否已有订阅
    const existing = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (existing) {
      // 更新现有订阅
      const updated = await prisma.subscription.update({
        where: { userId },
        data: {
          status: 'ACTIVE',
          startDate,
          endDate,
          paymentMethod,
          transactionId,
          amount,
          quizzesGenerated: 0, // 重置使用统计
        },
      });

      return updated;
    } else {
      // 创建新订阅
      const created = await prisma.subscription.create({
        data: {
          userId,
          status: 'ACTIVE',
          startDate,
          endDate,
          paymentMethod,
          transactionId,
          amount,
          quizzesGenerated: 0,
        },
      });

      return created;
    }
  } catch (error) {
    console.error('[Create Subscription] Error:', error);
    throw error;
  }
}

/**
 * 设置用户为管理员
 */
export async function setUserAsAdmin(userId: string): Promise<boolean> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isAdmin: true },
    });

    return true;
  } catch (error) {
    console.error('[Set Admin] Error:', error);
    return false;
  }
}
