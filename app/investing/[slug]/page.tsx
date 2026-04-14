import { getPostBySlug, getAllPosts } from "@/lib/content-loader";
import { ArticleLayout } from "@/components/ArticleLayout";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts("investing");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug("investing", slug);
  if (!post) return { title: "未找到" };
  return {
    title: `${post.title} — 极客狐 DevFox`,
    description: post.excerpt,
  };
}

export default async function InvestingPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug("investing", slug);
  if (!post) notFound();

  return (
    <ArticleLayout
      title={post.title}
      date={post.date}
      readingTime={post.readingTime}
      tags={post.tags}
      contentHtml={post.contentHtml}
      headings={post.headings}
    />
  );
}
