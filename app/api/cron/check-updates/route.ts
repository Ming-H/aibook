import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// 强制动态渲染
export const dynamic = 'force-dynamic';

// 清理环境变量中的换行符和空格
const cleanEnv = (value: string | undefined): string | undefined => {
  return value?.trim().replace(/\n/g, '');
};

/**
 * 获取存储的最新日期
 */
async function getStoredLatestDate(): Promise<string | null> {
  try {
    const response = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/latest-date`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      return data.date;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * 更新存储的最新日期
 */
async function updateStoredLatestDate(date: string): Promise<void> {
  // 这里可以使用 KV 存储、数据库或其他持久化方案
  // 目前使用 Next.js revalidate tag 来触发更新
  revalidateTag('latest-daily-date');
}

/**
 * Vercel Cron Job - 每2小时检查一次 GitHub 仓库是否有新的每日热点
 *
 * Cron 表达式: 0 */2 * * * (每2小时执行一次)
 *
 * 功能:
 * 1. 检查 GitHub API 获取最新的 daily 目录
 * 2. 对比当前存储的最新日期
 * 3. 如果有新数据，触发页面重新验证
 */
export async function GET(request: Request) {
  // 验证 cron secret（Vercel 自动添加）
  const authHeader = request.headers.get("authorization");
  const cronSecret = cleanEnv(process.env.CRON_SECRET);

  // Vercel Cron Jobs 会自动在 Authorization header 中提供 CRON_SECRET
  const expectedAuth = `Bearer ${cronSecret}`;

  if (authHeader !== expectedAuth) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // 获取 GitHub 配置
    const githubToken = cleanEnv(process.env.GITHUB_TOKEN);
    const githubDataRepo = cleanEnv(process.env.GITHUB_DATA_REPO);

    if (!githubToken || !githubDataRepo) {
      return NextResponse.json(
        { message: "Missing GitHub credentials" },
        { status: 500 }
      );
    }

    const [owner, repo] = githubDataRepo.split("/");

    // 调用 GitHub API 获取最新的 daily 目录
    const githubApiResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/data/daily`,
      {
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'AI-Hot-Tech-Cron-Job',
        },
        // 使用 etag 和 if-none-match 进行条件请求，减少 API 调用
      }
    );

    if (!githubApiResponse.ok) {
      throw new Error(`GitHub API error: ${githubApiResponse.status}`);
    }

    const contents = await githubApiResponse.json();

    // 过滤出日期目录（格式：YYYYMMDD）
    if (!Array.isArray(contents)) {
      throw new Error("Invalid GitHub API response");
    }

    const dateDirectories = contents
      .filter((item: any) => item.type === 'dir' && /^\d{8}$/.test(item.name))
      .map((item: any) => item.name)
      .sort()
      .reverse(); // 降序排列，最新的在前面

    if (dateDirectories.length === 0) {
      return NextResponse.json({
        checked: true,
        hasUpdate: false,
        message: "No daily directories found",
      });
    }

    const latestGithubDate = dateDirectories[0];
    const storedLatestDate = await getStoredLatestDate();

    // 检查是否有新数据
    const hasUpdate = !storedLatestDate || latestGithubDate > storedLatestDate;

    if (hasUpdate) {
      console.log(`[Cron Job] New daily content detected: ${latestGithubDate} (previous: ${storedLatestDate})`);

      // 清除所有相关页面的缓存
      revalidatePath("/daily");
      revalidatePath("/daily/[date]");
      revalidatePath("/");
      revalidateTag('daily-content');

      // 清除 daily loader 缓存
      const { clearDailyCache } = await import("@/lib/daily-loader");
      clearDailyCache();

      return NextResponse.json({
        checked: true,
        hasUpdate: true,
        latestDate: latestGithubDate,
        previousDate: storedLatestDate,
        message: "New content detected and cache cleared",
        revalidated: true,
      });
    }

    console.log(`[Cron Job] No new content. Latest: ${latestGithubDate}`);

    return NextResponse.json({
      checked: true,
      hasUpdate: false,
      latestDate: latestGithubDate,
      message: "No new content since last check",
    });

  } catch (error) {
    console.error("[Cron Job] Error:", error);

    return NextResponse.json(
      {
        message: "Error checking for updates",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
