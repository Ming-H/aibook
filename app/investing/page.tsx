import { getAllPosts } from "@/lib/content-loader";
import { ArticleCard } from "@/components/ArticleCard";

export const dynamic = "force-static";

export const metadata = {
  title: "投资笔记 — 极客狐 DevFox",
  description: "价值投资与市场观察，一个理工科背景投资者的思考笔记。",
};

export default async function InvestingPage() {
  const posts = await getAllPosts("investing");

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">投资笔记</h1>
        <p className="text-[var(--text-secondary)]">价值投资与市场观察</p>
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
              href={`/investing/${post.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
