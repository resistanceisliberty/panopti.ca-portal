// One-time: fetch Natural Earth 110m countries, extract Canada, project with the
// SAME constants as src/data/candidates.ts#project, emit an SVG path string.
// Usage: node scripts/make-canada-svg.mjs > ../src/components/candidates/canada-path.txt (run from webapp/)
const URL_NE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
const LON_MIN = -141.1, LON_MAX = -52.0
const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))
const Y_TOP = merc(83.2), Y_BOT = merc(41.6)
const project = (lon, lat) => [
  (((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 1000).toFixed(1),
  (((Y_TOP - merc(lat)) / (Y_TOP - Y_BOT)) * 750).toFixed(1),
]
const geo = await (await fetch(URL_NE)).json()
const canada = geo.features.find((f) => f.properties.ADMIN === 'Canada')
const polys = canada.geometry.type === 'MultiPolygon' ? canada.geometry.coordinates : [canada.geometry.coordinates]
let d = ''
for (const poly of polys) {
  const ring = poly[0]
  if (ring.length < 12) continue // drop tiny islets — keeps the path small
  d += 'M' + ring.map(([lon, lat]) => project(lon, lat).join(',')).join('L') + 'Z'
}
console.log(d)
