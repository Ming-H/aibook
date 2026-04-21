# DevFox Brand Site — 技术架构文档 (Architecture)

> 版本: 1.0.0
> 最后更新: 2026-04-21
> 技术栈: Next.js 14 App Router + TypeScript + Tailwind CSS

---

## 1. 架构总览

### 1.1 系统架构图

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                    │
│                                                          │
│  ┌──────────────────────┐    ┌────────────────────────┐ │
│  │   DevFox Brand Site  │    │     AI Insights        │ │
│  │   (devfox.ai)        │    │  (ai-insights.devfox.ai)│ │
│  │                      │    │                         │ │
│  │   Next.js 14 SSG     │    │   Hugo Static          │ │
│  │   + ISR              │    │   + GitHub Pages        │ │
│  │                      │    │                         │ │
│  │   /services          │    │   /daily (每日简报)      │ │
│  │   /cases             │    │   /series (系列文章)     │ │
│  │   /about             │←──→│   /blog (博客)          │ │
│  │   /contact           │    │   /books (读书笔记)     │ │
│  │   Redirects:         │    │   /gallery (灵感图集)    │ │
│  │     /blog → AI       │    │                         │ │
│  │     /books → AI      │    │   Content Source:       │ │
│  │     /inspiration → AI│    │   GitHub Repo + R2      │ │
│  └──────────────────────┘    └────────────────────────┘ │
│                                                          │
│  ┌──────────────────────┐                                │
│  │   External Services  │                                │
│  │                      │                                │
│  │   Cloudflare R2      │  图片/静态资源                  │
│  │   Vercel Analytics   │  分析 & 性能监控                │
│  │   GitHub API         │  项目数据                      │
│  └──────────────────────┘                                │
└─────────────────────────────────────────────────────────┘
```

### 1.2 技术选型

| 层面 | 技术 | 理由 |
|------|------|------|
| **框架** | Next.js 14 App Router | SSG/ISR、React Server Components、优秀的 SEO |
| **语言** | TypeScript | 类型安全、开发体验 |
| **样式** | Tailwind CSS + CSS Variables | 快速开发、主题切换、一致的设计 Token |
| **主题** | Dark/Light 双主题 | CSS Variables + class 策略 |
| **字体** | Inter + JetBrains Mono | next/font 自动优化，零 CLS |
| **部署** | Vercel | Next.js 原生支持，全球 CDN，ISR |
| **分析** | Vercel Analytics + Speed Insights | 零配置性能监控 |
| **图片** | Cloudflare R2 + next/image | 高性价比存储 + 自动优化 |

---

## 2. 页面路由设计

### 2.1 路由表

| 路由 | 类型 | 页面 | 渲染策略 |
|------|------|------|---------|
| `/` | Page | 首页 (Hero + Services + Cases + CTA) | SSG + ISR (1h) |
| `/services` | Page | 服务总览 | SSG |
| `/services/ai-app-agent` | Page | AI 落地应用 & Agent 开发详情 | SSG |
| `/services/ai-training-consulting` | Page | AI 培训 & 咨询详情 | SSG |
| `/cases` | Page | 案例列表 | SSG |
| `/cases/[slug]` | Dynamic | 案例详情 | SSG (generateStaticParams) |
| `/about` | Page | 关于我 | SSG |
| `/contact` | Page | 联系方式 | SSG |
| `/api/contact` | API Route | 联系表单提交 | Serverless Function |

### 2.2 重定向路由

| 源路由 | 目标 | 类型 |
|--------|------|------|
| `/blog` | `https://ai-insights.devfox.ai/blog/` | 301 |
| `/blog/:slug` | `https://ai-insights.devfox.ai/blog/:slug/` | 301 |
| `/books` | `https://ai-insights.devfox.ai/books/` | 301 |
| `/books/:slug` | `https://ai-insights.devfox.ai/books/:slug/` | 301 |
| `/inspiration` | `https://ai-insights.devfox.ai/gallery/` | 301 |

### 2.3 文件系统路由

