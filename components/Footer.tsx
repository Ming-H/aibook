import Link from 'next/link';

const footerLinks = {
  services: [
    { label: 'AI 落地应用 & Agent 开发', href: '/services#ai-application' },
    { label: 'AI 培训 & 咨询', href: '/services#ai-training' },
  ],
  company: [
    { label: '案例', href: '/cases' },
    { label: '关于', href: '/about' },
    { label: '联系', href: '/contact' },
  ],
  resources: [
    { label: 'AI Insights', href: 'https://ming-h.github.io/ai-insights/' },
    { label: 'GitHub', href: 'https://github.com/Ming-H' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--background-primary)]">
      {/* Gradient top border */}
      <div className="divider-gradient" />

      <div className="mx-auto max-w-nav px-5 sm:px-8 py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-[15px] font-bold tracking-tight text-[var(--text-primary)]">
              DevFox AI
            </Link>
            <p className="mt-4 text-sm text-[var(--text-tertiary)] leading-relaxed">
              用 AI 重新定义业务效率
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[0.7rem] font-semibold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-4">
              服务
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[0.7rem] font-semibold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-4">
              导航
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[0.7rem] font-semibold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-4">
              资源
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors inline-flex items-center gap-1.5"
                  >
                    {link.label}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} DevFox AI. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Built with Next.js &middot; Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
