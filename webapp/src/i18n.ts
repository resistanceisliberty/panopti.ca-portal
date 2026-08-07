import { createI18n } from 'vue-i18n'
// Messages are precompiled at build time by @intlify/unplugin-vue-i18n (see
// vite.config) so no runtime `new Function` runs — the strict CSP forbids eval.
// This virtual module aggregates src/locales/*.json, keyed by filename.
import messages from '@intlify/unplugin-vue-i18n/messages'

export type Locale = 'en' | 'fr'

// Fresh instance per call — vite-ssg renders each route in its own context,
// so a shared instance would leak locale across prerendered pages.
export function createI18nInstance() {
  return createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    missingWarn: false,
    fallbackWarn: false,
    messages,
  })
}
