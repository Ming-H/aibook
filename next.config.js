const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        formats: ['image/avif', 'image/webp'],
    },
    output: 'standalone',
    generateEtags: false,
    poweredByHeader: false,
    swcMinify: true,
    reactStrictMode: true,
    experimental: {
        optimizeCss: true,
        turbo: true
    }
}

module.exports = withMDX(nextConfig) 