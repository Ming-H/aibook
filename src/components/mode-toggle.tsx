"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 等待客户端挂载完成
  useEffect(() => {
    setMounted(true);
  }, []);

  // 在挂载完成前不渲染主题切换按钮
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="切换主题"
      data-oid="opbjuhe"
    >
      {theme === "dark" ? (
        <Sun
          className="w-5 h-5 text-gray-700 dark:text-gray-200"
          data-oid="fxpxh7a"
        />
      ) : (
        <Moon
          className="w-5 h-5 text-gray-700 dark:text-gray-200"
          data-oid="cy7tea6"
        />
      )}
    </button>
  );
}
