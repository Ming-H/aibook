import fs from 'fs';
import path from 'path';
import type { Tool } from './types';

const toolsFile = path.join(process.cwd(), 'content', 'tools', 'tools.json');

export function getAllTools(): Tool[] {
  if (!fs.existsSync(toolsFile)) return [];
  const data = fs.readFileSync(toolsFile, 'utf-8');
  try {
    return JSON.parse(data) as Tool[];
  } catch {
    return [];
  }
}

export function getToolBySlug(slug: string): Tool | undefined {
  return getAllTools().find(t => t.slug === slug);
}
