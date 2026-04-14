import { getAllPosts } from "@/lib/content-loader";
import { ArticleCard } from "@/components/ArticleCard";

export const dynamic = "force-static";

export const metadata = {
  title: "投资笔记 — DevFox AI",
  description: "价值投资与市场观察。",
};

export default async function InvestingPage() {
  const posts = await getAllPosts("investing");

  return (
    <div className="max-w-[680px] mx-auto px-5 sm:px-8 py-16">
      <header className="mb-10">
        <h1 className="text-xl font-semibold tracking-tight mb-2">投资笔记</h1>
        <p className="text-xs text-[var(--text-muted)]">价值投资与市场观察</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">暂无文章。</p>
      ) : (
        <div>
          {posts.map((post) => (
            <ArticleCard
              key={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              readingTime={post.readingTime}
              tags={post.tags}
              href={`/investing/${post.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
