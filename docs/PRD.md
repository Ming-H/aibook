# DevFox Brand Site — 产品需求文档 (PRD)

> 版本: 1.0.0
> 最后更新: 2026-04-21
> 作者: DevFox Team
> 状态: Draft

---

## 1. 项目背景

### 1.1 现状

DevFox Site 当前定位为「个人博客 + 内容聚合站」，主要承载 Blog、Books、Gallery、Projects 等内容型页面。站点采用 Next.js 14 App Router + Tailwind CSS 构建，整体设计风格偏极简黑白，信息密度较低，缺乏品牌辨识度和商业转化能力。

### 1.2 问题

1. **品牌定位模糊** — 访客无法快速理解 DevFox 提供什么服务、解决什么问题
2. **商业转化缺失** — 没有清晰的服务介绍、案例展示、CTA (Call to Action) 机制
3. **内容结构错位** — Blog/Books/Gallery 属于内容消费场景，与品牌官网的营销定位冲突
4. **视觉层次不足** — 当前页面以列表为主，缺少 Hero 区、Feature 区、Testimonial 区等营销页面核心模块

### 1.3 改造目标

将 DevFox Site 从「个人博客站」改造为「专业开发者品牌官网」：

- **核心定位**: AI 落地应用 & Agent 开发服务商的品牌展示站
- **商业目标**: 建立专业形象 → 吸引潜在客户 → 引导咨询/合作
- **内容策略**: 品牌官网专注服务和案例，Blog/Books/Gallery 迁移至 AI Insights

---

## 2. 目标用户画像

### 2.1 企业决策者 (CEO / CTO / VP)

| 维度 | 描述 |
|------|------|
| **身份** | 中小型企业（50-500人）的技术决策者 |
| **痛点** | 听说 AI 很强但不知道怎么落地；团队缺乏 AI 经验；市面上的 AI 方案要么太贵要么不实用 |
| **关注点** | ROI、落地周期、团队承接能力、成功案例 |
| **浏览习惯** | 快速扫视 Hero 区 → 看案例 → 找联系方式 |
| **关键决策词** | "这个开发者做过类似项目" / "看起来靠谱" / "价格合理" |

### 2.2 技术负责人 (Tech Lead / Engineering Manager)

| 维度 | 描述 |
|------|------|
| **身份** | 负责技术选型和团队成长的一线管理者 |
| **痛点** | 需要快速搭建 AI Agent 系统；团队需要 AI 培训；不确定技术方案选型（LangGraph vs 自研） |
| **关注点** | 技术栈深度、项目复杂度、代码质量、架构能力 |
| **浏览习惯** | 看项目案例的技术细节 → 检查 GitHub → 评估技术实力 |
| **关键决策词** | "Multi-Agent 架构很专业" / "技术栈和我们需要的一致" |

### 2.3 创业者 / 独立开发者

| 维度 | 描述 |
|------|------|
| **身份** | 正在寻找 AI 技术合伙人或外包的创业者 |
| **痛点** | 需要快速验证 AI 产品想法；预算有限但需要高质量交付 |
| **关注点** | 性价比、响应速度、能否从0到1交付 |
| **浏览习惯** | 看服务范围 → 看案例 → 直接联系 |
| **关键决策词** | "可以快速出 MVP" / "一个人能搞定全栈" |

---

## 3. 信息架构

### 3.1 页面结构总览

```
DevFox Brand Site (devfox.ai)
├── / (首页 - Homepage)
├── /services (服务详情)
│   ├── /services/ai-app-agent (AI 落地应用 & Agent 开发)
│   └── /services/ai-training-consulting (AI 培训 & 咨询)
├── /cases (案例展示)
├── /about (关于我)
├── /contact (联系方式)
└── (外部链接)
    └── AI Insights → ai-insights.devfox.ai (Blog/Books/Gallery/每日简报/系列文章)
```

### 3.2 导航结构

**顶部导航栏 (Desktop)**:
```
DevFox Logo | Services ▼ | Cases | About | Contact | [AI Insights →] | [Theme Toggle]
```

