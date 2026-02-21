# DevFox - 个人名片 & 作品集

极客狐 DevFox 的个人名片网站，展示我的开源项目、产品、博客和技术文章。

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)

## ✨ 特性

- 🏠 **个人主页** - 展示个人介绍和技术能力
- 🚀 **产品展示** - AI 驱动的产品展示（提示词灵感、创意工坊、智能出题系统）
- 💼 **作品集** - 开源项目和个人作品展示
- 📝 **博客** - 技术文章和思考分享
- 🎨 **现代化设计** - 采用玻璃态效果、渐变色和流畅动画
- 🌙 **深色模式** - 深色主题设计
- 📱 **响应式布局** - 完美适配各种设备

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 yarn 或 pnpm

### 安装

```bash
# 克隆仓库
git clone https://github.com/Ming-H/aibook.git
cd aibook

# 安装依赖
npm install
```

### 配置环境变量

复制 `.env.example` 到 `.env.local` 并填写配置：

```bash
cp .env.example .env.local
```

### 开发

```bash
# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建

```bash
# 构建生产版本（包含 Prisma 客户端生成）
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
aibook/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 首页
│   ├── layout.tsx                # 根布局
│   ├── globals.css               # 全局样式
│   ├── about/                    # 关于页面
│   ├── products/                 # 产品展示
│   ├── prompts/                  # 提示词灵感（产品页面）
│   ├── projects/                 # 作品集
│   ├── blog/                     # 博客
│   ├── contact/                  # 联系页面
│   ├── quiz-generator/           # 智能出题系统
│   ├── creative-workshop/        # 创意工坊
│   ├── auth/                     # 认证页面
│   ├── admin/                    # 管理后台
│   └── api/                      # API 路由
├── components/                   # React 组件
│   ├── Navbar.tsx                # 导航栏
│   ├── ThemeProvider.tsx         # 主题提供者
│   └── ui/                       # UI 组件
├── lib/                          # 工具库
│   ├── github-api.ts             # GitHub API 封装
│   ├── glm-api.ts                # GLM API 封装
│   ├── modelscope-api.ts         # ModelScope API 封装
│   ├── content-loader.ts         # 内容加载器
│   └── auth.ts                   # 认证配置
├── prisma/                       # 数据库
│   └── schema.prisma             # 数据库模型
├── types/                        # TypeScript 类型定义
├── public/                       # 静态资源
└── styles/                       # 样式文件
```

## 🎨 技术栈

### 前端框架
- **Next.js 14** - React 全栈框架（App Router）
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS 框架

### 后端 & 数据库
- **NextAuth.js** - 认证系统
- **Prisma** - ORM
- **PostgreSQL** - 数据库

### AI 集成
- **GLM-4.7 API** - 智能出题
- **ModelScope API** - AI 图片生成

### 内容处理
- **@octokit/rest** - GitHub API 客户端
- **unified** + **remark** + **rehype** - Markdown 处理
- **gray-matter** - Frontmatter 解析

## 📄 页面说明

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 个人主页展示 |
| 关于 | `/about` | 个人介绍 |
| 产品 | `/products` | AI 产品展示（提示词灵感、创意工坊、智能出题） |
| 作品 | `/projects` | 开源项目集 |
| 博客 | `/blog` | 技术博客 |
| 联系 | `/contact` | 联系方式 |
| 提示词灵感 | `/prompts` | 精选提示词库 |
| 创意工坊 | `/creative-workshop` | AI 图片生成 |
| 智能出题 | `/quiz-generator` | AI 题目生成 |

## 🔧 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `DATABASE_URL` | PostgreSQL 连接字符串 | 是 |
| `NEXTAUTH_SECRET` | NextAuth 密钥 | 是 |
| `NEXTAUTH_URL` | 网站 URL | 是 |
| `GITHUB_TOKEN` | GitHub Token（可选） | 否 |
| `GLM_API_KEY` | GLM API Key | 否 |
| `MODELSCOPE_API_KEY` | ModelScope API Key | 否 |

## 🏗️ 部署

项目已配置为部署到 Vercel：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署到 Vercel
vercel --prod
```

### 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```bash
# 数据库
DATABASE_URL=your_postgresql_connection_string

# 认证
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-domain.com

# AI API（可选）
GLM_API_KEY=your_glm_api_key
MODELSCOPE_API_KEY=your_modelscope_api_key
```

## 📊 性能优化

- ✅ 静态站点生成（SSG）
- ✅ 增量静态再生（ISR）
- ✅ 代码分割
- ✅ 图片优化
- ✅ 缓存策略

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👤 关于

我是极客狐 DevFox，AI 工程师 & 独立开发者。

- GitHub: [@devfoxaicn](https://github.com/devfoxaicn)
- 网站: [devfoxaicn.github.io](https://devfoxaicn.github.io)
