/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#fef9f3',
          100: '#fdf1e0',
          200: '#fbe4c3',
          300: '#f7d19d',
          400: '#f4b870',
          500: '#d4af37',
          600: '#c9a332',
          700: '#9f7f2c',
          800: '#7a6026',
          900: '#5a4620',
        },
        navy: {
          50: '#f0f4f8',
          100: '#e0e9f0',
          200: '#c2d3e1',
          300: '#a3bdd2',
          400: '#6b8bb8',
          500: '#1e3a5f',
          600: '#1a305f',
          700: '#14244f',
          800: '#0f1a3f',
          900: '#0a0f2f',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'blink': 'blink 0.8s steps(2, start) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        'premium': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'premium-lg': '0 30px 80px rgba(0, 0, 0, 0.2)',
        'premium-sm': '0 10px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
