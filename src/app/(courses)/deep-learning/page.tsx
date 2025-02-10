import { readFileSync } from 'fs'
import { join } from 'path'
import { components } from '@/components/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function DeepLearning() {
    const content = readFileSync(
        join(process.cwd(), 'src/docs/deep-learning/index.md'),
        'utf-8'
    )

    return (
        <article className="prose prose-purple dark:prose-invert max-w-none">
            <MDXRemote source={content} components={components} />
        </article>
    )
} 