/**
 * 图书简报类型定义
 */

export interface BookDigest {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  basicInfo: BasicInfo;
  authorInfo: AuthorInfo[];
  keyPoints: KeyPoint[];
  quotes: Quote[];
  concepts: Concept[];
  frameworks: Framework[];
  summary: Summary;
  furtherReading: FurtherReading[];
  targetAudience: string[];
  readingAdvice: ReadingAdvice;
  metadata: Metadata;
}

export interface BasicInfo {
  title: string;
  authors: string[];
  translators: string[];
  publishers: string[];
  publishYear: number;
  isbn: string;
  language: string;
  category: BookCategory;
  tags: string[];
  difficulty: Difficulty;
  rating: number;
  readTime: number;
  pages: number;
}

export interface AuthorInfo {
  name: string;
  bio: string;
}

export interface KeyPoint {
  title: string;
  description: string;
  examples: string[];
  category: '理论' | '实践' | '方法' | 'theory' | 'practice' | 'method';
}

export interface Quote {
  text: string;
  chapter: string;
  context: string;
}

export interface Concept {
  term: string;
  definition: string;
  explanation: string;
  relatedConcepts: string[];
}

export interface Framework {
  name: string;
  description: string;
  steps: string[];
}

export interface Summary {
  mainMessage: string;
  keyTakeaways: string[];
  conclusion: string;
}

export interface FurtherReading {
  title: string;
  author: string;
  reason: string;
}

export interface ReadingAdvice {
  readingStrategy: string;
  focusAreas: string[];
}

export interface Metadata {
  emoji: string;
  source: string;
  model: string;
  promptVersion: string;
  wordCount: number;
  imagePrompts: ImagePrompts;
  images: Images;
}

export interface ImagePrompts {
  cover: string;
  coverConfig: CoverConfig;
  concepts: ConceptPrompt[];
  quotes: QuotePrompt[];
}

export interface CoverConfig {
  aspectRatio: string;
  imageSize: string;
  metadata: {
    category: string;
    colorTheme: string;
    mood: string;
  };
}

export interface ConceptPrompt {
  term: string;
  prompt: string;
  config: {
    aspectRatio: string;
    imageSize: string;
  };
}

export interface QuotePrompt {
  quote: string;
  prompt: string;
  config: {
    aspectRatio: string;
    imageSize: string;
  };
}

export interface Images {
  cover: string;
  concepts: string[];
  quotes: string[];
}

// 图书分类
export type BookCategory =
  | 'mental-growth'      // 心智成长 🧠
  | 'emotional-mindset'  // 情绪与心态 ❤️
  | 'interpersonal'      // 人际关系 🤝
  | 'habits-action'      // 习惯与行动 💪
  | 'wealth-career'      // 财富与事业 💰
  | 'life-wisdom'        // 人生智慧 🌟
  | 'classic-biography'; // 经典自传 📖

// 难度等级
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

// 图书元数据（用于列表展示）
export interface BookDigestMetadata {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  category: BookCategory;
  categoryLabel: string;
  categoryEmoji: string;
  rating: number;
  difficulty: Difficulty;
  difficultyLabel: string;
  readTime: number;
  emoji: string;
  tags: string[];
  coverImage: string;
  publishYear: number;
  summary: string;
}

// 分类信息
export interface CategoryInfo {
  id: BookCategory;
  label: string;
  emoji: string;
  description: string;
}

// 图书分类映射
export const BOOK_CATEGORIES: Record<BookCategory, CategoryInfo> = {
  'mental-growth': {
    id: 'mental-growth',
    label: '心智成长',
    emoji: '🧠',
    description: '提升思维能力、认知水平和心理素质',
  },
  'emotional-mindset': {
    id: 'emotional-mindset',
    label: '情绪与心态',
    emoji: '❤️',
    description: '情绪管理、心态调整和心理健康',
  },
  'interpersonal': {
    id: 'interpersonal',
    label: '人际关系',
    emoji: '🤝',
    description: '沟通技巧、社交能力和人脉建设',
  },
  'habits-action': {
    id: 'habits-action',
    label: '习惯与行动',
    emoji: '💪',
    description: '习惯养成、时间管理和执行力',
  },
  'wealth-career': {
    id: 'wealth-career',
    label: '财富与事业',
    emoji: '💰',
    description: '理财投资、职业规划和创业指导',
  },
  'life-wisdom': {
    id: 'life-wisdom',
    label: '人生智慧',
    emoji: '🌟',
    description: '人生哲学、生活智慧和价值观',
  },
  'classic-biography': {
    id: 'classic-biography',
    label: '经典自传',
    emoji: '📖',
    description: '名人传记、成功故事和人生经验',
  },
};

// 难度等级映射
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

// 获取分类信息
export function getCategoryInfo(category: BookCategory): CategoryInfo {
  return BOOK_CATEGORIES[category];
}

// 获取难度标签
export function getDifficultyLabel(difficulty: Difficulty): string {
  return DIFFICULTY_LABELS[difficulty];
}
