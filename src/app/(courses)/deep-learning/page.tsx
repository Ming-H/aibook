import { readFileSync } from 'fs'
import { join } from 'path'
import { components } from '@/components/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import ClientWrapper from '@/components/client-wrapper'

export default async function DeepLearning() {
    const content = readFileSync(
        join(process.cwd(), 'src/docs/deep-learning/index.md'),
        'utf-8'
    )

    return (
        <article className="prose prose-purple dark:prose-invert max-w-none border-t border-gray-200 dark:border-gray-700">
            <ClientWrapper />
            <MDXRemote source={content} components={components} />
        </article>
    )
} 