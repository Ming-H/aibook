import fs from 'fs';
import path from 'path';

interface PromptItem {
  slug: string;
  title: string;
  prompt: string;
  category: string;
  tags: string[];
  tool: string;
}

const promptsFile = path.join(process.cwd(), 'content', 'prompts', 'prompts.json');

export function getAllPrompts(): PromptItem[] {
  if (!fs.existsSync(promptsFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(promptsFile, 'utf-8')) as PromptItem[];
  } catch { return []; }
}

export function getPromptCategories(): string[] {
  const items = getAllPrompts();
  return [...new Set(items.map(i => i.category))];
}
