'use client';

import Link from 'next/link';

export function Hero() {
  return (
    <section className="bg-white px-6 pb-20 pt-24 sm:pt-32">
      <div className="mx-auto max-w-[1200px] text-center">
        {/* Badge */}
        <span
          className="inline-block rounded-full px-3 py-1 text-[12px] font-semibold"
          style={{
            background: '#f2f9ff',
            color: '#097fe8',
            letterSpacing: '0.125px',
          }}
        >
          AI Agent delivery
        </span>

        {/* Headline */}
        <h1
          className="mx-auto mt-6 max-w-[800px] font-bold leading-[1.00]"
          style={{
            fontSize: 'clamp(32px, 5vw, 64px)',
            letterSpacing: '-2.125px',
            color: 'rgba(0, 0, 0, 0.95)',
            fontFeatureSettings: '"lnum" 1, "locl" 1',
          }}
        >
          帮助企业落地 AI Agent 与可运行的 AI 应用
        </h1>

        {/* Subtitle */}
        <p
          className="mx-auto mt-6 max-w-[560px]"
          style={{
            fontSize: '20px',
            lineHeight: 1.40,
            letterSpacing: '-0.125px',
            fontWeight: 600,
            color: '#615d59',
          }}
        >
          从需求分析、Agent 架构设计到开发部署上线，完成 AI Agent 和智能应用的完整交付
        </p>

        {/* CTAs */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/cases" className="btn-primary">
            查看代表项目
          </Link>
          <Link href="/contact" className="btn-secondary">
            发起合作沟通
          </Link>
        </div>

        {/* Agent Screenshot */}
        <div
          className="mx-auto mt-16 w-full max-w-[780px] overflow-hidden"
          style={{
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            boxShadow: 'rgba(0,0,0,0.04) 0px 4px 18px, rgba(0,0,0,0.027) 0px 2px 7.85px, rgba(0,0,0,0.02) 0px 0.8px 2.93px',
          }}
        >
          <div
            className="flex items-center justify-center bg-[#f6f5f4]"
            style={{ aspectRatio: '16/10' }}
          >
            <div className="text-center">
              <div
                className="font-bold text-[rgba(0,0,0,0.95)]"
                style={{ fontSize: '22px', letterSpacing: '-0.25px', lineHeight: 1.27 }}
              >
                GrowthPilot Agent
              </div>
              <div className="mt-2 text-[14px] font-normal text-[#a39e98]">
                Agent 界面截图将展示于此
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
