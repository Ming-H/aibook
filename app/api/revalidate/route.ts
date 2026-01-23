import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// 强制动态渲染，因为使用了 headers
export const dynamic = 'force-dynamic';

// 清理环境变量中的换行符和空格
const cleanEnv = (value: string | undefined): string | undefined => {
  return value?.trim().replace(/\n/g, '');
};

/**
 * ISR 重新验证 API 路由
 * 由 Vercel Cron Jobs 每天调用，用于刷新内容
 *
 * 支持的触发方式:
 * 1. Vercel Cron Jobs (自动)
 * 2. 手动调用 (需要 CRON_SECRET)
 * 3. GitHub Webhooks
 */
export async function GET(request: Request) {
  // 验证 cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = cleanEnv(process.env.CRON_SECRET);
  const expectedAuth = `Bearer ${cronSecret}`;

  if (!cronSecret || authHeader !== expectedAuth) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // 清除所有相关页面的缓存
    revalidatePath("/");
    revalidatePath("/daily");
    revalidatePath("/daily/[date]");
    revalidatePath("/archive");
    revalidatePath("/series");
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

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Revalidation successful - all caches cleared",
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
