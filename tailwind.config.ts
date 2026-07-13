import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050810',
          900: '#0A0F1E',
          800: '#0D1528',
          700: '#111B35',
          600: '#162040',
        },
        water: {
          blue: '#1A56DB',
          cyan: '#06B6D4',
          light: '#38BDF8',
          pale: '#E0F2FE',
        },
        surface: {
          dark: '#111827',
          card: '#1A2035',
          border: '#1E2D4A',
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(26, 86, 219, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' },
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
