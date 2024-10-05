/** @type {import('tailwindcss').Config} */

const twColors = require('tailwindcss/colors')

const colors = {
  transparent: twColors.transparent,
  black: '#131314',
  white: twColors.transparent,
  primary: '#6b6a68',
  secondary: '#161D25',
  'bg-color': '#F2F2F5',
  aqua: '#268697',
  red: twColors.red[400],
  gray: '#D3D3D3'
}


module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors,
    extend: {
      keyframes: {
        animationOpacity: {
          from: {opacity: 0.2},
          to: {opacity: 1}
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)'
          },
          '50%': {
            opacity: 0.3
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        opacity: 'animationOpacity .5s ease -in-out',
        scaleIn: 'scaleIn .35s ease-in-out'
      }
    }
  },

  plugins: []
}

