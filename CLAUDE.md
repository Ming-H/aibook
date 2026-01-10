# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Hot Tech is a static site generator that displays AI technology news articles. Content is stored in a GitHub repository (`data/{YYYYMMDD}/longform/*.md`) and fetched via GitHub API during build time. The site uses Next.js 14 App Router with SSG/ISR for optimal performance.

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

### Data Flow

1. **GitHub Repository** → Markdown files in `data/{YYYYMMDD}/longform/` structure
2. **GitHub API** → `lib/github-api.ts` fetches raw content using `@octokit/rest`
3. **Content Loader** → `lib/content-loader.ts` parses, caches metadata, extracts frontmatter
4. **Markdown Parser** → `lib/markdown-parser.ts` converts to HTML via `unified/remark/rehype`
5. **Static Generation** → Next.js pre-renders pages at build time
6. **ISR Refresh** → `/api/revalidate` endpoint clears cache and regenerates pages

### Static Generation Strategy

All pages use `export const dynamic = "force-static"` to force static generation:
- **Homepage** (`app/page.tsx`): Revalidated every hour (`revalidate: 3600`)
- **Article pages** (`app/articles/[date]/[slug]/page.tsx`): Pre-rendered at build time
- **Manual refresh**: Vercel Cron Jobs call `/api/revalidate` daily at 2 AM UTC

### Content Filename Pattern

```
article_{emoji}_{platform}_{model_name}_{YYYYMMDD}_{HHMMSS}.md
```

Example: `article_🤗_meta-llama_Llama-3.1-8B-Inst_20260108_123847.md`

The filename is parsed by `lib/fs-utils.ts` to extract emoji, platform, model name, date, and timestamp.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub Personal Access Token with `repo` scope |
| `GITHUB_DATA_REPO` | Yes | Data repository in format `owner/repo` (e.g., `Ming-H/content-forge-ai`) |
| `CRON_SECRET` | Yes | Secret for protecting ISR endpoint at `/api/revalidate` |

**Important**: Environment variables may contain trailing newlines when set via Vercel CLI. The code in `lib/github-api.ts` includes a `cleanEnv()` helper to strip newlines and whitespace.

### Key Libraries

- **@octokit/rest** - GitHub API client
- **unified** + **remark** + **rehype** - Markdown processing pipeline
- **gray-matter** - Frontmatter parsing
- **reading-time** - Read time calculation

### Core Modules

| File | Purpose |
|------|---------|
| `lib/github-api.ts` | GitHub API wrapper, lists directories, fetches file content |
| `lib/content-loader.ts` | Content caching (in-memory Map), metadata retrieval, search/filter |
| `lib/fs-utils.ts` | Filename parsing, slug generation, date formatting |
| `lib/markdown-parser.ts` | Markdown → HTML conversion with syntax highlighting |
| `types/content.ts` | TypeScript interfaces for Article, ArticleMetadata, ArticleByDate |

### Deployment

- **Platform**: Vercel (configured in `vercel.json`)
- **Region**: `hkg1` (Hong Kong)
- **Cron Schedule**: Daily at 2 AM UTC (`0 2 * * *` in `vercel.json`)

When adding environment variables via Vercel CLI, they must be added to all environments (production, preview, development) for builds to succeed:

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

### Sitemap Generation

The `app/sitemap.ts` generates dynamic sitemaps from article metadata. Date strings in `YYYYMMDD` format must be converted to `YYYY-MM-DD` for `new Date()` to work correctly.
