import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export function useLocalePath() {
  const { locale } = useI18n()
  const route = useRoute()

  // Prefix an English path for the current locale.
  function localePath(path: string): string {
    if (locale.value !== 'fr') return path
    return path === '/' ? '/fr' : `/fr${path}`
  }
  // The current route's path in the other locale (for the toggle).
  function switchLocalePath(): string {
    const p = route.path
    if (p === '/fr' || p === '/fr/') return '/'
    if (p.startsWith('/fr/')) return p.slice(3)
    return p === '/' ? '/fr' : `/fr${p}`
  }
  return { localePath, switchLocalePath }
}
