import { Sidebar } from "@/components/sidebar";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex" data-oid="qeo.4ig">
      {/* 左侧固定侧边栏 */}
      <div
        className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] overflow-y-auto border-r border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        data-oid="yfltrkf"
      >
        <Sidebar data-oid="8egy:8t" />
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 ml-64" data-oid=":a8t:z-">
        <main
          className="p-8 border-t border-gray-200 dark:border-gray-800 min-h-[calc(100vh-4rem)]"
          data-oid="mrqicms"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
