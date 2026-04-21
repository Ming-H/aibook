import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseMarkdown } from './markdown-parser';

export interface BookMetadata {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  version: string;
  keywords: string[];
  audience: string;
  readingTime: string;
  wordCount: number;
}

export interface Book extends BookMetadata {
  contentHtml: string;
  headings: Array<{ level: number; text: string; id: string }>;
}

const booksDirectory = path.join(process.cwd(), 'content', 'books');

export function getAllBooks(): BookMetadata[] {
  if (!fs.existsSync(booksDirectory)) return [];

  const slugs = fs.readdirSync(booksDirectory).filter((name) => {
    const manuscriptPath = path.join(booksDirectory, name, 'manuscript.md');
    return fs.existsSync(manuscriptPath);
  });

  const books = slugs.map((slug) => {
    const filePath = path.join(booksDirectory, slug, 'manuscript.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const readTime = Math.max(1, Math.ceil(content.length / 500));

    const keywordsRaw = data.keywords || '';
    const keywords = typeof keywordsRaw === 'string'
      ? keywordsRaw.split('·').map((k: string) => k.trim()).filter(Boolean)
      : Array.isArray(keywordsRaw) ? keywordsRaw : [];

    return {
      slug,
      title: data.title || slug,
      subtitle: data.subtitle || '',
      author: data.author || '',
      version: data.version || '',
      keywords,
      audience: data.audience || '',
      readingTime: `${readTime} min`,
      wordCount: content.length,
    } as BookMetadata;
  });

  return books;
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const filePath = path.join(booksDirectory, slug, 'manuscript.md');
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  // Rewrite image paths: images/foo.png → /books/{slug}/images/foo.png
  const rewrittenContent = content.replace(
    /\]\(images\//g,
    `](/books/${slug}/images/`
  );

  const parsed = await parseMarkdown(rewrittenContent);

  const keywordsRaw = data.keywords || '';
  const keywords = typeof keywordsRaw === 'string'
    ? keywordsRaw.split('·').map((k: string) => k.trim()).filter(Boolean)
    : Array.isArray(keywordsRaw) ? keywordsRaw : [];

  return {
    slug,
    title: data.title || slug,
    subtitle: data.subtitle || '',
    author: data.author || '',
    version: data.version || '',
    keywords,
    audience: data.audience || '',
    readingTime: `${parsed.readTime} min`,
    wordCount: parsed.wordCount,
    contentHtml: parsed.html,
    headings: parsed.headings,
  };
}
