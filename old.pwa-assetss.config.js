// import {
    // defineConfig,
    // minimal2023Preset as preset,
// } from '@vite-pwa/assets-generator/config'

import { defineConfig } from '@vite-pwa/assets-generator/config'
import { minimal2023Preset } from '@vite-pwa/assets-generator/dist/presets'

let config
try {

 config = defineConfig({
    headLinkOptions: {
        preset: '2023',
    },
   preset: minimal2023Preset,
    images: ['public/favicon.ico'],
})

  console.log('Configuration loaded successfully:', config)
} catch(err) {
    console.error('Error loading preset:', err.message)
}

export default config
