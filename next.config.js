/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'ctvvnthsnbnrgbwvrgec.supabase.co', // Supabase存储域名
            'avatars.githubusercontent.com', // GitHub头像
            'localhost', // 本地开发
            'res.cloudinary.com', // Cloudinary (如果使用)
            'images.unsplash.com', // Unsplash示例图片
            'via.placeholder.com', // 占位图片
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        // App Router 已经内置了服务器组件支持，不需要额外配置
        // 编译时间优化
        optimizeCss: false,
        // 改进的类型检查
        typedRoutes: true,
    },
}

module.exports = nextConfig 