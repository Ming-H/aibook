// 导入测试库的扩展方法
import '@testing-library/jest-dom'
import { mockAuthContext, mockSupabase, MockLink } from './lib/__mocks__/setup'

// 设置测试环境变量
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'

// 禁用控制台警告
console.error = jest.fn()
console.warn = jest.fn()

// 修改模拟路径 - 使用正确的路径
jest.mock('./app/lib/context/AuthContext', () => ({
    useAuth: () => ({
        user: {
            id: '123',
            email: 'test@example.com',
            name: '测试用户'
        },
        loading: false,
        isLoading: false,
        signIn: jest.fn(),
        signOut: jest.fn(),
        error: null
    }),
    AuthProvider: ({ children }) => children
}))
jest.mock('./lib/supabase', () => mockSupabase)
jest.mock('next/link', () => MockLink)

// 模拟 react-icons
jest.mock('react-icons/fi', () => ({
    FiPlus: () => <span data-testid="icon-plus">+</span>,
    FiFolder: () => <span data-testid="icon-folder">📁</span>,
    FiFileText: () => <span data-testid="icon-file">📄</span>,
    FiActivity: () => <span data-testid="icon-activity">📈</span>,
    FiStar: () => <span data-testid="icon-star">⭐</span>,
    FiClock: () => <span data-testid="icon-clock">⏰</span>,
    FiEdit: () => <span data-testid="icon-edit">✏️</span>,
    FiTrash: () => <span data-testid="icon-trash">🗑️</span>
}))

// 设置超时时间
jest.setTimeout(10000)

// 模拟 fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
)

// 模拟 next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn()
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams()
}))

// 模拟 next/font/google
jest.mock('next/font/google', () => ({
    Inter: () => ({
        className: 'inter'
    })
}))

// 删除全局 React hooks 模拟
// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn((init) => [init, jest.fn()]),
//     useEffect: jest.fn(),
// })) 