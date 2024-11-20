/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          'sm': '100%',
          'md': '100%',
          'lg': '1024px',
          'xl': '1024px',
          '2xl': '1024px'
        }
      },
      screens: {
        sm: '320px'
      }
    }
  },
  plugins: []
}
