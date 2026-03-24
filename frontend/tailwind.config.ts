import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#F3E5AB',
          500: '#D4AF37', // primary gold
          600: '#b8962e',
        },
        dark: {
          900: '#0A0A0B',
          800: '#121214',
          700: '#1a1a1e',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
