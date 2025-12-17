# AI Book - 一站式机器学习平台

面向不会编程学生的可视化机器学习建模与数据分析平台。

## 功能特性

- 🎨 **可视化工作流编辑器** - 拖拽式节点编辑，类似 n8n 的交互体验
- 📊 **数据上传与处理** - 支持 CSV 文件上传和特征分析
- 🤖 **多种机器学习算法** - 支持分类和回归任务
  - 随机森林 (Random Forest)
  - 支持向量机 (SVM)
  - 逻辑回归 (Logistic Regression)
  - 线性回归 (Linear Regression)
  - 梯度提升 (Gradient Boosting)
  - K近邻 (KNN)
- 📈 **模型评估** - 完整的模型性能评估指标和可视化
- 💾 **实验管理** - 保存和管理历史实验，支持重新训练
- 🔐 **用户认证** - 基于 JWT 的用户注册和登录系统
- ☁️ **云端存储** - 使用 Supabase PostgreSQL 存储实验数据

## 技术栈

### 前端
- **Next.js 14** - React 框架，App Router
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **React Hooks** - 状态管理

### 后端
- **FastAPI** - Python Web 框架
- **Scikit-learn** - 机器学习库
- **Pandas** - 数据处理
- **PostgreSQL / Supabase** - 数据库

## 项目结构

```
aibook/
├── app/                    # Next.js 应用目录
│   ├── page.tsx           # 首页
│   ├── workflow/          # 工作流编辑器
│   ├── experiments/       # 实验历史
│   └── workflows/         # 工作流管理
├── backend/               # FastAPI 后端
│   ├── main.py           # API 入口
│   ├── ml_core.py        # 机器学习核心逻辑
│   ├── database.py       # 数据库连接
│   └── schemas.py        # 数据模型
├── components/           # React 组件
│   ├── ui/              # UI 组件库
│   └── AuthProvider.tsx # 认证提供者
└── lib/                  # 工具库
    ├── auth.ts          # 认证工具
    └── workflow-executor.ts # 工作流执行器
```

## 快速开始

### 前置要求

- Node.js 18+ 
- Python 3.9+
- Conda (推荐用于 Python 环境管理)
- PostgreSQL 或 Supabase 账户

### 安装步骤

1. **克隆仓库**
```bash
git clone <your-repo-url>
cd aibook
```

2. **安装前端依赖**
```bash
npm install
```

3. **设置 Python 环境**
```bash
# 创建 conda 环境
conda create -n aibook_env python=3.9
conda activate aibook_env

# 安装后端依赖
cd backend
pip install -r requirements.txt
```

4. **配置环境变量**

创建 `backend/.env` 文件：
```env
USE_SUPABASE=true
SUPABASE_DB_URL=your_supabase_connection_string
JWT_SECRET=your_jwt_secret_key
```

创建 `.env.local` 文件（前端）：
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

5. **初始化数据库**
```bash
cd backend
python -c "from database import init_db; init_db()"
```

6. **启动开发服务器**

前端（端口 3000）：
```bash
npm run dev
```

后端（端口 8000）：
```bash
cd backend
uvicorn main:app --reload
```

## 使用说明

### 创建工作流

1. 从左侧拖拽功能模块到画布
2. 右键点击"数据上传"节点上传 CSV 文件
3. 连接节点建立数据流（点击节点的连接点）
4. 配置模型训练参数（右键点击"模型训练"节点）
5. 选择算法（拖拽算法节点或在下拉菜单中选择）
6. 点击"运行工作流"执行
7. 查看结果并保存实验

### 查看历史实验

- 访问 `/experiments` 查看所有历史实验
- 点击实验查看详细信息
- 点击"重新训练"可以导入到画布继续编辑

## 部署

### Vercel 部署（前端）

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量 `NEXT_PUBLIC_BACKEND_URL`

### 后端部署

推荐使用支持 Python 的云平台（如 Railway、Render、Heroku）部署 FastAPI 应用。

## 开发计划

- [ ] 更多特征工程功能
- [ ] 模型导出和部署
- [ ] 数据可视化增强
- [ ] 协作功能
- [ ] 模型版本管理

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
