import Image from 'next/image'
import Link from 'next/link'

const components = {
    img: (props: any) => (
        <div className="relative w-full h-64 my-8">
            <Image
                {...props}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    ),
    a: (props: any) => (
        <Link {...props} className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300" />
    ),
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

export { components } 