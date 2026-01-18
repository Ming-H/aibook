'use client';

import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return '💻';
    }
    return resolvedTheme === 'dark' ? '🌙' : '☀️';
  };

  const getLabel = () => {
    if (theme === 'system') return '跟随系统';
    return resolvedTheme === 'dark' ? '深色模式' : '浅色模式';
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
      aria-label={getLabel()}
      title={getLabel()}
    >
      <span className="text-xl">{getIcon()}</span>
    </button>
  );
}
