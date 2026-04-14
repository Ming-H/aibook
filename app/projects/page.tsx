import { getAllTools } from "@/lib/tools-loader";
import { getAllGalleryItems } from "@/lib/gallery-loader";
import { getAllPrompts } from "@/lib/prompts-loader";

export const dynamic = "force-static";

export const metadata = {
  title: "Projects — DevFox",
  description: "开源工具、AI 画廊和提示词库。",
};

export default function ProjectsPage() {
  const tools = getAllTools();
  const galleryItems = getAllGalleryItems();
  const prompts = getAllPrompts();

  return (
    <div className="max-w-[720px] mx-auto px-5 sm:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Projects</h1>
        <p className="text-[14px] text-[var(--text-tertiary)]">开源工具、AI 画廊与提示词库</p>
      </header>

      {/* Open Source Tools */}
      <section className="mb-12">
        <h2 className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] font-medium mb-6">Open Source</h2>
        <div>
          {tools.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">暂无工具。</p>
          ) : (
            tools.map((tool) => (
              <a
                key={tool.slug}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{tool.icon}</span>
                  <div>
                    <h3 className="text-[14px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-[12px] text-[var(--text-muted)] mt-0.5 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <span className="text-[var(--text-muted)] text-[12px] ml-4 flex-shrink-0">→</span>
              </a>
            ))
          )}
        </div>
      </section>

      {/* AI Gallery */}
      {galleryItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] font-medium mb-6">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.slug}
                className="aspect-[4/3] bg-[var(--background-secondary)] flex items-center justify-center text-[12px] text-[var(--text-muted)] p-3 text-center rounded-md"
                style={{ boxShadow: '0px 0px 0px 1px var(--border-default)' }}
              >
                <div>
                  <div className="text-base mb-1">{item.category === '3D微缩城市' ? '🏙️' : '🎨'}</div>
                  <span className="text-[13px] text-[var(--text-tertiary)]">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Prompts */}
      {prompts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] font-medium mb-6">Prompts</h2>
          <div>
            {prompts.map((p) => (
              <div
                key={p.slug}
                className="py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] text-[var(--text-secondary)]">{p.title}</span>
                  <span className="text-[11px] text-[var(--text-muted)]">{p.category}</span>
                </div>
                <p className="text-[12px] text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
                  {p.prompt.slice(0, 120)}...
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Links */}
      <section className="mb-12">
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
