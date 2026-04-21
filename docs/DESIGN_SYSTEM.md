# DevFox Brand Site — 设计规范 (Design System)

> 版本: 1.0.0
> 最后更新: 2026-04-21
> 风格定位: 专业但不死板、技术感但不晦涩、现代简约、深色/浅色双主题
> 设计参考: linear.app, vercel.com, stripe.com

---

## 1. 设计理念

### 1.1 核心原则

- **Less, but better** — 少即是多，每个像素都有存在的理由
- **Content-first** — 设计服务于内容，不喧宾夺主
- **Developer-grade** — 开发者能感受到的专业感，非开发者也能理解的清晰度
- **Dual personality** — 暗色模式是默认身份（专业、技术感），浅色模式是友好面孔（清爽、易读）

### 1.2 视觉关键词

```
专业 / 克制 / 留白 / 层次 / 微动效 / 品牌感
```

---

## 2. 色彩体系

### 2.1 品牌色

| 名称 | Hex | CSS Variable | 用途 |
|------|-----|-------------|------|
| **Fox Amber** | `#F59E0B` | `--color-brand` | 品牌主色，狐狸的琥珀色 |
| **Fox Amber Light** | `#FCD34D` | `--color-brand-light` | Hover 状态、高亮 |
| **Fox Amber Dark** | `#D97706` | `--color-brand-dark` | Active 状态 |
| **Fox Amber Subtle** | `rgba(245, 158, 11, 0.10)` | `--color-brand-subtle` | 背景、Badge 背景 |

> **设计决策**: 选择 Amber/琥珀色作为品牌色，呼应 "Fox" 的狐狸形象。Amber 色暖而不刺眼，在深色和浅色模式下都有良好表现。

### 2.2 暗色模式 (Dark Theme — 默认)

```css
/* 背景色 — 四级层次 */
--bg-primary:    #0A0A0A;   /* 页面主背景 */
--bg-secondary:  #141416;   /* 卡片、侧边栏背景 */
--bg-tertiary:   #1C1C1F;   /* 输入框、代码块背景 */
--bg-elevated:   #18181B;   /* 弹出层、下拉菜单 */
--bg-code:       #111113;   /* 代码块背景 */

/* 文字色 — 四级层次 */
--text-primary:   #ECECEE;  /* 标题、主要文字 */
--text-secondary: #A0A0A8;  /* 正文、描述 */
--text-tertiary:  #6E6E78;  /* 辅助说明、标签 */
--text-muted:     #4A4A54;  /* 占位符、禁用文字 */
--text-strong:    #FFFFFF;  /* 强调文字 */

/* 边框色 — 三级层次 */
--border-subtle:  rgba(255, 255, 255, 0.04);  /* 最淡分隔线 */
--border-default: rgba(255, 255, 255, 0.08);  /* 默认边框 */
--border-medium:  rgba(255, 255, 255, 0.14);  /* Hover 边框 */

/* 阴影 */
--shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.5);
--shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.6);
```

### 2.3 浅色模式 (Light Theme)

```css
/* 背景色 */
--bg-primary:    #FAFAFA;
--bg-secondary:  #F0F0F0;
--bg-tertiary:   #E8E8E8;
--bg-elevated:   #FFFFFF;
--bg-code:       #F5F5F5;

/* 文字色 */
--text-primary:   #1A1A1A;
--text-secondary: #555555;
--text-tertiary:  #888888;
--text-muted:     #AAAAAA;
--text-strong:    #000000;

/* 边框色 */
--border-subtle:  rgba(0, 0, 0, 0.04);
--border-default: rgba(0, 0, 0, 0.08);
--border-medium:  rgba(0, 0, 0, 0.14);

/* 阴影 */
--shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.07);
--shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.08);
```

### 2.4 语义色

