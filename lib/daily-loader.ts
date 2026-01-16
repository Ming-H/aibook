/**
 * 每日热点数据加载器 - 从 data/daily/ 加载每日热点内容
 */

import { Octokit } from "@octokit/rest";

// 清理环境变量中的换行符和空格
const cleanEnv = (value: string | undefined): string | undefined => {
  return value?.trim().replace(/\n/g, '');
};

// 环境变量验证
const githubToken = cleanEnv(process.env.GITHUB_TOKEN);
const githubDataRepo = cleanEnv(process.env.GITHUB_DATA_REPO);

if (!githubToken || !githubDataRepo) {
  throw new Error("Missing GitHub credentials");
}

// 初始化 Octokit 实例
const octokit = new Octokit({
  auth: githubToken,
});

// 解析仓库所有者和名称
const [owner, repo] = githubDataRepo.split("/");

/**
 * 每日热点条目接口
 */
export interface DailyEntry {
  date: string;
  title: string;
  content: string;
  htmlContent?: string;
}

/**
 * 缓存
 */
const dailyCache = new Map<string, DailyEntry>();

/**
 * 清除缓存
 */
export function clearDailyCache(): void {
  dailyCache.clear();
}

/**
 * 获取所有每日热点日期
 */
export async function listDailyDates(): Promise<string[]> {
  const allDates: string[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: "data/daily",
        per_page: 100,
        page,
      });

      if (Array.isArray(data)) {
        const directories = data
          .filter((item) => item.type === "dir" && /^\d{8}$/.test(item.name))
          .map((item) => item.name);

        allDates.push(...directories);
        hasMore = data.length === 100;
        page++;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error("Failed to list daily dates:", error);
      hasMore = false;
    }
  }

  return allDates.sort().reverse();
}

/**
 * 获取每日热点内容
 */
export async function getDailyEntry(date: string): Promise<DailyEntry | null> {
  const cacheKey = `daily:${date}`;

  if (dailyCache.has(cacheKey)) {
    return dailyCache.get(cacheKey)!;
  }

  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `data/daily/${date}/digest/digest_${date}.md`,
    });

    if (!("content" in data) || data.type !== "file") {
      return null;
    }

    const content = Buffer.from(data.content, "base64").toString("utf-8");

    // 提取标题（第一行 # 标题）
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : `AI Daily · ${date}`;

    const entry: DailyEntry = {
      date,
      title,
      content,
    };

    dailyCache.set(cacheKey, entry);
    return entry;
  } catch (error) {
    console.error(`Failed to fetch daily entry for ${date}:`, error);
    return null;
  }
}

/**
 * 获取所有每日热点
 */
export async function getAllDailyEntries(): Promise<DailyEntry[]> {
  const dates = await listDailyDates();
  const entries: DailyEntry[] = [];

  for (const date of dates) {
    const entry = await getDailyEntry(date);
    if (entry) {
      entries.push(entry);
    }
  }

  return entries;
}

/**
 * 获取最新的每日热点
 */
export async function getLatestDailyEntry(): Promise<DailyEntry | null> {
  const dates = await listDailyDates();
  if (dates.length === 0) {
    return null;
  }
  return await getDailyEntry(dates[0]);
}
