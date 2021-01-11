module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent-1': '#333'
      },
      padding: { 'fluid-video': '56.25%' },
      width: {
        'fit-content': 'fit-content'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
