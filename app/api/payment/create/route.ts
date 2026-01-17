/**
 * 创建支付订单 API
 * POST /api/payment/create
 *
 * 注意：这是一个简化版本，实际生产环境需要：
 * 1. 集成支付宝/微信官方 SDK
 * 2. 配置商户信息
 * 3. 处理支付回调
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface CreatePaymentRequest {
  paymentMethod: 'alipay' | 'wechat';
  amount: number;
}

/**
 * 创建模拟支付订单
 *
 * 实际生产环境中，这里应该：
 * 1. 调用支付宝/微信支付 API 创建订单
 * 2. 返回支付 URL 或二维码
 * 3. 等待支付回调
 */
export async function POST(request: NextRequest) {
  try {
    // 验证用户登录
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    const body = await request.json() as CreatePaymentRequest;
    const { paymentMethod, amount } = body;

    if (!paymentMethod || !amount) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 验证金额
    if (amount !== 9.9) {
      return NextResponse.json(
        { error: '无效的金额' },
        { status: 400 }
      );
    }

    // 生成订单号
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    /**
     * 模拟支付流程
     *
     * 实际生产环境中，这里应该：
     *
     * 1. 支付宝集成示例：
     *    const AlipaySdk = require('alipay-sdk').default;
     *    const alipay = new AlipaySdk({
     *      appId: process.env.ALIPAY_APP_ID,
     *      privateKey: process.env.ALIPAY_PRIVATE_KEY,
     *      alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY,
     *    });
     *    const result = await alipay.pageExecute('alipay.trade.page.pay', {
     *      bizContent: {
     *        out_trade_no: orderId,
     *        product_code: 'FAST_INSTANT_TRADE_PAY',
     *        total_amount: amount,
     *        subject: 'AI智能出题订阅',
     *      },
     *    });
     *
     * 2. 微信支付集成示例：
     *    const wxpay = require('wechatpay-node-v3');
     *    const pay = new wxpay({
     *      appid: process.env.WECHAT_APP_ID,
     *      mchid: process.env.WECHAT_MCH_ID,
     *      publicKey: process.env.WECHAT_PUBLIC_KEY,
     *      privateKey: process.env.WECHAT_PRIVATE_KEY,
     *    });
     *    const result = await pay.transactions_native({
     *      description: 'AI智能出题订阅',
     *      out_trade_no: orderId,
     *      amount: { total: amount * 100 },
     *    });
     */

    // 模拟支付成功（测试环境）
    // 在生产环境中，移除这段代码，使用真实的支付 API
    if (process.env.NODE_ENV === 'development' || process.env.MOCK_PAYMENT === 'true') {
      // 模拟支付成功，直接创建订阅（1年有效期）
      const { createSubscription } = await import('@/lib/subscription-check');
      await createSubscription({
        userId: session.user.id,
        paymentMethod,
        transactionId: orderId,
        amount,
        years: 1, // 1年有效期
      });

      return NextResponse.json({
        success: true,
        message: '支付成功（模拟），订阅有效期1年',
        orderId,
      });
    }

    // 生产环境：返回支付 URL 或二维码
    // 这里返回一个模拟的支付 URL
    const paymentUrl = `https://payment.example.com/pay?orderId=${orderId}&method=${paymentMethod}`;

    // 如果是扫码支付，生成二维码（使用模拟服务）
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentUrl)}`;

    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl,
      qrCode: qrCodeUrl,
    });
  } catch (error) {
    console.error('[Payment Create] Error:', error);
    return NextResponse.json(
      { error: '创建支付订单失败' },
      { status: 500 }
    );
  }
}