```
app/
├── layout.tsx                          # Root Layout
├── page.tsx                            # 首页
├── globals.css                         # 全局样式
├── not-found.tsx                       # 404 页面
├── robots.ts                           # robots.txt
├── sitemap.ts                          # sitemap.xml
│
├── services/
│   ├── page.tsx                        # 服务总览 (重定向到 /services/ai-app-agent 或直接展示)
│   ├── ai-app-agent/
│   │   └── page.tsx                    # AI 落地应用 & Agent 开发
│   └── ai-training-consulting/
│       └── page.tsx                    # AI 培训 & 咨询
│
├── cases/
│   ├── page.tsx                        # 案例列表
│   └── [slug]/
│       └── page.tsx                    # 案例详情
│
├── about/
│   └── page.tsx                        # 关于我
│
├── contact/
│   └── page.tsx                        # 联系方式
│
└── api/
    └── contact/
        └── route.ts                    # 联系表单 API
```

---

## 3. 组件层级结构

### 3.1 组件树

```
RootLayout (app/layout.tsx)
├── ThemeProvider (client)
│   ├── Navbar (client)
│   │   ├── Logo
│   │   ├── NavLinks
│   │   ├── ServicesDropdown (client)
│   │   ├── ExternalLink "AI Insights"
│   │   ├── ThemeToggle (client)
│   │   └── MobileMenu (client)
│   │
│   ├── <main> (各页面内容)
│   │
│   └── Footer
│       ├── BrandInfo
│       ├── FooterNav
│       ├── SocialLinks
│       └── Copyright
```

### 3.2 页面组件结构

#### 首页 (`app/page.tsx`)

```
HomePage (server component)
├── HeroSection
│   ├── Overline
│   ├── HeroTitle
│   ├── HeroSubtitle
│   └── HeroCTA
│       ├── PrimaryButton "预约咨询"
│       └── SecondaryButton "查看案例"
│
├── ServicesSection
│   ├── SectionHeader (overline + title + description)
│   └── ServiceCards (2-col grid)
│       ├── ServiceCard (AI App & Agent)
│       │   ├── ServiceIcon
│       │   ├── ServiceTitle
│       │   ├── ServiceDescription
│       │   ├── ServiceFeatures (list)
│       │   └── ServiceLink "了解更多 →"
│       └── ServiceCard (AI Training)
│
├── FeaturedCasesSection
│   ├── SectionHeader
│   └── CaseCards (3-col grid)
│       └── CaseCard × 3
│           ├── CaseImage (optional)
│           ├── CaseTitle
│           ├── CaseDescription
│           ├── CaseTags
│           └── CaseLink "查看详情 →"
│
├── TechStackSection
│   ├── SectionHeader
│   └── TechStackGrid
│       └── TechBadge × N
│
└── CTASection
    ├── CTATitle
    ├── CTASubtitle
    └── PrimaryButton "开始对话"
```

#### 案例详情页 (`app/cases/[slug]/page.tsx`)

```
CaseDetailPage (server component)
├── CaseHeader
│   ├── Breadcrumb
│   ├── CaseTitle
│   ├── CaseTags
│   └── CaseMeta (date, type)
│
├── CaseContent (prose)
│   ├── 项目背景
│   ├── 技术方案
│   ├── 架构设计 (图片)
│   ├── 关键成果
│   └── 技术栈列表
│
├── RelatedCases
│   └── CaseCard × 2-3
│
└── CaseCTA
    └── PrimaryButton "有类似需求？聊聊"
```

### 3.3 组件分类

#### Server Components (默认)

| 组件 | 说明 |
|------|------|
| `RootLayout` | 根布局，加载字体和主题 |
| `HomePage` | 首页，加载数据 |
| `ServicesPage` | 服务详情页 |
| `CasesPage` | 案例列表页 |
| `CaseDetailPage` | 案例详情页 |
| `AboutPage` | 关于页 |
| `ContactPage` | 联系页 |
| `Footer` | 页脚 |
| `SectionHeader` | Section 头部 |
| `CaseCard` | 案例卡片（无交互） |

#### Client Components ('use client')

| 组件 | 说明 | 交互 |
|------|------|------|
| `Navbar` | 导航栏 | 滚动检测、移动端菜单 |
| `ThemeProvider` | 主题提供者 | 主题切换 |
| `ThemeToggle` | 主题切换按钮 | 点击切换 |
| `ServicesDropdown` | 服务下拉菜单 | Hover/Click 展开 |
| `MobileMenu` | 移动端菜单 | 展开/收起 |
| `ContactForm` | 联系表单 | 表单验证、提交 |
| `ScrollAnimations` | 滚动动画 | IntersectionObserver |

