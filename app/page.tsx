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
                <span>Explore Tools</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="btn-secondary px-10 py-4 font-mono text-lg font-bold"
              >
                About DevFox
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
              Featured Products
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              AI-powered tools and resources for creators, developers, and innovators
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
                    <span>Featured</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-4 font-mono group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all">
                    Prompts Library
                  </h3>
                  <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed max-w-2xl">
                    Curated collection of AI prompts for creative inspiration. Browse hundreds of expertly crafted prompts across writing, coding, design, and more.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="tag font-mono text-sm">Creative Writing</span>
                    <span className="tag font-mono text-sm">Code Generation</span>
                    <span className="tag font-mono text-sm">Design Prompts</span>
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
            {/* Skillset */}
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
                  Quiz Generator
                </h3>
                <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                  AI-powered quiz creation tool. Generate questions from any content with GLM-4.7
                </p>
                <div className="flex gap-2">
                  <span className="tag font-mono text-xs">GLM-4.7</span>
                  <span className="tag font-mono text-xs">Education</span>
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
                  Creative Workshop
                </h3>
                <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                  AI image generation with ModelScope. Create stunning visuals with text-to-image
                </p>
                <div className="flex gap-2">
                  <span className="tag font-mono text-xs">ModelScope</span>
                  <span className="tag font-mono text-xs">AI Art</span>
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
                  Image Tools
                </h3>
                <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                  Pure frontend image processing. Crop, convert, and optimize images in your browser
                </p>
                <div className="flex gap-2">
                  <span className="tag font-mono text-xs">Canvas API</span>
                  <span className="tag font-mono text-xs">No Server</span>
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
              Content Hub
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Explore AI insights, tutorials, and industry updates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔥',
                title: 'Daily AI Hot Tech',
                desc: '20+ daily AI industry updates covering breakthroughs, innovations, and product launches',
                href: '/daily',
                gradient: 'from-red-500 to-orange-500',
              },
              {
                icon: '📚',
                title: 'Series Learning',
                desc: 'Structured learning paths with 10+ series on LLM, RAG, Agents, and more',
                href: '/series',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: '📖',
                title: 'Book Digests',
                desc: 'Curated book summaries on technology, business, and personal development',
                href: '/book-digest',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: '📁',
                title: 'Archive',
                desc: 'Browse all historical content with search, tags, and categorization',
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
                Latest Content
              </h2>
              <p className="text-[var(--text-secondary)]">
                Fresh AI insights and tutorials delivered daily
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-md font-mono text-[var(--text-primary)] border-2 border-[var(--border-subtle)] hover:bg-[var(--background-tertiary)] hover:border-[var(--border-default)] transition-all duration-200 font-bold"
            >
              <span>View All</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📝',
                title: 'All Articles',
                desc: 'Complete collection of AI technology articles and tutorials',
                href: '/blog',
              },
              {
                icon: '🏢',
                title: 'Projects',
                desc: 'Open source projects and product showcases',
                href: '/projects',
              },
              {
                icon: '🛒',
                title: 'Products',
                desc: 'Premium AI tools and services',
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
            Ready to Explore?
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            Start your journey with AI-powered tools and resources
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/prompts"
              className="btn-primary px-10 py-4 inline-flex items-center gap-2 font-mono text-lg font-bold"
            >
              <span>Get Started</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="btn-secondary px-10 py-4 font-mono text-lg font-bold"
            >
              About the Creator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
