import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar 组件', () => {
    it('应该正确渲染导航链接', () => {
        render(<Navbar />)

        // 测试 logo
        expect(screen.getByText('AIBook Studio')).toBeInTheDocument()

        // 测试导航链接
        const links = [
            { text: '首页', href: '/' },
            { text: '工作台', href: '/dashboard' },
            { text: '博客', href: '/blog' }
        ]

        links.forEach(link => {
            const element = screen.getByText(link.text)
            expect(element).toBeInTheDocument()
            expect(element.closest('a')).toHaveAttribute('href', link.href)
        })
    })
}) 