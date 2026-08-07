import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

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
    messages: { en, fr },
  })
}
