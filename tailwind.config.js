// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        "schoolblue": "#1BA8F0",
        "black":"#1A1C1E",
        'grey':"#DEE1E6"
      }
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
