'use client'

import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4">
            <Link href="/" className="text-xl font-bold">
                AIBook Studio
            </Link>

            <div className="flex gap-4">
                <Link href="/">首页</Link>
                <Link href="/dashboard">工作台</Link>
                <Link href="/blog">博客</Link>
            </div>
        </nav>
    )
} 