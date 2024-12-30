/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "bg-white": "#ffffff"
      },
      fontSize: {
        sm: '0.8rem',
        base: '1.2rem',
        xl: '1.4rem',
        '2xl': '1.6rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      }
    },
  },
  plugins: [],
}

