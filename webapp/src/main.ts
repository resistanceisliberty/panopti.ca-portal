import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes, scrollBehavior } from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  ssr: true,
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#f5f5f5',
        },
      },
    },
  },
})

// ViteSSG sets up the router + head (@unhead/vue). This same entry mounts the
// app on the client whether built with `vite build` (CSR) or `vite-ssg build`
// (static prerender). Which static routes get prerendered is configured via
// ssgOptions.includedRoutes in vite.config.ts.
export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ app }) => {
    app.use(createPinia())
    app.use(vuetify)
  },
)
