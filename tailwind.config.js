/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        'tenada':['Tenada']
      },
      backgroundImage: {
        'welcomeHome': "linear-gradient(to bottom, rgba(255,255,255,0),rgba(255,220,130,0.1),rgba(255,220,190,0.5)), url('./assets/images/welcome/welcomeHome.jpg')",
      },
    },
  },
  plugins: [],
}

