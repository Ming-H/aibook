# AI Book 一站式机器学习平台开发计划（v0.1 – MVP 到可商用雏形）

本文档基于 `prompt-ml-website.md` 的产品规划，从工程实现角度，拆分前端、后端、数据存储与基础设施的开发计划。假设开发者是一名有完整交付经验的全栈工程师，并在前端 UI / 后端架构 / 数据工程方面具备大厂级经验。

---

## 一、整体目标与里程碑

### 1. 产品目标（与提示词保持一致）

- 面向不会编程、不了解机器学习的 **高中生 / 大学生 / 初学者**，提供：
  - 上传数据 → 自动建模 → 可视化分析 → 自动生成报告（文本 + 图片）的 **一站式平台**。
  - 低代码 / 无代码操作体验（点击、填写少量选项、未来引入拖拽工作流）。
- 支持未来的 **商业化 / 订阅模式**，预留用户体系与配额管控设计。

### 2. 版本划分

- **MVP v0.1（当前阶段，重点）**
  - 后端：单机 FastAPI + pandas + scikit-learn，支持 CSV 上传、简单预处理、基本模型训练与指标计算、结构化实验结果 + 文本总结生成（目前为规则模板版）。
  - 前端：Next.js 单页向导式 UI（3 步：上传 → 指标 → 总结），深色简洁风格，适合 Demo 与教学。
  - 存储：本地文件 + SQLite（或轻量存储）保存上传数据与实验记录的基础信息。

- **v0.2 – 可教学使用版本**
  - 增强特征工程与指标可视化。
  - 增加实验列表视图与历史记录。
  - 引入基础用户体系（注册 / 登录），开始做用户隔离。

- **v1.0 – 初版商用 / 订阅版本**
  - 后端与数据库迁移到托管 PostgreSQL + 对象存储（或 Supabase）。
  - 正式订阅模型 / 付费 API / 限流策略。
  - 初步拖拽式 Pipeline Canvas。

下文重点聚焦 **MVP v0.1 + 兼顾 v0.2 的可扩展性设计**。

---

## 二、前端开发计划（Next.js + Tailwind，Google 级 UI 设计思路）

### 1. 技术栈与结构

- 技术栈：
  - **Next.js 14 App Router + TypeScript**
  - **Tailwind CSS** + 自定义设计系统（色板、阴影、圆角、字体统一）
  - 后续可选：Headless UI / Radix UI 增强交互组件
- 结构建议：
  - `app/layout.tsx`：全局布局（导航栏、背景、字体）。
  - `app/page.tsx`：MVP 的「一站式建模向导」主页面。
  - `app/(auth)/login` / `register`（v0.2+）：用户登录与注册页面。
  - `components/ui/*`：按钮、输入框、卡片、步骤条等基础 UI 组件。
  - `components/experiments/*`：与实验相关的高层组件（上传表单、指标面板、报告 viewer）。

### 2. 设计原则（Google / Twitter 级别 UI 标准）

- **视觉**
  - 使用有限色板：背景深色（Slate / Neutral 系），主色蓝紫渐变（科技感）、强调色青色。
  - 统一圆角（如 `rounded-xl`）、统一阴影（柔和、不过分浮夸），保持干净专业。
  - 字体层级清晰：H1/H2 标题、正文、辅助说明文字使用不同字号与颜色（白 / 浅灰 / 深灰）。

- **布局**
  - 所有主要内容限制在 **中间最大宽度容器**（如 `max-w-5xl`），避免全屏文字显得“散”。
  - 采用 **分区卡片布局**：Hero / 步骤条 / 内容卡片，各自有明显边界和留白。

- **交互**
  - 所有按钮有清晰状态：默认、Hover、Disabled。
  - 表单错误有即时的、友好的提示（红色边框 + 文案）。
  - 步骤式向导使用清晰的步骤指示器，让学生知道自己走到哪一阶段。

### 3. MVP 页面拆分

1. **Hero + 简要介绍区**
   - 标题：`AI Book — 一站式机器学习建模与分析（MVP）`
   - 副标题：一句话解释目标人群与核心价值（不会编程也能从 0 到 1 完成建模）。
   - 简短的 3 步图示（图标 + 简单文字）。

