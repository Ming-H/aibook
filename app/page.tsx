import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[var(--background-primary)]">
      {/* Hero Section - Apple Style */}
      <section className="relative px-6 py-32 md:py-48 lg:py-64 overflow-hidden">
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            {/* Hero Title - BOLD & MINIMAL */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight text-[var(--text-primary)] mb-8 leading-[1.05]">
              DevFox AI
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 font-normal text-[var(--text-secondary)]">
                独立开发者的 AI 实验室
              </span>
            </h1>

            {/* Subtitle - Clean & Simple */}
            <p className="text-xl md:text-2xl lg:text-3xl text-[var(--text-secondary)] mb-16 max-w-3xl mx-auto leading-relaxed font-normal">
              探索 AI 技术的实用边界
              <br />
              <span className="text-lg md:text-xl lg:text-2xl">为创造者构建高效工具</span>
            </p>

            {/* CTA Buttons - Apple Style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/prompts"
                className="group relative px-8 py-4 bg-[var(--text-primary)] text-[var(--background-primary)] rounded-full font-medium text-lg transition-all hover:scale-105 hover:shadow-lg"
              >
                探索工具
                <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 text-[var(--text-primary)] rounded-full font-medium text-lg transition-all hover:bg-[var(--background-secondary)]"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase - Minimal Cards */}
      <section className="relative px-6 py-24 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight">
              精选产品
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-normal">
              为创造者打造的智能工具
            </p>
          </div>

          {/* Hero Product - Large Card */}
          <Link
            href="/prompts"
            className="block mb-8 bg-white dark:bg-[var(--background-primary)] rounded-3xl p-10 md:p-16 group transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-10">
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-[var(--background-secondary)] rounded-full text-sm font-medium mb-6 text-[var(--text-secondary)]">
                  ⭐ 精选推荐
                </div>
                <h3 className="text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:bg-clip-text transition-all">
                  提示词灵感库
                </h3>
                <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed max-w-2xl font-normal">
                  精心策划的 AI 提示词收藏。浏览数百个专业设计的提示词，涵盖写作、编码、设计等领域
                </p>
                <div className="flex flex-wrap gap-3">
                  {['创意写作', '代码生成', '设计提示'].map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-[var(--background-secondary)] rounded-full text-sm font-medium text-[var(--text-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-6xl md:text-7xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                  💡
                </div>
              </div>
            </div>
          </Link>

          {/* Product Grid - Clean Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '✨',
                title: '测题生成器',
                desc: '基于 GLM-4.7 的 AI 测题工具',
                tags: ['GLM-4.7', '教育'],
                href: '/quiz-generator',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: '🎨',
                title: '创意工坊',
                desc: 'AI 图像生成，用文字创作视觉作品',
                tags: ['ModelScope', 'AI 艺术'],
                href: '/creative-workshop',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: '🖼️',
                title: '图片工具',
                desc: '纯前端图片处理，浏览器中优化',
                tags: ['Canvas API', '无需服务器'],
                href: '/image-tools',
                gradient: 'from-orange-500 to-red-500',
              },
            ].map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group bg-white dark:bg-[var(--background-primary)] rounded-3xl p-10 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background-tertiary)] text-5xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {product.icon}
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                  {product.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed font-normal">
                  {product.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[var(--background-secondary)] rounded-full text-xs font-medium text-[var(--text-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content Hub - Minimal Grid */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight">
              内容中心
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-normal">
              探索 AI 洞察、教程和行业动态
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔥',
                title: '每日 AI 热点',
                desc: '每日 20+ 条 AI 行业动态',
                href: '/daily',
              },
              {
                icon: '📚',
                title: '系列学习',
                desc: '结构化学习路径，10+ 系列内容',
                href: '/series',
              },
              {
                icon: '📖',
                title: '书籍摘要',
                desc: '精选书籍摘要，技术商业前沿',
                href: '/book-digest',
              },
              {
                icon: '📁',
                title: '内容归档',
                desc: '浏览所有历史内容',
                href: '/archive',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white dark:bg-[var(--background-primary)] rounded-3xl p-8 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section - Clean Layout */}
      <section className="relative px-6 py-24 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-semibold text-[var(--text-primary)] mb-4 tracking-tight">
                最新内容
              </h2>
              <p className="text-xl text-[var(--text-secondary)] font-normal">
                每日更新的 AI 洞察和教程
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[var(--text-primary)] transition-all hover:bg-[var(--background-primary)]"
            >
              查看全部
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m-4-4H3" />
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
                className="group bg-white dark:bg-[var(--background-primary)] rounded-3xl p-10 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] font-normal">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Clean & Direct */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[var(--text-primary)] mb-8 tracking-tight">
            准备好了吗？
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto font-normal">
            开启您的 AI 工具与资源探索之旅
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/prompts"
              className="group px-10 py-5 bg-[var(--text-primary)] text-[var(--background-primary)] rounded-full font-semibold text-xl transition-all hover:scale-105 hover:shadow-xl"
            >
              立即开始
              <svg className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="px-10 py-5 text-[var(--text-primary)] rounded-full font-semibold text-xl transition-all hover:bg-[var(--background-secondary)]"
            >
              关于创作者
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
