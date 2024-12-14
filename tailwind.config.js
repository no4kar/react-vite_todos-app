/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'system': {
          'success': '#16a34a',
          'warn': '#eab308',
          'error': '#ef4444',
        },
      },
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
      keyframes: {
        'menu-open-1': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        'menu-close-1': {
          '0%': { transform: 'scaleY(1)' },
          '100%': {
            transform: 'scaleY(0)',
            display: 'none',
          },
        },
        'menu-open-2': {
          '0%': { transform: 'scaleY(0)' },
          '70%': { transform: 'scaleY(1.3)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'dropdown-menu-open': 'menu-open-1 0.5s ease-in-out forwards',
        'dropdown-menu-close': 'menu-close-1 0.5s ease-in-out forwards',
        'aside-menu-open': 'menu-open-2 0.5s ease-in-out forwards',
      },
      strokeWidth: {
        '1': '1',
        '2': '2',
        '4': '4',
        '8': '8',
      },
    },
  },
  plugins: [],
}
