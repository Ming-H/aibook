"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

// 热门搜索关键词
const popularSearches = [
  { id: 1, text: "文章生成" },
  { id: 2, text: "AI绘画" },
  { id: 3, text: "语音转文字" },
];

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // 处理搜索提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 导航到搜索结果页面
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // 处理热门搜索点击
  const handlePopularSearchClick = (text: string) => {
    setSearchQuery(text);
    router.push(`/search?q=${encodeURIComponent(text)}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} suppressHydrationWarning data-oid="cph7hzl">
        <div
          className="bg-white dark:bg-gray-800 flex items-center rounded-full shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          data-oid="1ix12jj"
        >
          <div className="p-4 text-gray-400" data-oid=":fwkcog">
            <Search size={20} data-oid="heo:rxv" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索AI工具..."
            className="flex-1 p-4 focus:outline-none text-gray-700 dark:text-gray-300 bg-transparent"
            data-oid=":tajz5w"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-full transition-colors mx-2"
            data-oid="mcavxgj"
          >
            搜索
          </button>
        </div>
      </form>

      <div
        className="flex flex-wrap justify-center mt-3 gap-2 text-sm"
        data-oid="hllxtb1"
      >
        <span className="text-gray-500 dark:text-gray-400" data-oid="15lkd9_">
          热门搜索:
        </span>
        {popularSearches.map((item) => (
          <button
            key={item.id}
            onClick={() => handlePopularSearchClick(item.text)}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            data-oid="oeeo4ro"
          >
            {item.text}
          </button>
        ))}
      </div>
    </>
  );
}
