![entete](../header-dmp.png)

# Application web progressive (PWA)

## Objectif

Créer une [application web progressive (PWA)](https://web.dev/explore/progressive-web-apps) disponible hors-ligne à l'aide du framework Vue.JS

## Élements clés :

### [Manifest](https://web.dev/articles/add-manifest?hl=fr)

### [Le mode hors-ligne](https://web.dev/articles/offline-fallback-page?hl=fr)



## Étapes

1. Création d'un projet
```npm create vue@latest```
~~~
✔ Project name: … pwa-demo
✔ Add TypeScript? … No / (Yes)
✔ Add JSX Support? … (No) / Yes
✔ Add Vue Router for Single Page Application development? … (No) / Yes
✔ Add Pinia for state management? … (No) / Yes
✔ Add Vitest for Unit testing? … (No) / Yes
✔ Add an End-to-End Testing Solution? … (No) / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … (No) / Yes
✔ Add Prettier for code formatting? … (No) / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … (No) / Yes
~~~

2. Ajout de la librairie vite-plugin-pwa
```npm install -D vite-plugin-pwa```

3. Configuration de vite-plugin-pwa
Éditer ```vite.config.ts```
~~~js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      // add this to cache all the imports
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: [
        "**/*",
      ],
      manifest: {
        "theme_color": "#ff0000",
        "background_color": "#ff0000",
        "display": "standalone",
        "scope": "/",
        "start_url": "/",
        "name": "My First PWA",
        "short_name": "my-pwa",
        "description": "A first PWA available without network",
        "icons": [
          {
            "src": "/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": "/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
~~~
