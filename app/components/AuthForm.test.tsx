import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AuthForm from './AuthForm'

// 修改模拟路径
jest.mock('../../lib/supabase', () => ({
    createClient: jest.fn(() => ({
        auth: {
            signInWithPassword: jest.fn()
        }
    }))
}))

describe('AuthForm 组件', () => {
    it('用户可以输入邮箱和密码并提交', async () => {
        render(<AuthForm />)

        // 找到输入框
        const emailInput = screen.getByLabelText(/邮箱/i)
        const passwordInput = screen.getByLabelText(/密码/i)

        // 输入测试数据
        await userEvent.type(emailInput, 'test@example.com')
        await userEvent.type(passwordInput, 'password123')

        // 点击提交按钮
        const submitButton = screen.getByRole('button', { name: /登录/i })
        await userEvent.click(submitButton)
    })
}) 