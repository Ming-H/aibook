import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface Prompt {
  id: string;
  title: string;
  category: string;
  description: string;
  prompt: string;
  emoji: string;
  tags: string[];
  source: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const PROMPTS_DIR = path.join(process.cwd(), 'data', 'prompts');

export async function GET() {
  try {
    // Check if directory exists
    if (!fs.existsSync(PROMPTS_DIR)) {
      return NextResponse.json({ prompts: [] });
    }

    // Read all JSON files in the prompts directory
    const files = fs.readdirSync(PROMPTS_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      return NextResponse.json({ prompts: [] });
    }

    // Load and parse each prompt file
    const prompts: Prompt[] = jsonFiles.map(file => {
      const filePath = path.join(PROMPTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as Prompt;
    });

    return NextResponse.json({ prompts });
  } catch (error) {
    console.error('Error loading prompts:', error);
    return NextResponse.json(
      { error: 'Failed to load prompts', prompts: [] },
      { status: 500 }
    );
  }
}
