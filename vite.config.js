import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/pispalan-tapahtumat",
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  server: {
    open: "index.html",
  },

})