### 3.4 组件文件结构

```
components/
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   └── MobileMenu.tsx
│
├── home/
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   ├── FeaturedCasesSection.tsx
│   ├── TechStackSection.tsx
│   └── CTASection.tsx
│
├── shared/
│   ├── SectionHeader.tsx
│   ├── ServiceCard.tsx
│   ├── CaseCard.tsx
│   ├── TechBadge.tsx
│   ├── Tag.tsx
│   ├── Button.tsx (PrimaryButton, SecondaryButton, GhostButton)
│   └── Breadcrumb.tsx
│
├── cases/
│   ├── CaseHeader.tsx
│   ├── CaseContent.tsx
│   └── RelatedCases.tsx
│
├── contact/
│   ├── ContactForm.tsx
│   ├── ContactInfo.tsx
│   └── FAQ.tsx
│
├── SocialLinks.tsx
└── ui/                    # 现有 UI 组件 (可复用)
    └── ...
```

---

## 4. 数据流设计

### 4.1 数据来源

```
┌──────────────────────────────────────────────────────┐
│                    Data Sources                        │
│                                                       │
│  1. Static Data (TypeScript objects in code)          │
│     ├── Services data (services.ts)                   │
│     ├── Cases data (cases.ts)                         │
│     ├── Tech stack data (tech-stack.ts)               │
│     └── About data (about.ts)                         │
│                                                       │
│  2. GitHub API (optional, for dynamic data)           │
│     ├── GitHub repos list                             │
│     └── Contribution stats                            │
│                                                       │
│  3. Contact Form → API Route → Email                  │
│     └── /api/contact → Email forwarding               │
│                                                       │
│  4. Content Assets                                    │
│     ├── Images: Cloudflare R2                         │
│     ├── Case screenshots: R2 or /public               │
│     └── Avatar: /public/avatar.png                    │
└──────────────────────────────────────────────────────┘
```

### 4.2 静态数据架构

#### 服务数据 (`data/services.ts`)

```typescript
export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;          // 一句话定位
  description: string;      // 详细描述
  features: Feature[];      // 核心能力列表
  techStack: string[];      // 相关技术栈
  iconName: string;         // Lucide 图标名
}

export interface Feature {
  title: string;
  description: string;
  iconName: string;
}

export const services: Service[] = [
  {
    id: "ai-app-agent",
    slug: "ai-app-agent",
    title: "AI 落地应用 & Agent 开发",
    tagline: "从想法到上线，全栈交付 AI 产品",
    // ...
  },
  {
    id: "ai-training-consulting",
    slug: "ai-training-consulting",
    title: "AI 培训 & 咨询",
    tagline: "让团队掌握 AI 开发的实战能力",
    // ...
  },
];
```

#### 案例数据 (`data/cases.ts`)

```typescript
export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;          // 一句话描述
  description: string;      // 详细描述
  tags: string[];           // 技术标签
  featured: boolean;        // 是否精选
  image?: string;           // 封面图 URL
  content: string;          // Markdown 详情内容
  highlights: string[];     // 关键亮点
  techStack: string[];      // 技术栈
  links?: {                 // 外部链接
    github?: string;
    demo?: string;
  };
}

export const cases: CaseStudy[] = [
  {
    slug: "growthpilot-agent",
    title: "GrowthPilot Agent",
    tagline: "面向货运平台的 Multi-Agent 用户增长智能系统",
    tags: ["LangGraph", "Multi-Agent", "因果推断"],
    featured: true,
    // ...
  },
  // ...
];
```

#### 技术栈数据 (`data/tech-stack.ts`)

```typescript
export interface TechItem {
  name: string;
  category: "frontend" | "ai" | "backend" | "data" | "deploy";
  icon?: string;            // SVG path or icon name
}

export const techStack: TechItem[] = [
  { name: "LangGraph", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "OpenAI", category: "ai" },
  { name: "Next.js", category: "frontend" },
  // ...
];
```

### 4.3 数据流路径

