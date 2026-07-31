import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(() => {
  return {
    // Set VITE_PUBLIC_URL=/docs to mount the site under a prefix. It feeds both
    // Vite's asset base and the Router basename (see src/App.tsx), and
    // src/lib/url.ts reads it back out of BASE_URL for hand-built hrefs.
    base: process.env.VITE_PUBLIC_URL || "/",
    build: {
      outDir: "build",
    },
    plugins: [react()],
  }
})
