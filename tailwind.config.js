/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          sm: '100%', 
          md: '750px',
          lg: '900px',
          xl: '1100px',
          '2xl': '1360px',
        },
      },
      transformOrigin: {
        'top-left': '0px 0px',
      },
      colors: {
        pink: {
          10: "hsl(var(--pink-10))",
          100: "hsl(var(--pink-100))",
        },
        green: {
          50: "hsl(var(--green-50))",
          100: "hsl(var(--green-100))",
        },
        black: {
          100: "hsl(var(--black-100))",
        },
        purple: {
          100: "hsl(var(--purple-100))",
        }
      },
    },
  },
  plugins: [],
};
