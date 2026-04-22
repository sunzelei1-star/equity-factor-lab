/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        panel: '#0f172a',
      },
      boxShadow: {
        panel: '0 10px 30px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
}
