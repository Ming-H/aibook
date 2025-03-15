export function NewsLoading() {
    return (
        <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden animate-pulse">
                    <div className="aspect-[2/1] w-full bg-gray-200 dark:bg-gray-700" />
                    <div className="p-6">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 