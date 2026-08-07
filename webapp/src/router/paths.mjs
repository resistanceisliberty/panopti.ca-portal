// Base English paths that get prerendered. French mirrors each under /fr.
export const BASE_PATHS = [
  '/', '/about', '/what-is-an-alpr', '/report/id', '/council',
  '/foi', '/identify', '/contact', '/privacy', '/terms', '/qr',
]
export const PRERENDER_PATHS = [
  ...BASE_PATHS,
  ...BASE_PATHS.map((p) => (p === '/' ? '/fr' : `/fr${p}`)),
]
