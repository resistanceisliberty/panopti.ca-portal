// Renders each questionnaire .txt into a print-styled PDF via headless Chromium.
// Usage (from webapp/): node scripts/make-questionnaire-pdf.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from '/home/auroras/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs'

const browser = await chromium.launch({ executablePath: '/home/auroras/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome' })
for (const langCode of ['en', 'fr']) {
  const txt = readFileSync(new URL(`../public/questionnaire/panopti-alpr-questionnaire-${langCode}.txt`, import.meta.url), 'utf8')
  const [title, ...rest] = txt.split('\n')
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{font-family:Georgia,serif;max-width:44em;margin:2em auto;line-height:1.55;color:#111}
    h1{font-size:1.25em;border-bottom:2px solid #1297C3;padding-bottom:.4em}
    pre{white-space:pre-wrap;font:inherit}</style>
    <h1>${title}</h1><pre>${rest.join('\n').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre>`
  const page = await browser.newPage()
  await page.setContent(html)
  const pdf = await page.pdf({ format: 'Letter', margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' } })
  writeFileSync(new URL(`../public/questionnaire/panopti-alpr-questionnaire-${langCode}.pdf`, import.meta.url), pdf)
  await page.close()
}
await browser.close()
console.log('PDFs written')
