import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Pispalan tapahtumat',
      short_name: 'Pispalan tapahtumat',
      description: 'Pispalan tapahtumat yhdellä sivustolla',
      theme_color: '#1d7d74',
      backgound_color: '#1d7d74',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim:true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],

  base: "/pispalan-tapahtumat",

  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },

  server: {
    open: "index.html",
  },
})
