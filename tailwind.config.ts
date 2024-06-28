import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      height: {
        4.5: "1.125rem",
      },

      animation: {
        jump: 'jump 0.2s ease',
      },

      keyframes: {
        jump: {
          "0%": { transform: "scale(1)" },
          "50%": {
            transform: "scale(1.1)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },

      colors: {
        linear_200: "rgb(9,30,38, 100%)",
        linear_100: "rgb(0,10,15, 27.25%)",

        dark_950: "#192227",
        dark_900: "#0D1D25",
        dark_700: "#001119",
        dark_600: "#00111A",
        dark_800: "#0D161B",
        dark_500: "#000C12",
        dark_400: "#000A0F",
        dark_300: "#000204",
        dark_200: "#00070A",
        dark_100: "#000405",

        light_500: "#7C7C8A",
        light_400: "#C4C4CC",
        light_600: "#76797B",
        light_700: "#4D585E",
        light_300: "#E1E1E6",
        light_200: "#FFFAF1",

        tomato_400: "#AB4D55",
        tomato_300: "#AB222E",
        tomato_200: "#92000E",
        tomato_100: "#750310",
        carrot_100: "#FBA94C",
        mint_100: "#04D361",
        cake_200: "#82F3FF",
        cake_100: "#065E7C",
      },
      fontFamily: {
        poppins: "var(--font-poppins)",
        roboto: "var(--font-roboto)",
      },
    },
  },
  plugins: [],
};
export default config;
