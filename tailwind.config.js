module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/layout/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        myBlack: "#101010",
        myOrange: "#f2aa4c",
        myWhite: "#dedede",
        myGray: "#2f2f2f",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
