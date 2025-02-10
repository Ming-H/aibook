"use client"

import { useEffect } from "react"
import { usePathname } from 'next/navigation'

export default function LocationLogger() {
    const pathname = usePathname()

    useEffect(() => {
        // 只在客户端执行
        if (typeof window !== 'undefined') {
            console.log(`${window.location.origin}${pathname}`)
        }
    }, [pathname])

    return null
} 