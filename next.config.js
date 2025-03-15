const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        formats: ['image/avif', 'image/webp'],
        domains: ['aibook.website', 'www.aibook.website', 'images.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.deepseek.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
        ]
    },
    output: 'standalone',
    generateEtags: false,
    poweredByHeader: false,
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate'
                    }
                ]
            }
        ]
    }
}

module.exports = withMDX(nextConfig) 