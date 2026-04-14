import { getAllGalleryItems, getGalleryCategories } from "@/lib/gallery-loader";

export const dynamic = "force-static";

export const metadata = {
  title: "AI 画廊 — DevFox AI",
  description: "AI 生成的图片作品集，展示 3D 城市、插画、商业设计等系列。",
};

export default function GalleryPage() {
  const items = getAllGalleryItems();
  const categories = getGalleryCategories();

  return (
    <div className="max-w-[900px] mx-auto px-5 sm:px-8 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-3">AI 画廊</h1>
        <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
          用 AI 工具生成的图片作品集。每张图附带完整的 Prompt，可以一键复用。
        </p>
      </header>

      {categories.map((cat) => (
        <section key={cat} className="mb-12">
          <h2 className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-6">{cat}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items
              .filter((item) => item.category === cat)
              .map((item) => (
                <div
                  key={item.slug}
                  className="group border border-[var(--border-default)] rounded overflow-hidden hover:border-[var(--border-medium)] transition-colors"
                >
                  <div className="aspect-[4/3] bg-[var(--background-secondary)] flex items-center justify-center text-[var(--text-muted)] text-xs">
                    {item.title}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2">{item.description}</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}

      {items.length === 0 && (
        <p className="text-base text-[var(--text-muted)]">画廊内容即将上线。</p>
      )}
    </div>
  );
}
