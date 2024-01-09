/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4F709C",
        secondary: "#213555",
        light: "#e0f3ff7a",
        popover: "#F1F1F1",
        accent: "#808080",
        fontC: "#3C4048",

        dark: {
          primary: "#142230",
          secondary: "#8294bb",
          background: "#2c333e",
          popover: "#7c5a90",
          accent: "#808080",
          dark: "#3C4048",
        },
      },
      fontFamily: {
        // primary: ["EB Garamond", "serif"],
        // secondary: ["Rufina", "serif"],
        // primary: "#089dad",
        // secondary: "#089bab",
      },
    },
  },
  plugins: [],
};
