import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto", // 👈 for sidebar layout. adds grid-cols-sidebar class
      },
      gridTemplateRows: {
        header: "64px auto", // 👈 for the navbar layout. adds grid-rows-header class
      },
    },
  },
  plugins: [],
} satisfies Config

