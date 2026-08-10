// Imported as ?raw + JSON.parse (not a plain JSON import) to route around a
// Vite 7 / @intlify/unplugin-vue-i18n@4 incompatibility: that plugin monkey-patches
// Vite's built-in json transform expecting a function, but Vite 7's is now an
// object-form hook, so any plain `.json` import outside src/locales/** crashes
// the build with "orgTransform.apply is not a function". ?raw sidesteps it.
import rawText from './candidates.json?raw'
const raw = JSON.parse(rawText)

export interface Lz { en: string; fr: string }
export interface Evidence { type: 'citation' | 'questionnaire' | 'outreach'; date: string; title: Lz; url?: string | null; note?: Lz | null }
export interface Municipality { id: string; name: Lz; province: string; alprStatus: 'installed' | 'considering'; statusNote: Lz; coords: [number, number]; election: { date: string; body: Lz } | null; statusEvidence: Evidence[] }
export interface Role { type: 'incumbent' | 'candidate'; office: Lz; election?: string }
export interface Person { id: string; name: string; municipality: string; roles: Role[]; stance: 'opposes' | 'supports' | 'no_position'; summary: Lz; evidence: Evidence[]; links?: { website?: string; contact?: string } }

const data = raw as unknown as { lastUpdated: string; municipalities: Municipality[]; people: Person[] }

export const lastUpdated = data.lastUpdated
export const lz = (o: Lz, locale: string) => (locale.startsWith('fr') ? o.fr : o.en)
export const getMunicipalities = () => data.municipalities
export const getMunicipality = (id: string) => data.municipalities.find((m) => m.id === id)
export const peopleFor = (municipalityId: string) => data.people.filter((p) => p.municipality === municipalityId)
export function stanceTally(municipalityId: string) {
  const t = { opposes: 0, supports: 0, no_position: 0 }
  for (const p of peopleFor(municipalityId)) t[p.stance]++
  return t
}

// SVG projection — same constants as scripts/make-canada-svg.mjs. Plain mercator
// fitted to Canada's bounds in a 1000×750 viewBox.
export const MAP_VIEWBOX = '0 0 1000 750'
const LON_MIN = -141.1, LON_MAX = -52.0
const merc = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))
const Y_TOP = merc(83.2), Y_BOT = merc(41.6)
export function project(lon: number, lat: number): [number, number] {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 1000
  const y = ((Y_TOP - merc(lat)) / (Y_TOP - Y_BOT)) * 750
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10]
}
