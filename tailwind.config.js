/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 启用基于 class 的暗黑模式
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // 灰阶颜色扩展 - 纯黑白灰配色系统
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0A0A0A',
      },
      boxShadow: {
        // 黑白阴影系统
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.08)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'xl': '0 8px 16px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        "2xl": "1.25rem"
      },
      fontFamily: {
        // 等宽字体配置 - 用于标题和代码
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'SF Mono',
          'Monaco',
          'Consolas',
          'monospace'
        ],
      },
    }
  },
  plugins: []
};
