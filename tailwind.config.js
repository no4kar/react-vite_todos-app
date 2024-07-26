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
      fontFamily: {
        'robotomono-normal': ['RobotoMono-Regular', 'monospace'],
        'robotomono-light': ['RobotoMono-Light', 'monospace'],
        'robotomono-medium': ['RobotoMono-Medium', 'monospace'],
        'robotomono-semibold': ['RobotoMono-SemiBold', 'monospace'],
        'robotomono-bold': ['RobotoMono-Bold', 'monospace'],
      },
    },
  },
  plugins: [],
}
