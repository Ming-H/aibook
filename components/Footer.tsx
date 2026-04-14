import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--background-primary)]">
      <div className="mx-auto max-w-wide px-5 sm:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            &copy; 2026 极客狐 DevFox
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://x.com/devfox_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              Twitter/X
            </a>
            <a
              href="https://github.com/devfox-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/rss.xml"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
