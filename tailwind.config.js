module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        lime: '#AFFC41',
        acid: {
          100: '#EEFCF7',
          200: '#CCF5E6',
          300: '#A0ECD0',
          400: '#88E7C4',
          500: '#67E0B3',
        },
        ash: {
          100: '#335D7A',
          200: '#194969',
          300: '#003559',
          400: '#00253E',
          500: '#001A2C',
        },
        coal: {
          100: '#4C718A',
          200: '#66859B',
          300: '#7F9AAC',
          400: '#99AEBC',
          500: '#B2C2CD',
        },
      },
    },
  },
  plugins: [
    require(`tailwind-scrollbar-hide`),
    require(`@tailwindcss/forms`)({ strategy: 'className' }),
  ],
};
