import { getAllTools } from "@/lib/tools-loader";

export const dynamic = "force-static";

export const metadata = {
  title: "开源工具 — DevFox AI",
  description: "开发的开源和闭源工具项目。",
};

export default function ToolsPage() {
  const tools = getAllTools();

  return (
    <div className="max-w-[680px] mx-auto px-5 sm:px-8 py-16">
      <header className="mb-10">
        <h1 className="text-xl font-semibold tracking-tight mb-2">工具 & 项目</h1>
        <p className="text-xs text-[var(--text-muted)]">开发中的工具和项目</p>
      </header>

      {tools.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">暂无工具。</p>
      ) : (
        <div className="space-y-0">
          {tools.map((tool) => (
            <a
              key={tool.slug}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-4 border-b border-[var(--border-subtle)] group"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{tool.icon}</span>
                <div>
                  <h3 className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{tool.description}</p>
                </div>
              </div>
              <span className="text-[var(--text-muted)] text-xs">→</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
