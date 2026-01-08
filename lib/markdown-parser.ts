/**
 * Markdown 解析器 - 将 Markdown 转换为 HTML 并提取元数据
 */

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { visit } from "unist-util-visit";
import type { Heading, Root } from "mdast";
import type { Element, Root as HtmlRoot } from "hast";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface ParsedMarkdown {
  html: string;
  headings: Array<{
    level: number;
    text: string;
    id: string;
  }>;
  wordCount: number;
  readTime: number;
  frontmatter?: Record<string, any>;
}

/**
 * 解析 Markdown 内容
 */
export async function parseMarkdown(content: string): Promise<ParsedMarkdown> {
  // 提取 frontmatter
  const { data: frontmatter, content: markdownContent } = matter(content);

  // 计算阅读时间
  const stats = readingTime(markdownContent);

  // 处理 Markdown
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["anchor"],
      },
    })
    // .use(rehypeHighlight) // 暂时禁用代码高亮
    .use(rehypeStringify, { allowDangerousHtml: true });

  const result = await processor.process(markdownContent);
  const html = String(result.value);

  // 提取标题
  const headings = extractHeadings(result);

  return {
    html,
    headings,
    wordCount: stats.words,
    readTime: Math.ceil(stats.minutes),
    frontmatter: Object.keys(frontmatter).length > 0 ? frontmatter : undefined,
  };
}

/**
 * 从 Markdown AST 中提取标题
 */
function extractHeadings(result: any): Array<{ level: number; text: string; id: string }> {
  const headings: Array<{ level: number; text: string; id: string }> = [];

  visit(result as Root, "heading", (node: Heading) => {
    const text = extractTextFromHeading(node);
    const id = generateId(text);

    headings.push({
      level: node.depth,
      text,
      id,
    });
  });

  return headings;
}

/**
 * 从标题节点中提取文本
 */
function extractTextFromHeading(node: Heading): string {
  let text = "";

  for (const child of node.children) {
    if (child.type === "text") {
      text += child.value;
    } else if (child.type === "inlineCode") {
      text += `\`${child.value}\``;
    }
  }

  return text.trim();
}

/**
 * 生成标题 ID
 */
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * 从 frontmatter 中提取标签
 */
export function extractTagsFromFrontmatter(frontmatter?: Record<string, any>): string[] {
  if (!frontmatter) return [];

  // 尝试从不同字段中提取标签
  const tags = frontmatter.tags || frontmatter.tag || frontmatter.标签 || frontmatter.关键词;
  if (Array.isArray(tags)) {
    return tags.map((tag: any) => String(tag));
  }
  if (typeof tags === "string") {
    return tags.split(/[,，、]/).map((tag) => tag.trim()).filter(Boolean);
  }

  return [];
}

/**
 * 从 frontmatter 中提取字数
 */
export function extractWordCountFromFrontmatter(frontmatter?: Record<string, any>): number | undefined {
  if (!frontmatter) return undefined;

  const wordCount = frontmatter.wordCount || frontmatter.字数 || frontmatter.words;
  if (typeof wordCount === "number") {
    return wordCount;
  }
  if (typeof wordCount === "string") {
    const parsed = parseInt(wordCount.replace(/[^\d]/g, ""), 10);
    return isNaN(parsed) ? undefined : parsed;
  }

  return undefined;
}

/**
 * 从 frontmatter 中提取阅读时间
 */
export function extractReadTimeFromFrontmatter(frontmatter?: Record<string, any>): number | undefined {
  if (!frontmatter) return undefined;

  const readTime = frontmatter.readTime || frontmatter.readingTime || frontmatter.阅读时间;
  if (typeof readTime === "number") {
    return readTime;
  }
  if (typeof readTime === "string") {
    const parsed = parseInt(readTime.replace(/[^\d]/g, ""), 10);
    return isNaN(parsed) ? undefined : parsed;
  }

  return undefined;
}

/**
 * 从 frontmatter 中提取来源信息
 */
export function extractSourceFromFrontmatter(frontmatter?: Record<string, any>): string | undefined {
  if (!frontmatter) return undefined;

  return frontmatter.source || frontmatter.来源 || frontmatter.sourceUrl || frontmatter.来源链接;
}
