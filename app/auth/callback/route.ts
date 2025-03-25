import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const supabase = createServerClient()

        // 使用code交换会话
        await supabase.auth.exchangeCodeForSession(code)
    }

    // 重定向到首页或仪表盘
    return NextResponse.redirect(new URL('/dashboard', request.url))
} 