import { getAllPosts } from "@/lib/content-loader";
import { ArticleCard } from "@/components/ArticleCard";

export const dynamic = "force-static";

export const metadata = {
  title: "技术博客 — DevFox AI",
  description: "AI 技术实践与深度思考。",
};

export default async function BlogPage() {
  const posts = await getAllPosts("blog");

  return (
    <div className="max-w-[720px] mx-auto px-5 sm:px-8 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-3">技术博客</h1>
        <p className="text-[15px] text-[var(--text-tertiary)] leading-relaxed">AI 技术的实践与思考</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-base text-[var(--text-muted)]">暂无文章。</p>
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
              href={`/blog/${post.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
