'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EnvCheck() {
    const [supabaseUrl, setSupabaseUrl] = useState('');
    const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
    const [siteUrl, setSiteUrl] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // 只在客户端获取环境变量
        if (typeof window !== 'undefined') {
            setSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || '');
            setSupabaseAnonKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '[已设置]' : '');
            setSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || window.location.origin);
        }
    }, []);

    return (
        <div className="container max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">环境变量检查</h1>
            <p className="mb-6 text-muted-foreground">
                本页面帮助您检查Supabase相关的环境变量是否正确设置。这对于排查登录和注册问题非常有用。
            </p>

            <div className="grid gap-6">
                <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Supabase 配置</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium">NEXT_PUBLIC_SUPABASE_URL</h3>
                            <div className="mt-1 flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2 ${supabaseUrl ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span>{isClient ? (supabaseUrl || '未设置') : '加载中...'}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY</h3>
                            <div className="mt-1 flex items-center">
                                <div className={`w-3 h-3 rounded-full mr-2 ${supabaseAnonKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span>{isClient ? (supabaseAnonKey || '未设置') : '加载中...'}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium">站点URL</h3>
                            <div className="mt-1">
                                <span>{isClient ? siteUrl : '加载中...'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">配置说明</h2>
                    <div className="space-y-4">
                        <p>
                            要使Supabase正常工作，您需要在<code className="px-1 py-0.5 bg-muted rounded">.env.local</code>文件中设置以下环境变量：
                        </p>
                        <div className="bg-muted p-4 rounded-md">
                            <pre className="text-sm">
                                <code>
                                    {`NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000 # 开发环境
`}
                                </code>
                            </pre>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            这些值可以在Supabase项目控制台的"Project Settings" &gt; "API"菜单中找到。
                        </p>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">排查步骤</h2>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>确保您已在项目根目录创建<code className="px-1 py-0.5 bg-muted rounded">.env.local</code>文件</li>
                        <li>将正确的Supabase URL和匿名密钥添加到环境变量中</li>
                        <li>重启开发服务器以应用新的环境变量</li>
                        <li>检查Supabase项目是否启用了电子邮件/密码登录方式</li>
                        <li>确认您的Supabase数据库中存在用户表并包含正确的用户记录</li>
                        <li>检查用户电子邮件是否已验证（如果需要验证）</li>
                    </ol>
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                    <Link href="/signin" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                        返回登录页面
                    </Link>
                </div>
            </div>
        </div>
    );
} 