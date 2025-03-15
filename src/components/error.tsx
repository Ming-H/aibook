"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
      data-oid="w70nqej"
    >
      <h2 className="text-2xl font-bold text-red-600 mb-4" data-oid="h5:g._h">
        出错了！
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6" data-oid="6ar4p42">
        {error.message}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        data-oid="kn:414y"
      >
        重试
      </button>
    </div>
  );
}
