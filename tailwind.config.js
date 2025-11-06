export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'background-light': '#f8f9fa',
        'background-dark': '#1e1e2f',
        'surface-light': '#ffffff',
        'surface-dark': '#2a2a3c',
        'accent-light': '#0d6efd',
        'accent-dark': '#4f9cff',
        'text-light': '#212529',
        'text-dark': '#f1f1f1',
        'muted-light': '#6c757d',
        'muted-dark': '#a0a0b2',
      },
      animation: {
        fadeOut: 'fadeOut 0.5s ease-in-out',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};