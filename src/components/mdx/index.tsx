import Image from 'next/image'
import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'

export const components: MDXComponents = {
    img: (props) => (
        <Image
            {...props}
            alt={props.alt || ''}
            width={800}
            height={400}
            className="rounded-lg"
        />
    ),
    a: ({ href, children }) => {
        if (!href) return <>{children}</>
        return href.startsWith('http') ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ) : (
            <Link href={href}>{children}</Link>
        )
    },
    h1: (props: any) => (
        <h1 {...props} className="text-4xl font-bold mt-8 mb-4" />
    ),
    h2: (props: any) => (
        <h2 {...props} className="text-3xl font-semibold mt-6 mb-3" />
    ),
    h3: (props: any) => (
        <h3 {...props} className="text-2xl font-medium mt-4 mb-2" />
    ),
    p: (props: any) => (
        <p {...props} className="my-4 leading-7" />
    ),
    ul: (props: any) => (
        <ul {...props} className="list-disc list-inside my-4 space-y-2" />
    ),
    ol: (props: any) => (
        <ol {...props} className="list-decimal list-inside my-4 space-y-2" />
    ),
    code: (props: any) => (
        <code {...props} className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" />
    ),
    pre: (props: any) => (
        <pre {...props} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4 overflow-x-auto" />
    ),
} 