/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SF Mono', 'Cascadia Code', 'monospace'],
      },
      maxWidth: {
        'content': '720px',
        'prose': '768px',
        'nav': '1152px',
        'section': '1152px',
        'wide': '1200px',
      },
      colors: {
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#1E1B4B',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'text-reveal': 'textReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'orb': 'orbFloat 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        textReveal: {
          from: { opacity: '0', transform: 'translateY(40px)', filter: 'blur(8px)' },
          to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        shimmer: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(100%)' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '33%': { transform: 'translate(-50%, -52%) scale(1.05)' },
          '66%': { transform: 'translate(-50%, -48%) scale(0.95)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    }
  },
  plugins: []
};
