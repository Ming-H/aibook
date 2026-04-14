"use client";

import { useState } from "react";

interface PromptItem {
  slug: string;
  title: string;
  prompt: string;
  category: string;
  tags: string[];
  tool: string;
}

export function PromptsClient({ items, categories }: { items: PromptItem[]; categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const filtered = activeCategory ? items.filter((i) => i.category === activeCategory) : items;

  const copyPrompt = (slug: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`tag ${!activeCategory ? "border-[var(--text-secondary)] text-[var(--text-secondary)]" : ""}`}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`tag ${activeCategory === cat ? "border-[var(--text-secondary)] text-[var(--text-secondary)]" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prompt list */}
      <div className="space-y-0">
        {filtered.map((item) => (
          <div key={item.slug} className="py-5 border-b border-[var(--border-subtle)]">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-base text-[var(--text-secondary)]">{item.title}</h3>
              <button
                onClick={() => copyPrompt(item.slug, item.prompt)}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors whitespace-nowrap flex-shrink-0"
              >
                {copiedSlug === item.slug ? "已复制 ✓" : "复制"}
              </button>
            </div>
            <pre className="text-sm text-[var(--text-tertiary)] bg-[var(--background-code)] border border-[var(--border-default)] rounded p-3 mt-3 whitespace-pre-wrap break-all leading-relaxed font-sans">
              {item.prompt}
            </pre>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs text-[var(--text-muted)]">工具: {item.tool}</span>
              <div className="flex gap-1">
                {item.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
