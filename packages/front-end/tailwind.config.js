/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        danube: {
          '50': '#f0f8fe',
          '100': '#ddeffc',
          '200': '#c3e3fa',
          '300': '#9bd3f5',
          '400': '#6bbaef',
          '500': '#53a3ea',
          '600': '#3382dd',
          '700': '#2a6ccb',
          '800': '#2858a5',
          '900': '#264c82',
          '950': '#1b2f50',
        },
      }
      // colors(theme) {
      //   return {
      //     primary: {
      //       ...theme.colors.purple,
      //       default: theme.colors.purple[500]
      //     }
      //   }
      // }
    },
  },
  plugins: [],
}

