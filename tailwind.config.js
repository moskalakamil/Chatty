const {extendedColors} = require("./src/styles/colors");
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      colors: extendedColors,
    },
  },
  plugins: [],
};

module.exports = config;
