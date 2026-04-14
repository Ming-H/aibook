import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseMarkdown } from './markdown-parser';
import type { Post, PostMetadata } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getAllPosts(section: 'blog'): Promise<PostMetadata[]> {
  const dir = path.join(contentDirectory, section);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const slug = filename.replace(/\.mdx?$/, '');

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || content.slice(0, 160).replace(/[#*`\n]/g, '').trim() + '...',
      tags: data.tags || [],
      readingTime: `${Math.max(1, Math.ceil(content.length / 500))} min`,
      coverImage: data.coverImage,
      published: data.published !== false,
    } as PostMetadata;
  });

  return posts
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(section: 'blog', slug: string): Promise<Post | null> {
  const dir = path.join(contentDirectory, section);
  if (!fs.existsSync(dir)) return null;

  const mdPath = path.join(dir, `${slug}.md`);
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const parsed = await parseMarkdown(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString().split('T')[0],
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    readingTime: `${parsed.readTime} min`,
    coverImage: data.coverImage,
    published: data.published !== false,
    contentHtml: parsed.html,
    headings: parsed.headings,
    wordCount: parsed.wordCount,
  };
}

export async function getAllTags(section: 'blog'): Promise<string[]> {
  const posts = await getAllPosts(section);
  const tagSet = new Set<string>();
  posts.forEach(p => p.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
