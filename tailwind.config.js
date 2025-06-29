const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#F1F8EE",
          100: "#E3F1DD",
          200: "#C7E3BB",
          300: "#AADA98",
          400: "#8ECB76",
          500: "#72BD54",
          600: "#6CAF4B",
          700: "#5A8C3C",
          800: "#476D2E",
          900: "#355022",
        },
        gray: colors.slate,
        white: colors.white,
        red: colors.red,
        orange: colors.orange,
        yellow: colors.yellow,

        background: {
          DEFAULT: colors.white,
          surface: colors.white,
          muted: colors.slate[100],
        },
        text: {
          DEFAULT: colors.slate[800],
        },
        border: {
          DEFAULT: "#f5f5f5",
          strong: colors.slate[300],
        },
        ring: {
          DEFAULT: colors.green[600],
        },
        primary: {
          DEFAULT: colors.green[600],
          foreground: colors.white,
        },
        secondary: {
          DEFAULT: colors.green[50],
          foreground: colors.green[600],
        },
        destructive: {
          DEFAULT: colors.red[500],
          foreground: colors.white,
        },
        success: {
          DEFAULT: colors.green[600],
          foreground: colors.white,
        },
        muted: {
          DEFAULT: colors.slate[400],
          foreground: colors.slate[600],
        },
      },
    },
  },
  plugins: [],
};
