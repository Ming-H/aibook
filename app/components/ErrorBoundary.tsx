interface ErrorBoundaryProps {
    error: Error
    reset: () => void
    children: React.ReactNode
}

export default function ErrorBoundary({ error, reset, children }: ErrorBoundaryProps) {
    return (
        <div className="p-4">
            <h2 className="text-red-500">出错了</h2>
            <p>{error.message}</p>
            <button
                onClick={reset}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                重试
            </button>
            {children}
        </div>
    )
} 