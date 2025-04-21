const { transform } = require("next/dist/build/swc");
const { transformer } = require("zod");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: "true",
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      colors: {
        "primary-darker": "#023452",
        "primary-lighter": "#0177aa",
        "theme-black": "#222222",
        "gray-darker": "#656363",
        "gray-lighter": "#d2d2d5",
        "blue-darker": "#072d78",
        "blue-lighter": "#1c5fe2",
        "theme-background": "#f6f2f2",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(80deg, #013351 30%, #00b6fe)",
        "ev-gradient": "linear-gradient(96deg, #07a158 1.81%, #03819d)",
      },
      aspectRatio: {
        "4/1": "4 / 1",
        "5/1": "5 / 1",
        "3/2": "3 / 2",
        "5/3": "5 / 3",
        "7/4": "7 / 4",
        "15/8": "15 / 8",
        "20/7": "20 / 7",
        "5/4": "5 / 4",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        scroll: {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(-100%)",
          },
        },
        beat: {
          "0%": { transform: "scale(1)", opacity: 0 },
          "25%": { transform: "scale(1.75)" },
          "100%": { opacity: 1 },
        },
        run: {
          "0%, 100%": { left: "0" },
          "50%": { left: "calc(100% - 145px)" },
        },
        revUp: {
          "0%": {
            transform: "rotate(-125deg)",
          },
          "75%": {
            transform: "rotate(125deg)",
          },
          "100%": {
            transform: "rotate(-45deg)",
          },
        },
      },
      animation: {
        scroll: "20s linear scroll",
        beat: "0.25s linear beat",
        run: "run 5s linear",
        revUp: "4s ease-out revUp forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
