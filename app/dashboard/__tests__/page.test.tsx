import { render, screen } from '@testing-library/react'
import Dashboard from '../page'

// 模拟 AuthContext，简化实现
jest.mock('../../../lib/context/AuthContext', () => ({
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
    })
}))

// 修复 next/link 模拟写法
jest.mock('next/link', () => {
    return function NextLink(props) {
        return <a {...props}>{props.children}</a>;
    };
});

// 模拟 useRouter
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn()
    })
}));

// 禁用所有图标组件
jest.mock('react-icons/fi', () => ({
    FiPlus: () => <span data-testid="icon-plus">+</span>,
    FiFolder: () => <span data-testid="icon-folder">📁</span>,
    FiFileText: () => <span data-testid="icon-file">📄</span>,
    FiActivity: () => <span data-testid="icon-activity">📊</span>,
    FiStar: () => <span data-testid="icon-star">⭐</span>,
    FiClock: () => <span data-testid="icon-clock">⏰</span>
}));

// 使用 fake timers
jest.useFakeTimers();

describe('Dashboard 页面', () => {
    // 在所有测试运行前重置 jest 模拟
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 在每个测试后清理
    afterEach(() => {
        jest.clearAllTimers();
    });

    it('应该显示基本组件', () => {
        // 使用 testMode 确保不会有异步操作
        render(<Dashboard testMode={true} initialLoading={false} />);

        // 测试页面标题和用户信息
        expect(screen.getByText(/测试用户/)).toBeInTheDocument();

        // 测试项目列表
        expect(screen.getByText('测试项目')).toBeInTheDocument();

        // 测试功能按钮
        expect(screen.getByText('新建项目')).toBeInTheDocument();

        // 运行所有计时器以确保测试完成
        jest.runAllTimers();
    });
});

// 测试完成后应该立即退出
afterAll(done => {
    jest.useRealTimers();
    process.nextTick(() => {
        done();
    });
}, 1000);

// 缩短全局超时时间并设置超时处理
jest.setTimeout(5000); 