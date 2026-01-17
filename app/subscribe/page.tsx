'use client';

/**
 * 订阅页面
 * 展示定价和支付选项
 */

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const PLAN_PRICE = 9.9; // ¥9.9/年
const PLAN_FEATURES = [
  '订阅期内无限次生成 AI 智能试卷',
  '支持所有学科和年级',
  '支持选择题、填空题、简答题',
  '自定义题目难度和知识点',
  '即时生成，无需等待',
  '订阅有效期 1 年',
];

export default function SubscribePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat'>('alipay');
  const [loading, setLoading] = useState(false);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const handleSubscribe = async () => {
    setLoading(true);

    try {
      // 创建支付订单
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod,
          amount: PLAN_PRICE,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '创建订单失败');
      }

      // 跳转到支付页面
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else if (data.qrCode) {
        // 显示二维码支付
        setShowQRCode(data.qrCode);
      }
    } catch (error) {
      console.error('[Subscribe] Error:', error);
      alert(error instanceof Error ? error.message : '订阅失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const [showQRCode, setShowQRCode] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            AI 智能出题订阅
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            解锁全部功能，让 AI 帮你生成高质量试卷
          </p>
        </div>

        {/* 定价卡片 */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* 头部 */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold">基础版</h2>
              <div className="mt-4 flex items-baseline justify-center">
                <span className="text-6xl font-extrabold tracking-tight">¥{PLAN_PRICE}</span>
                <span className="ml-2 text-2xl font-medium">/年</span>
              </div>
              <p className="mt-2 text-indigo-100">超值优惠，无限次生成试卷</p>
            </div>
          </div>

          {/* 功能列表 */}
          <div className="px-8 py-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">包含功能：</h3>
            <ul className="space-y-4">
              {PLAN_FEATURES.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3 text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* 支付方式选择 */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">选择支付方式：</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('alipay')}
                  className={`flex items-center justify-center px-6 py-4 border-2 rounded-xl transition-all ${
                    paymentMethod === 'alipay'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1677FF">
                    <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM12 6a3 3 0 110 6 3 3 0 010-6zm0 8c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4z"/>
                  </svg>
                  <span className="ml-2 font-medium">支付宝</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wechat')}
                  className={`flex items-center justify-center px-6 py-4 border-2 rounded-xl transition-all ${
                    paymentMethod === 'wechat'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#07C160">
                    <path d="M8.5 13.5l2.5 3 4.5-5.5M17 3H7a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4z"/>
                  </svg>
                  <span className="ml-2 font-medium">微信支付</span>
                </button>
              </div>
            </div>

            {/* 订阅按钮 */}
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={loading}
              className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {loading ? '处理中...' : `立即订阅 ¥${PLAN_PRICE}/年`}
            </button>

            {/* 说明文字 */}
            <p className="mt-4 text-center text-sm text-gray-500">
              订阅后立即生效，有效期 1 年
              <br />
              支持 7 天无理由退款
            </p>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => router.push('/quiz-generator')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← 返回智能出题
          </button>
        </div>
      </div>

      {/* 二维码支付弹窗 */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-center mb-4">扫码支付</h3>
            <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300">
              <img src={showQRCode} alt="支付二维码" className="w-full" />
            </div>
            <p className="mt-4 text-center text-gray-600">
              请使用{paymentMethod === 'alipay' ? '支付宝' : '微信'}扫描二维码完成支付
            </p>
            <button
              type="button"
              onClick={() => {
                setShowQRCode(null);
                router.push('/quiz-generator');
              }}
              className="mt-6 w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-indigo-700"
            >
              支付完成
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
