import Link from 'next/link';

const products = [
  {
    name: 'GrowthPilot',
    subtitle: '增长决策 Agent',
    description: '基于数据分析的智能增长决策系统，自动追踪关键指标并提供可执行的建议',
    href: '/cases',
  },
  {
    name: 'Smart Sales',
    subtitle: '销售对话 Agent',
    description: 'AI 驱动的销售对话助手，实时分析客户意图，优化沟通策略与转化路径',
    href: '/cases',
  },
  {
    name: 'ContentForge',
    subtitle: '内容自动化系统',
    description: '从内容创作到分发全链路自动化，覆盖选题、撰写、排版和多平台发布',
    href: '/cases',
  },
];

export function ProductShowcase() {
  return (
    <section className="bg-[#f6f5f4] px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        {/* Section Title */}
        <h2
          className="text-center font-bold leading-[1.00]"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            letterSpacing: '-1.5px',
            color: 'rgba(0, 0, 0, 0.95)',
            fontFeatureSettings: '"lnum" 1, "locl" 1',
          }}
        >
          为不同场景构建的 AI Agent
        </h2>

        {/* Product Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex flex-col overflow-hidden bg-white"
              style={{
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                boxShadow: 'rgba(0,0,0,0.04) 0px 4px 18px, rgba(0,0,0,0.027) 0px 2px 7.85px, rgba(0,0,0,0.02) 0px 0.8px 2.93px',
              }}
            >
              {/* Screenshot Area */}
              <div
                className="flex items-center justify-center bg-[#f6f5f4]"
                style={{ aspectRatio: '4/3' }}
              >
                <div className="text-center">
                  <div
                    className="font-bold text-[rgba(0,0,0,0.95)]"
                    style={{ fontSize: '22px', letterSpacing: '-0.25px', lineHeight: 1.27 }}
                  >
                    {product.name}
                  </div>
                  <div className="mt-1 text-[14px] font-normal text-[#a39e98]">
                    {product.subtitle}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-6">
                <h3
                  className="font-bold text-[rgba(0,0,0,0.95)]"
                  style={{ fontSize: '22px', letterSpacing: '-0.25px', lineHeight: 1.27 }}
                >
                  {product.name}
                </h3>
                <p
                  className="mt-2 flex-1 text-[16px] font-normal leading-[1.50] text-[#615d59]"
                >
                  {product.description}
                </p>
                <div className="mt-4">
                  <Link
                    href={product.href}
                    className="text-[15px] font-semibold no-underline hover:underline"
                    style={{ color: '#0075de' }}
                  >
                    了解更多 →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
