import { getAllTools } from "@/lib/tools-loader";

export const dynamic = "force-static";

export const metadata = {
  title: "工具 & 项目 — DevFox AI",
  description: "开发的开源工具和项目。",
};

export default function ToolsPage() {
  const tools = getAllTools();
  const categories = [...new Set(tools.map((t) => t.category).filter(Boolean))];

  return (
    <div className="max-w-[720px] mx-auto px-5 sm:px-8 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-3">工具 & 项目</h1>
        <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
          开源工具、Claude Skills 和自动化项目。
        </p>
      </header>

      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat);
        return (
          <section key={cat} className="mb-10">
            <h2 className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-4">{cat}</h2>
            <div className="space-y-0">
              {catTools.map((tool) => (
                <a
                  key={tool.slug}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 border-b border-[var(--border-subtle)] group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{tool.icon}</span>
                    <div>
                      <h3 className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[var(--text-muted)] text-xs ml-4">→</span>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
