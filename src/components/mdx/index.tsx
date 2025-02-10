import Image from 'next/image'
import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'

interface ImageProps {
    alt?: string;
    src: string;
    width?: number;
    height?: number;
}

interface LinkProps {
    href: string;
    children: React.ReactNode;
}

// 创建一个客户端包装器组件
const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div suppressHydrationWarning>{children}</div>
}

export const components: MDXComponents = {
    img: (props: ImageProps) => (
        <Image
            {...props}
            alt={props.alt || ''}
            width={800}
            height={400}
            className="rounded-lg"
        />
    ),
    a: ({ href, children }: LinkProps) => {
        if (!href) return <>{children}</>
        return href.startsWith('http') ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ) : (
            <Link href={href}>{children}</Link>
        )
    },
    // 使用 ClientWrapper 包装可能包含客户端代码的组件
    wrapper: ClientWrapper,
    h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
        <h1 {...props} className="text-4xl font-bold mt-8 mb-4" />
    ),
    h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
        <h2 {...props} className="text-3xl font-semibold mt-6 mb-3" />
    ),
    h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
        <h3 {...props} className="text-2xl font-medium mt-4 mb-2" />
    ),
    p: (props: React.HTMLProps<HTMLParagraphElement>) => (
        <p {...props} className="my-4 leading-7" />
    ),
    ul: (props: React.HTMLProps<HTMLUListElement>) => (
        <ul {...props} className="list-disc list-inside my-4 space-y-2" />
    ),
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
        <ol {...props} className="list-decimal list-inside my-4 space-y-2" />
    ),
    code: (props: React.HTMLProps<HTMLElement>) => (
        <code {...props} className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre {...props} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4 overflow-x-auto" />
    ),
} 