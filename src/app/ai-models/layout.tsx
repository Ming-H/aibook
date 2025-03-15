import { aiModels } from "@/config/ai-models";
import Link from "next/link";

export default function AiModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex" data-oid="u9vmp2b">
      {/* 左侧固定侧边栏 */}
      <div
        className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] overflow-y-auto border-r border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        data-oid="_3zpaa0"
      >
        <nav className="p-4" data-oid="9piu9dn">
          <h2
            className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100"
            data-oid="-m75gr8"
          >
            AI大模型导航
          </h2>
          <div className="space-y-1" data-oid="k1b54gb">
            {aiModels.map((model) => (
              <Link
                key={model.id}
                href={`/ai-models/${model.id}`}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors group"
                data-oid="79qhk90"
              >
                <span className="flex-1" data-oid="_4m5.zd">
                  {model.name}
                  <span
                    className="text-xs text-gray-500 dark:text-gray-400 ml-2"
                    data-oid="uexwm4u"
                  >
                    ({model.company})
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 ml-64" data-oid="y:s1rjo">
        <main
          className="p-8 border-t border-gray-200 dark:border-gray-800 min-h-[calc(100vh-4rem)]"
          data-oid="m_3371w"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
