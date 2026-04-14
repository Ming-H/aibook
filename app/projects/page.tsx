import { getAllTools } from "@/lib/tools-loader";
import { getAllGalleryItems } from "@/lib/gallery-loader";

export const dynamic = "force-static";

export const metadata = {
  title: "Projects — DevFox AI",
  description: "开源项目、工具与 AI 画廊。",
};

export default function ProjectsPage() {
  const tools = getAllTools();
  const galleryItems = getAllGalleryItems();

  // Group tools by category
  const categories = [...new Set(tools.map((t) => t.category).filter(Boolean))];

  return (
    <div className="max-w-[720px] mx-auto px-5 sm:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-2xl font-semibold tracking-tight mb-3">Projects</h1>
        <p className="text-[14px] text-[var(--text-tertiary)]">我开发的开源项目和工具</p>
      </header>

      {/* All Projects */}
      <section className="mb-14">
        <h2 className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] font-medium mb-6">Open Source</h2>
        <div>
          {tools.map((tool) => (
            <a
              key={tool.slug}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-5 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{tool.icon}</span>
                  <div>
                    <h3 className="text-[15px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors font-medium">
                      {tool.title}
                    </h3>
                    <p className="text-[13px] text-[var(--text-tertiary)] mt-1 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] text-[var(--text-muted)]">
                        {tool.url.includes('github.com') ? 'GitHub' : 'Website'}
                      </span>
                      {tool.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[var(--text-muted)] text-[13px] mt-1 flex-shrink-0">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* AI Gallery */}
      {galleryItems.length > 0 && (
        <section className="mb-14">
          <h2 className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] font-medium mb-6">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.slug}
                className="aspect-[4/3] bg-[var(--background-secondary)] flex items-center justify-center p-3 text-center rounded-md"
                style={{ boxShadow: '0px 0px 0px 1px var(--border-default)' }}
              >
                <div>
                  <div className="text-lg mb-1">🏙️</div>
                  <span className="text-[13px] text-[var(--text-tertiary)]">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Links */}
      <section className="mb-14">
        <h2 className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] font-medium mb-6">Links</h2>
        <a
          href="https://Ming-H.github.io/ai-insights/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between py-4 group"
        >
          <div>
            <span className="text-[14px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
              AI Insights
            </span>
            <p className="text-[12px] text-[var(--text-muted)] mt-0.5">每日 AI 行业动态速览</p>
          </div>
          <span className="text-[var(--text-muted)] text-[12px]">→</span>
        </a>
      </section>
    </div>
  );
}
