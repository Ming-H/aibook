import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24">
      <div className="mx-auto max-w-[720px] px-5 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[var(--text-muted)]">
            &copy; 2026 DevFox
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://Ming-H.github.io/ai-insights/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              AI Insights
            </a>
            <a
              href="https://twitter.com/MingFire520"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://github.com/Ming-H"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/rss.xml"
              className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
