import Link from 'next/link';

export function CTA() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-[1200px] text-center">
        <h2
          className="mx-auto max-w-[600px] font-bold leading-[1.00]"
          style={{
            fontSize: 'clamp(32px, 4.5vw, 54px)',
            letterSpacing: '-1.875px',
            color: 'rgba(0, 0, 0, 0.95)',
            fontFeatureSettings: '"lnum" 1, "locl" 1',
          }}
        >
          推进你的 AI 项目
        </h2>

        <p
          className="mx-auto mt-4 max-w-[480px]"
          style={{
            fontSize: '20px',
            lineHeight: 1.40,
            letterSpacing: '-0.125px',
            fontWeight: 600,
            color: '#615d59',
          }}
        >
          从一次对话开始，把想法变成可运行的产品
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            联系合作
          </Link>
          <Link href="/about" className="btn-secondary">
            了解背景
          </Link>
        </div>
      </div>
    </section>
  );
}