| 名称 | Dark | Light | 用途 |
|------|------|-------|------|
| **Success** | `#34D399` | `#059669` | 成功状态、确认 |
| **Warning** | `#FBBF24` | `#D97706` | 警告、注意 |
| **Error** | `#F87171` | `#DC2626` | 错误、危险 |
| **Info** | `#60A5FA` | `#2563EB` | 信息、提示 |

### 2.5 技术标签色

用于案例卡片的技术标签，采用柔和的色调:

| 标签 | 背景 (Dark) | 文字 (Dark) | 背景 (Light) | 文字 (Light) |
|------|-----------|-----------|------------|------------|
| LangGraph | `rgba(96, 165, 250, 0.15)` | `#60A5FA` | `rgba(37, 99, 235, 0.10)` | `#2563EB` |
| LangChain | `rgba(167, 139, 250, 0.15)` | `#A78BFA` | `rgba(124, 58, 237, 0.10)` | `#7C3AED` |
| Next.js | `rgba(96, 165, 250, 0.15)` | `#60A5FA` | `rgba(37, 99, 235, 0.10)` | `#2563EB` |
| Python | `rgba(52, 211, 153, 0.15)` | `#34D399` | `rgba(5, 150, 105, 0.10)` | `#059669` |
| TypeScript | `rgba(96, 165, 250, 0.15)` | `#60A5FA` | `rgba(37, 99, 235, 0.10)` | `#2563EB` |
| Multi-Agent | `rgba(245, 158, 11, 0.15)` | `#F59E0B` | `rgba(217, 119, 6, 0.10)` | `#D97706` |

---

## 3. 字体规范

### 3.1 字体家族

| 用途 | 字体 | Fallback |
|------|------|----------|
| **正文字体** | Inter | PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif |
| **等宽字体** | JetBrains Mono | SF Mono, Cascadia Code, ui-monospace, monospace |

### 3.2 字体层级

| Token | 用途 | 字号 | 字重 | 行高 | 字间距 | 备注 |
|-------|------|------|------|------|--------|------|
| `display-xl` | Hero 主标题 | 56px / 3.5rem | 700 | 1.1 | -0.03em | 仅 Hero 区 |
| `display-lg` | 大标题 | 48px / 3rem | 600 | 1.15 | -0.025em | Section 标题 |
| `display-md` | 中标题 | 36px / 2.25rem | 600 | 1.2 | -0.02em | 子 Section |
| `heading-lg` | 页面标题 | 30px / 1.875rem | 600 | 1.25 | -0.015em | 页面 H1 |
| `heading-md` | 卡片标题 | 24px / 1.5rem | 600 | 1.3 | -0.01em | 卡片标题 |
| `heading-sm` | 小标题 | 20px / 1.25rem | 600 | 1.4 | -0.005em | 区块标题 |
| `body-lg` | 大正文 | 18px / 1.125rem | 400 | 1.7 | normal | 介绍段落 |
| `body` | 正文 | 16px / 1rem | 400 | 1.6 | normal | 标准正文 |
| `body-sm` | 小正文 | 14px / 0.875rem | 400 | 1.5 | normal | 辅助文字 |
| `caption` | 标注 | 12px / 0.75rem | 400 | 1.4 | 0.02em | 标签、注释 |
| `overline` | 超标题 | 12px / 0.75rem | 500 | 1.4 | 0.08em | Section 标签 |
| `mono` | 代码 | 14px / 0.875rem | 400 | 1.6 | normal | 技术标签 |

### 3.3 Tailwind 配置

```javascript
// tailwind.config.js 扩展
theme: {
  extend: {
    fontSize: {
      'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
      'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '600' }],
      'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
      'heading-lg': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '600' }],
      'heading-md': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
      'heading-sm': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '600' }],
      'body-lg': ['1.125rem', { lineHeight: '1.7' }],
      'body': ['1rem', { lineHeight: '1.6' }],
      'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      'overline': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '500' }],
    },
  }
}
```

---

## 4. 间距系统 (8px Grid)

### 4.1 间距 Token

