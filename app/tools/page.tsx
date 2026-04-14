import { getAllTools } from "@/lib/tools-loader";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata = {
  title: "工具 & 项目 — 极客狐 DevFox",
  description: "我开发的开源和闭源工具项目。",
};

export default function ToolsPage() {
  const tools = getAllTools();
  const openSource = tools.filter((t) => t.type === "open-source");
  const closedSource = tools.filter((t) => t.type === "closed-source");

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">工具 & 项目</h1>
        <p className="text-[var(--text-secondary)]">我开发的工具和项目</p>
      </header>

      {tools.length === 0 ? (
        <p className="text-[var(--text-secondary)]">暂无工具。</p>
      ) : (
        <>
          {openSource.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">开源项目</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {openSource.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          )}
          {closedSource.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">其他项目</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {closedSource.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function ToolCard({ tool }: { tool: ReturnType<typeof getAllTools>[0] }) {
  return (
    <Link
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors"
    >
      <div className="text-2xl mb-2">{tool.icon}</div>
      <h3 className="font-semibold mb-1">{tool.title}</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-3">{tool.description}</p>
      <div className="flex gap-1.5 flex-wrap">
        {tool.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[var(--background-tertiary)] text-[var(--text-secondary)]">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
