/**
 * GitHub API 模块 - 用于从 GitHub 仓库读取文章数据
 */

import { Octokit } from "@octokit/rest";

// 清理环境变量中的换行符和空格
const cleanEnv = (value: string | undefined): string | undefined => {
  return value?.trim().replace(/\n/g, '');
};

// 环境变量验证
const githubToken = cleanEnv(process.env.GITHUB_TOKEN);
const githubDataRepo = cleanEnv(process.env.GITHUB_DATA_REPO);

console.log('[GitHub API] Environment check:');
console.log('[GitHub API] - GITHUB_TOKEN exists:', !!githubToken);
console.log('[GitHub API] - GITHUB_TOKEN length:', githubToken?.length || 0);
console.log('[GitHub API] - GITHUB_DATA_REPO:', githubDataRepo);

if (!githubToken) {
  throw new Error("GITHUB_TOKEN is not defined in environment variables");
}

if (!githubDataRepo) {
  throw new Error("GITHUB_DATA_REPO is not defined in environment variables");
}

// 初始化 Octokit 实例
export const octokit = new Octokit({
  auth: githubToken,
});

// 解析仓库所有者和名称
const [owner, repo] = githubDataRepo.split("/");

/**
 * 列出所有自定义文章目录（YYYYMMDD_HHMMSS_标题 格式的目录）
 * 从 data/custom/ 目录下读取
 */
export async function listDataDates(): Promise<string[]> {
  const allArticles: string[] = [];

  let page = 1;
  let hasMore = true;

  // 分页获取所有目录
  while (hasMore) {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: "data/custom",
        per_page: 100,
        page,
      });

      if (Array.isArray(data)) {
        // 过滤出符合日期格式的目录名（YYYYMMDD_HHMMSS_标题）
        const directories = data
          .filter((item) => item.type === "dir" && /^\d{8}_\d{6}/.test(item.name))
          .map((item) => item.name);

        allArticles.push(...directories);
        hasMore = data.length === 100;
        page++;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error("Failed to list articles from GitHub:", error);
      hasMore = false;
    }
  }

  // 按日期降序排序
  return allArticles.sort().reverse();
}

/**
 * 列出指定文章目录的 markdown 文件
 * 从 data/custom/{articleDir}/ 目录下读取
 */
export async function listArticlesForDate(articleDir: string): Promise<string[]> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `data/custom/${articleDir}`,
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
    console.error(`Failed to list articles for ${articleDir}:`, error);
    return [];
  }
}

/**
 * 获取文章文件内容
 * 从 data/custom/{articleDir}/{filename} 读取
 */