| Token | 值 | 用途 |
|-------|---|------|
| `space-1` | 4px | 图标与文字间距、紧凑内间距 |
| `space-2` | 8px | 小元素间距、Tag 内边距 |
| `space-3` | 12px | 列表项间距、小卡片内边距 |
| `space-4` | 16px | 标准内边距、组件间距 |
| `space-5` | 20px | 卡片内边距 |
| `space-6` | 24px | Section 内间距 |
| `space-8` | 32px | 区块间距 |
| `space-10` | 40px | 大区块间距 |
| `space-12` | 48px | Section 间距 |
| `space-16` | 64px | 大 Section 间距 |
| `space-20` | 80px | Hero 区间距 |
| `space-24` | 96px | 页面级间距 |

### 4.2 布局容器

| 容器 | 最大宽度 | 说明 |
|------|---------|------|
| `container-narrow` | 640px | 文章正文、窄内容 |
| `container-content` | 720px | 标准内容区 |
| `container-wide` | 1080px | 首页、案例页 |
| `container-full` | 1280px | 全宽布局 |

### 4.3 页面边距

| 断点 | 水平边距 |
|------|---------|
| Mobile (< 640px) | 16px (px-4) |
| Tablet (640-1024px) | 24px (px-6) |
| Desktop (> 1024px) | 32px (px-8) |

---

## 5. 组件库规范

### 5.1 按钮 (Button)

#### Primary Button

```
规格:
  高度: 44px (h-11)
  内边距: 16px 24px (px-6)
  圆角: 8px (rounded-lg)
  字号: 15px (text-[15px])
  字重: 500 (font-medium)
  背景色: var(--color-brand)  (#F59E0B)
  文字色: #0A0A0A (深色，确保对比度)
  过渡: all 150ms ease

Hover:
  背景色: var(--color-brand-light) (#FCD34D)
  微微上移: translateY(-1px)
  阴影: shadow-md

Active:
  背景色: var(--color-brand-dark) (#D97706)
  translateY(0)
```

#### Secondary Button

```
规格:
  高度: 44px (h-11)
  内边距: 16px 24px (px-6)
  圆角: 8px (rounded-lg)
  字号: 15px (text-[15px])
  字重: 500 (font-medium)
  背景色: transparent
  文字色: var(--text-secondary)
  边框: 1px solid var(--border-default)

Hover:
  边框色: var(--border-medium)
  文字色: var(--text-primary)
```

#### Ghost Button

```
规格:
  高度: 36px (h-9)
  内边距: 12px 16px (px-4)
  圆角: 6px (rounded-md)
  字号: 14px (text-sm)
  字重: 500 (font-medium)
  背景色: transparent
  文字色: var(--text-tertiary)

Hover:
  背景色: var(--color-brand-subtle)
  文字色: var(--color-brand)
```

### 5.2 卡片 (Card)

#### Standard Card

```
规格:
  内边距: 24px (p-6)
  圆角: 12px (rounded-xl)
  背景色: var(--bg-secondary)
  边框: 1px solid var(--border-default)
  过渡: border-color 200ms ease, transform 200ms ease

Hover:
  边框色: var(--border-medium)
  transform: translateY(-2px)
  阴影: shadow-md

包含:
  - 图标/图片 (32x32 或 full-width)
  - 标题 (heading-md)
  - 描述 (body-sm, text-secondary)
  - 标签 (Tag 组)
  - 链接/CTA
```

#### Case Card (案例卡片)

```
规格:
  圆角: 12px (rounded-xl)
  背景色: var(--bg-secondary)
  边框: 1px solid var(--border-default)
  Overflow: hidden

结构:
  [图片区域] — 16:9 或 3:2 比例，展示项目截图/架构图
  [内容区域] — 24px 内边距
    - 项目名称 (heading-sm, font-semibold)
    - 一句话描述 (body-sm, text-secondary, mt-2)
    - 技术标签组 (flex-wrap, gap-2, mt-4)
    - "查看详情 →" (body-sm, brand色, mt-4)

Hover:
  边框色: var(--color-brand) 的半透明版本
  链接文字颜色加深
```

