export interface NewsItem {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    publishedAt: string;
}

export interface NewsResponse {
    news: NewsItem[];
    total: number;
} 