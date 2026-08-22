import { readFileSync } from 'node:fs'

// Base English paths that get prerendered. French mirrors each under /fr.
export const BASE_PATHS = [
  '/', '/about', '/what-is-an-alpr', '/report/id', '/council', '/candidates', '/chapters',
  '/foi', '/identify', '/contact', '/privacy', '/terms', '/qr',
]

const candidates = JSON.parse(readFileSync(new URL('../data/candidates.json', import.meta.url)))
export const CANDIDATE_PATHS = [
  ...candidates.municipalities.map((m) => `/candidates/${m.id}`),
  ...candidates.people.map((p) => `/candidates/${p.municipality}/${p.id}`),
]

export const PRERENDER_PATHS = [
  ...BASE_PATHS, ...CANDIDATE_PATHS,
  ...[...BASE_PATHS, ...CANDIDATE_PATHS].map((p) => (p === '/' ? '/fr' : `/fr${p}`)),
]
