import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
      return [
        '/', '/about', '/what-is-an-alpr', '/report/id', '/council',
        '/foia', '/identify', '/contact', '/privacy', '/terms', '/qr',
      ]
    },
  },
} as Parameters<typeof defineConfig>[0])
