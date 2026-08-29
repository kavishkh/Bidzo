/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        silkscreen: ['Silkscreen', 'monospace'],
      },
      fontSize: {
        '5.5xl': '3.5rem',
      },
      backdropBlur: {
        xl: '24px',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      colors: {
        accent: {
          lime: '#a3e635',
          green: '#84cc16',
        },
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'bid-tick': {
          '0%': { transform: 'translateY(4px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
        'bid-tick': 'bid-tick 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
