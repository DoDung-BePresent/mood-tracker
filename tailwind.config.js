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
        primary: "#6CAF4B",
        background: "#FFFFFF",
        textPrimary: "#2D3748",
        textSecondary: "#718096",
        textMuted: "#A0AEC0",
        border: "#E2E8F0",
        success: "#6CAF4B",
        error: "#E53E3E",
      },
    },
  },
  plugins: [],
};
