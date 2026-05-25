import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#635BFF",
          light: "#7A73FF",
          dark: "#0A2540"
        },
        navy: "#1A1F36",
        accent: {
          pink: "#FF5996",
          orange: "#FFB17A",
          teal: "#00D4B1",
          cyan: "#00D4FF",
          yellow: "#F8BC42"
        },
        surface: {
          page: "#FAFBFF",
          card: "#FFFFFF",
          subtle: "#F6F9FC",
          muted: "#EFF3F8"
        },
        ink: {
          head: "#0A2540",
          body: "#425466",
          muted: "#697386"
        },
        line: {
          DEFAULT: "#E3E8EE",
          light: "#EDF1F6"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 3px rgba(10,37,64,0.06), 0 4px 16px rgba(10,37,64,0.08)",
        hover: "0 4px 24px rgba(99,91,255,0.14)"
      }
    }
  },
  plugins: []
}

export default config