**顶部导航栏 (Mobile)**:
```
DevFox Logo | [Hamburger Menu]
  └── Services
      ├── AI 落地应用 & Agent 开发
      └── AI 培训 & 咨询
      Cases
      About
      Contact
      AI Insights →
```

### 3.3 信息层级

```
Level 1: 首页 (决定是否继续浏览)
  ├── Hero: 一句话说清楚 DevFox 是什么
  ├── Services: 两大核心服务概览
  ├── Featured Cases: 3个精选案例
  └── CTA: 引导联系

Level 2: 服务详情页 (深入了解)
  ├── 服务介绍
  ├── 技术栈展示
  ├── 相关案例
  └── CTA

Level 3: 案例页 (建立信任)
  ├── 案例列表
  └── 案例详情
```

---

## 4. 页面详细需求

### 4.1 首页 (/)

**目标**: 10秒内让访客理解 DevFox 的核心价值，30秒内产生联系意向

#### Section 1: Hero 区

| 属性 | 说明 |
|------|------|
| **布局** | 居中排版，大标题 + 副标题 + CTA按钮组 |
| **标题** | "让 AI 真正落地" 或 "AI 应用落地，从想法到上线" |
| **副标题** | "专注 AI Agent 开发与企业 AI 落地，帮助企业构建智能化的业务系统" |
| **CTA** | 主按钮 "预约咨询" → /contact；次按钮 "查看案例" → /cases |
| **视觉** | 简洁的品牌标识（Fox Logo 或头像）+ 微妙的背景动效 |
| **高度** | 至少 80vh，确保首屏视觉冲击 |

#### Section 2: 核心服务 (Services Overview)

| 属性 | 说明 |
|------|------|
| **布局** | 两列卡片布局，左文右图或上文下图 |
| **卡片 1** | AI 落地应用 & Agent 开发 — 图标 + 标题 + 3-4个要点 + "了解更多 →" |
| **卡片 2** | AI 培训 & 咨询 — 图标 + 标题 + 3-4个要点 + "了解更多 →" |
| **交互** | Hover 时卡片边框亮起，轻微上浮效果 |
| **响应式** | Mobile 竖排，Desktop 横排 |

卡片 1 内容要点:
- Multi-Agent 系统设计与开发 (LangGraph / LangChain)
- AI 应用全栈开发（从需求分析到部署上线）
- 企业数据与 AI 的集成方案
- 现有系统的 AI 能力增强

卡片 2 内容要点:
- 团队 AI 技术培训（实战工作坊）
- AI 落地战略咨询（可行性评估、路线图规划）
- 技术选型与架构咨询
- AI 工具链搭建与最佳实践

#### Section 3: 精选案例 (Featured Cases)

| 属性 | 说明 |
|------|------|
| **布局** | 3列卡片（Desktop）/ 单列（Mobile），每个案例一张卡片 |
| **数量** | 展示3个最具代表性的案例 |
| **卡片内容** | 项目名称 + 一句话描述 + 技术标签 + "查看详情 →" |
| **交互** | Hover 时显示更多描述或图片 |

精选案例优先级:
1. **GrowthPilot Agent** — Multi-Agent + 因果推断，最具技术深度
2. **Smart Sales Agent** — 汽车销售场景，最容易理解
3. **Agent X-Ray** — 可视化工具，有视觉冲击力

#### Section 4: 信任背书 (Social Proof)

| 属性 | 说明 |
|------|------|
| **布局** | 水平滚动或网格展示 |
| **内容** | 技术标签墙 / 技术栈 Logo 展示 |
| **技术栈** | LangGraph, LangChain, Next.js, React, Python, TypeScript, OpenAI, Claude 等 |
| **目的** | 快速建立技术专业感 |

#### Section 5: CTA 区

| 属性 | 说明 |
|------|------|
| **布局** | 居中，大标题 + 副标题 + 按钮 |
| **标题** | "准备好让 AI 落地了吗？" |
| **副标题** | "无论你有明确的项目需求，还是想探索 AI 的可能性，都可以聊聊" |
| **CTA** | "开始对话" → /contact |

---

