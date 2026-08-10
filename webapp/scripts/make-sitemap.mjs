import { writeFileSync } from 'node:fs'
import { PRERENDER_PATHS } from '../src/router/paths.mjs'

const DOMAIN = 'https://panopti.ca'
const TODAY = new Date().toISOString().slice(0, 10)

// Per-English-path sitemap metadata. Anything not listed falls through to
// the candidates-subpage rules below, then a generic default.
const META = {
  '/': { changefreq: 'daily', priority: '1.0' },
  '/what-is-an-alpr': { changefreq: 'weekly', priority: '0.9' },
  '/report/id': { changefreq: 'monthly', priority: '0.8' },
  '/foi': { changefreq: 'monthly', priority: '0.8' },
  '/council': { changefreq: 'monthly', priority: '0.8' },
  '/candidates': { changefreq: 'weekly', priority: '0.8' },
  '/identify': { changefreq: 'monthly', priority: '0.7' },
  '/about': { changefreq: 'monthly', priority: '0.6' },
  '/contact': { changefreq: 'yearly', priority: '0.4' },
  '/privacy': { changefreq: 'yearly', priority: '0.3' },
  '/terms': { changefreq: 'yearly', priority: '0.3' },
}

function metaFor(enPath) {
  if (META[enPath]) return META[enPath]
  if (/^\/candidates\/[^/]+\/[^/]+$/.test(enPath)) return { changefreq: 'monthly', priority: '0.6' }
  if (/^\/candidates\/[^/]+$/.test(enPath)) return { changefreq: 'weekly', priority: '0.7' }
  return { changefreq: 'monthly', priority: '0.5' }
}

// /qr is a printed/physical QR-code landing page, deliberately not indexed —
// it's still prerendered (stays in PRERENDER_PATHS) but never listed here,
// matching the existing sitemap.xml, which has never included it.
const enPaths = PRERENDER_PATHS.filter((p) => !p.startsWith('/fr') && p !== '/qr')

const urls = enPaths.flatMap((enPath) => {
  const frPath = enPath === '/' ? '/fr' : `/fr${enPath}`
  const enUrl = `${DOMAIN}${enPath}`
  const frUrl = `${DOMAIN}${frPath}`
  const { changefreq, priority } = metaFor(enPath)
  const alt = `<xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/><xhtml:link rel="alternate" hreflang="fr" href="${frUrl}"/>`
  const tail = `${alt}<changefreq>${changefreq}</changefreq><priority>${priority}</priority><lastmod>${TODAY}</lastmod></url>`
  return [`  <url><loc>${enUrl}</loc>${tail}`, `  <url><loc>${frUrl}</loc>${tail}`]
})

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`Wrote ${urls.length} URL entries (${enPaths.length} paths x en/fr) to public/sitemap.xml`)
