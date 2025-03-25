import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 需要认证的路径
const protectedRoutes = [
    '/dashboard',
    '/creative-dna',
    '/workflow',
    '/workflow/',
    '/settings',
    '/projects',
    '/projects/',
]

// 不需要认证的路径（即使已登录）
const authRoutes = [
    '/signin',
    '/signup',
    '/forgot-password',
    '/reset-password',
]

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    // 刷新会话如果存在
    const { data: { session } } = await supabase.auth.getSession()

    // 当前路径
    const path = req.nextUrl.pathname

    // 检查受保护路由
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
    const isAuthRoute = authRoutes.some(route => path === route)

    // 如果用户未登录而且尝试访问需要认证的路径
    if (!session && isProtectedRoute) {
        const redirectUrl = new URL('/signin', req.url)
        // 添加一个重定向参数以便登录后返回
        redirectUrl.searchParams.set('redirect', path)
        return NextResponse.redirect(redirectUrl)
    }

    // 如果用户已登录而且尝试访问认证路径（登录、注册等）
    if (session && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return res
}

// 匹配所有路由
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)'],
} 