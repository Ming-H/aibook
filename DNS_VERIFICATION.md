# DNS 配置验证指南

## ✅ DNS 记录配置检查

从你的聚名网 DNS 配置截图可以看到：

### 已配置的记录：

1. **根域名 A 记录** ✅
   - 主机记录: `@`
   - 记录类型: `A`
   - 记录值: `76.76.21.21`
   - 状态: 正常

2. **www 子域名 CNAME 记录** ✅
   - 主机记录: `www`
   - 记录类型: `CNAME`
   - 记录值: `cname.vercel-dns.com.`
   - 状态: 正常

**配置完全正确！** 🎉

## 下一步操作

### 步骤 1: 等待 DNS 传播（5-30 分钟）

DNS 更改需要时间传播到全球各地的 DNS 服务器。通常需要：
- **最快**: 5-10 分钟
- **一般**: 15-30 分钟
- **最长**: 最多 48 小时

### 步骤 2: 验证 DNS 传播状态

使用以下工具检查 DNS 是否已全球传播：

1. **在线 DNS 检查工具**:
   - 访问: https://dnschecker.org
   - 输入 `aibook.website`，选择 "A" 记录类型
   - 检查全球各地的 DNS 服务器是否都解析到 `76.76.21.21`
   - 输入 `www.aibook.website`，选择 "CNAME" 记录类型
   - 检查是否都解析到 `cname.vercel-dns.com`

2. **命令行检查**:
   ```bash
   # 检查根域名
   dig aibook.website
   nslookup aibook.website
   
   # 检查 www 子域名
   dig www.aibook.website
   nslookup www.aibook.website
   ```

### 步骤 3: 在 Vercel 中刷新域名状态

1. 访问 Vercel 域名设置页面:
   - https://vercel.com/ming-hs-projects/aibook/settings/domains

2. 点击域名 `aibook.website` 旁边的 **"Refresh"** 按钮

3. 点击域名 `www.aibook.website` 旁边的 **"Refresh"** 按钮

4. 等待 Vercel 重新验证 DNS 配置

5. 状态应该从 "Invalid Configuration" 变为 **"Valid Configuration"** ✅

### 步骤 4: 等待 SSL 证书生成

Vercel 会自动为你的域名生成 SSL 证书：
- 通常需要 **几分钟到几小时**
- 你可以在 Vercel 域名设置页面看到 SSL 证书状态
- 证书生成完成后，你就可以通过 HTTPS 访问网站了

### 步骤 5: 测试网站访问

DNS 传播完成且 SSL 证书生成后，访问：

- ✅ https://aibook.website
- ✅ https://www.aibook.website

两个地址都应该能正常访问你的网站！

## 验证清单

完成以下检查，确保一切正常：

- [ ] DNS 记录已在聚名网正确配置（✅ 已完成）
- [ ] 等待至少 15-30 分钟让 DNS 传播
- [ ] 使用 dnschecker.org 验证全球 DNS 传播
- [ ] 在 Vercel 中点击 "Refresh" 刷新域名状态
- [ ] Vercel 显示 "Valid Configuration"
- [ ] SSL 证书已生成（绿色锁图标）
- [ ] 可以通过 https://aibook.website 访问网站
- [ ] 可以通过 https://www.aibook.website 访问网站

## 常见问题

### Q: DNS 配置后多久生效？

A: 通常 5-30 分钟，最长可能需要 48 小时。使用 dnschecker.org 可以实时查看传播状态。

### Q: Vercel 一直显示 "Invalid Configuration"？

A: 
1. 确保等待了足够的时间（至少 30 分钟）
2. 使用 dnschecker.org 确认 DNS 已全球传播
3. 在 Vercel 中点击 "Refresh" 按钮
4. 检查 DNS 记录值是否完全正确（注意 CNAME 值末尾的点）

### Q: 网站可以访问但显示不安全？

A: SSL 证书可能还在生成中，通常需要几分钟到几小时。等待一段时间后刷新页面。

### Q: 如何确认 DNS 配置完全正确？

A: 使用以下命令检查：
```bash
# 应该返回 76.76.21.21
dig aibook.website +short

# 应该返回 cname.vercel-dns.com
dig www.aibook.website +short
```

## 完成标志

当以下所有条件都满足时，说明配置完全成功：

1. ✅ DNS 记录在聚名网显示"正常"
2. ✅ dnschecker.org 显示全球 DNS 已传播
3. ✅ Vercel 域名状态显示 "Valid Configuration"
4. ✅ SSL 证书已生成（绿色锁图标）
5. ✅ 可以通过 https://aibook.website 访问网站
6. ✅ 网站内容正常显示

恭喜！🎉 配置完成后，你的网站就可以通过自定义域名访问了！
