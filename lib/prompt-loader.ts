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

// In-memory cache for prompts (client-side)
let promptsCache: Prompt[] | null = null;

/**
 * Load all prompts from the API
 * Uses in-memory caching for performance
 */
export async function loadPrompts(): Promise<Prompt[]> {
  // Return cached prompts if available
  if (promptsCache) {
    return promptsCache;
  }

  try {
    const response = await fetch('/api/prompts', {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.error('Failed to load prompts:', response.statusText);
      return [];
    }

    const data = await response.json();

    // Cache the prompts
    promptsCache = data.prompts || [];

    return promptsCache!;
  } catch (error) {
    console.error('Error loading prompts:', error);
    return [];
  }
}

/**
 * Get a single prompt by ID
 */
export async function getPromptById(id: string): Promise<Prompt | undefined> {
  const prompts = await loadPrompts();
  return prompts.find(prompt => prompt.id === id);
}

/**
 * Get prompts by category
 */
export async function getPromptsByCategory(category: string): Promise<Prompt[]> {
  const prompts = await loadPrompts();
  if (category === 'all') {
    return prompts;
  }
  return prompts.filter(prompt => prompt.category === category);
}

/**
 * Get all unique categories
 */
export async function getCategories(): Promise<string[]> {
  const prompts = await loadPrompts();
  const categories = new Set(prompts.map(prompt => prompt.category));
  return ['all', ...Array.from(categories)];
}

/**
 * Clear the prompts cache (useful for development or ISR)
 */
export function clearPromptsCache(): void {
  promptsCache = null;
}

/**
 * Get prompts by tag
 */
export async function getPromptsByTag(tag: string): Promise<Prompt[]> {
  const prompts = await loadPrompts();
  return prompts.filter(prompt =>
    prompt.tags.some(promptTag =>
      promptTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
}

/**
 * Search prompts by title, description, or tags
 */
export async function searchPrompts(query: string): Promise<Prompt[]> {
  const prompts = await loadPrompts();
  const lowerQuery = query.toLowerCase();

  return prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(lowerQuery) ||
    prompt.description.toLowerCase().includes(lowerQuery) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

