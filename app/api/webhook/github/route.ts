import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import crypto from "crypto";

// 强制动态渲染
export const dynamic = 'force-dynamic';

// 清理环境变量
const cleanEnv = (value: string | undefined): string | undefined => {
  return value?.trim().replace(/\n/g, '');
};

/**
 * GitHub Webhook API 路由
 *
 * 当 GitHub 仓库有新的 push 时，GitHub 会自动调用此 webhook
 * 触发网站内容更新
 *
 * 设置方法:
 * 1. 在 GitHub 仓库设置中添加 webhook
 * 2. URL: https://your-domain.com/api/webhook/github
 * 3. Content type: application/json
 * 4. Secret: 设置一个 secret (与 GITHUB_WEBHOOK_SECRET 环境变量匹配)
 * 5. 选择触发事件: Push events
 */
export async function POST(request: Request) {
  try {
    // 获取 webhook 密钥
    const webhookSecret = cleanEnv(process.env.GITHUB_WEBHOOK_SECRET);

    if (!webhookSecret) {
      console.error("[Webhook] GITHUB_WEBHOOK_SECRET not set");
      return NextResponse.json(
        { message: "Webhook not configured" },
        { status: 500 }
      );
    }

    // 获取 GitHub 发送的签名
    const signature = request.headers.get("x-hub-signature-256");
    if (!signature) {
      return NextResponse.json(
        { message: "No signature provided" },
        { status: 401 }
      );
    }

    // 读取请求体
    const rawBody = await request.text();

    // 验证签名
    const hmac = crypto.createHmac("sha256", webhookSecret);
    hmac.update(rawBody);
    const digest = `sha256=${hmac.digest("hex")}`;

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    // 解析 webhook payload
    const payload = JSON.parse(rawBody);

    // 检查是否是 push 事件
    if (payload.ref !== 'refs/heads/main') {
      return NextResponse.json({
        received: true,
        message: "Ignored: not a push to main branch",
      });
    }

    // 检查是否有 data/daily 目录的修改
    const commits = payload.commits || [];
    const hasDailyChanges = commits.some((commit: any) => {
      const added = commit.added || [];
      const modified = commit.modified || [];
      const files = [...added, ...modified];

      return files.some((file: string) => file.startsWith('data/daily/'));
    });

    if (!hasDailyChanges) {
      console.log("[Webhook] No changes to data/daily directory");
      return NextResponse.json({
        received: true,
        message: "No daily changes detected",
      });
    }

    console.log("[Webhook] New daily content detected, clearing caches...");

    // 清除所有相关页面的缓存
    revalidatePath("/");
    revalidatePath("/daily");
    revalidatePath("/daily/[date]");
    revalidatePath("/archive");
    revalidatePath("/blog");

    // 清除所有内容缓存
    const { clearCache } = await import("@/lib/content-loader");
    clearCache();

    const { clearSeriesCache } = await import("@/lib/series-loader");
    clearSeriesCache();

    const { clearDailyCache } = await import("@/lib/daily-loader");
    clearDailyCache();

    const { clearPromptsCache } = await import("@/lib/prompt-loader");
    clearPromptsCache();

    console.log("[Webhook] Cache cleared successfully");

    return NextResponse.json({
      received: true,
      revalidated: true,
      message: "Webhook processed - caches cleared",
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("[Webhook] Error:", error);

    return NextResponse.json(
      {
        message: "Error processing webhook",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
