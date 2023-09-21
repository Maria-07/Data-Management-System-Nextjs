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
        primary: "#8294bb",
        secondary: "#233867",
        light: "#e0f3ff7a",
        popover: "#F1F1F1",
        accent: "#808080",
        dark: "#3C4048",

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
      },
    },
  },
  plugins: [],
};

// theme: {
//     extend: {
//       colors: {
//         // Define your color modes here
//         dark: {
//           primary: "#000000",
//           secondary: "#333333",
//           // Add more colors as needed
//         },
//         light: {
//           primary: "#8294bb",
//           secondary: "#233867",
//           light: "#e0f3ff7a",
//           popover: "#F1F1F1",
//           accent: "#808080",
//           dark: "#3C4048",
//           // Add more colors as needed
//         },
//         purple: {
//           primary: "#7E57C2",
//           secondary: "#5E35B1",
//           // Add more colors as needed
//         },
//         blue: {
//           primary: "#2196F3",
//           secondary: "#1976D2",
//           // Add more colors as needed
//         },
//       },
//       fontFamily: {
//         // primary: ["EB Garamond", "serif"],
//         // secondary: ["Rufina", "serif"],
//       },
//     },
//   },