2. **步骤指示器组件 `Stepper`**
   - 显示 3 个步骤：上传 → 指标 → 总结。
   - 使用图标 / 数字圆点，当前步骤高亮，已完成步骤打勾。

3. **Step 1 – 上传与配置**
   - 卡片左：文件上传框（拖拽区域 + 按钮）。
   - 卡片右：目标列输入、任务类型选择（单选按钮组）。
   - 下方：`开始自动建模` 主按钮。
   - 提示文案：告诉学生如何在 Excel 整理数据、目标列是什么。

4. **Step 2 – 指标与特征**
   - 上：数据概览（数据集名称、样本量、特征数、任务类型）。
   - 中：主要指标网格卡片（每个卡片显示名称 + 值）。
   - 下：重要特征列表 / 简单条形图（可以先用 div 模拟进度条）。

5. **Step 3 – 总结报告**
   - 左侧：Markdown 文本区域（可复制）。
   - 右侧（未来）：总结性图片预览占位（目前可放「即将支持」说明）。

### 4. 后续 UI 演进（v0.2+）

- 新增 **实验列表页**：卡片列出最近 N 次实验，点击进入详情。
- 实验详情页包含：结果图表、配置详情、再次训练按钮。
- 逐步引入 **拖拽式 Pipeline**（Canvas 界面）：节点代表「数据清洗 / 特征选择 / 模型训练 / 评估」，边表示数据流。

---

## 三、后端开发计划（FastAPI + sklearn）

### 1. 当前已实现的 MVP 能力回顾

- `backend/main.py`：
  - `POST /api/experiments/upload-and-train`：接受 CSV 文件 + 目标列 + 任务类型，训练 RandomForest 分类 / 回归，返回结构化 `ExperimentResult`。
  - `POST /api/experiments/summarize`：根据 `ExperimentResult` 生成中文 Markdown 总结（模板形式）。
  - 基础 Health Check。

- `backend/ml_core.py`：
  - 数据集拆分（特征 / 标签）。
  - 数值特征标准化、类别特征 One-Hot。
  - 训练随机森林，计算分类 / 回归指标。
  - 简单特征重要性估计。

- `backend/schemas.py`：
  - 统一的数据结构：`ExperimentResult` 等。

### 2. MVP 阶段后端任务拆分

1. **API 设计与版本化**
   - 所有线上的接口以 `/api/v1/...` 为前缀，为未来版本预留空间。
   - 目前已有接口将在下一步重命名为：
     - `POST /api/v1/experiments/upload-and-train`
     - `POST /api/v1/experiments/summarize`

2. **预处理与校验增强**
   - 文件大小限制（例如默认 10MB，可配置）。
   - 列名合法性检查（禁止全空列，提示用户）。
   - 自动推断任务类型（可选）：依据目标列是否为离散值给出推荐。

3. **错误处理与日志**
   - 使用 FastAPI 的异常处理器，返回统一的错误结构（`code`、`message`、`details`）。
   - 记录关键操作日志（上传时间、IP、文件名、错误堆栈）到本地日志文件，便于调试。

4. **实验记录抽象（即将落地的数据模型）**
   - 设计内部 Python 模型（后续与数据库表结构对应）：
     - User（v0.2+）
     - Dataset
     - Experiment（包含 dataset_id、配置、指标 JSON、文件路径等）

5. **LLM 集成预留**
   - 目前 `summarize` 使用模板生成。
   - 后续新增：
     - `LLMClient` 抽象类：读取 `.env` 中的 `LLM_API_KEY` / `LLM_API_BASE`。
     - 在配置开启时，调用外部 LLM API 生成更自然的报告；否则退回模板版。

### 3. v0.2 后端演进方向

- 支持多模型类型（Logistic Regression、Gradient Boosting、XGBoost 等）。
- 支持用户传入部分超参数（有默认值、防止配置过于复杂）。
- 引入「实验列表」相关 API：
  - `GET /api/v1/experiments`：列出最近实验。
  - `GET /api/v1/experiments/{id}`：查看某次实验详情。

---

## 四、数据存储与持久化计划

### 1. MVP：本地存储

