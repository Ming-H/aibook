import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background-primary)]">
      {/* Hero Section - Product First */}
      <section className="relative px-6 py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            {/* Slogan - Bold & Minimal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text-primary)] mb-6 leading-tight">
              DevFox AI
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">
                独立开发者的 AI 实验室
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed">
              探索 AI 技术的实用边界，为创造者构建高效工具
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/prompts"
                className="btn-primary px-10 py-4 inline-flex items-center gap-2 font-mono text-lg font-bold"
              >
                <span>探索工具</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="btn-secondary px-10 py-4 font-mono text-lg font-bold"
              >
                关于我们
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase - Hero Products */}
      <section className="relative px-6 py-16 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-4 font-mono tracking-tight">
              精选产品
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              为创造者、开发者和创新者打造的 AI 工具与资源
            </p>
          </div>

          {/* Hero Product - Prompts Library */}
          <Link
            href="/prompts"
            className="block mb-8 card-interactive card p-8 md:p-12 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-mono text-sm font-bold mb-4">
                    <span>⭐</span>
                    <span>精选</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-4 font-mono group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all">
                    提示词灵感库
                  </h3>
                  <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed max-w-2xl">
                    精心策划的 AI 提示词收藏，为创意提供灵感。浏览数百个专业设计的提示词，涵盖写作、编码、设计等领域
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="tag font-mono text-sm">创意写作</span>
                    <span className="tag font-mono text-sm">代码生成</span>
                    <span className="tag font-mono text-sm">设计提示</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-2xl border-4 border-[var(--border-medium)] bg-[var(--background-tertiary)] text-5xl md:text-6xl group-hover:scale-110 group-hover:rotate-5 transition-all duration-300">
                    💡
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quiz Generator */}
            <Link
              href="/quiz-generator"
              className="card-interactive card p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[var(--border-medium)] bg-[var(--background-tertiary)] text-4xl group-hover:scale-110 group-hover:rotate-5 transition-all duration-300">
                  ✨
                </div>
                <h3 className="text-2xl font-black text-[var(--text-primary)] mb-3 font-mono group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all">
                  测题生成器
                </h3>
                <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                  基于 GLM-4.7 的 AI 测题工具，从任何内容中自动生成题目
                </p>
                <div className="flex gap-2">
                  <span className="tag font-mono text-xs">GLM-4.7</span>
                  <span className="tag font-mono text-xs">教育</span>
                </div>
              </div>
            </Link>

            {/* Creative Workshop */}
            <Link
              href="/creative-workshop"
              className="card-interactive card p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[var(--border-medium)] bg-[var(--background-tertiary)] text-4xl group-hover:scale-110 group-hover:rotate-5 transition-all duration-300">
                  🎨
                </div>
                <h3 className="text-2xl font-black text-[var(--text-primary)] mb-3 font-mono group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all">
                  创意工坊
                </h3>
                <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                  基于 ModelScope 的 AI 图像生成，用文字创作精美视觉作品
                </p>
                <div className="flex gap-2">
                  <span className="tag font-mono text-xs">ModelScope</span>
                  <span className="tag font-mono text-xs">AI 艺术</span>
                </div>
              </div>
            </Link>

            {/* Image Tools */}
            <Link
              href="/image-tools"
              className="card-interactive card p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[var(--border-medium)] bg-[var(--background-tertiary)] text-4xl group-hover:scale-110 group-hover:rotate-5 transition-all duration-300">
                  🖼️
                </div>
                <h3 className="text-2xl font-black text-[var(--text-primary)] mb-3 font-mono group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 group-hover:bg-clip-text transition-all">
                  图片工具
                </h3>
                <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                  纯前端图片处理工具，在浏览器中裁剪、转换和优化图片
                </p>
                <div className="flex gap-2">
                  <span className="tag font-mono text-xs">Canvas API</span>
                  <span className="tag font-mono text-xs">无需服务器</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Content Channels */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-4 font-mono tracking-tight">
              内容中心
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              探索 AI 洞察、教程和行业动态
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔥',
                title: '每日 AI 热点',
                desc: '每日 20+ 条 AI 行业动态，涵盖突破性创新、技术进展和产品发布',
                href: '/daily',
                gradient: 'from-red-500 to-orange-500',
              },
              {
                icon: '📚',
                title: '系列学习',
                desc: '结构化学习路径，10+ 系列内容涵盖 LLM、RAG、Agent 等领域',
                href: '/series',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: '📖',
                title: '书籍摘要',
                desc: '精心策划的书籍摘要，涵盖技术、商业和个人发展领域',
                href: '/book-digest',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: '📁',
                title: '内容归档',
                desc: '浏览所有历史内容，支持搜索、标签和分类筛选',
                href: '/archive',
                gradient: 'from-purple-500 to-pink-500',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-interactive card p-6 group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-primary)] mb-3 font-mono group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-transparent group-hover:to-current transition-all">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Aggregation */}
      <section className="relative px-6 py-16 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-2 font-mono tracking-tight">
                最新内容
              </h2>
              <p className="text-[var(--text-secondary)]">
                每日更新的 AI 洞察和教程
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-md font-mono text-[var(--text-primary)] border-2 border-[var(--border-subtle)] hover:bg-[var(--background-tertiary)] hover:border-[var(--border-default)] transition-all duration-200 font-bold"
            >
              <span>查看全部</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📝',
                title: '所有文章',
                desc: 'AI 技术文章和教程的完整合集',
                href: '/blog',
              },
              {
                icon: '🏢',
                title: '项目展示',
                desc: '开源项目和产品展示',
                href: '/projects',
              },
              {
                icon: '🛒',
                title: '产品服务',
                desc: '优质 AI 工具和服务',
                href: '/products',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-interactive card p-6 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 font-mono">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Minimal & Direct */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-6 font-mono tracking-tight">
            准备好了吗？
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            开启您的 AI 工具与资源探索之旅
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/prompts"
              className="btn-primary px-10 py-4 inline-flex items-center gap-2 font-mono text-lg font-bold"
            >
              <span>立即开始</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="btn-secondary px-10 py-4 font-mono text-lg font-bold"
            >
              关于创作者
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
