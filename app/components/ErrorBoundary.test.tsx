import { render, screen } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

describe('ErrorBoundary 组件', () => {
    it('应该显示错误信息', () => {
        const error = new Error('测试错误')

        render(
            <ErrorBoundary error={error} reset={() => { }}>
                <div>正常内容</div>
            </ErrorBoundary>
        )

        expect(screen.getByText('出错了')).toBeInTheDocument()
        expect(screen.getByText('测试错误')).toBeInTheDocument()
    })
}) 