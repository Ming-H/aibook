import { render, screen } from '@testing-library/react'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner 组件', () => {
    it('应该显示加载动画', () => {
        render(<LoadingSpinner />)

        const spinner = screen.getByRole('status')
        expect(spinner).toBeInTheDocument()
        expect(spinner).toHaveAttribute('aria-label', '加载中')
    })
}) 