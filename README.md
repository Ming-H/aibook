# AI Hot Tech - AI 技术热点展示平台

一个现代化的 AI 技术热点内容展示平台，每天呈现最新的 AI 技术话题。

![AI Hot Tech](https://img.shields.io/badge/AI-Hot%20Tech-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)

## ✨ 特性

- 📅 **时间轴展示** - 按日期倒序展示每日 AI 技术热点
- 🎨 **现代化设计** - 采用玻璃态效果、渐变色和流畅动画
- 📝 **Markdown 支持** - 完整的 Markdown 渲染和代码高亮
- 🌙 **深色模式** - 深色主题设计
- 📱 **响应式布局** - 完美适配各种设备
- ⚡ **GitHub API 数据源** - 从 GitHub 仓库读取内容
- 🔍 **文章归档** - 按月份浏览历史文章
- 🔄 **自动更新** - Vercel Cron Jobs 每日自动刷新内容

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn 或 pnpm
- GitHub 账户（用于存储内容）

### 安装

```bash
# 克隆仓库
git clone https://github.com/Ming-H/aibook.git
cd aibook

# 安装依赖
npm install
```

### 配置环境变量

创建 `.env.local` 文件：

```env
# GitHub API 配置
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_DATA_REPO=Ming-H/aibook-data
CRON_SECRET=your-random-secret-key-here
```

**获取 GitHub Token：**
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 复制生成的 token

**创建数据仓库：**
1. 在 GitHub 上创建新仓库 `aibook-data`
2. 按以下结构组织内容：
```
aibook-data/
├── 20260108/
│   └── longform/
│       ├── article_🤗_meta-llama_Llama-3.1-8B-Inst_20260108_123847.md
│       └── ...
├── 20260109/
│   └── longform/
│       └── ...
└── README.md
```

### 开发

```bash
# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
aibook/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 首页 - 时间轴展示
│   ├── layout.tsx                # 根布局
│   ├── globals.css               # 全局样式
│   ├── sitemap.ts                # SEO Sitemap
│   ├── robots.ts                 # Robots.txt
│   ├── api/                      # API 路由
│   │   └── revalidate/           # ISR 重新验证
│   │       └── route.ts
│   ├── archive/                  # 归档页面
│   │   └── page.tsx
│   └── articles/                 # 文章详情页
│       └── [date]/
│           └── [slug]/
│               └── page.tsx
├── components/                   # React 组件
│   └── Navbar.tsx                # 导航栏
├── lib/                          # 工具库
│   ├── github-api.ts             # GitHub API 封装
│   ├── content-loader.ts         # 内容加载器
│   ├── fs-utils.ts               # 文件名解析工具
│   └── markdown-parser.ts        # Markdown 解析器
├── types/                        # TypeScript 类型定义
│   └── content.ts                # 内容类型
├── vercel.json                   # Vercel 配置
├── next.config.mjs               # Next.js 配置
└── .env.example                  # 环境变量示例
```

## 🎨 技术栈

### 前端框架
- **Next.js 14** - React 全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS 框架

### 内容处理
- **@octokit/rest** - GitHub API 客户端
- **unified** - 统一的文本处理框架
- **remark** - Markdown 解析器
- **rehype** - HTML 处理器
- **gray-matter** - Frontmatter 解析
- **reading-time** - 阅读时间计算

### 主要特性
- ⚡️ **静态站点生成 (SSG)** - 构建时预渲染，SEO 友好
- 🔄 **增量静态再生 (ISR)** - 按需更新内容
- 🎨 **现代设计系统** - 蓝紫粉渐变、玻璃态效果
- 📱 **响应式设计** - 移动优先的设计理念
- ⚡ **代码分割** - 按需加载，优化性能

## 📝 内容格式

文章文件命名格式：
```
article_{emoji}_{platform}_{model_name}_{YYYYMMDD}_{HHMMSS}.md
```

示例：
```
article_🤗_meta-llama_Llama-3.1-8B-Inst_20260108_123847.md
```

文章 Frontmatter 格式：
```yaml
---
title: 文章标题
tags: ["标签1", "标签2"]
wordCount: 5000
readTime: 25
---
```

## 🏗️ 部署到 Vercel

### 1. 准备工作

**创建 GitHub Personal Access Token：**
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 设置权限：勾选 `repo`（完整仓库访问权限）
4. 复制生成的 token（仅显示一次）

**创建数据仓库：**
1. 在 GitHub 上创建新仓库 `aibook-data`
2. 迁移现有文章到该仓库，保持目录结构

### 2. Vercel 部署

1. 访问 [Vercel](https://vercel.com)
2. 点击 "Add New Project"
3. 导入你的 GitHub 仓库
4. 配置环境变量：

```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_DATA_REPO=Ming-H/aibook-data
CRON_SECRET=随机生成的密钥
```

5. 点击 "Deploy"

### 3. 配置域名（可选）

1. 在 Vercel 项目设置中添加自定义域名
2. 在域名注册商处添加 DNS 记录：
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

3. 等待 SSL 证书生成（通常几分钟到几小时）

### 4. 自动更新

项目已配置 Vercel Cron Jobs，每天凌晨 2 点（UTC）自动刷新内容。

手动触发更新：
```bash
curl -X GET "https://your-domain.com/api/revalidate" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## 🔧 配置

### 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `GITHUB_TOKEN` | GitHub Personal Access Token | 是 |
| `GITHUB_DATA_REPO` | 数据仓库 (格式: owner/repo) | 是 |
| `CRON_SECRET` | Cron 密钥，用于保护 ISR 端点 | 是 |

### 自定义样式

在 `app/globals.css` 中修改 CSS 变量来自定义颜色和样式：

```css
/* 修改主题色 */
.bg-gradient-to-r {
  /* 自定义渐变色 */
}
```

## 📊 性能优化

- ✅ 静态站点生成（SSG）
- ✅ 增量静态再生（ISR）
- ✅ 代码分割
- ✅ CSS 压缩
- ✅ 缓存策略
- ✅ GitHub API 缓存

## 🔄 数据同步

### 自动同步脚本

创建 `scripts/sync-data.js`：

```javascript
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const DATA_SOURCE = "/path/to/content-forge-ai/data";
const DATA_REPO = "/path/to/aibook-data";

function syncData() {
  console.log("Starting data sync...");

  const dirs = fs.readdirSync(DATA_SOURCE);
  for (const dir of dirs) {
    const sourcePath = path.join(DATA_SOURCE, dir);
    const targetPath = path.join(DATA_REPO, dir);

    if (!fs.existsSync(targetPath)) {
      console.log(`Copying ${dir}...`);
      execSync(`cp -r "${sourcePath}" "${targetPath}"`);
    }
  }

  execSync(`cd "${DATA_REPO}" && git add .`);
  execSync(`cd "${DATA_REPO}" && git commit -m "Update data: ${new Date().toISOString()}"`);
  execSync(`cd "${DATA_REPO}" && git push`);

  console.log("Data sync completed!");
}

syncData();
```

### GitHub Actions 自动化

在 `aibook-data` 仓库创建 `.github/workflows/sync.yml`：

```yaml
name: Sync to Main Site

on:
  push:
    branches: [main]

jobs:
  trigger-rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Rebuild
        run: |
          curl -X POST "https://api.vercel.com/v1/integrations/deploy/Qm.../..." \
            -H "Content-Type: application/json"
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🌟 致谢

- 设计灵感：Google、Meta 等现代科技网站
- 图标：Heroicons
- 字体：系统字体栈
- CSS 框架：Tailwind CSS
- 托管平台：Vercel
