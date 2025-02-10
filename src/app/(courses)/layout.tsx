import { Sidebar } from "@/components/sidebar"

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 px-4 py-8 sm:px-8 lg:px-12">
                {children}
            </div>
        </div>
    )
} 