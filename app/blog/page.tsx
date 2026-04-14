import { getAllPosts } from "@/lib/content-loader";
import { ArticleCard } from "@/components/ArticleCard";

export const dynamic = "force-static";

export const metadata = {
  title: "AI 技术博客 — 极客狐 DevFox",
  description: "分享 AI 技术、大语言模型、RAG、Agent 等前沿技术的实践与思考。",
};

export default async function BlogPage() {
  const posts = await getAllPosts("blog");

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">AI 技术博客</h1>
        <p className="text-[var(--text-secondary)]">分享 AI 技术的实践与思考</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-[var(--text-secondary)]">暂无文章，敬请期待。</p>
      ) : (
        <div className="space-y-4">
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
