/** @type {import('tailwindcss').Config} */
// const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purp": "#633CFF",
        "light-purp": "#EFEBFF",
        "light-gray": "#FAFAFA",
        "hover-purp": "#BEADFF",
      },
      screens: {
        xs: '400px',
      },
      backgroundImage: {
        'gitHubIcon': "url('./src/images/icon-github.svg')",
        'headerPreview': "url('./src/images/icon-preview-header.svg')",
        'headerLinks': "url('./src/images/icon-link.svg')"
      }
    },
    svgFill: ["hover"],
  },
  plugins: [
     require('tailwind-scrollbar-hide')
  ],
};
// import svg from './src/images/icon-github.svg'