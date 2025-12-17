# 域名配置指南

## 当前状态

- ✅ 项目已部署到 Vercel
- ✅ 生产环境 URL: https://aibook-36h58056y-ming-hs-projects.vercel.app
- ⚠️ 自定义域名 `aibook.website` 和 `www.aibook.website` 显示 "Invalid Configuration"

## 问题诊断

如果域名显示 "Invalid Configuration"，通常是因为：
1. DNS 记录未正确配置
2. DNS 记录配置错误
3. DNS 传播尚未完成
4. 域名注册商的 DNS 设置有问题

## 修复步骤

### 步骤 1: 在 Vercel 中查看所需的 DNS 记录

1. 访问 https://vercel.com/ming-hs-projects/aibook/settings/domains
2. 点击域名 `aibook.website` 旁边的 "Learn more" 或 "Edit"
3. Vercel 会显示需要配置的具体 DNS 记录值
4. **重要**：记录下 Vercel 显示的 DNS 记录值（可能与下面的通用值不同）

### 步骤 2: 在域名注册商处配置 DNS 记录

登录你的域名注册商（如 Namecheap、GoDaddy、Cloudflare 等）的 DNS 管理面板。

#### 对于根域名 `aibook.website`：

**选项 A: 使用 A 记录（推荐）**
```
类型: A
名称: @ 或 留空 或 aibook.website
值: 76.76.21.21
TTL: 3600 (或自动)
```

**选项 B: 如果注册商支持根域名的 CNAME（某些注册商支持）**
```
类型: CNAME
名称: @ 或 留空
值: cname.vercel-dns.com
TTL: 3600
```

#### 对于 `www.aibook.website`：

```
类型: CNAME
名称: www
值: cname.vercel-dns.com
TTL: 3600
```

### 步骤 3: 删除冲突的 DNS 记录

确保删除以下冲突记录：
- ❌ 删除其他指向不同 IP 的 A 记录
- ❌ 删除指向其他服务的 CNAME 记录
- ❌ 删除可能冲突的 AAAA 记录（IPv6）

### 步骤 4: 等待 DNS 传播

1. DNS 更改通常需要 **5 分钟到 48 小时** 才能完全传播
2. 使用工具检查 DNS 传播状态：
   - https://dnschecker.org
   - 输入 `aibook.website` 和 `www.aibook.website`
   - 检查全球各地的 DNS 解析是否一致

### 步骤 5: 在 Vercel 中刷新域名状态

1. 返回 Vercel 域名设置页面
2. 点击域名旁边的 **"Refresh"** 按钮
3. 等待 Vercel 重新验证 DNS 配置
4. 状态应该从 "Invalid Configuration" 变为 "Valid Configuration"

### 步骤 6: 验证 SSL 证书

Vercel 会自动为你的域名生成 SSL 证书，通常需要几分钟。如果 SSL 证书生成失败：
- 检查是否有 CAA 记录阻止证书颁发
- 确保 DNS 配置完全正确

### 方法 2: 通过 Vercel CLI

```bash
# 添加域名
vercel domains add aibook.website
vercel domains add www.aibook.website

# 查看域名状态
vercel domains ls
```

## DNS 配置

在你的域名注册商处添加以下 DNS 记录：

### 根域名 (aibook.website)

**选项 A: A 记录**
```
类型: A
名称: @
值: 76.76.21.21
TTL: 3600
```

**选项 B: CNAME 记录（如果支持）**
```
类型: CNAME
名称: @
值: cname.vercel-dns.com
TTL: 3600
```

### www 子域名 (www.aibook.website)

```
类型: CNAME
名称: www
值: cname.vercel-dns.com
TTL: 3600
```

## 验证 DNS 配置

配置完成后，等待几分钟，然后：

1. 检查 DNS 传播状态: https://dnschecker.org
2. 在 Vercel 中查看域名状态（应该显示 "Valid Configuration"）
3. 访问 https://aibook.website 测试

## 常见问题

### DNS_PROBE_FINISHED_NXDOMAIN

这个错误表示：
- 域名还没有配置 DNS 记录
- DNS 记录配置错误
- DNS 传播尚未完成（需要等待）

### SSL 证书

Vercel 会自动为你的域名生成 SSL 证书，通常需要几分钟时间。

## 临时访问

在域名配置完成前，可以使用 Vercel 提供的默认域名：
- https://aibook-36h58056y-ming-hs-projects.vercel.app
