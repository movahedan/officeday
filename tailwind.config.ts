import type { Config } from "tailwindcss";

const toRem = (value: number) => `${value / 16}rem`;

const config: Config = {
  mode: "jit",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/libs/ui/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    screens: {
      md: toRem(744),
      lg: toRem(1024),
      xl: toRem(1440),
      xxl: toRem(1920),
    },

    fontFamily: {
      sans: ["Outfit", "Inter", "Helvetica", "Arial", "sans-serif"],
    },

    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },

    spacing: {
      0: toRem(0),
      1: toRem(1),
      2: toRem(2),
      4: toRem(4),
      6: toRem(6),
      8: toRem(8),
      12: toRem(12),
      16: toRem(16),
      20: toRem(20),
      24: toRem(24),
      32: toRem(32),
      40: toRem(40),
      48: toRem(48),
      64: toRem(64),
      68: toRem(68),
      72: toRem(72),
      78: toRem(78),
      82: toRem(82),
      100: toRem(100),
      128: toRem(128),
      180: toRem(180),
      200: toRem(200),
      208: toRem(208),
      419: toRem(419),
      525: toRem(525),
    },

    extend: {
      cursor: {
        none: "none",
      },
      space: {
        4: toRem(4),
      },
      maxWidth: {
        screen: "100vw",
        400: toRem(400),
        764: toRem(764),
        840: toRem(840),
        880: toRem(880),
        1040: toRem(1040),
      },
      borderWidth: {
        1: toRem(1),
      },
      borderRadius: {
        lg: toRem(10),
      },
      borderColor: {
        transparent: "transparent",
      },
      fontWeight: {
        900: "900",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      margin: ["first", "last", "responsive"],
    },
  },
};
export default config;
