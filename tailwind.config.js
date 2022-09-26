const colors = {
  myBlack: "#101010",
  myOrange: "#f2aa4c",
  myWhite: "#dedede",
  myLightStone: "#dad7d4",
  myGray: "#2b2b2b",
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
            "--tw-prose-body": colors.myLightStone,
            "--tw-prose-invert-body": colors.myLightStone,
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
            "--tw-prose-quotes": colors.myLightStone,
            "--tw-prose-invert-quotes": colors.myLightStone,
            "--tw-prose-quote-borders": colors.myOrange,
            "--tw-prose-invert-quote-borders": colors.myOrange,
            "--tw-prose-captions": colors.myOrange,
            "--tw-prose-invert-captions": colors.myOrange,
            "--tw-prose-code": colors.myOrange,
            "--tw-prose-invert-code": colors.myOrange,
            "--tw-prose-pre-code": colors.myOrange,
            "--tw-prose-invert-pre-code": colors.myOrange,
            "--tw-prose-pre-bg": colors.myGray,
            "--tw-prose-invert-pre-bg": colors.myGray,
            "--tw-prose-th-borders": colors.myOrange,
            "--tw-prose-invert-th-borders": colors.myOrange,
            "--tw-prose-td-borders": colors.myWhite,
            "--tw-prose-invert-td-borders": colors.myWhite,

            a: {
              wordWrap: "break-word",
            },

            p: {
              whiteSpace: "pre-wrap",
            },

            img: {
              width: "100%",
              height: "auto",
            },

            "h1,h2,h3,h4,h5,h6": {
              fontWeight: "bold",
              wordWrap: "break-word",
            },

            "h1,h2,h3::before": {
              content: '"# "',
              color: colors.myOrange,
            },
            "h4,h5,h6::before": {
              content: '"# "',
              color: colors.myWhite,
            },
            "h4,h5,h6": {
              color: colors.myWhite,
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
            "tbody>tr>td": {
              borderLeft: "1px solid " + colors.myWhite,
              borderRight: "1px solid" + colors.myWhite,
              borderBottom: "1px solid " + colors.myWhite,
              paddingLeft: "0px !important",
              paddingRight: "0px !important",
              paddingBottom: "5px !important",
              paddingTop: "5px !important",
            },
            "thead>tr>th": {
              borderLeft: "1px solid " + colors.myOrange,
              borderRight: "1px solid" + colors.myOrange,
              borderTop: "1px solid " + colors.myOrange,
              borderBottom: "1px solid " + colors.myOrange,
              color: colors.myOrange,
              paddingLeft: "0px !important",
              paddingRight: "0px !important",
              paddingBottom: "5px !important",
              paddingTop: "5px !important",
            },
          },
        },
        lg: {
          css: {
            fontSize: "1rem",
            lineHeight: "1.8rem",

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

            p: {
              marginTop: "0.9em",
              marginBottom: "0.9em",
            },

            "code>pre": {
              marginTop: "0",
              marginBottom: "0",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
