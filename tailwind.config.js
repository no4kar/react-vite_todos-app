/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'default': '#1f2937', //bg-gray-800
      },
    },
  },
  plugins: [],
}
