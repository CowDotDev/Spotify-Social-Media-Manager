const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  purge: false, // TODO: Update to purge files correctly
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')
  ]
};
