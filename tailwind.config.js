/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      purple: '#AD1FEA',
      cyan: '#62BCFA',
      orange: '#F49F85',
      red: '#D73737',
      white: '#FFFFFF',
      'white-dark': '#F7F8FD',
      blue: '#4661E6',
      'blue-dark': '#3A4374',
      'blue-darkest': '#373F68',
      'blue-light': '#F2F4FF',
      'blue-gray': '#647196',
    },
    fontFamily: {
      sans: ['Jost', 'sans-serif'],
    },
    fontSize: {
      'body-1': ['16px', '23px'],
      'body-2': ['15px', '22px'],
      'body-3': ['14px', '20px'],
      h1: [
        '24px',
        {
          lineHeight: '35px',
          letterSpacing: '-0.33px',
          fontWeight: 'bold',
        },
      ],
      h2: [
        '20px',
        {
          lineHeight: '29px',
          letterSpacing: '-0.25px',
          fontWeight: 'bold',
        },
      ],
      h3: [
        '18px',
        {
          lineHeight: '26px',
          letterSpacing: '-0.25px',
          fontWeight: 'bold',
        },
      ],
      h4: [
        '14px',
        {
          lineHeight: '20px',
          fontWeight: 'bold',
        },
      ],
    },
    screens: {
      md: '768px',
      mdo: { max: '1023px', min: '768px' },
      lg: '1024px',
    },
    extend: {
      borderRadius: {
        none: '0',
        lg: '10px',
        md: '5px',
      },
    },
  },
  plugins: [],
};