### 4.2 服务详情页 (/services/ai-app-agent)

**目标**: 让技术决策者相信 DevFox 有能力交付 AI 应用和 Agent 系统

#### 内容结构

1. **服务 Header**
   - 服务名称 + 一句话定位
   - 面包屑导航: 首页 > Services > AI 落地应用 & Agent 开发

2. **服务详情**
   - 服务描述（2-3段）
   - 核心能力清单（4-6项，图标+标题+描述）
   
   核心能力:
   - **Multi-Agent 系统开发** — 基于 LangGraph/LangChain 构建 Multi-Agent 协作系统，支持复杂业务流程自动化
   - **AI 应用全栈开发** — 从 LLM 接入到前端交互，完整交付可上线的 AI 产品
   - **RAG & 知识库搭建** — 企业知识管理与智能检索系统，让 AI 理解你的业务
   - **AI 工作流自动化** — 将重复性工作交给 AI Agent，释放团队创造力
   - **数据分析 & 智能决策** — AI 驱动的数据洞察，辅助业务决策
   - **系统集成 & 部署** — 无缝对接现有技术栈，Docker/Vercel/云原生部署

3. **技术栈展示**
   - 前端: Next.js, React, TypeScript, Tailwind CSS
   - AI/ML: LangGraph, LangChain, OpenAI API, Claude API
   - 后端: Python, FastAPI, Node.js
   - 数据: PostgreSQL, Vector DB (Pinecone/Weaviate)
   - 部署: Vercel, Docker, AWS/阿里云

4. **相关案例** — 展示与此服务相关的案例卡片

5. **CTA** — "有类似需求？聊聊" → /contact

---

### 4.3 服务详情页 (/services/ai-training-consulting)

**目标**: 让企业决策者了解 AI 培训和咨询服务能带来的价值

#### 内容结构

1. **服务 Header**
   - 服务名称 + 一句话定位
   - 面包屑: 首页 > Services > AI 培训 & 咨询

2. **服务详情**
   核心能力:
   - **AI 实战培训** — 面向开发团队的 AI 开发实战工作坊，从零到一掌握 LLM 应用开发
   - **AI 落地战略咨询** — 评估业务场景的 AI 可行性，制定分阶段落地路线图
   - **技术选型指导** — 帮助团队选择最适合的 AI 技术栈（LLM、Agent 框架、向量数据库等）
   - **AI 工具链搭建** — 帮团队搭建高效的 AI 开发工具链和最佳实践

3. **培训形式**
   - 线上/线下工作坊（1-3天）
   - 定制化内训方案
   - 持续技术顾问（月度/季度）

4. **适合人群**
   - 想要快速上手 AI 开发的技术团队
   - 正在评估 AI 落地方案的企业
   - 需要制定 AI 技术战略的技术管理层

5. **CTA** → /contact

---

### 4.4 案例展示页 (/cases)

**目标**: 通过真实项目案例建立信任，展示交付能力

#### 内容结构

1. **页面 Header**
   - 标题: "项目案例"
   - 副标题: "每一个项目都是一次 AI 落地的实践"

2. **案例列表** — 网格布局，每个案例一张卡片

   | 案例 | 一句话描述 | 技术标签 |
   |------|-----------|---------|
   | GrowthPilot Agent | 面向货运平台的 Multi-Agent 用户增长智能系统 | LangGraph, Multi-Agent, 因果推断 |
   | ContentForge AI | AI 驱动的内容自动化工厂 | AI, Content, Automation |
   | Smart Sales Agent | 汽车销售 Multi-Agent 系统 | LangGraph, LangChain, 5Agent+16Tool |
   | Agent X-Ray | Multi-Agent 运行时可视化平台 | Next.js, React Flow |
   | DevFox Pulse | AI 内容生产 + 多平台自动发布 | AI, Multi-Platform |
   | MediaCrawler | 多平台内容爬虫 | Python, Crawler |

3. **案例卡片设计**
   - 项目名称 + 简要描述
   - 技术标签 (Tags)
   - 关键指标或亮点
   - "查看详情 →" 链接

