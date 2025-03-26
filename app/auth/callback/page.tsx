'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        // 处理认证回调
        const handleAuthCallback = async () => {
            try {
                // 从URL获取会话
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('认证回调错误:', error.message);
                    router.push('/signin?error=认证失败，请重试');
                    return;
                }

                if (data.session) {
                    console.log('认证成功，重定向到仪表板');
                    router.push('/dashboard');
                } else {
                    console.log('无会话，重定向到登录页');
                    router.push('/signin');
                }
            } catch (err) {
                console.error('认证回调处理错误:', err);
                router.push('/signin?error=认证处理失败');
            }
        };

        handleAuthCallback();
    }, [router]);

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                <p className="mt-4 text-lg text-gray-300">处理登录中...</p>
            </div>
        </div>
    );
} 