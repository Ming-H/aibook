# 域名配置指南

## 当前状态

- ✅ 项目已部署到 Vercel
- ✅ 生产环境 URL: https://aibook-36h58056y-ming-hs-projects.vercel.app
- ⏳ 自定义域名 `aibook.website` 需要配置

## 配置步骤

### 方法 1: 通过 Vercel 网站配置（推荐）

1. 访问 https://vercel.com/ming-hs-projects/aibook/settings/domains
2. 点击 "Add Domain"
3. 输入 `aibook.website` 和 `www.aibook.website`
4. 按照 Vercel 提供的 DNS 记录配置你的域名

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
