// tailwind.config.js

module.exports = {
  purge: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1565D8",
        dark: {
          light: "#5A7184",
          hard: "#0D2436",
          soft: "#183B56",
        },
      },
      fontFamily: {
        opensans: ["'Open Sans'", "sans-serif"],
        roboto: ["'Roboto'", "sans-serif"],
      },
      animation: {
        breathe: "breathe 10s infinite alternate",
        fade: "fade 6s ease-in-out infinite alternate", // Added fade animation
      },
      keyframes: {
        breathe: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.2)",
          },
        },
        fade: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
