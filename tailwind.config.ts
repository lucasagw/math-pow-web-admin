import type { Config } from "tailwindcss";

// tailwind.config.js
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            whiteAlt: "#FFF",
            white: "#FFF",
            black: "#4B4B4B",
            red: "#FF5555",
            green: "#50FA7B",
            yellow: "#F1FA8C",
            primary: "#222872",
            secondary: "#005C85",
            tertiary: "#1293A6",
            accent: "#FFF8C9",
          },
        },
        dark: {
          colors: {
            whiteAlt: "#FFF",
            white: "#FFF",
            black: "#4B4B4B",
            red: "#FF5555",
            green: "#50FA7B",
            yellow: "#F1FA8C",
            primary: "#222872",
            secondary: "#005C85",
            tertiary: "#1293A6",
            accent: "#FFF8C9",
          },
        },
      },
    }),
  ],
};
export default config;
