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
  // Used only by `vite-ssg build` (the `build:ssg` script). The default
  // `build` uses plain CSR; flip to SSG once the build env runs Node >= 22.12.
  ssgOptions: {
    includedRoutes() {
      return [
        '/', '/about', '/what-is-an-alpr', '/report/id', '/council',
        '/foia', '/identify', '/contact', '/privacy', '/terms', '/qr',
      ]
    },
  },
} as Parameters<typeof defineConfig>[0])
