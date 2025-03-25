import { render, screen } from '@testing-library/react'
import Home from './page'

// 在测试文件顶部添加这行
jest.mock('../lib/supabase', () => ({
    createClient: jest.fn(() => ({
        from: jest.fn(() => ({
            select: jest.fn(() => ({
                order: jest.fn(() => ({
                    data: []
                }))
            }))
        }))
    }))
}))

describe('首页', () => {
    it('应该显示正确的标题和描述', async () => {
        render(await Home())

        // 测试实际存在的页面元素
        expect(screen.getByText('AIBook Studio')).toBeInTheDocument()
        expect(screen.getByText('创建、协作和发布您的AI驱动内容')).toBeInTheDocument()

        // 测试主要功能区块标题
        expect(screen.getByText('内容创作')).toBeInTheDocument()
        expect(screen.getByText('知识管理')).toBeInTheDocument()
        expect(screen.getByText('团队协作')).toBeInTheDocument()
        expect(screen.getByText('发布与分享')).toBeInTheDocument()

        // 测试按钮是否存在
        expect(screen.getByText('进入工作台')).toBeInTheDocument()
        expect(screen.getByText('浏览博客')).toBeInTheDocument()
    })

    it('应该包含所有主要导航链接', async () => {
        render(await Home())

        // 测试导航链接
        const workspaceLink = screen.getByText('进入工作台')
        expect(workspaceLink).toHaveAttribute('href', '/dashboard')

        const blogLink = screen.getByText('浏览博客')
        expect(blogLink).toHaveAttribute('href', '/blog')

        const loginLink = screen.getByText('登录')
        expect(loginLink).toHaveAttribute('href', '/signin')

        const registerLink = screen.getByText('注册')
        expect(registerLink).toHaveAttribute('href', '/signup')
    })
}) 