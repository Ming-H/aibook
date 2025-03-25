import { render, screen } from '@testing-library/react'
import BlogCard from '../BlogCard'
import Navbar from '../Navbar'
import AuthForm from '../AuthForm'

describe('组件测试', () => {
    describe('BlogCard', () => {
        const mockPost = {
            id: '1',
            title: '测试文章',
            content: '这是测试内容',
            created_at: '2023-01-01',
            user_id: 'user123'
        }

        it('应该正确显示博客标题和内容预览', () => {
            render(<BlogCard post={mockPost} />)
            expect(screen.getByText('测试文章')).toBeInTheDocument()
            expect(screen.getByText('这是测试内容')).toBeInTheDocument()
        })
    })

    describe('Navbar', () => {
        it('应该正确渲染导航链接', () => {
            render(<Navbar />)
            expect(screen.getByText('AIBook Studio')).toBeInTheDocument()
            const links = ['首页', '工作台', '博客']
            links.forEach(text => {
                expect(screen.getByText(text)).toBeInTheDocument()
            })
        })
    })

    describe('AuthForm', () => {
        it('应该渲染登录表单', () => {
            render(<AuthForm />)
            expect(screen.getByLabelText(/邮箱/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/密码/i)).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /登录/i })).toBeInTheDocument()
        })
    })
}) 