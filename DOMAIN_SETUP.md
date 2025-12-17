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

## 常见域名注册商的配置方法

### 聚名网 (juming.com) - 详细步骤

1. **登录聚名网账户**
   - 访问 https://www.juming.com/user/#/admin_ym
   - 登录你的账户

2. **进入域名管理**
   - 在域名列表中找到 `aibook.website`
   - 点击域名右侧的 **"解析"** 按钮

3. **配置 DNS 记录**

   **步骤 A: 配置根域名 `aibook.website`**
   - 点击 "添加记录" 或 "新增解析"
   - 填写以下信息：
     ```
     记录类型: A
     主机记录: @ 或 留空 或 aibook
     记录值: 76.76.21.21
     TTL: 600 或 3600（默认值即可）
     ```
   - 点击 "保存" 或 "确定"

   **步骤 B: 配置 www 子域名 `www.aibook.website`**
   - 再次点击 "添加记录"
   - 填写以下信息：
     ```
     记录类型: CNAME
     主机记录: www
     记录值: cname.vercel-dns.com
     TTL: 600 或 3600（默认值即可）
     ```
   - 点击 "保存" 或 "确定"

4. **删除冲突记录（重要）**
   - 检查是否有其他 A 记录或 CNAME 记录指向不同的值
   - 如果有，删除这些冲突的记录
   - 确保只保留上面添加的两条记录

5. **保存并等待生效**
   - 保存所有更改
   - 等待 5-30 分钟让 DNS 传播
   - 返回 Vercel 域名设置页面，点击 "Refresh" 按钮

### Namecheap

1. 登录 Namecheap 账户
2. 进入 "Domain List" → 选择 `aibook.website`
3. 点击 "Advanced DNS"
4. 添加记录：
   - **A Record**: Host `@`, Value `76.76.21.21`, TTL `Automatic`
   - **CNAME Record**: Host `www`, Value `cname.vercel-dns.com`, TTL `Automatic`

### GoDaddy

1. 登录 GoDaddy 账户
2. 进入 "My Products" → 选择 `aibook.website` → "DNS"
3. 添加记录：
   - **A Record**: Name `@`, Value `76.76.21.21`, TTL `600`
   - **CNAME Record**: Name `www`, Value `cname.vercel-dns.com`, TTL `600`

### Cloudflare

1. 登录 Cloudflare 账户
2. 选择域名 `aibook.website`
3. 进入 "DNS" → "Records"
4. 添加记录：
   - **A Record**: Name `@`, IPv4 address `76.76.21.21`, Proxy status `DNS only`（关闭代理）
   - **CNAME Record**: Name `www`, Target `cname.vercel-dns.com`, Proxy status `DNS only`

**注意**：如果使用 Cloudflare，确保代理状态设置为 "DNS only"（灰色云朵），而不是 "Proxied"（橙色云朵），否则 Vercel 无法正确验证域名。

## 验证 DNS 配置

配置完成后，等待几分钟，然后：

1. 检查 DNS 传播状态: https://dnschecker.org
2. 在 Vercel 中查看域名状态（应该显示 "Valid Configuration"）
3. 访问 https://aibook.website 测试

## 常见问题排查

### 1. "Invalid Configuration" 错误

**可能原因：**
- DNS 记录未正确配置
- DNS 记录值错误
- DNS 传播尚未完成
- 域名注册商的 DNS 服务器响应慢

**解决方法：**
1. 使用 `dig` 或 `nslookup` 命令检查 DNS 记录：
   ```bash
   # macOS/Linux
   dig aibook.website
   dig www.aibook.website
   
   # Windows
   nslookup aibook.website
   nslookup www.aibook.website
   ```

2. 在 https://dnschecker.org 检查全球 DNS 传播状态

3. 确保 DNS 记录值与 Vercel 要求的一致

4. 清除本地 DNS 缓存：
   ```bash
   # macOS
   sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

### 2. DNS_PROBE_FINISHED_NXDOMAIN

这个错误表示：
- 域名还没有配置 DNS 记录
- DNS 记录配置错误
- DNS 传播尚未完成（需要等待）

### 3. SSL 证书问题

Vercel 会自动为你的域名生成 SSL 证书，通常需要几分钟时间。

如果 SSL 证书生成失败：
- 检查是否有 CAA 记录阻止证书颁发
- 确保 DNS 配置完全正确
- 等待更长时间（最多 24 小时）

### 4. 域名一直显示 "Invalid Configuration"

**检查清单：**
- ✅ DNS 记录已正确添加
- ✅ DNS 记录值与 Vercel 要求的一致
- ✅ 已删除所有冲突的 DNS 记录
- ✅ 等待了足够的时间（至少 30 分钟）
- ✅ 在 Vercel 中点击了 "Refresh" 按钮
- ✅ 使用 DNS 检查工具验证了全球传播状态

如果以上都正确，但问题仍然存在：
1. 联系域名注册商技术支持
2. 联系 Vercel 支持：https://vercel.com/support

## 临时访问

在域名配置完成前，可以使用 Vercel 提供的默认域名：
- https://aibook-36h58056y-ming-hs-projects.vercel.app
