/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          40: '#8D929F'
        },
        blue: {
          100: "#00538F"
        },
        black: {
          10: "#F5F2F1",
          20: "#E0E1E4",
          60: '#5E6167'
        },
        orange: {
          100: "#EF6D0A"
        }
      }
    }
  },
  plugins: []
};
