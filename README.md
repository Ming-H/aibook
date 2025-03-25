# AIBook博客

这是一个使用Next.js 14构建的现代博客应用，专注于分享AI和编程知识。

## 功能特点

- 📱 响应式设计，适配各种设备
- 🌙 明暗模式切换
- 🔍 全文搜索功能
- 📂 按分类和标签浏览文章
- 💬 文章评论系统
- 📊 相关文章推荐
- 📱 社交媒体分享

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **数据库**: Supabase
- **认证**: Supabase Auth
- **部署**: Vercel

## 快速开始

### 前提条件

- Node.js 18.17.0或更高版本
- npm或yarn

### 安装

1. 克隆仓库
```bash
git clone https://github.com/yourusername/aibook-blog.git
cd aibook-blog
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 环境变量设置
复制`.env.local.example`文件并重命名为`.env.local`，然后填入你的Supabase凭证。

4. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

5. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
aibook-blog/
├── app/                  # Next.js 14 App Router
│   ├── (auth)/           # 认证相关页面
│   ├── (blog)/           # 博客相关页面
│   ├── api/              # API路由
│   ├── components/       # 共享组件
│   ├── lib/              # 工具函数和库
│   ├── styles/           # 全局样式
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 首页
├── public/               # 静态资源
├── .env.local.example    # 环境变量示例
├── next.config.js        # Next.js配置
├── package.json          # 项目依赖
├── postcss.config.js     # PostCSS配置
├── tailwind.config.js    # Tailwind CSS配置
└── tsconfig.json         # TypeScript配置
```

## 页面和组件

### 页面

- **首页**: 展示最新文章和精选内容
- **博客详情页**: 显示完整的博客文章内容
- **搜索结果页**: 根据用户查询显示相关文章
- **分类页**: 按分类展示文章
- **标签页**: 按标签展示文章

### 组件

- **导航栏**: 网站导航和搜索功能
- **文章卡片**: 在列表中展示文章预览
- **评论区**: 用户可以对文章发表评论
- **分享按钮**: 分享文章到社交媒体
- **相关文章**: 显示与当前文章相关的其他文章

## 部署

本项目可以轻松部署到Vercel:

1. 在Vercel上创建新项目
2. 连接到你的GitHub仓库
3. 设置环境变量
4. 部署

## 贡献

欢迎提交Pull Request或创建Issue来改进这个项目。

## 许可证

MIT
