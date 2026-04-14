export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  coverImage?: string;
  published: boolean;
}

export interface Post extends PostMetadata {
  contentHtml: string;
  headings: Array<{ level: number; text: string; id: string }>;
  wordCount: number;
}

export interface Tool {
  slug: string;
  title: string;
  description: string;
  type: 'open-source' | 'closed-source';
  url: string;
  tags: string[];
  icon: string;
  coverImage?: string;
  category?: string;
}

export interface DailyEntry {
  date: string;
  title: string;
  content: string;
  htmlContent?: string;
}
