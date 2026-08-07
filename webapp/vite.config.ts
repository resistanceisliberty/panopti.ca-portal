import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { PRERENDER_PATHS } from './src/router/paths.mjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
