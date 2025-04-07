import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: true,
      config: true,
    },

    manifest: {
      name: 'Pispalan tapahtumat',
      short_name: 'Pispalan tapahtumat',
      description: 'Pispalan tapahtumat yhdellä sivustolla',
      id: '/pispalan-tapahtumat/',
      theme_color: '#1d7d74',
      background_color: '#1d7d74',
      lang: 'fi',
      start_url: '.',
      display: 'standalone',
      icons: [
        {
          src: 'favicon.ico',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          src: 'images/pt-icon-48x48.png',
          sizes: '48x48',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: 'images/pt-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: 'images/pt-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],

  base: '/pispalan-tapahtumat',

  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },

  server: {
    open: 'index.html',
  },
   test: {
    globals: true,
    environment: 'jsdom',
   }
})
