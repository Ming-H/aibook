# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Hot Tech is a static site generator that displays AI technology news articles, series content, and interactive learning tools. Content is stored in a GitHub repository and fetched via GitHub API during build time. The site uses Next.js 14 App Router with SSG/ISR for optimal performance.

**Content Channels:**
- **Daily Hot Tech** (`/daily`) - Daily AI industry news digests from `data/daily/{YYYYMMDD}/digest/`
- **Series Learning** (`/series`) - Structured learning paths from `data/series/`
- **Archive** (`/archive`) - Historical content browser
- **Quiz Generator** (`/quiz-generator`) - Interactive quiz creation tool powered by GLM-4.7 API
- **Creative Workshop** (`/creative-workshop`) - AI-powered image generation tool using ModelScope API

**Content Sources:**
- Daily digests: `data/daily/{YYYYMMDD}/digest/digest_*.md`
- Daily articles: `data/{YYYYMMDD}/longform/*.md`
- Series content: `data/series/series_{N}/episode_{N}/longform/*.md`
- Custom/Legacy articles: `data/custom/{YYYYMMDD_HHMMSS_title}/article_*.md`

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

# Reset database (migrate dev)
npx prisma migrate reset
```

### Database Management

This project uses Prisma with PostgreSQL. The database schema is in `prisma/schema.prisma`.

```bash
# Generate Prisma client
npx prisma generate

# Run migrations in development
npx prisma migrate dev

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Architecture

### Content Loading Architecture

The system has three parallel content loading paths:

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

3. **Daily Digests** (`lib/daily-loader.ts`)
   - Fetches from `data/daily/{YYYYMMDD}/digest/` structure
   - Optimized for daily news digest format
   - Separate cache for digest content

**Why separate loaders?** Daily articles, series content, and daily digests have different metadata structures and access patterns. Separating them allows for optimized caching and query strategies for each content type.

### Authentication & Authorization

The app uses **NextAuth.js v4** with a custom credentials provider and Prisma adapter for authentication:

**Key Files:**
- `lib/auth.ts` - NextAuth configuration with credentials provider
- `lib/subscription-check.ts` - Subscription validation and admin checks
- `app/api/auth/[...nextauth]/route.ts` - NextAuth API route

**Auth Flow:**
1. Users register/login via `/auth/signin` with email/password
2. JWT strategy is used (sessions stored in JWT, not database)
3. `session` callback fetches `isAdmin` from database for type safety
4. Admin users bypass subscription checks (see `lib/subscription-check.ts`)

**Important Pattern - Admin Type Safety:**
The `isAdmin` field is fetched from the database in the session callback to ensure it's always a boolean type, not undefined. This prevents type issues throughout the app. See `lib/auth.ts:74-101`.

**Subscription System:**
- Users must have an active subscription to use quiz generation
- Admin users bypass all subscription checks
- Subscriptions have 1-year validity by default
- Usage is tracked but not limited (admins excluded from tracking)

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
| `GLM_API_KEY` | Optional | GLM-4.7 API key for quiz generation feature |
| `MODELSCOPE_API_KEY` | Optional | ModelScope API key for image generation feature |
| `DATABASE_URL` | Yes | PostgreSQL connection string for Prisma |
| `NEXTAUTH_SECRET` | Yes | Secret for NextAuth.js JWT signing |
| `NEXTAUTH_URL` | Yes | Your app's URL (e.g., `http://localhost:3000` in dev) |

**Important**: Environment variables set via Vercel CLI may contain trailing newlines. Use `cleanEnv()` from `lib/github-api.ts` to strip them.

### Key Libraries

- **@octokit/rest** - GitHub API client with pagination support
- **unified** + **remark** + **rehype** - Markdown processing pipeline
- **gray-matter** - Frontmatter parsing
- **reading-time** - Read time calculation
- **GLM-4.7 API** - Quiz generation via `lib/glm-api.ts`
- **ModelScope API** - Image generation via `lib/modelscope-api.ts`

### Core Modules

| File | Purpose |
|------|---------|
| `lib/github-api.ts` | GitHub API wrapper, cleanEnv(), directory listing, content fetching |
| `lib/content-loader.ts` | Daily article caching, metadata, search/filter, related articles |
| `lib/series-loader.ts` | Series/episode caching, metadata extraction, episode ordering |
| `lib/daily-loader.ts` | Daily digest caching and content loading |
| `lib/glm-api.ts` | GLM-4.7 API integration for quiz generation |
| `lib/modelscope-api.ts` | ModelScope API integration for image generation |
| `lib/markdown-parser.ts` | Markdown → HTML conversion with remark/rehype, heading extraction |
| `lib/fs-utils.ts` | Filename parsing, slug generation, date formatting |
| `lib/auth.ts` | NextAuth.js configuration with credentials provider |
| `lib/subscription-check.ts` | Subscription validation, admin checks, usage recording |
| `lib/prisma.ts` | Prisma client singleton |
| `types/content.ts` | TypeScript interfaces for all content types |

### Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage with article timeline |
| `/daily` | Daily digest browser |
| `/series` | Series learning paths |
| `/archive` | Historical content archive |
| `/quiz-generator` | Quiz generation tool (requires subscription) |
| `/creative-workshop` | AI image generation tool |
| `/admin` | Admin dashboard (requires admin role) |
| `/auth/signin` | Sign in page |
| `/subscribe` | Subscription page |

### API Routes

| Route | Purpose |
|-------|---------|
| `/api/auth/[...nextauth]` | NextAuth.js handler |
| `/api/revalidate` | ISR cache invalidation (protected by CRON_SECRET) |
| `/api/quiz/generate` | Generate quiz from content |
| `/api/quiz/regenerate` | Regenerate a quiz |
| `/api/quiz/record-usage` | Record quiz usage (internal) |
| `/api/image/generate` | Generate images via ModelScope |
| `/api/image/status/[taskId]` | Check async image generation status |
| `/api/subscription/check` | Check user subscription status |
| `/api/payment/create` | Create payment (Alipay/WeChat) |
| `/api/payment/callback` | Payment callback handler |
| `/api/admin/users` | List all users (admin only) |
| `/api/admin/subscription` | Create subscription for user (admin only) |
| `/api/admin/setup` | Initial admin setup |

### Deployment

- **Platform**: Vercel (configured in `vercel.json`)
- **Region**: `hkg1` (Hong Kong)
- **Database**: PostgreSQL (requires external database service for production)
- **Cron Schedule**: Daily at 2 AM UTC
- **Image Optimization**: Disabled (`unoptimized: true` in next.config.mjs)

When adding environment variables via Vercel CLI, add to all environments:

```bash
echo "your-token" | vercel env add GITHUB_TOKEN production
echo "your-token" | vercel env add GITHUB_TOKEN preview
echo "your-token" | vercel env add GITHUB_TOKEN development
```

**Required Environment Variables for Production:**
- `DATABASE_URL` - PostgreSQL connection string (e.g., from Vercel Postgres, Supabase, or Neon)
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production domain URL

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

### Creative Workshop

The `/creative-workshop` route provides an AI-powered image generation tool using ModelScope API:

**Architecture:**
- Client-side generation interface with style selection
- Async task creation and polling for image generation
- Multiple preset styles (landscape, portrait, cartoon, cyberpunk, watercolor, 3D render)
- Download functionality for generated images

**Key Components:**
- `lib/modelscope-api.ts` - ModelScope API wrapper with async task handling
- `app/creative-workshop/page.tsx` - Main image generation interface
- `app/api/image/generate/route.ts` - API endpoint for image generation

**ModelScope API Integration:**
- Uses `Tongyi-MAI/Z-Image-Turbo` model by default
- Async task creation with polling for completion
- 5-minute timeout with 5-second polling interval
- Support for custom models and LoRA configurations

### Quiz Generator

The `/quiz-generator` route provides an interactive quiz creation tool powered by GLM-4.7 API:

**Architecture:**
- Three-step workflow: Configuration → Question Setup → Generation & Preview
- Real-time quiz regeneration capability
- Multiple export formats (JSON, Text, Markdown)

**Key Components:**
- `lib/glm-api.ts` - GLM-4.7 API wrapper with sophisticated prompt engineering
- `app/quiz-generator/page.tsx` - Main quiz generator interface
- `components/ui/` - Reusable form controls (Select, Slider, TagInput)

**GLM API Integration:**
- JSON response parsing with error recovery
- Context-aware prompts for different question types
- Support for multiple choice, true/false, fill-in-blank, and short answer questions

### Design System

The site uses a custom dark theme design system with glass morphism effects:

**Key Design Features:**
- Dark theme with vibrant accent colors
- Glass morphism (backdrop-blur, semi-transparent backgrounds)
- Neon gradient system for branding
- Animated gradient backgrounds and particle effects
- 3D card hover effects
- Custom scrollbar styling

**Theming:**
- CSS custom properties for consistent theming
- Tailwind CSS with custom design tokens
- Responsive design system with mobile-first approach

**UI Components** (`components/ui/`):
- Glass card components
- Theme-aware form controls
- Navigation system
- Reusable button and input components

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

**Database connection issues in production:**
- Vercel serverless functions may have connection pooling issues
- Use connection pooling with Prisma (e.g., Prisma Accelerator or pg-bouncer)
- The `lib/prisma.ts` file exports a singleton Prisma client to prevent multiple instances

**TypeScript types for session.user:**
- Extend the NextAuth types to include `isAdmin` in your type definitions
- See `lib/auth.ts` for the session callback that adds `isAdmin`
