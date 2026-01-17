/**
 * 支付回调 API
 * POST /api/payment/callback
 *
 * 支付宝/微信支付完成后的回调接口
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSubscription } from '@/lib/subscription-check';
import crypto from 'crypto';

/**
 * 验证支付宝回调签名
 */
function verifyAlipaySignature(params: any): boolean {
  // 实际生产环境中，这里应该验证支付宝的签名
  // const AlipaySdk = require('alipay-sdk').default;
  // const alipay = new AlipaySdk({ ... });
  // return alipay.checkNotifySign(params);

  // 模拟验证通过
  return true;
}

/**
 * 验证微信回调签名
 */
function verifyWechatSignature(body: string, signature: string): boolean {
  // 实际生产环境中，这里应该验证微信的签名
  // const wxpay = require('wechatpay-node-v3');
  // return wxpay.verifySignature(body, signature);

  // 模拟验证通过
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, paymentMethod, trade_status, transaction_id } = body;

    // 验证必要参数
    if (!orderId || !paymentMethod) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 验证签名
    if (paymentMethod === 'alipay') {
      if (!verifyAlipaySignature(body)) {
        return NextResponse.json(
          { error: '签名验证失败' },
          { status: 400 }
        );
      }
    } else if (paymentMethod === 'wechat') {
      // 微信签名验证
      const signature = request.headers.get('wechatpay-signature');
      if (!signature || !verifyWechatSignature(JSON.stringify(body), signature)) {
        return NextResponse.json(
          { error: '签名验证失败' },
          { status: 400 }
        );
      }
    }

    // 检查订单是否已处理
    const existingSubscription = await prisma.subscription.findUnique({
      where: { transactionId: orderId },
    });

    if (existingSubscription) {
      return NextResponse.json({ success: true, message: '订单已处理' });
    }

    // 从订单号中提取用户 ID（实际应该从数据库查询）
    // 这里简化处理，实际应该有 orders 表
    const userId = body.userId; // 从支付回调中获取

    // 验证支付状态
    const isPaymentSuccess =
      trade_status === 'TRADE_SUCCESS' ||
      trade_status === 'TRADE_FINISHED' ||
      body.return_code === 'SUCCESS';

    if (!isPaymentSuccess) {
      return NextResponse.json(
        { error: '支付未成功' },
        { status: 400 }
      );
    }

    // 创建订阅
    await createSubscription({
      userId,
      paymentMethod: paymentMethod === 'alipay' ? 'alipay' : 'wechat',
      transactionId: transaction_id || orderId,
      amount: 9.9,
      years: 1,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Payment Callback] Error:', error);
    return NextResponse.json(
      { error: '处理支付回调失败' },
      { status: 500 }
    );
  }
}
