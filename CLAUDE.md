# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Hot Tech is a static site generator that displays AI technology news articles. Content is stored in a GitHub repository and fetched via GitHub API during build time. The site uses Next.js 14 App Router with SSG/ISR for optimal performance.

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
```

## Architecture

### Content Loading Architecture

The system has two parallel content loading paths:

1. **Daily Articles** (`lib/content-loader.ts`)
   - Fetches from `data/{YYYYMMDD}/longform/` structure
   - Caches metadata in `articlesCache` Map
   - Provides search/filter by tags and metadata

2. **Series Content** (`lib/series-loader.ts`)
   - Fetches from `data/series/series_{N}/episode_{N}/longform/` structure
   - Each series has a `series_metadata.json`
   - Each episode has an `episode_metadata.json`
   - Caches in `seriesCache`, `seriesListCache`, and `episodeCache` Maps

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
- All loaders use in-memory Map caching for performance
- Cache clearing is available via `clearContentCache()` and `clearSeriesCache()`

### Static Generation Strategy

All pages use `export const dynamic = "force-static"`:
- **Homepage**: Revalidated every hour (`revalidate: 3600`)
- **Article/Series pages**: Pre-rendered at build time
- **ISR Refresh**: `/api/revalidate` endpoint clears cache and regenerates

### Content Filename Patterns

**Daily Articles:**
```
article_{emoji}_{platform}_{model_name}_{YYYYMMDD}_{HHMMSS}.md
```
Example: `article_🤗_meta-llama_Llama-3.1-8B-Inst_20260108_123847.md`

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

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub Personal Access Token with `repo` scope |
| `GITHUB_DATA_REPO` | Yes | Data repository in format `owner/repo` |
| `CRON_SECRET` | Yes | Secret for protecting ISR endpoint at `/api/revalidate` |

**Important**: Environment variables set via Vercel CLI may contain trailing newlines. Use `cleanEnv()` from `lib/github-api.ts` to strip them.

### Key Libraries

- **@octokit/rest** - GitHub API client
- **unified** + **remark** + **rehype** - Markdown processing pipeline
- **gray-matter** - Frontmatter parsing
- **reading-time** - Read time calculation

### Core Modules

| File | Purpose |
|------|---------|
| `lib/github-api.ts` | GitHub API wrapper, directory listing, content fetching |
| `lib/content-loader.ts` | Daily article caching, metadata, search/filter |
| `lib/series-loader.ts` | Series/episode caching, metadata extraction |
| `lib/markdown-parser.ts` | Markdown → HTML conversion with remark/rehype |
| `lib/fs-utils.ts` | Filename parsing, slug generation, date formatting |
| `types/content.ts` | TypeScript interfaces for all content types |

### Deployment

- **Platform**: Vercel (configured in `vercel.json`)
- **Region**: `hkg1` (Hong Kong)
- **Cron Schedule**: Daily at 2 AM UTC

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

### Sitemap Generation

The `app/sitemap.ts` generates dynamic sitemaps. Date strings in `YYYYMMDD` format must be converted to `YYYY-MM-DD` for `new Date()` to work correctly.