- 目标：快速实现「后台保存数据」的基础能力，方便调试和教学。
- 实现方式：
  - 上传的 CSV 文件写入 `backend/uploads/` 目录，文件名可加时间戳防冲突。
  - 使用 SQLite 或简单 JSON 文件临时记录：
    - `dataset_id`、文件路径、上传时间。
    - `experiment_id`、关联 `dataset_id`、模型配置、指标 JSON、生成时间。

> 注：MVP 阶段可以只保留文件写盘 + 日志记录，不强制实现完整 CRUD 数据库，重点是跑通端到端流程。

### 2. v0.2+：引入真正的数据库（推荐 PostgreSQL / Supabase）

- 数据模型草图：
  - `users`：id, email, hashed_password, created_at, role, plan 等。
  - `datasets`：id, user_id, name, path, rows, cols, created_at。
  - `experiments`：id, user_id, dataset_id, task_type, target_column, model_type, hyperparams_json, metrics_json, created_at。
  - `subscriptions`：id, user_id, plan, status, expired_at, created_at。

- 方案选型：
  - 本地 / 自建：PostgreSQL（docker + Alembic 做迁移）。
  - 一体化：Supabase（PostgreSQL + Auth + Storage）、或 Firebase（Firestore + Storage）。

### 3. 文件与对象存储

- 数据文件 & 报告 & 生成图片：
  - 本地：存储在 `/uploads/datasets`、`/uploads/reports`、`/uploads/images`。
  - 线上：迁移到 S3 / R2 / Supabase Storage，URL 存在数据库记录里。

### 4. 权限与数据安全

- 所有数据、实验记录与用户绑定（`user_id`），API 层检查权限。
- 日志中避免记录完整原始数据（保护隐私），只记录概要信息。

---

## 五、开发阶段拆分与优先级

### 阶段 1：MVP 打通（已经在进行）

- [x] 提示词与产品定位文档：`prompt-ml-website.md`
- [x] 后端 MVP：
  - 上传 CSV → 训练基础模型 → 返回指标 + 特征重要性。
  - 根据实验结果生成结构化 Markdown 总结。
- [x] 前端 MVP：
  - Next.js + TypeScript + 基础 UI。
  - 三步向导：上传 → 指标 → 总结。
- [ ] Tailwind 集成与 UI 进一步美化（局部已用类似类名，需补正式 Tailwind 配置）。

### 阶段 2：体验提升（UI / UX 为主）

- 引入 Tailwind 正式配置（`tailwind.config.js`、`postcss.config.js`），清理内联样式。
- 统一抽象 UI 组件（Button / Card / Stepper / Input）。
- 优化移动端体验（响应式布局，确保手机端可用）。
- 增加空状态、加载骨架屏、错误展示组件。

### 阶段 3：实验管理 & 基本持久化

- 在后端增加 Dataset / Experiment 模型与简单持久化逻辑（本地或 SQLite）。
- 在前端增加「近期实验」列表与「实验详情」页。

### 阶段 4：用户体系与订阅雏形

- 实现基础登录 / 注册（可以直接选用 Supabase Auth 或自建 JWT）。
- 根据用户身份过滤实验列表。
- 设计 Free / Pro 简单配额规则（前端提示 + 后端校验）。

---

## 六、开发约定与工程规范

- 语言与注释：
  - 代码使用英文命名，注释与用户界面文案使用简体中文 + 必要英文术语。
- 代码风格：
  - 前端：ESLint + Prettier（使用 Next 默认配置为基础）。
  - 后端：`ruff` 或 `flake8` + `black`（视个人习惯）。
- 配置与密钥：
  - 所有密钥与敏感配置只放在 `.env` / 环境变量中，不写入仓库。
  - 提供 `.env.example` 说明必需变量。

---

## 七、后续讨论与决策点

- 是否优先选择 Supabase 作为后端一体化解决方案（Auth + DB + Storage），可以大幅减少自建工作。
- 拖拽式 Pipeline 画布的技术选型（如 React Flow / custom SVG / Canvas）。
- 未来是否需要多语言支持（中文为主，是否增加英文界面）。

本开发计划会随着实际开发推进不断调整和细化，但应始终与 `prompt-ml-website.md` 中的产品愿景保持一致：**为不会编程的学生提供一个真正可用、可理解、可持续迭代的一站式机器学习学习与实践平台。**


