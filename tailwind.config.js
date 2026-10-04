/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#07090e',
          900: '#0c0f17',
          850: '#111622',
          800: '#171e2e',
          750: '#1e2638',
          700: '#263147',
          600: '#34425e',
          500: '#4d5f82',
          400: '#7588ab',
          300: '#a3b3d1',
          200: '#cbd5e1',
          100: '#f1f5f9',
          border: '#1f293d',
          borderLight: '#2e3d5b',
          accent: '#38bdf8',
        },
        telemetry: {
          healthy: '#10b981',
          healthyBg: '#064e3b',
          warning: '#f59e0b',
          warningBg: '#78350f',
          critical: '#ef4444',
          criticalBg: '#7f1d1d',
          info: '#38bdf8',
          infoBg: '#0c4a6e',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'conveyor-flow': 'conveyor 15s linear infinite',
      },
      keyframes: {
        conveyor: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100px)' },
        }
      }
    },
  },
  plugins: [],
}
