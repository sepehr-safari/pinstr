/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#CBBA9F',
          secondary: '#F6AE2D',
          accent: '#6B38F6',
          neutral: '#30363d',
          'base-100': '#161b22',
          'base-200': '#0d1117',
          info: '#4AB2F9',
          success: '#00C853',
          warning: '#FFB900',
          error: '#FF3D00',
        },
      },
    ],
  },
};
