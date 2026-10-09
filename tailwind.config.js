/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'hydrolab-900': '#0b1320',
        'hydrolab-800': '#132338',
        'hydrolab-700': '#1c3553',
        'hydrolab-border': '#254366',
        'hydrolab-accent': '#0ea5e9',
        'hydrolab-warn': '#f59e0b',
        'hydrolab-critical': '#ef4444',
        'hydrolab-nominal': '#10b981',
      },
      boxShadow: {
        panel: '0 20px 60px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  plugins: [],
}
