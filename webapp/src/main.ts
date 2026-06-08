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

// vite-ssg sets up the router + head (@unhead/vue) for us.
export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ app }) => {
    app.use(createPinia())
    app.use(vuetify)
  },
  {
    // Static routes to prerender; excludes the dynamic catch-all and the
    // /report redirect (which has no page of its own).
    includedRoutes() {
      return [
        '/',
        '/about',
        '/what-is-an-alpr',
        '/report/id',
        '/council',
        '/foia',
        '/identify',
        '/contact',
        '/press',
        '/privacy',
        '/terms',
        '/qr',
      ]
    },
  },
)
