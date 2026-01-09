import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/50 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-blue-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/50">
            <span className="text-2xl">🤖</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
              AI Hot Tech
            </span>
            <span className="text-xs text-slate-500">每日 AI 技术热点</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="relative px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:text-white rounded-xl hover:bg-white/5"
          >
            首页
          </Link>
          <Link
            href="/archive"
            className="relative px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:text-white rounded-xl hover:bg-white/5"
          >
            归档
          </Link>
        </nav>

        {/* 移动端菜单按钮 */}
        <button className="md:hidden inline-flex items-center justify-center rounded-xl p-2.5 text-slate-400 hover:bg-white/5 hover:text-white transition-all">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
