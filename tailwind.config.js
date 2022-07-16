module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/layout/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myBlack: "#101010",
        myOrange: "#f2aa4c",
        myWhite: "#dedede",
        myGray: "#2f2f2f",
      },
      keyframes: {
        moveClear: {
          "0%": {
            opacity: "0.3",
          },
          "100%": {
            opacity: "1",
          },
        },
        moveBlur: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        moveClear: "moveClear .3s ease-in-out",
        moveBlur: "moveBlur .3s ease-in-out",
        pulseFast: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
