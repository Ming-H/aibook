export const createClient = () => ({
    from: jest.fn(() => ({
        select: jest.fn(() => ({
            order: jest.fn(() => ({
                data: [
                    {
                        id: 1,
                        title: '测试项目',
                        description: '这是一个测试项目',
                        created_at: new Date().toISOString()
                    }
                ]
            }))
        }))
    })),
    auth: {
        getUser: jest.fn(() => Promise.resolve({
            data: {
                user: {
                    id: '123',
                    email: 'test@example.com'
                }
            },
            error: null
        }))
    }
}) 