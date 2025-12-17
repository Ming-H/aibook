# Supabase 数据库配置指南

## 问题说明

在 Vercel 等无服务器环境中，本地 SQLite 数据库文件无法持久化，每次部署都会重置。为了解决这个问题，我们支持使用 Supabase PostgreSQL 数据库来持久化存储数据。

## 配置步骤

### 1. 在 Supabase 创建项目

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 创建新项目或使用现有项目
3. 等待数据库初始化完成

### 2. 获取数据库连接字符串

1. 在 Supabase Dashboard 中，进入你的项目
2. 点击左侧菜单的 **Settings** → **Database**
3. 找到 **Connection string** 部分
4. 选择 **URI** 格式
5. 复制连接字符串，格式类似：
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### 3. 配置环境变量

#### 本地开发

在 `backend/` 目录下创建 `.env` 文件：

```env
USE_SUPABASE=true
SUPABASE_DB_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=your-secret-key-here
```

#### Vercel 部署

1. 在 Vercel Dashboard 中，进入你的项目
2. 点击 **Settings** → **Environment Variables**
3. 添加以下环境变量：
   - `USE_SUPABASE`: `true`
   - `SUPABASE_DB_URL`: 你的 Supabase 连接字符串
   - `JWT_SECRET`: 你的 JWT 密钥（用于用户认证）

### 4. 安装依赖

确保已安装 PostgreSQL 驱动：

```bash
pip install psycopg2-binary
```

或使用 conda 环境：

```bash
conda activate aibook_env
pip install psycopg2-binary
```

### 5. 初始化数据库表

数据库表会在应用启动时自动创建。如果表已存在，不会重复创建。

## 数据库兼容性

系统同时支持：
- **SQLite**（本地开发，默认）：当 `USE_SUPABASE=false` 或未设置时使用
- **PostgreSQL/Supabase**（生产环境）：当 `USE_SUPABASE=true` 且设置了 `SUPABASE_DB_URL` 时使用

代码会自动检测数据库类型并适配 SQL 语法差异。

## 验证配置

1. 启动后端服务：
   ```bash
   cd backend
   python main.py
   ```

2. 检查日志，应该看到数据库连接成功的消息

3. 注册一个新用户，验证数据是否保存到 Supabase

4. 在 Supabase Dashboard → **Table Editor** 中查看数据

## 故障排除

### 连接失败

- 检查 `SUPABASE_DB_URL` 是否正确
- 确认 Supabase 项目状态为 "Active"
- 检查网络连接和防火墙设置

### 表未创建

- 检查应用启动日志
- 手动在 Supabase SQL Editor 中运行表创建语句（参考 `database.py` 中的 `init_db()` 函数）

### 数据未保存

- 检查用户是否已登录（需要有效的 JWT token）
- 查看后端日志中的错误信息
- 确认数据库连接正常

## 安全注意事项

1. **不要**将 `.env` 文件提交到 Git
2. **不要**在代码中硬编码数据库连接字符串
3. 使用强密码保护 Supabase 数据库
4. 定期更新 JWT_SECRET
5. 在生产环境中启用 Supabase 的 Row Level Security (RLS)
