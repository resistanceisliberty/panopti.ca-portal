import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const data = JSON.parse(readFileSync(fileURLToPath(new URL('./candidates.json', import.meta.url))))
const SLUG = /^[a-z0-9-]+$/
const DATE = /^\d{4}-\d{2}-\d{2}$/
const STANCES = ['opposes', 'supports', 'no_position']
const EVIDENCE_TYPES = ['citation', 'questionnaire', 'outreach']
const ALPR_STATUSES = ['installed', 'considering', 'mobile_only', 'none']

function assertLz(obj, path) {
  assert.equal(typeof obj?.en, 'string', `${path}.en missing`)
  assert.equal(typeof obj?.fr, 'string', `${path}.fr missing`)
  assert.ok(obj.en.trim() && obj.fr.trim(), `${path} has an empty locale value`)
}
function assertEvidence(ev, path) {
  assert.ok(EVIDENCE_TYPES.includes(ev.type), `${path}.type invalid: ${ev.type}`)
  assert.match(ev.date, DATE, `${path}.date not YYYY-MM-DD`)
  assertLz(ev.title, `${path}.title`)
  if (ev.type === 'citation') assert.match(String(ev.url), /^https?:\/\//, `${path}: citation requires url`)
  if (ev.type === 'outreach') assertLz(ev.note, `${path}.note (outreach requires note)`)
}

test('lastUpdated is a date', () => assert.match(data.lastUpdated, DATE))

test('municipalities are valid and unique', () => {
  const ids = new Set()
  for (const m of data.municipalities) {
    assert.match(m.id, SLUG, `bad slug ${m.id}`)
    assert.ok(!ids.has(m.id), `duplicate municipality ${m.id}`); ids.add(m.id)
    assertLz(m.name, `${m.id}.name`)
    assert.equal(typeof m.province, 'string')
    assert.ok(ALPR_STATUSES.includes(m.alprStatus), `${m.id}.alprStatus`)
    assertLz(m.statusNote, `${m.id}.statusNote`)
    assert.ok(Array.isArray(m.coords) && m.coords.length === 2, `${m.id}.coords`)
    const [lon, lat] = m.coords
    assert.ok(lon > -142 && lon < -50 && lat > 41 && lat < 84, `${m.id}.coords outside Canada`)
    if (m.election !== null) {
      assert.match(m.election.date, DATE, `${m.id}.election.date`)
      assertLz(m.election.body, `${m.id}.election.body`)
    }
    m.statusEvidence.forEach((ev, i) => assertEvidence(ev, `${m.id}.statusEvidence[${i}]`))
  }
})

test('people are valid, unique per municipality, stances evidenced', () => {
  const muniIds = new Set(data.municipalities.map((m) => m.id))
  const seen = new Set()
  for (const p of data.people) {
    assert.match(p.id, SLUG, `bad slug ${p.id}`)
    assert.ok(muniIds.has(p.municipality), `${p.id}: unknown municipality ${p.municipality}`)
    const key = `${p.municipality}/${p.id}`
    assert.ok(!seen.has(key), `duplicate person ${key}`); seen.add(key)
    assert.ok(p.name.trim())
    assert.ok(STANCES.includes(p.stance), `${key}.stance`)
    assertLz(p.summary, `${key}.summary`)
    assert.ok(Array.isArray(p.roles) && p.roles.length >= 1, `${key}: needs ≥1 role`)
    for (const r of p.roles) {
      assert.ok(['incumbent', 'candidate'].includes(r.type), `${key} role type`)
      assertLz(r.office, `${key} role office`)
      if (r.type === 'candidate') {
        const muni = data.municipalities.find((m) => m.id === p.municipality)
        assert.equal(r.election, muni.election?.date, `${key}: candidate election must match municipality election date`)
      }
    }
    if (p.stance !== 'no_position')
      assert.ok(p.evidence.length >= 1, `${key}: stance "${p.stance}" requires evidence`)
    p.evidence.forEach((ev, i) => assertEvidence(ev, `${key}.evidence[${i}]`))
  }
})