### 5.3 导航栏 (Navbar)

#### Desktop Navbar

```
规格:
  高度: 64px (h-16)
  最大宽度: container-wide (1080px)
  水平边距: 32px (px-8)
  背景: 滚动时 bg-primary/80 + backdrop-blur-lg
  边框: 滚动时底部 border-default

布局:
  [Logo/Brand] — 左对齐
    DevFox Logo (16px font-medium) + 狐狸图标
    
  [Nav Links] — 居中或靠右
    Services (下拉) | Cases | About | Contact
    字号: 15px, font-medium
    颜色: text-tertiary → hover: text-primary → active: text-primary
    下划线: active 页面有 2px 底部指示线
    
  [Actions] — 右对齐
    AI Insights 外链按钮 (Ghost Button)
    Theme Toggle (24x24 图标)
```

#### Mobile Navbar

```
规格:
  高度: 56px (h-14)
  背景: 同 Desktop

布局:
  [Logo] — 左对齐
  [Theme Toggle + Hamburger] — 右对齐

展开菜单:
  全屏覆盖或下拉面板
  背景: bg-primary
  链接: 竖排，24px 间距
  字号: 18px
```

### 5.4 Hero 区

```
规格:
  最小高度: 80vh (min-h-[80vh])
  垂直居中: flex flex-col justify-center items-center
  内边距: py-24 px-8

结构:
  [Overline] — "AI · Agent · 落地" (overline, brand色, mb-6)
  [主标题] — display-xl, font-bold, text-primary
    "让 AI 真正落地" 或动态文案
  [副标题] — body-lg 或 heading-sm, text-secondary, max-w-2xl, mt-6
    一段话描述核心价值
  [CTA 按钮组] — flex gap-4, mt-10
    [Primary Button] "预约咨询"
    [Secondary Button] "查看案例"
  [视觉元素] — 可选的装饰性背景
    微妙的渐变光晕
    或抽象的几何图案
    或代码/Agent 的抽象可视化
```

### 5.5 Section 布局

```
规格:
  垂直间距: py-20 md:py-24 lg:py-32
  最大宽度: container-wide (1080px)
  水平边距: px-4 sm:px-6 lg:px-8

Header:
  [Overline] — "OUR SERVICES" (overline, text-tertiary, mb-3)
  [标题] — display-md, text-primary, mb-4
  [描述] — body-lg, text-secondary, max-w-2xl, mb-12

Content:
  根据内容类型选择 Grid 或 Flex 布局
```

### 5.6 Tag (标签)

```
规格:
  高度: 24px (h-6)
  内边距: 4px 10px (px-2.5)
  圆角: 6px (rounded-md)
  字号: 12px (text-xs)
  字重: 500 (font-medium)
  字体: var(--font-mono)
  背景色: 技术标签色 (见色彩体系)
  文字色: 对应文字色
  边框: 无
```

### 5.7 表单 (Form)

```
Input:
  高度: 44px
  内边距: 12px 16px
  圆角: 8px
  背景: var(--bg-tertiary)
  边框: 1px solid var(--border-default)
  字号: 15px
  文字色: var(--text-primary)
  
  Focus:
    边框色: var(--color-brand)
    阴影: 0 0 0 3px var(--color-brand-subtle)

  Placeholder:
    颜色: var(--text-muted)

Textarea:
  同 Input，最小高度 120px
  resize: vertical

Label:
  字号: 14px
  字重: 500
  颜色: var(--text-secondary)
  间距: mb-2
```

### 5.8 Footer

```
规格:
  背景: var(--bg-secondary)
  边框: 顶部 1px solid var(--border-default)
  内边距: py-12 px-4 sm:px-8

布局 (Desktop):
  [Brand] — Logo + 一句话
  [Links] — 服务 | 案例 | 关于 | 联系
  [Social] — GitHub | Twitter/X | Email
  
  底部: © DevFox + Theme Toggle
```

