# 每日热点自动更新配置指南

## ✅ 已完成的功能

你的网站已经具备完整的自动更新功能，可以自动获取 `content-forge-ai` 仓库的最新数据。

### 数据来源
- **仓库**: https://github.com/devfoxaicn/content-forge-ai
- **目录**: `data/daily/`
- **更新频率**: 每天 9:00, 14:00, 18:00
- **文件格式**: `digest_YYYYMMDD_HHMMSS.md`

### 自动更新机制
1. **GitHub Webhook** (推荐) - 实时更新，仓库有新内容时立即触发
2. **Vercel Cron Job** - 备用方案，每天凌晨 2:00 检查更新
3. **手动触发** - 可随时手动清除缓存

---

## 🚀 配置步骤

### 步骤 1: 确认环境变量

确保 `.env.local` 或 Vercel 环境变量中包含：

```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_DATA_REPO=devfoxaicn/content-forge-ai
GITHUB_WEBHOOK_SECRET=your-random-webhook-secret
CRON_SECRET=your-random-cron-secret
```

### 步骤 2: 配置 GitHub Webhook (推荐)

**为什么要配置 Webhook?**
- ✅ 实时更新：仓库有新内容时立即更新网站
- ✅ 无需等待：不需要等到定时任务执行
- ✅ 更高效：只在有实际变更时触发

**配置方法：**

1. **生成 Webhook Secret**
   ```bash
   openssl rand -base64 32
   ```

2. **添加到 Vercel 环境变量**
   ```bash
   vercel env add GITHUB_WEBHOOK_SECRET
   ```
   粘贴刚才生成的 secret

3. **在 GitHub 配置 Webhook**
   - 访问: https://github.com/devfoxaicn/content-forge-ai/settings/hooks
   - 点击 "Add webhook"
   - 配置:
     - **Payload URL**: `https://www.devfoxai.cn/api/webhook/github`
     - **Content type**: `application/json`
     - **Secret**: 刚才生成的 secret
     - **Events**: 勾选 "Push events"
     - **Active**: ✅
   - 点击 "Add webhook"

4. **测试 Webhook**
   - 在 Webhook 列表中找到刚创建的 webhook
   - 点击 "..." 菜单
   - 选择 "Redeliver" 重新发送最近的推送
   - 查看是否显示 "OK" (绿色对勾)

### 步骤 3: 验证自动更新

访问以下页面确认内容正常显示：
- https://www.devfoxai.cn/daily - 每日热点列表
- https://www.devfoxai.cn/ - 首页最新内容

---

## 🔄 工作流程

```
content-forge-ai 仓库
    ↓ 每天自动产出新内容 (9:00, 14:00, 18:00)
    ↓
GitHub Webhook 检测到推送
    ↓
调用 /api/webhook/github
    ↓
清除缓存 + 重新生成页面
    ↓
网站自动更新 ✨
```

---

## 🧪 测试数据加载

```bash
# 本地测试
npm run dev

# 访问 http://localhost:3000/daily
# 应该能看到最新的每日热点
```

---

## 📊 文件名格式说明

系统支持两种文件名格式：

1. **标准格式**: `digest_20260127.md`
2. **带时间戳**: `digest_20260127_052225.md` ✅ (当前使用)

系统会自动识别这两种格式，优先尝试标准格式，如果不存在则查找带时间戳的文件。

---

## ⚙️ 故障排查

### 问题 1: 新内容没有显示

**解决方案：**
1. 检查 Webhook 是否正常工作
   - GitHub 仓库 → Settings → Webhooks
   - 查看最近的交付记录
2. 手动触发缓存清除
   ```bash
   curl "https://www.devfoxai.cn/api/revalidate" \
     -H "Authorization: Bearer YOUR_CRON_SECRET"
   ```
3. 查看日志
   ```bash
   vercel logs --filter="/api/webhook/github"
   ```

### 问题 2: 某天的数据加载失败

**可能原因：**
- 文件名格式不对
- 文件还没有 push 到 GitHub
- GitHub API 限流

**解决方案：**
1. 确认文件在 GitHub 仓库中存在
2. 检查文件名格式：`digest_YYYYMMDD_HHMMSS.md`
3. 稍等片刻再试（API 限流）

---

## 📚 相关文档

- **lib/daily-loader.ts** - 数据加载器实现
- **app/api/webhook/github/route.ts** - Webhook 处理
- **app/daily/page.tsx** - 每日热点页面

---

## 🎉 完成！

现在你的网站已经完全配置好自动更新功能！

**工作流程：**
1. content-forge-ai 仓库每天自动产出新内容
2. GitHub Webhook 检测到变化
3. 网站自动更新，展示最新内容

你不需要做任何手动操作，一切都会自动完成！✨
