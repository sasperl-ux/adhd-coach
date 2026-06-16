import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(172,59%,33%)",
        accent: "hsl(351,73%,64%)",
        secondary: "hsl(39,81%,58%)",
      },
    },
  },
  plugins: [],
};
export default config;
