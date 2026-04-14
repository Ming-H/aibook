import fs from 'fs';
import path from 'path';

interface GalleryItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  prompt: string;
  tool: string;
  tags: string[];
}

const galleryFile = path.join(process.cwd(), 'content', 'gallery', 'gallery.json');

export function getAllGalleryItems(): GalleryItem[] {
  if (!fs.existsSync(galleryFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(galleryFile, 'utf-8')) as GalleryItem[];
  } catch { return []; }
}

export function getGalleryCategories(): string[] {
  const items = getAllGalleryItems();
  return [...new Set(items.map(i => i.category))];
}
