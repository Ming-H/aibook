import Link from 'next/link';

const footerLinks = {
  navigate: [
    { label: '首页', href: '/' },
    { label: '服务', href: '/services' },
    { label: '案例', href: '/cases' },
    { label: '关于', href: '/about' },
  ],
  channels: [
    { label: '联系', href: '/contact' },
    { label: 'GitHub', href: 'https://github.com/Ming-H' },
    { label: 'AI Insights', href: 'https://ming-h.github.io/ai-insights/' },
  ],
};

export function Footer() {
  return (
    <footer className="px-5 pb-8 pt-6 sm:px-8">
      <div className="mx-auto max-w-nav rounded-[32px] border border-[var(--border-default)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%),var(--background-secondary)] px-6 py-10 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-accent-text)]">
              DevFox AI
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
              帮助企业与个人完成 AI Agent 和 AI 应用落地。
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
              聚焦 Agent 系统、自动化工作流、知识检索和智能应用开发，
              用务实工程方式把 AI 项目真正做出来。
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Navigate
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {footerLinks.navigate.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Channels
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {footerLinks.channels.map((link) => {
                const isExternal = link.href.startsWith('http');

                return isExternal ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} DevFox AI. AI Agent and application delivery.</p>
          <p>Next.js · Tailwind CSS · AI project showcase</p>
        </div>
      </div>
    </footer>
  );
}
