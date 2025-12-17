# 聚名网 DNS 配置指南 - Vercel 部署

## 快速配置步骤

### 第一步：进入 DNS 解析管理

1. 访问聚名网域名管理页面：https://www.juming.com/user/#/admin_ym
2. 在域名列表中找到 `aibook.website`
3. 点击域名右侧的 **"解析"** 按钮

### 第二步：添加 A 记录（根域名）

1. 点击 **"添加记录"** 或 **"新增解析"** 按钮
2. 填写以下信息：

   ```
   记录类型: A
   主机记录: @
   记录值: 76.76.21.21
   TTL: 600（或使用默认值）
   ```

3. 点击 **"保存"** 或 **"确定"**

   **说明**：
   - 主机记录填写 `@` 表示根域名 `aibook.website`
   - 如果聚名网不支持 `@`，可以尝试留空或填写 `aibook`
   - 记录值 `76.76.21.21` 是 Vercel 的 IP 地址

### 第三步：添加 CNAME 记录（www 子域名）

1. 再次点击 **"添加记录"** 或 **"新增解析"** 按钮
2. 填写以下信息：

   ```
   记录类型: CNAME
   主机记录: www
   记录值: cname.vercel-dns.com
   TTL: 600（或使用默认值）
   ```

3. 点击 **"保存"** 或 **"确定"**

   **说明**：
   - 主机记录填写 `www` 表示 `www.aibook.website`
   - 记录值 `cname.vercel-dns.com` 是 Vercel 的 CNAME 目标

### 第四步：检查并删除冲突记录

1. 查看现有的 DNS 记录列表
2. 删除以下类型的冲突记录：
   - ❌ 其他指向不同 IP 的 A 记录
   - ❌ 指向其他服务的 CNAME 记录
   - ❌ 可能冲突的 AAAA 记录（IPv6）

3. 确保最终只有两条记录：
   - ✅ A 记录：`@` → `76.76.21.21`
   - ✅ CNAME 记录：`www` → `cname.vercel-dns.com`

### 第五步：验证配置

1. **等待 DNS 传播**（5-30 分钟）

2. **使用工具检查 DNS 配置**：
   - 访问 https://dnschecker.org
   - 输入 `aibook.website` 检查 A 记录
   - 输入 `www.aibook.website` 检查 CNAME 记录
   - 确认全球各地的 DNS 解析都指向正确的值

3. **在 Vercel 中刷新域名状态**：
   - 访问 https://vercel.com/ming-hs-projects/aibook/settings/domains
   - 点击域名旁边的 **"Refresh"** 按钮
   - 等待 Vercel 重新验证 DNS 配置
   - 状态应该从 "Invalid Configuration" 变为 "Valid Configuration"

## 配置示例截图说明

### 正确的 DNS 记录配置应该如下：

```
记录类型    主机记录    记录值                  TTL
----------------------------------------------------------
A           @          76.76.21.21            600
CNAME       www        cname.vercel-dns.com   600
```

## 常见问题

### Q1: 主机记录填写什么？

- **根域名** (`aibook.website`): 填写 `@` 或留空
- **www 子域名** (`www.aibook.website`): 填写 `www`

### Q2: 如果聚名网不支持 `@` 符号怎么办？

尝试以下方法：
1. 主机记录留空
2. 填写 `aibook`（不带 `.website`）
3. 联系聚名网客服确认正确的格式

### Q3: 配置后多久生效？

- DNS 传播通常需要 **5-30 分钟**
- 最长可能需要 **48 小时**
- 使用 https://dnschecker.org 检查全球传播状态

### Q4: Vercel 一直显示 "Invalid Configuration"？

**检查清单：**
- ✅ DNS 记录已正确添加
- ✅ 记录值与上面提供的一致
- ✅ 已删除所有冲突记录
- ✅ 等待了至少 30 分钟
- ✅ 在 Vercel 中点击了 "Refresh"
- ✅ 使用 DNS 检查工具验证了配置

如果以上都正确，但问题仍然存在：
1. 检查聚名网的 DNS 服务器是否正常工作
2. 联系聚名网技术支持
3. 联系 Vercel 支持：https://vercel.com/support

### Q5: 如何测试域名是否配置成功？

1. **命令行测试**：
   ```bash
   # macOS/Linux
   dig aibook.website
   dig www.aibook.website
   
   # Windows
   nslookup aibook.website
   nslookup www.aibook.website
   ```

2. **在线工具测试**：
   - https://dnschecker.org
   - https://www.whatsmydns.net

3. **浏览器测试**：
   - 等待 DNS 传播完成后
   - 访问 https://aibook.website
   - 访问 https://www.aibook.website

## 完成后的验证

配置完成后，你应该能够：

1. ✅ 在 Vercel 域名设置页面看到 "Valid Configuration"
2. ✅ 访问 https://aibook.website 看到你的网站
3. ✅ 访问 https://www.aibook.website 自动跳转到根域名
4. ✅ SSL 证书自动生成（通常需要几分钟）

## 需要帮助？

如果遇到问题，请提供：
1. 聚名网 DNS 配置页面的截图
2. DNS 检查工具的测试结果
3. Vercel 域名状态页面的截图

我可以帮你进一步排查问题。
