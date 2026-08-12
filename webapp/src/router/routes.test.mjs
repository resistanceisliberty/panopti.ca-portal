import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PRERENDER_PATHS } from './paths.mjs'

test('prerender list covers both locales', () => {
  assert.ok(PRERENDER_PATHS.includes('/about'))
  assert.ok(PRERENDER_PATHS.includes('/fr/about'))
  assert.ok(PRERENDER_PATHS.includes('/'))
  assert.ok(PRERENDER_PATHS.includes('/fr'))
  assert.ok(PRERENDER_PATHS.includes('/candidates/london-on'))
  assert.ok(PRERENDER_PATHS.includes('/fr/candidates/london-on'))
  assert.equal(PRERENDER_PATHS.length, 76)
})
