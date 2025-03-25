const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // 指向你的 Next.js 应用
    dir: './',
})

// 自定义 Jest 配置
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@/components/(.*)$': '<rootDir>/app/components/$1',
        '^@/lib/(.*)$': '<rootDir>/lib/$1',
        '^lib/(.*)$': '<rootDir>/lib/$1'
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    moduleDirectories: ['node_modules', '<rootDir>'],
    collectCoverageFrom: [
        'app/**/*.{js,jsx,ts,tsx}',
        '!app/**/*.d.ts',
        '!app/**/_*.{js,jsx,ts,tsx}',
        '!app/**/*.stories.{js,jsx,ts,tsx}'
    ],
    testTimeout: 10000
}

// createJestConfig 会自动处理 Next.js 特有的配置
module.exports = createJestConfig(customJestConfig) 