```
构建时 (Build Time):
  data/*.ts → TypeScript 编译 → Server Components 直接 import
  → SSG 生成静态 HTML → 部署到 Vercel Edge

运行时 (Runtime):
  Contact Form:
    用户提交 → Client Validation → /api/contact (Serverless Function)
    → Email 发送 → 成功/失败反馈
  
  GitHub 数据 (可选):
    ISR revalidate → GitHub API → 缓存更新
```

### 4.4 缓存策略

| 数据类型 | 缓存方式 | 更新频率 |
|---------|---------|---------|
| 服务内容 | SSG (构建时生成) | 代码更新时 |
| 案例内容 | SSG | 代码更新时 |
| 技术栈 | SSG | 代码更新时 |
| GitHub Repos | ISR (可选) | 1小时 |
| Contact API | 无缓存 | 实时 |

---

## 5. 与 AI Insights 的链接关系

### 5.1 站点关系图

```
devfox.ai (Brand Site)          ai-insights.devfox.ai (Content Site)
┌────────────────────┐          ┌────────────────────────┐
│                    │          │                        │
│  品牌展示           │          │  内容消费               │
│  服务介绍           │          │  每日简报               │
│  案例展示           │  外链     │  系列文章               │
│  联系方式           │ ────────→│  Blog 文章              │
│                    │          │  读书笔记               │
│  301 重定向:        │          │  灵感图集               │
│  /blog →           │────────→│                        │
│  /books →          │────────→│                        │
│  /inspiration →    │────────→│                        │
│                    │          │                        │
│  Footer:           │  外链     │  About:               │
│  AI Insights 链接   │ ────────→│  devfox.ai 品牌链接     │
└────────────────────┘          └────────────────────────┘
```

### 5.2 交叉链接清单

#### DevFox Site → AI Insights

| 位置 | 链接文字 | 目标 URL |
|------|---------|---------|
| Navbar | "AI Insights" | `https://ai-insights.devfox.ai/` |
| Footer | "Blog" | `https://ai-insights.devfox.ai/blog/` |
| Footer | "Books" | `https://ai-insights.devfox.ai/books/` |
| Footer | "Gallery" | `https://ai-insights.devfox.ai/gallery/` |
| About 页面 | "阅读我的技术文章" | `https://ai-insights.devfox.ai/blog/` |
| 301 Redirect | `/blog/*` | `https://ai-insights.devfox.ai/blog/*` |
| 301 Redirect | `/books/*` | `https://ai-insights.devfox.ai/books/*` |
| 301 Redirect | `/inspiration` | `https://ai-insights.devfox.ai/gallery/` |

#### AI Insights → DevFox Site

| 位置 | 链接文字 | 目标 URL |
|------|---------|---------|
| Header | "DevFox" Logo | `https://devfox.ai/` |
| About 页面 | "了解更多" | `https://devfox.ai/about` |
| Footer | "服务" | `https://devfox.ai/services` |
| Footer | "联系" | `https://devfox.ai/contact` |

### 5.3 域名规划

| 站点 | 域名 | DNS | 部署 |
|------|------|-----|------|
| DevFox Brand Site | `devfox.ai` | Vercel DNS | Vercel |
| AI Insights | `ai-insights.devfox.ai` | CNAME to GitHub Pages | GitHub Pages |

**备选方案**: AI Insights 也可部署到 Vercel，统一管理:
- `devfox.ai` → Brand Site (Vercel)
- `ai.devfox.ai` → AI Insights (Vercel, Hugo adapter)

---

## 6. 部署方案

### 6.1 Vercel 部署配置

#### 项目设置

```
Framework Preset:    Next.js
Build Command:       npm run build
Output Directory:    .next
Install Command:     npm install
Node.js Version:     18.x
```

#### 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `NEXT_PUBLIC_R2_BASE_URL` | Cloudflare R2 公开访问 URL | 是 |
| `NEXT_PUBLIC_SITE_URL` | 站点 URL (devfox.ai) | 是 |
| `CONTACT_EMAIL` | 联系表单目标邮箱 | 是 |
| `RESEND_API_KEY` | Resend 邮件发送 API Key | 可选 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | 可选 |

#### vercel.json

```json
{
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/(.*)\\.(js|css|woff2|png|jpg|svg|ico)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### 6.2 构建流程

```
1. 代码推送到 GitHub (main branch)
   ↓
2. Vercel 自动触发构建
   ↓
