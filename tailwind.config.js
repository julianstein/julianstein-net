module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
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
  plugins: [],
  corePlugins: {
    // ...
    ringWidth: false
  }
};
