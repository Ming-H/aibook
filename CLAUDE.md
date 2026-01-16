# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Hot Tech is a static site generator that displays AI technology news articles and series content. Content is stored in a GitHub repository and fetched via GitHub API during build time. The site uses Next.js 14 App Router with SSG/ISR for optimal performance.

**Content Sources:**
- Daily articles: `data/{YYYYMMDD}/longform/*.md`
- Series content: `data/series/series_{N}/episode_{N}/longform/*.md`

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Lint code
npm run lint

# Deploy to Vercel production
vercel --prod

# Check Vercel deployment logs
vercel logs
```

## Architecture

### Content Loading Architecture

The system has two parallel content loading paths:

1. **Daily Articles** (`lib/content-loader.ts`)
   - Fetches from `data/{YYYYMMDD}/longform/` structure
   - Caches metadata in `articlesCache` Map
   - Provides search/filter by tags and metadata
   - Related articles based on tag matching

2. **Series Content** (`lib/series-loader.ts`)
   - Fetches from `data/series/series_{N}/episode_{N}/longform/` structure
   - Each series has a `series_metadata.json`
   - Each episode has an `episode_metadata.json`
   - Caches in `seriesCache`, `seriesListCache`, and `episodeCache` Maps

**Why two loaders?** Daily articles and series content have different metadata structures and access patterns. Separating them allows for optimized caching and query strategies for each content type.

### Data Flow

```
GitHub Repository
    ↓
GitHub API (lib/github-api.ts)
    ↓
Content Loaders (content-loader.ts / series-loader.ts)
    ↓
Markdown Parser (lib/markdown-parser.ts)
    ↓
Static Generation (Next.js SSG/ISR)
```

**Key Points:**
- `lib/github-api.ts` wraps `@octokit/rest` and provides cleanEnv() to strip trailing newlines from env vars
- All loaders use in-memory Map caching for performance (not persistent across rebuilds)
- Cache clearing is available via `clearContentCache()` and `clearSeriesCache()`
- The `/api/revalidate` endpoint triggers ISR refresh by clearing these caches

### Static Generation Strategy

All pages use `export const dynamic = "force-static"`:
- **Homepage**: Revalidated every hour (`revalidate: 3600`)
- **Article/Series pages**: Pre-rendered at build time
- **ISR Refresh**: `/api/revalidate` endpoint clears cache and regenerates

This hybrid approach provides:
- Fast initial page loads (pre-rendered)
- Fresh content without full rebuilds (ISR)
- SEO-friendly static HTML

### Content Filename Patterns

**Daily Articles:**
```
article_{emoji}_{platform}_{model_name}_{YYYYMMDD}_{HHMMSS}.md
```
Example: `article_🤗_meta-llama_Llama-3.1-8B-Inst_20260108_123847.md`

The filename encodes metadata that gets parsed by `lib/fs-utils.ts`:
- `emoji` - Display emoji for the article
- `platform` - Source platform (e.g., meta-llama, huggingface)
- `model_name` - Model or topic name
- `YYYYMMDD` - Publication date
- `HHMMSS` - Timestamp for uniqueness

**Series Structure:**
```
data/series/
├── series_1/
│   ├── series_metadata.json
│   ├── episode_001/
│   │   ├── episode_metadata.json
│   │   └── longform/
│   │       └── article_*.md
│   └── episode_002/
│       └── ...
```

Series use separate JSON metadata files instead of encoding everything in filenames, allowing for richer metadata and easier updates.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub Personal Access Token with `repo` scope |
| `GITHUB_DATA_REPO` | Yes | Data repository in format `owner/repo` |
| `CRON_SECRET` | Yes | Secret for protecting ISR endpoint at `/api/revalidate` |

**Important**: Environment variables set via Vercel CLI may contain trailing newlines. Use `cleanEnv()` from `lib/github-api.ts` to strip them.

### Key Libraries

- **@octokit/rest** - GitHub API client with pagination support
- **unified** + **remark** + **rehype** - Markdown processing pipeline
- **gray-matter** - Frontmatter parsing
- **reading-time** - Read time calculation

### Core Modules

| File | Purpose |
|------|---------|
| `lib/github-api.ts` | GitHub API wrapper, cleanEnv(), directory listing, content fetching |
| `lib/content-loader.ts` | Daily article caching, metadata, search/filter, related articles |
| `lib/series-loader.ts` | Series/episode caching, metadata extraction, episode ordering |
| `lib/markdown-parser.ts` | Markdown → HTML conversion with remark/rehype, heading extraction |
| `lib/fs-utils.ts` | Filename parsing, slug generation, date formatting |
| `types/content.ts` | TypeScript interfaces for all content types |

### Deployment

- **Platform**: Vercel (configured in `vercel.json`)
- **Region**: `hkg1` (Hong Kong)
- **Cron Schedule**: Daily at 2 AM UTC
- **Image Optimization**: Disabled (`unoptimized: true` in next.config.mjs)

When adding environment variables via Vercel CLI, add to all environments:

```bash
echo "your-token" | vercel env add GITHUB_TOKEN production
echo "your-token" | vercel env add GITHUB_TOKEN preview
echo "your-token" | vercel env add GITHUB_TOKEN development
```

### Content Format

Frontmatter (optional):
```yaml
---
title: 文章标题
tags: ["标签1", "标签2"]
wordCount: 5000
readTime: 25
---
```

First line after frontmatter should be `# Title` - this becomes the article title. First paragraph becomes the excerpt.

The markdown parser (lib/markdown-parser.ts) processes:
- Frontmatter extraction via gray-matter
- GitHub Flavored Markdown via remark-gfm
- Syntax highlighting via rehype-highlight
- Auto-generated heading IDs via rehype-slug
- Anchor links via rehype-autolink-headings

### Series Metadata

**series_metadata.json:**
```json
{
  "series_title": "系列名称",
  "series_description": "系列描述",
  "series_emoji": "🧠",
  "series_info": {
    "name": "显示名称",
    "description": "详细描述",
    "tags": ["标签1", "标签2"]
  }
}
```

**episode_metadata.json:**
```json
{
  "title": "集数标题",
  "slug": "episode-slug",
  "excerpt": "摘要",
  "tags": ["标签"],
  "word_count": 5000,
  "read_time": 25
}
```

The series loader (lib/series-loader.ts) reads these JSON files to build the series structure, then combines with article content from the longform/ subdirectories.

### Sitemap Generation

The `app/sitemap.ts` generates dynamic sitemaps. Date strings in `YYYYMMDD` format must be converted to `YYYY-MM-DD` for `new Date()` to work correctly.

### Common Issues

**"Invalid date" errors in sitemap:**
- Ensure YYYYMMDD strings are converted to YYYY-MM-DD format before passing to `new Date()`

**Environment variable issues:**
- Vercel CLI may add trailing newlines to env vars
- Always use `cleanEnv()` from lib/github-api.ts when reading environment variables

**Cache not updating:**
- The in-memory caches only persist during a single build/request cycle
- For ISR refresh, the `/api/revalidate` endpoint clears caches and triggers regeneration
- Local testing: restart the dev server to clear caches

**GitHub API rate limiting:**
- The GitHub API has rate limits (5000 requests/hour for authenticated requests)
- During builds, pagination is handled automatically by lib/github-api.ts
- If hitting limits, consider implementing request caching or using a personal access token with higher limits
