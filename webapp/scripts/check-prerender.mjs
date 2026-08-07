import { existsSync } from 'node:fs'
import { PRERENDER_PATHS } from '../src/router/paths.mjs'

const missing = PRERENDER_PATHS.filter((p) => {
  const rel = p === '/' ? '/index.html' : `${p}.html`  // vite-ssg flat dirStyle
  return !existsSync(new URL(`../dist${rel}`, import.meta.url))
})
if (missing.length) { console.error('Missing prerendered pages:', missing); process.exit(1) }
console.log(`OK: all ${PRERENDER_PATHS.length} pages prerendered`)
