"use client"

import dynamic from 'next/dynamic'

const LocationLogger = dynamic(() => import('@/components/LocationLogger'), {
    ssr: false
})

export default function ClientWrapper() {
    return process.env.NODE_ENV === 'development' ? <LocationLogger /> : null
} 