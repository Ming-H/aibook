/**
 * GitHub API 模块 - 用于从 GitHub 仓库读取文章数据
 */

import { Octokit } from "@octokit/rest";

// 环境变量验证
if (!process.env.GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN is not defined in environment variables");
}

if (!process.env.GITHUB_DATA_REPO) {
  throw new Error("GITHUB_DATA_REPO is not defined in environment variables");
}

// 初始化 Octokit 实例
export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// 解析仓库所有者和名称
const [owner, repo] = process.env.GITHUB_DATA_REPO.split("/");

/**
 * 列出所有数据日期（YYYYMMDD 格式的目录）
 */
export async function listDataDates(): Promise<string[]> {
  const allDates: string[] = [];

  let page = 1;
  let hasMore = true;

  // 分页获取所有目录
  while (hasMore) {
    try {
      const { data } = await octokit.rest.repos.listContents({
        owner,
        repo,
        path: "",
        per_page: 100,
        page,
      });

      if (Array.isArray(data)) {
        // 过滤出 8 位数字的目录名（日期格式）
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
      console.error("Failed to list dates from GitHub:", error);
      hasMore = false;
    }
  }

  // 按日期降序排序
  return allDates.sort().reverse();
}

/**
 * 列出指定日期的文章文件列表
 */
export async function listArticlesForDate(date: string): Promise<string[]> {
  try {
    const { data } = await octokit.rest.repos.listContents({
      owner,
      repo,
      path: `${date}/longform`,
    });

    if (!Array.isArray(data)) {
      return [];
    }

    // 过滤并返回 .md 文件，按名称排序
    return data
      .filter((item) => item.type === "file" && item.name.endsWith(".md"))
      .map((item) => item.name)
      .sort()
      .reverse();
  } catch (error) {
    console.error(`Failed to list articles for date ${date}:`, error);
    return [];
  }
}

/**
 * 获取文章文件内容
 */
export async function getArticleContent(
  date: string,
  filename: string
): Promise<{ content: string; sha: string }> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `${date}/longform/${filename}`,
    });

    if ("content" in data && data.type === "file") {
      return {
        content: Buffer.from(data.content, "base64").toString("utf-8"),
        sha: data.sha,
      };
    }

    throw new Error("Unexpected response type from GitHub API");
  } catch (error) {
    console.error(`Failed to fetch article ${date}/${filename}:`, error);
    throw new Error(`Failed to fetch article content: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 获取文章文件的 SHA（用于缓存验证）
 */
export async function getArticleSha(date: string, filename: string): Promise<string | null> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `${date}/longform/${filename}`,
    });

    if ("sha" in data) {
      return data.sha;
    }

    return null;
  } catch (error) {
    console.error(`Failed to get SHA for ${date}/${filename}:`, error);
    return null;
  }
}

/**
 * 检查文章是否存在
 */
export async function articleExists(date: string, filename: string): Promise<boolean> {
  try {
    await getArticleContent(date, filename);
    return true;
  } catch {
    return false;
  }
}
