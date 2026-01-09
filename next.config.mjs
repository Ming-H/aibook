/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 环境变量
  env: {
    GITHUB_DATA_REPO: process.env.GITHUB_DATA_REPO,
  },

  // 图片优化配置
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