3. npm install
   ↓
4. npm run build
   ├── TypeScript 编译
   ├── Next.js SSG 生成静态页面
   ├── ISR 配置 (首页 revalidate: 3600)
   └── Sitemap + robots.txt 生成
   ↓
5. 部署到 Vercel Edge Network
   ↓
6. 自动 SSL + CDN 缓存
```

### 6.3 性能优化策略

| 优化项 | 方案 | 预期效果 |
|--------|------|---------|
| **SSG** | 所有页面静态生成 | TTFB < 100ms |
| **Font 优化** | next/font 自动 subset | CLS = 0 |
| **Image 优化** | next/image + WebP/AVIF | 图片体积 -50% |
| **Code Split** | App Router 自动 code split | 首屏 JS < 100KB |
| **ISR** | 首页每小时更新 | 内容新鲜度 |
| **Edge Runtime** | 静态页面全球分发 | 全球低延迟 |

### 6.4 监控与告警

| 监控项 | 工具 | 阈值 |
|--------|------|------|
| 页面加载速度 | Vercel Speed Insights | LCP < 2.5s |
| 页访数据 | Vercel Analytics | — |
| 构建失败 | Vercel Notifications | 任何失败 |
| 404 错误 | Vercel Logs | 监控 |
| API 错误率 | 自定义日志 | < 1% |

---

## 7. 安全考虑

| 方面 | 措施 |
|------|------|
| **CSRF** | Contact API 使用 Next.js 内置 CSRF 保护 |
| **Rate Limiting** | Contact API 添加简单的 Rate Limit (如 per-IP) |
| **输入验证** | Contact Form 使用 Zod schema 验证 |
| **XSS** | React 自动转义，不在客户端渲染 dangerouslySetInnerHTML |
| **Content Security** | Security Headers (见 vercel.json) |
| **环境变量** | 敏感变量不使用 NEXT_PUBLIC_ 前缀 |

---

## 8. 开发规范

### 8.1 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 页面 | kebab-case 目录 | `app/services/ai-app-agent/page.tsx` |
| 组件 | PascalCase | `components/shared/ServiceCard.tsx` |
| 数据文件 | kebab-case | `data/tech-stack.ts` |
| 工具函数 | kebab-case | `lib/utils.ts` |
| 类型文件 | PascalCase | `types/CaseStudy.ts` |

### 8.2 Import 顺序

```typescript
// 1. React / Next.js
import { Metadata } from "next";
import Link from "next/link";

// 2. 第三方库
import { motion } from "framer-motion";

// 3. 内部组件
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CaseCard } from "@/components/shared/CaseCard";

// 4. 数据
import { cases } from "@/data/cases";

// 5. 类型
import type { CaseStudy } from "@/types/CaseStudy";

// 6. 工具
import { cn } from "@/lib/utils";
```

### 8.3 组件模式

**Server Component (默认)**:
```typescript
// 无 'use client' 指令
import { cases } from "@/data/cases";
import { CaseCard } from "@/components/shared/CaseCard";

export default function CasesPage() {
  return (
    <div>
      {cases.map((c) => (
        <CaseCard key={c.slug} case={c} />
      ))}
    </div>
  );
}
```

**Client Component (仅需要交互时)**:
```typescript
"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  // ...
}
```

---

## 9. 未来扩展

| 扩展项 | 说明 | 优先级 |
|--------|------|--------|
| Blog RSS Feed | 提供 RSS 订阅 | P2 |
| MDX 支持 | 案例详情支持 MDX | P2 |
| 国际化 (i18n) | 英文版品牌站 | P3 |
| CMS 集成 | 通过 Notion/Contentlayer 管理案例内容 | P3 |
| 实时聊天 | 集成 Crisp/Intercom 在线客服 | P3 |
| Vercel Analytics Dashboard | 定制分析面板 | P3 |

---

## 10. 相关文档

| 文档 | 路径 |
|------|------|
| 产品需求文档 | `/docs/PRD.md` |
| 设计规范 | `/docs/DESIGN_SYSTEM.md` |
| AI Insights 迁移指南 | `ai-insights/docs/MIGRATION_GUIDE.md` |
| 现有 CLAUDE.md | `/CLAUDE.md` |
| 现有 DESIGN.md | `/DESIGN.md` |
