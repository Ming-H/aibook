import { Octokit } from "@octokit/rest";

const cleanEnv = (value: string | undefined): string | undefined => {
  return value?.trim().replace(/\n/g, '');
};

const githubToken = cleanEnv(process.env.GITHUB_TOKEN);
const githubDataRepo = cleanEnv(process.env.GITHUB_DATA_REPO);

export function getGithubConfig() {
  if (!githubToken || !githubDataRepo) {
    throw new Error("Missing GitHub credentials");
  }
  const [owner, repo] = githubDataRepo.split("/");
  return { githubToken, owner, repo };
}

export function getOctokit(): Octokit {
  const { githubToken } = getGithubConfig();
  return new Octokit({ auth: githubToken });
}
