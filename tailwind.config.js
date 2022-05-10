/* eslint-disable no-undef */
module.exports = {
  content: [
    "./index.html",
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/views/**/*.vue",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        white: "#FFF",
        whitehover: "#f6f6f6",
        adminbg: "rgba(0,0,0,0.02)",
        highlighbg: "#fff6f4b3",
        content: "rgba(0,0,0,0.8)",
        content60: "rgba(0,0,0,0.6)",
        lightcontent: "#7b7b7b",
        lighthighlight: "#ffe2ddb3",
        highlight: "#FF6E53",
        error: "#FF6E53",
        border: "rgba(0,0,0,0.03)",
        green: "#69ce87",
        blue: "#D3E0EA",
        black: "#333333",
        semi: "#d4e2d4",
        alert: "#ffeacc",
      },
      maxWidth: {
        page: "1440px",
        image: "300px",
        lgimage: "450px",
        payment: "720px",
      },
      minHeight: {
        section: "600px",
      },
      height: {
        navbar: "60px",
      },
      spacing: {
        padding: "20px",
        lgpadding: "40px",
      },
      fontSize: {
        icon: "15px",
      },
      fontFamily: {
        title: ["Karla", "sans-serif"],
      },
    },
  },
  plugins: [],
};
