'use client'

interface CreateProjectButtonProps {
    onClick: () => void
}

export default function CreateProjectButton({ onClick }: CreateProjectButtonProps) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            新建项目
        </button>
    )
} 