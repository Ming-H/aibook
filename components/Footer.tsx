import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] mt-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; 2026 DevFox AI
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/MingFire520"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              Twitter/X
            </a>
            <a
              href="https://github.com/Ming-H"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/rss.xml"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
