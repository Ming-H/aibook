import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// 强制动态渲染
export const dynamic = 'force-dynamic';

// 清理环境变量中的换行符和空格
const cleanEnv = (value: string | undefined): string | undefined => {
  return value?.trim().replace(/\n/g, '');
};

/**
 * Vercel Cron Job - 每天检查 GitHub 仓库是否有新的每日热点
 *
 * Cron 表达式: 0 2 * * * (每天凌晨 2 点执行)
 *
 * 功能: 检查 GitHub API 获取最新的 daily 目录，如果有新数据则触发页面重新验证
 */
export async function GET(request: Request) {
  // 验证 cron secret（Vercel 自动添加）
  const authHeader = request.headers.get("authorization");
  const cronSecret = cleanEnv(process.env.CRON_SECRET);
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

    console.log(`[Cron Job] Latest GitHub date: ${latestGithubDate}`);

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
      latestDate: latestGithubDate,
      message: "Cache cleared successfully",
      revalidated: true,
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
