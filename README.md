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

# AIBook Studio

创建、协作和发布您的AI驱动内容

## 认证功能

本项目使用 Supabase 提供认证服务，支持以下功能：

- 邮箱/密码注册和登录
- GitHub OAuth 登录
- 密码重置
- 用户个人资料管理

### 设置认证

1. 在 Supabase 创建项目
2. 复制项目 URL 和匿名密钥到 `.env.local` 文件
3. 确保 Supabase 中有 `profiles` 表，字段包括：
   - `id` (uuid, primary key)
   - `email` (text)
   - `full_name` (text)
   - `avatar_url` (text, optional)
   - `updated_at` (timestamp)

4. 在 Supabase SQL 编辑器中创建触发器：

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, updated_at)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', SPLIT_PART(new.email, '@', 1)), 
    NOW()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```
```

## 5. 提交到 GitHub 的命令

完成上述修改后，您可以使用以下命令将更改提交到 GitHub：

```bash
# 添加所有更改的文件
git add .

# 添加 .env.example 文件
git add .env.example

# 添加 README.md
git add README.md

# 提交更改
git commit -m "实现 Supabase 认证功能：修复登录和注册问题"

# 推送到 GitHub
git push origin main
```

## 提交信息示例

以下是一个详细的提交信息，如果您希望提供更多上下文：
