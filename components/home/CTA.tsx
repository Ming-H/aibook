'use client';

import Link from 'next/link';

export function CTA() {
  return (
    <section className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-section">
        <div className="surface-panel overflow-hidden rounded-[36px] p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,167,255,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(184,242,119,0.12),transparent_28%)]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <span className="eyebrow">Start the rebuild</span>
              <h2 className="section-heading mt-8">
                你的项目已经够强，
                <br />
                网站不应该继续拖后腿。
              </h2>
              <p className="section-copy mt-6 max-w-2xl">
                如果你要把 AI Agent、自动化能力和产品思维更专业地展示给外界，现在就该让官网的表达能力追上你的实际水平。
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link href="/contact" className="btn-primary rounded-full px-8 py-3.5 text-sm font-semibold">
                联系我开始重构
              </Link>
              <Link href="/about" className="btn-secondary rounded-full px-8 py-3.5 text-sm font-semibold">
                先了解我的背景
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