---

## 6. 动画规范

### 6.1 原则

- **目的性** — 每个动画都有明确目的（引导注意力、提供反馈、增加层次感）
- **克制** — 动画时长 150-400ms，不滥用
- **自然** — 使用 ease-out 或 cubic-bezier，模拟物理运动

### 6.2 过渡时间

| Token | 时长 | 缓动函数 | 用途 |
|-------|------|---------|------|
| `fast` | 120ms | ease | 颜色变化、透明度 |
| `base` | 180ms | ease | 边框、背景变化 |
| `normal` | 250ms | ease-out | 卡片悬浮、面板展开 |
| `slow` | 400ms | cubic-bezier(0.16, 1, 0.3, 1) | 页面切换、模态框 |
| `entrance` | 600ms | cubic-bezier(0.16, 1, 0.3, 1) | 元素入场 |

### 6.3 动画效果

#### 页面入场动画

```css
/* 元素从下方渐入 */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* 依次入场 — 每个 Section 的子元素 */
.stagger > * {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 80ms; }
.stagger > *:nth-child(3) { animation-delay: 160ms; }
.stagger > *:nth-child(4) { animation-delay: 240ms; }
```

#### 交互动画

| 交互 | 动画 | 参数 |
|------|------|------|
| 按钮 Hover | 背景色渐变 + 微上移 | 150ms ease, translateY(-1px) |
| 卡片 Hover | 边框变亮 + 上浮 | 200ms ease, translateY(-2px) |
| 导航链接 Hover | 下划线展开 | 200ms ease, scaleX(0→1) |
| 页面滚动 | Navbar 背景模糊 | 200ms ease |
| 主题切换 | 颜色过渡 | 200ms ease |

#### 滚动触发动画

使用 Intersection Observer 实现:
- Section 进入视口时触发 fadeInUp
- 优先使用 CSS `@starting-style` (如果浏览器支持)
- 降级方案: JS IntersectionObserver + CSS class toggle

### 6.4 性能约束

- 仅对 `transform` 和 `opacity` 做动画
- 避免对 `width`、`height`、`margin` 做动画
- 使用 `will-change` 谨慎，动画结束后移除
- 移动端减少动画: `@media (prefers-reduced-motion: reduce)` 下禁用非必要动画

---

## 7. 响应式断点

### 7.1 断点定义

| 名称 | 宽度 | Tailwind | 目标设备 |
|------|------|----------|---------|
| **xs** | < 640px | 默认 | 手机竖屏 |
| **sm** | ≥ 640px | `sm:` | 手机横屏 /小平板 |
| **md** | ≥ 768px | `md:` | 平板竖屏 |
| **lg** | ≥ 1024px | `lg:` | 平板横屏 / 小笔记本 |
| **xl** | ≥ 1280px | `xl:` | 标准桌面 |
| **2xl** | ≥ 1536px | `2xl:` | 大屏桌面 |

### 7.2 响应式策略

| 组件 | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| Navbar | 汉堡菜单 | 汉堡菜单 | 完整导航 |
| Hero | 单列居中 | 单列居中 | 单列居中 + 更大字号 |
| Services Cards | 单列堆叠 | 两列 | 两列 |
| Case Cards | 单列堆叠 | 两列 | 三列 |
| Footer | 单列堆叠 | 两列 | 四列 |
| 内容宽度 | 100% | 720px | 1080px |

### 7.3 触摸优化

- 可点击元素最小尺寸: 44x44px
- 按钮间距: 至少 8px
- 链接间距: 至少 12px

---

## 8. 图标风格

### 8.1 图标系统

| 用途 | 风格 | 来源 |
|------|------|------|
| UI 图标 (导航、操作) | 线性 (Stroke), 1.5px 粗细 | Lucide Icons |
| 服务图标 | 线性 + 双色 (Stroke + Fill) | Lucide Icons |
| 技术栈图标 | 官方 Logo SVG | Simple Icons |
| 品牌图标 | 定制设计 | — |

