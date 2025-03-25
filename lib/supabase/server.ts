'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../database.types'

// 为服务器组件创建Supabase客户端
export function createClient() {
    const cookieStore = cookies()

    return createServerComponentClient<Database>({
        cookies: () => cookieStore
    })
}

// 为服务器动作创建Supabase客户端
export function createActionClient(cookieStore: { get: (name: string) => { value: string } | undefined }) {
    return createServerComponentClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set() {
                    // Server Actions无法设置cookie
                },
                remove() {
                    // Server Actions无法删除cookie
                },
            },
        }
    )
} 