4. **案例详情** (/cases/[slug])
   - 项目背景
   - 技术方案
   - 架构设计（可选配图）
   - 关键成果
   - 技术栈列表

---

### 4.5 关于我 (/about)

**目标**: 建立个人品牌形象，展示专业深度和独特性

#### 内容结构

1. **个人介绍**
   - 头像 + 姓名（极客狐 DevFox）
   - 一句话定位: "独立开发者，专注 AI 落地应用和 Agent 开发"
   - 2-3段自我介绍

2. **能力图谱**
   - 技术能力: Multi-Agent, RAG, LLM 应用开发, 全栈开发
   - 行业经验: 物流/货运、汽车、内容、电商
   - 工具链: LangGraph, LangChain, Next.js, Python, TypeScript

3. **开源贡献**
   - GitHub 账号: github.com/Ming-H
   - 组织: github.com/devfoxaicn
   - 代表性开源项目

4. **价值观**
   - 务实: 解决真实问题，不追概念
   - 深度: 理解原理，不只是调 API
   - 交付: 从想法到上线的完整交付

---

### 4.6 联系页 (/contact)

**目标**: 降低联系门槛，让潜在客户方便地发起沟通

#### 内容结构

1. **页面 Header**
   - 标题: "开始合作"
   - 副标题: "告诉我你的需求，我来帮你找到最合适的 AI 落地方案"

2. **联系方式**
   - Email: 主要联系方式
   - 微信号: 方便国内客户
   - GitHub: 技术交流
   - Twitter/X: 社交互动

3. **联系表单** (可选)
   - 姓名
   - Email
   - 公司/组织
   - 需求描述（textarea）
   - 预算范围（下拉选择，可选）
   - 提交按钮

4. **FAQ**
   - 常见问题: 合作流程、价格范围、交付周期等

---

## 5. 用户故事与场景

### 场景 1: 企业 CEO 快速评估

```
As a 企业 CEO
I want 在30秒内了解 DevFox 能帮我的企业做什么
So that 我可以决定是否深入了解更多
```

**用户路径**: 
首页 Hero 区（看到 "AI 落地应用"） → 滚动到 Services 区（快速扫描两大服务） → 看到 GrowthPilot Agent 案例（货运场景相关） → 点击 "预约咨询"

**关键触点**: Hero 文案、Services 卡片、案例卡片、CTA 按钮

### 场景 2: Tech Lead 评估技术能力

```
As a Tech Lead
I want 查看 DevFox 做过的项目案例和技术栈
So that 我可以评估他的技术能力是否匹配我们的需求
```

**用户路径**:
首页 → 点击 Cases → 浏览 Smart Sales Agent 详情页（看到 LangGraph + 5Agent + 16Tool） → 点击 GitHub 链接查看代码 → 回到 Contact 页面发起咨询

**关键触点**: 案例详情页的技术深度、GitHub 链接、技术栈展示

### 场景 3: 创业者寻找 AI 开发合作

```
As a 创业者
I want 找到一个能从0到1帮我搭建 AI 产品的开发者
So that 我可以快速验证我的 AI 产品想法
```

**用户路径**:
首页 → Services > AI 落地应用 & Agent 开发（看到 "全栈开发"） → About 页面（了解个人背景） → Contact 页面（提交需求）

**关键触点**: 服务详情页的全栈能力展示、About 页面的个人背景

### 场景 4: 内容读者访问

```
As a 内容读者
I want 查看 DevFox 的博客文章和读书笔记
So that 我可以学习 AI 相关知识
```

**用户路径**:
首页 → 导航栏点击 "AI Insights →" → 跳转到 ai-insights.devfox.ai → 阅读 Blog/Books

**关键触点**: 导航栏的外部链接、首页 Links 区域

---

## 6. 成功指标

### 6.1 核心指标

| 指标 | 当前基线 | 目标值 | 衡量方式 |
|------|---------|--------|---------|
| 首页跳出率 | - | < 50% | Vercel Analytics |
| 平均会话时长 | - | > 2分钟 | Vercel Analytics |
| Contact 页面访问率 | - | > 15% 的访客到达 | 页面 PV 分析 |
| 咨询转化率 | - | > 3% 的访客发起咨询 | 表单提交/邮件 |
| 案例 PV 占比 | - | > 30% 的访客浏览案例 | 页面 PV 分析 |

