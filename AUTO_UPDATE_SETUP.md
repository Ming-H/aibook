# 自动更新系统设置指南

本项目实现了多层自动更新机制，确保当 GitHub 仓库 `data/daily` 目录有新数据时，网站能自动更新。

## 自动更新方式

### 1. GitHub Webhooks（推荐）⭐

**工作原理：**
- 当仓库有新的 push 时，GitHub 发送 webhook 到网站
- 网站接收 webhook 后自动清除缓存
- **实时更新，通常在几分钟内完成**

**优点：**
- 实时更新，无需等待
- 只在有实际变更时触发
- 无 API 调用限制

**设置步骤：**

1. **生成 Webhook Secret**
   ```bash
   # 生成一个随机字符串作为 secret
   openssl rand -base64 32
   ```

2. **添加环境变量**

   在 Vercel 项目中添加 `GITHUB_WEBHOOK_SECRET` 环境变量：
   ```bash
   vercel env add GITHUB_WEBHOOK_SECRET
   ```

3. **在 GitHub 配置 Webhook**

   - 访问：`https://github.com/devfoxaicn/content-forge-ai/settings/hooks`
   - 点击 "Add webhook"
   - 配置如下：
     - **Payload URL**: `https://www.devfoxai.cn/api/webhook/github`
     - **Content type**: `application/json`
     - **Secret**: 刚才生成的 secret
     - **Events**: 选择 "Push events"
     - **Active**: 勾选
   - 点击 "Add webhook"

---

### 2. Vercel Cron Jobs（备用方案）

**工作原理：**
- 每天凌晨 2 点自动检查一次 GitHub API
- 对比最新的 daily 目录日期
- 如果发现新数据，自动清除缓存并触发重新验证

**优点：**
- 完全自动化，无需 GitHub 配置
- 作为 webhook 失败时的备份机制

**已配置在：** `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/check-updates",
      "schedule": "0 2 * * *"
    }
  ]
}
```

**无需额外设置**，部署到 Vercel 后自动生效。

**注意：** Hobby 账户每天最多运行 1 次 cron job。升级到 Pro 可获得更多灵活性。

---

### 3. 手动触发（开发/测试用）

**通过 API 手动触发更新：**

```bash
curl -X GET "https://www.devfoxai.cn/api/revalidate" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## 环境变量清单

确保以下环境变量已设置：

| 变量名 | 必需 | 用途 |
|--------|------|------|
| `GITHUB_TOKEN` | ✅ | 访问 GitHub API |
| `GITHUB_DATA_REPO` | ✅ | 数据仓库地址 |
| `CRON_SECRET` | ✅ | Cron Job 验证密钥 |
| `GITHUB_WEBHOOK_SECRET` | ⚪ | Webhook 验证密钥（推荐） |

---

## 工作流程

### 使用 Webhook（推荐）
```
GitHub 仓库 (content-forge-ai) 有新 push
    ↓
GitHub 发送 Webhook
    ↓
网站接收并验证
    ↓
清除缓存 & 重新验证
    ↓
网站自动更新 ✨（几分钟内）
```

### 使用 Cron Job（备用）
```
每天凌晨 2 点
    ↓
Vercel Cron Job 执行
    ↓
GitHub API 检查 data/daily/
    ↓
发现新数据?
    ↓ 是
清除缓存 & 触发重新验证
    ↓
网站自动更新 ✨
```

---

## 验证自动更新

### 测试 Webhook

在 GitHub Webhooks 页面：
1. 找到刚创建的 webhook
2. 点击 "..." 菜单
3. 选择 "Redeliver" 重新发送最近的 webhook
4. 访问网站查看是否更新

### 查看 Cron Job 日志

```bash
vercel logs https://www.devfoxai.cn --filter="/api/cron/check-updates"
```

### 手动测试 API

```bash
# 测试 Cron Job API
curl -X GET "https://www.devfoxai.cn/api/cron/check-updates" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# 手动触发缓存清除
curl -X GET "https://www.devfoxai.cn/api/revalidate" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## 故障排查

### Webhook 返回 401

1. 检查 `GITHUB_WEBHOOK_SECRET` 是否设置
   ```bash
   vercel env ls GITHUB_WEBHOOK_SECRET
   ```

2. 确保 GitHub Webhook 配置中的 Secret 与环境变量一致

3. 检查 webhook URL 是否正确（必须是 https）

### Cron Job 未执行

1. 检查 Vercel 项目是否为 Hobby 或更高版本

2. 查看 Vercel 部署日志确认 cron 配置已部署

3. 验证 `CRON_SECRET` 环境变量已设置

### 网站未更新

1. 等待几分钟（CDN 缓存可能需要时间）

2. 检查 API 日志确认请求成功

3. 手动调用 `/api/revalidate` 清除缓存

---

## 最佳实践

1. **优先使用 GitHub Webhooks**：实时更新，无需等待定时任务

2. **Cron Job 作为备份**：确保即使 webhook 失败也能每天更新

3. **定期检查日志**：确保自动更新正常工作

4. **监控更新频率**：根据实际需求调整 Cron 时间（Pro 账户）

---

## 常见问题

**Q: Webhook 是实时的吗？**
A: 是的，通常在 GitHub 接收 push 后几分钟内就会触发更新。

**Q: Cron Job 什么时候执行？**
A: 当前设置为每天凌晨 2 点执行一次。Pro 账户可调整为更频繁。

**Q: 两者可以同时使用吗？**
A: 可以！Webhook 负责实时更新，Cron Job 作为备份机制。

**Q: 如何查看最新的检查结果？**
A: 调用 `/api/cron/check-updates` API 会返回最新状态。

---

## 相关文件

- `vercel.json` - Cron Job 配置
- `app/api/cron/check-updates/route.ts` - Cron Job 处理逻辑
- `app/api/revalidate/route.ts` - 手动触发更新
- `app/api/webhook/github/route.ts` - GitHub Webhook 处理
- `lib/daily-loader.ts` - Daily 数据加载器

---

## 快速开始（推荐配置）

### 步骤 1: 设置 GitHub Webhook

```bash
# 1. 生成 secret
openssl rand -base64 32

# 2. 添加到 Vercel
vercel env add GITHUB_WEBHOOK_SECRET

# 3. 在 GitHub 配置 webhook
# URL: https://www.devfoxai.cn/api/webhook/github
# Secret: <刚才生成的 secret>
# Events: Push
```

### 步骤 2: 测试 Webhook

在 GitHub Webhooks 页面点击 "Redeliver" 测试。

### 步骤 3: 验证

访问 `https://www.devfoxai.cn/daily` 查看最新内容。

**完成！** 🎉 现在网站会自动更新了。
