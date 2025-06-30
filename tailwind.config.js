/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4f46e5',
        'primary-hover': '#4338ca',
        'secondary': '#111827',
        'light': '#f9fafb',
        'medium': '#6b7280',
        'pending': '#f59e0b',
        'approved': '#10b981',
        'rejected': '#ef4444',
      },
    },
  },
  plugins: [],
}