### 8.2 图标规格

| 尺寸 | 用途 |
|------|------|
| 16px (w-4 h-4) | 行内图标、标签内图标 |
| 20px (w-5 h-5) | 导航图标、按钮图标 |
| 24px (w-6 h-6) | 标准图标、卡片图标 |
| 32px (w-8 h-8) | Section 标题图标 |
| 48px (w-12 h-12) | Feature 大图标 |

### 8.3 颜色规则

- 默认颜色: `var(--text-tertiary)`
- Hover: `var(--text-secondary)`
- Active/品牌: `var(--color-brand)`
- 不使用彩色图标（保持整体克制的视觉风格）

---

## 9. 暗色/浅色模式适配

### 9.1 切换逻辑

- **默认**: 暗色模式（开发者身份）
- **用户选择优先**: localStorage 存储用户偏好
- **系统偏好降级**: 无用户选择时跟随 `prefers-color-scheme`
- **实现方式**: CSS Variables + `.dark` / `.light` class on `<html>`

### 9.2 模式差异

| 维度 | Dark | Light |
|------|------|-------|
| 背景 | 近黑 (#0A0A0A) | 近白 (#FAFAFA) |
| 品牌色 | Amber (#F59E0B) | Amber Dark (#D97706) |
| 品牌色 Hover | Amber Light (#FCD34D) | Amber (#F59E0B) |
| 边框 | 白色低透明度 | 黑色低透明度 |
| 阴影 | 重阴影 | 轻阴影 |
| 图片 | 正常 | 正常 |
| Hero 背景 | 深色渐变光晕 | 浅色渐变光晕 |

---

## 10. 设计 Token 速查表

### CSS Variables 完整清单

```css
:root {
  /* Brand */
  --color-brand:         #F59E0B;
  --color-brand-light:   #FCD34D;
  --color-brand-dark:    #D97706;
  --color-brand-subtle:  rgba(245, 158, 11, 0.10);

  /* Backgrounds */
  --bg-primary:    #0A0A0A;
  --bg-secondary:  #141416;
  --bg-tertiary:   #1C1C1F;
  --bg-elevated:   #18181B;
  --bg-code:       #111113;

  /* Text */
  --text-primary:   #ECECEE;
  --text-secondary: #A0A0A8;
  --text-tertiary:  #6E6E78;
  --text-muted:     #4A4A54;
  --text-strong:    #FFFFFF;

  /* Borders */
  --border-subtle:  rgba(255, 255, 255, 0.04);
  --border-default: rgba(255, 255, 255, 0.08);
  --border-medium:  rgba(255, 255, 255, 0.14);

  /* Shadows */
  --shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.5);
  --shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.6);

  /* Radius */
  --radius-sm:   4px;
  --radius-md:   6px;
  --radius-lg:   8px;
  --radius-xl:   12px;
  --radius-2xl:  16px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast:   120ms ease;
  --transition-base:   180ms ease;
  --transition-normal: 250ms ease-out;
  --transition-slow:   400ms cubic-bezier(0.16, 1, 0.3, 1);

  /* Font */
  --font-sans: var(--font-inter), 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --font-mono: var(--font-mono), 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
}

/* Light theme */
.light {
  --bg-primary:    #FAFAFA;
  --bg-secondary:  #F0F0F0;
  --bg-tertiary:   #E8E8E8;
  --bg-elevated:   #FFFFFF;
  --bg-code:       #F5F5F5;

  --text-primary:   #1A1A1A;
  --text-secondary: #555555;
  --text-tertiary:  #888888;
  --text-muted:     #AAAAAA;
  --text-strong:    #000000;

  --border-subtle:  rgba(0, 0, 0, 0.04);
  --border-default: rgba(0, 0, 0, 0.08);
  --border-medium:  rgba(0, 0, 0, 0.14);

  --shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.07);
  --shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.08);
}
```
