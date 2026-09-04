import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' keeps asset paths relative so the build works on GitHub Pages
// (https://<user>.github.io/<repo>/) as well as a local preview.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    chunkSizeWarningLimit: 700,
  },
})