export async function getArticleContent(
  articleDir: string,
  filename: string
): Promise<{ content: string; sha: string }> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `data/custom/${articleDir}/${filename}`,
    });

    if ("content" in data && data.type === "file") {
      return {
        content: Buffer.from(data.content, "base64").toString("utf-8"),
        sha: data.sha,
      };
    }

    throw new Error("Unexpected response type from GitHub API");
  } catch (error) {
    console.error(`Failed to fetch article ${articleDir}/${filename}:`, error);
    throw new Error(`Failed to fetch article content: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 获取文章文件的 SHA（用于缓存验证）
 * 从 data/custom/{articleDir}/{filename} 读取
 */
export async function getArticleSha(articleDir: string, filename: string): Promise<string | null> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `data/custom/${articleDir}/${filename}`,
    });

    if ("sha" in data) {
      return data.sha;
    }

    return null;
  } catch (error) {
    console.error(`Failed to get SHA for ${articleDir}/${filename}:`, error);
    return null;
  }
}

/**
 * 检查文章是否存在
 */
export async function articleExists(articleDir: string, filename: string): Promise<boolean> {
  try {
    await getArticleContent(articleDir, filename);
    return true;
  } catch {
    return false;
  }
}

// ==================== 系列相关功能 ====================

/**
 * 列出所有系列目录
 * 从 data/series/ 目录下读取
 * 数据结构: series_1, series_2, ...
 */
export async function listSeries(): Promise<string[]> {
  const allSeries: string[] = [];

  try {
    console.log(`[listSeries] Fetching series from ${owner}/${repo}/data/series`);
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: "data/series",
    });

    console.log(`[listSeries] GitHub API returned ${Array.isArray(data) ? data.length : 0} items`);

    if (Array.isArray(data)) {
      // 过滤出系列目录（按 series_1_*, series_2_* 等命名）
      const directories = data
        .filter((item) => {
          const isDir = item.type === "dir";
          const matchesPattern = /^series_\d+/.test(item.name);
          console.log(`[listSeries] Checking ${item.name}: dir=${isDir}, matches=${matchesPattern}`);
          return isDir && matchesPattern;
        })
        .map((item) => item.name)
        .sort();

      console.log(`[listSeries] Found directories:`, directories);
      allSeries.push(...directories);
    }
  } catch (error) {
    console.error("[listSeries] Failed to list series from GitHub:", error);
  }

  return allSeries;
}

/**
 * 列出指定系列的所有episode目录
 * 从 data/series/{seriesId}/ 目录下读取
 * 数据结构: episode_001, episode_002, ...
 */
export async function listEpisodesForSeries(seriesId: string): Promise<string[]> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `data/series/${seriesId}`,
    });

    if (!Array.isArray(data)) {
      return [];
    }

    // 过滤并返回 episode_* 目录
    return data
      .filter((item) => item.type === "dir" && /^episode_\d+$/.test(item.name))
      .map((item) => item.name)
      .sort();
  } catch (error) {
    console.error(`Failed to list episodes for series ${seriesId}:`, error);
    return [];
  }
}

/**
 * 获取episode元数据
 * 从 data/series/{seriesId}/{episodeId}/episode_metadata.json 读取
 */
export async function getEpisodeMetadata(
  seriesId: string,
  episodeId: string
): Promise<Record<string, any> | null> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `data/series/${seriesId}/${episodeId}/episode_metadata.json`,
    });

    if ("content" in data && data.type === "file") {
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error(`Failed to get metadata for ${seriesId}/${episodeId}:`, error);
  }

  return null;
}

/**
 * 获取episode文章内容
 * 从 data/series/{seriesId}/{episodeId}/longform/ 读取第一个.md文件
 */
export async function getEpisodeArticleContent(
  seriesId: string,
  episodeId: string
): Promise<{ content: string; sha: string; filename: string } | null> {
  try {
    // 首先获取 longform 目录下的文件列表
    const { data: dirData } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `data/series/${seriesId}/${episodeId}/longform`,
    });

    let mdFileName: string | null = null;

    if (Array.isArray(dirData)) {
      // 找到第一个 .md 文件
      const mdFile = dirData.find((item) => item.type === "file" && item.name.endsWith(".md"));
      if (mdFile) {
        mdFileName = mdFile.name;
      }
    }

    if (!mdFileName) {
      return null;
    }

    // 然后获取该文件的内容
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `data/series/${seriesId}/${episodeId}/longform/${mdFileName}`,
    });

    if ("content" in data && data.content) {
      return {
        content: Buffer.from(data.content, "base64").toString("utf-8"),
        sha: data.sha,
        filename: mdFileName,
      };
    }
  } catch (error) {
    console.error(`Failed to fetch article for ${seriesId}/${episodeId}:`, error);
  }

  return null;
}

/**
 * 获取系列配置文件
 * 从 data/series/{seriesId}/series_metadata.json 读取
 */
export async function getSeriesMetadata(seriesId: string): Promise<Record<string, any> | null> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `data/series/${seriesId}/series_metadata.json`,
    });

    if ("content" in data && data.type === "file") {
      const content = Buffer.from(data.content, "base64").toString("utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error(`Failed to get series metadata for ${seriesId}:`, error);
  }

  return null;
}
