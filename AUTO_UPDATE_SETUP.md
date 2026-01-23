# 自动更新系统设置指南

本项目实现了多层自动更新机制，确保当 GitHub 仓库 `data/daily` 目录有新数据时，网站能自动更新。

## 自动更新方式

### 1. Vercel Cron Jobs（推荐）⭐

**工作原理：**
- 每 2 小时自动检查一次 GitHub API
- 对比最新的 daily 目录日期
- 如果发现新数据，自动清除缓存并触发重新验证

**优点：**
- 完全自动化，无需手动干预
- 使用 GitHub API，高效可靠
- 不依赖 GitHub Webhook 配置

**已配置在：** `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/check-updates",
      "schedule": "0 */2 * * *"
    }
  ]
}
```

**无需额外设置**，部署到 Vercel 后自动生效。

---

### 2. GitHub Webhooks（备选方案）

**工作原理：**
- 当仓库有新的 push 时，GitHub 发送 webhook 到网站
- 网站接收 webhook 后自动清除缓存

**设置步骤：**

1. **生成 Webhook Secret**
   ```bash
   # 生成一个随机字符串作为 secret
   openssl rand -base64 32
   ```

2. **添加环境变量**

   在 Vercel 项目中添加 `GITHUB_WEBHOOK_SECRET` 环境变量：
   ```bash
   vercel env add GITHUB_WEBHOOK_SECRET production
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
| `GITHUB_WEBHOOK_SECRET` | ⚪ | Webhook 验证密钥（可选） |

---

## 工作流程

```
GitHub 仓库 (content-forge-ai)
    ↓
Vercel Cron Job (每2小时)
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

### 查看 Cron Job 日志

```bash
vercel logs https://your-app.vercel.app --filter="/api/cron/check-updates"
```

### 手动测试 Cron Job

```bash
curl -X GET "https://www.devfoxai.cn/api/cron/check-updates" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### 测试 Webhook

在 GitHub Webhooks 页面点击 "Redeliver" 按钮重新发送最近的 webhook。

---

## 故障排查

### Cron Job 未执行

1. 检查 Vercel 项目是否为 Pro 或更高版本（Cron Jobs 需要）
2. 检查 `vercel.json` 中的 cron 配置是否正确
3. 查看 Vercel 部署日志

### Webhook 返回 401

1. 检查 `GITHUB_WEBHOOK_SECRET` 是否设置
2. 确保 GitHub Webhook 配置中的 Secret 与环境变量一致
3. 检查 webhook URL 是否正确

### 网站未更新

1. 等待几分钟（CDN 缓存可能需要时间）
2. 检查 API 日志确认请求成功
3. 手动调用 `/api/revalidate` 清除缓存

---

## 最佳实践

1. **使用 Cron Jobs 作为主要方式**：可靠且无需额外配置
2. **Webhook 作为补充**：可实现近乎实时的更新
3. **定期检查日志**：确保自动更新正常工作
4. **监控更新频率**：根据实际需求调整 Cron 时间间隔

---

## 常见问题

**Q: Cron Jobs 什么时候执行？**
A: 当前设置为每2小时执行一次（0 */2 * * *）。可在 `vercel.json` 中修改。

**Q: 能否实现实时更新？**
A: 使用 GitHub Webhooks 可以在几分钟内完成更新。

**Q: 如果 GitHub API 限流怎么办？**
A: Cron Job 使用条件请求（ETag），大部分情况下不会消耗配额。

**Q: 如何查看最新的检查结果？**
A: 调用 `/api/cron/check-updates` API 会返回最新状态。

---

## 相关文件

- `vercel.json` - Cron Job 配置
- `app/api/cron/check-updates/route.ts` - Cron Job 处理逻辑
- `app/api/revalidate/route.ts` - 手动触发更新
- `app/api/webhook/github/route.ts` - GitHub Webhook 处理
- `lib/daily-loader.ts` - Daily 数据加载器
