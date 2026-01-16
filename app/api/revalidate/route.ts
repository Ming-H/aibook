import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// 清理环境变量中的换行符和空格
const cleanEnv = (value: string | undefined): string | undefined => {
  return value?.trim().replace(/\n/g, '');
};

/**
 * ISR 重新验证 API 路由
 * 由 Vercel Cron Jobs 每天调用，用于刷新内容
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
    // 重新验证所有页面
    revalidatePath("/");
    revalidatePath("/archive");
    revalidatePath("/articles/[date]/[slug]");

    // 清除内容缓存
    const { clearCache } = await import("@/lib/content-loader");
    clearCache();

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Revalidation successful",
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
