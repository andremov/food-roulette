import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "scale(1.2)" },
          "50%": { transform: "scale(1)" },
        },
        "uneasy-strong": {
          "0%, 100%": { marginLeft: "1rem", marginRight: "1rem" },
          "25%": { marginRight: "1.5rem", marginLeft: "0.5rem" },
          "50%": { marginRight: "0.6rem", marginLeft: "1.4rem" },
          "75%": { marginRight: "1.4rem", marginLeft: "0.6rem" },
        },
        "uneasy-weak": {
          "0%, 100%": { marginLeft: "1rem", marginRight: "1rem" },
          "25%": { marginLeft: "1.25rem", marginRight: "0.75rem" },
          "50%": { marginLeft: "0.8rem", marginRight: "1.2rem" },
          "75%": { marginLeft: "1.3rem", marginRight: "0.7rem" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "uneasy-1": "uneasy-strong 0.5s ease-in-out infinite",
        "uneasy-2": "uneasy-strong 1.25s ease-in-out infinite",
        "uneasy-3": "uneasy-weak 1.75s ease-in-out infinite",
        "uneasy-4": "uneasy-weak 2.75s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
