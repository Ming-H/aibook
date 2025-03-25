import { render, screen } from '@testing-library/react'
import BlogCard from './BlogCard'

describe('BlogCard 组件', () => {
    const mockPost = {
        id: '1',
        title: '测试文章',
        content: '这是测试内容',
        created_at: '2023-01-01',
        user_id: 'user123'
    }

    it('应该正确显示博客标题和内容预览', () => {
        render(<BlogCard post={mockPost} />)

        // 使用更精确的查询方式
        const title = screen.getByText('测试文章')
        const content = screen.getByText('这是测试内容')

        expect(title).toBeInTheDocument()
        expect(content).toBeInTheDocument()
    })
}) 