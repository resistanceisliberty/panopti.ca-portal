import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const en = JSON.parse(readFileSync(fileURLToPath(new URL('./en.json', import.meta.url))))
const fr = JSON.parse(readFileSync(fileURLToPath(new URL('./fr.json', import.meta.url))))

function keys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`])
}
function placeholders(s) {
  return (String(s).match(/\{[a-zA-Z0-9_]+\}/g) || []).sort()
}
function flat(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj))
    v && typeof v === 'object' ? flat(v, `${prefix}${k}.`, out) : (out[`${prefix}${k}`] = v)
  return out
}

test('en and fr have identical key sets', () => {
  assert.deepEqual(keys(en).sort(), keys(fr).sort())
})

test('en and fr strings share the same interpolation placeholders', () => {
  const fe = flat(en), ff = flat(fr)
  for (const k of Object.keys(fe))
    assert.deepEqual(placeholders(fe[k]), placeholders(ff[k]), `placeholder mismatch: ${k}`)
})
