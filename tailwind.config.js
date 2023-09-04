const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '500px',
        sm: '700px',
        md: '900px',
        lg: '1100px',
        xl: '1300px',
        '2xl': '1500px',
        '3xl': '1700px',
        '4xl': '1900px',
        '5xl': '2100px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};
