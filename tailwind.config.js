const colors = {
  myBlack: "#101010",
  myOrange: "#f2aa4c",
  myWhite: "#dedede",
  myGray: "#2f2f2f",
};

module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/layout/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: colors,
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-links": colors.myWhite,
            "--tw-prose-invert-links": colors.myWhite,
            "--tw-prose-body": colors.myWhite,
            "--tw-prose-invert-body": colors.myWhite,
            "--tw-prose-headings": colors.myWhite,
            "--tw-prose-invert-headings": colors.myWhite,
            "--tw-prose-lead": colors.myWhite,
            "--tw-prose-invert-lead": colors.myWhite,
            "--tw-prose-bold": colors.myWhite,
            "--tw-prose-invert-bold": colors.myWhite,
            "--tw-prose-counters": colors.myOrange,
            "--tw-prose-invert-counters": colors.myOrange,
            "--tw-prose-bullets": colors.myOrange,
            "--tw-prose-invert-bullets": colors.myOrange,
            "--tw-prose-hr": colors.myOrange,
            "--tw-prose-invert-hr": colors.myOrange,
            "--tw-prose-quotes": colors.myWhite,
            "--tw-prose-invert-quotes": colors.myWhite,
            "--tw-prose-quote-borders": colors.myOrange,
            "--tw-prose-invert-quote-borders": colors.myOrange,
            "--tw-prose-captions": colors.myOrange,
            "--tw-prose-invert-captions": colors.myOrange,
            "--tw-prose-code": colors.myOrange,
            "--tw-prose-invert-code": colors.myOrange,
            "--tw-prose-pre-code": colors.myOrange,
            "--tw-prose-invert-pre-code": colors.myOrange,
            "--tw-prose-pre-bg": "#181818",
            "--tw-prose-invert-pre-bg": "#181818",
            "--tw-prose-th-borders": colors.myOrange,
            "--tw-prose-invert-th-borders": colors.myOrange,
            "--tw-prose-td-borders": colors.myOrange,
            "--tw-prose-invert-td-borders": colors.myOrange,

            fontSize: "3rem",
            p: {
              whiteSpace: "pre-wrap",
            },

            "h1,h2,h3,h4,h5,h6": {
              fontWeight: "bold",
              wordWrap: "break-word",
            },

            "h1,h2,h3::before": {
              content: '"# "',
              color: colors.myOrange,
            },

            strong: {
              fontWeight: "bold",
            },

            "strong::before": {
              content: "open-quote",
            },

            "strong::after": {
              content: "close-quote",
            },

            "a:hover": {
              color: colors.myOrange,
            },

            blockquote: {
              fontStyle: "normal",
            },

            "blockquote p:first-of-type::before": {
              content: "",
            },
            "blockquote p:last-of-type::after": {
              content: "",
            },
          },
        },
        lg: {
          css: {
            fontSize: "1rem",
            lineHeight: "1.5rem",

            h1: {
              fontSize: "2.25rem",
              lineHeight: "2.5rem",
              letterSpacing: "-1.25px",
            },

            h2: {
              fontSize: "1.95rem",
              lineHeight: "2.25rem",
              letterSpacing: "-0.9px",
            },

            h3: {
              fontSize: "1.6rem",
              lineHeight: "1.9rem",
              letterSpacing: "-0.9px",
            },

            h4: {
              fontSize: "1.35rem",
              lineHeight: "1.6rem",
            },

            h5: {
              fontSize: "1.23rem",
              lineHeight: "1.49rem",
            },

            h6: {
              fontSize: "1.15rem",
              lineHeight: "1.44rem",
            },

            li: {
              marginTop: "0.4rem",
              marginBottom: "0.4rem",
            },
          },
        },

        base: {
          css: {
            lineHeight: "1.45rem",
            h1: {
              fontSize: "1.8rem",
              lineHeight: "2.0rem",
              letterSpacing: "-1.25px",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
