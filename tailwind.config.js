/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 启用基于 class 的暗黑模式
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4F46E5", // Indigo 600
          light: "#6366F1",   // Indigo 500
          dark: "#4338CA",    // Indigo 700
        }
      },
      boxShadow: {
        "brand-soft": "0 18px 45px rgba(79, 70, 229, 0.25)"
      },
      borderRadius: {
        "2xl": "1.25rem"
      }
    }
  },
  plugins: []
};


