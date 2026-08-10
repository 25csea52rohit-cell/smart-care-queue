/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          900: '#134e4a',
        },
        emergency: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        urgent: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
        priority: {
          DEFAULT: '#eab308',
          dark: '#ca8a04',
        },
        general: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
      },
    },
  },
  plugins: [],
};
