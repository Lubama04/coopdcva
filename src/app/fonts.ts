import localFont from "next/font/local";

// Self-hosted variable fonts (latin subset): preloaded by Next, with metric-matched fallbacks.
export const fraunces = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2", style: "normal" },
    { path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  display: "swap",
  variable: "--font-fraunces",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});
