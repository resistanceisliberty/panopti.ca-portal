import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { PRERENDER_PATHS } from './src/router/paths.mjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Precompile locale JSON at build time (runtime-only vue-i18n) so no
    // `new Function` runs client-side — the strict CSP forbids unsafe-eval.
    VueI18nPlugin({
      include: [fileURLToPath(new URL('./src/locales/**', import.meta.url))],
      runtimeOnly: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  // Bundle Vuetify (and the MDI font css) into the SSR build so vite processes
  // their `.css` imports. Otherwise Node chokes on `import '...VRipple.css'`
  // during vite-ssg prerender (ERR_UNKNOWN_FILE_EXTENSION).
  ssr: {
    noExternal: ['vuetify', '@mdi/font'],
  },
  ssgOptions: {
    includedRoutes() {
      return PRERENDER_PATHS
    },
  },
} as Parameters<typeof defineConfig>[0])
