import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateProjectButton from './CreateProjectButton'

describe('CreateProjectButton 组件', () => {
    it('点击按钮应该打开创建项目对话框', async () => {
        const mockOnClick = jest.fn()
        render(<CreateProjectButton onClick={mockOnClick} />)

        const button = screen.getByText('新建项目')
        await userEvent.click(button)

        expect(mockOnClick).toHaveBeenCalled()
    })
}) 