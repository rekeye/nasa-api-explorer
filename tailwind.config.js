/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Using the NASA color guidelines found here https://nasa.github.io/nasawds-site/components/colors/
        background: {
          primary: "#061f4a",
          gray: "#5b616b",
          white: "#f1f1f1",
        },
        primary: "#105bd8",
        focus: "#aeb0b5",
      },
    },
  },
  plugins: [],
};
