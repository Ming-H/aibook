import React from 'react'

// 模拟 AuthContext
export const mockAuthContext = {
    useAuth: () => ({
        user: {
            id: '123',
            email: 'test@example.com',
            name: '测试用户'
        },
        loading: false,
        isLoading: false
    })
}

// 模拟 Supabase
export const mockSupabase = {
    createClient: () => ({
        from: jest.fn(() => ({
            select: jest.fn(() => ({
                order: jest.fn(() => ({
                    data: [
                        {
                            id: '1',
                            title: '测试项目',
                            content: '这是一个测试项目',
                            created_at: new Date().toISOString()
                        }
                    ],
                    error: null
                }))
            }))
        })),
        auth: {
            getUser: jest.fn(() => ({
                data: { user: { id: '123', email: 'test@example.com' } },
                error: null
            }))
        }
    })
}

// 模拟 next/link - 使用 React.createElement 避免 JSX 语法错误
export const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return React.createElement('a', { href, 'data-testid': 'next-link' }, children)
} 