interface Post {
    id: string
    title: string
    content: string
    created_at: string
    user_id: string
}

interface BlogCardProps {
    post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="mt-2">{post.content}</p>
        </div>
    )
} 