### 6.2 辅助指标

| 指标 | 说明 |
|------|------|
| Services 页面 PV | 衡量服务关注度 |
| About 页面停留时间 | 衡量个人品牌的吸引力 |
| AI Insights 跳出率 | 衡量内容引流效果 |
| 移动端访问占比 | 确保移动端体验 |
| 页面加载速度 (LCP) | < 2.5s，SEO 核心指标 |

### 6.3 商业指标

| 指标 | 说明 |
|------|------|
| 月均咨询量 | 通过网站发起的合作咨询数量 |
| 咨询到签约转化率 | 从咨询到实际合作的比率 |
| 案例引用率 | 客户在沟通中提到看过案例的比例 |

---

## 7. 设计参考

### 7.1 视觉风格对标

| 参考站点 | 借鉴要点 | 应用场景 |
|---------|---------|---------|
| **linear.app** | 产品功能的优雅展示方式、暗色主题的层次感、微动效 | Hero 区、Feature 卡片、整体暗色氛围 |
| **vercel.com** | 技术品牌的专业感、极简排版、大面积留白 | 页面布局、间距系统、字体层级 |
| **stripe.com** | 服务介绍的结构化展示、渐变色运用、CTA 设计 | 服务详情页、CTA 区 |
| **anthropic.com** | AI 公司的品牌感、克制的设计、内容优先 | 整体品牌调性 |
| **raycast.com** | 开发者工具的营销页面、功能展示动效 | 功能展示区 |

### 7.2 设计原则

1. **内容优先** — 设计服务于内容表达，不喧宾夺主
2. **专业但不死板** — 技术感通过排版和留白体现，不是堆砌代码元素
3. **克制** — 少即是多，每个元素都有存在的理由
4. **一致性** — 统一的视觉语言贯穿全站
5. **性能** — 不因视觉效果牺牲加载速度

### 7.3 品牌标识

- **名称**: 极客狐 DevFox
- **标识**: 狐狸头像（已有 avatar.png）
- **品牌色**: 待设计系统定义（建议保留现有暗色基调，加入品牌 Accent 色）
- **字体**: Inter（已在使用）+ JetBrains Mono（代码）

---

## 8. 技术约束

| 约束 | 说明 |
|------|------|
| 框架 | Next.js 14 App Router（已有） |
| 样式 | Tailwind CSS + CSS Variables（已有） |
| 主题 | 深色/浅色双主题（已有 ThemeProvider） |
| 部署 | Vercel（已有） |
| 域名 | devfox.ai |
| 性能 | Lighthouse 90+ 分，LCP < 2.5s |
| SEO | 静态生成 (SSG)，完善的 meta 标签 |
| 分析 | Vercel Analytics + Speed Insights |

---

## 9. 里程碑

| 阶段 | 内容 | 预计周期 |
|------|------|---------|
| **Phase 1** | 首页改造（Hero + Services + Cases + CTA） | 1 周 |
| **Phase 2** | 服务详情页 + 案例页 | 1 周 |
| **Phase 3** | About + Contact 页面改造 | 3 天 |
| **Phase 4** | Blog/Books/Gallery 迁移到 AI Insights | 1 周 |
| **Phase 5** | 性能优化 + SEO + Analytics | 3 天 |
| **Phase 6** | 上线 + 监控 + 迭代 | 持续 |

---

## 10. 开放问题

- [ ] 是否需要增加客户评价/Testimonial 区块？（当前无真实客户评价）
- [ ] Contact 表单的后端处理方案？（Email forwarding / 第三方服务）
- [ ] 案例详情页的内容来源？（需要为每个案例撰写详细 Case Study）
- [ ] 品牌色方案确认？（当前全站无 Accent 色）
- [ ] AI Insights 的域名方案？（子域名 ai-insights.devfox.ai vs 独立路径）
