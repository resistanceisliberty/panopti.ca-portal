// Renders each questionnaire .txt into a polished, fillable PDF via headless
// Chromium. The .txt files are the single source of truth for content; this
// script only handles layout/branding. Usage (from webapp/): node scripts/make-questionnaire-pdf.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from '/home/auroras/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const unwrap = (s) => s.replace(/\s*\n\s*/g, ' ').trim() // collapse the .txt hard-wrapping

// Per-language chrome (everything else is parsed from the .txt).
const UI = {
  en: { tagline: 'Mapping ALPR surveillance across Canada', pages: (n, t) => `Page ${n} of ${t}` },
  fr: { tagline: 'Cartographie de la surveillance ALPR au Canada', pages: (n, t) => `Page ${n} sur ${t}` },
}

// Dark-ink wordmark (for a white page); shared by both languages.
const wordmark = readFileSync(new URL('../public/panoptica-light.svg', import.meta.url), 'utf8')

const CSS = `
  :root{--ink:#14181F;--blue:#1297C3;--muted:#5b6470;--rule:#d7dde3;--box:#f4f6f8}
  *{box-sizing:border-box}
  body{font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:var(--ink);font-size:11pt;line-height:1.5;margin:0}
  .header{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;border-bottom:3px solid var(--blue);padding-bottom:10px;margin-bottom:18px}
  .wordmark svg{height:34px;width:auto;display:block}
  .tagline{font-size:8pt;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;text-align:right;padding-bottom:2px}
  h1{font-size:16pt;line-height:1.2;margin:0 0 3px}
  .subtitle{color:var(--muted);font-size:10.5pt;margin:0 0 16px}
  .intro{background:var(--box);border-left:3px solid var(--blue);padding:12px 14px;border-radius:2px;font-size:9.5pt;line-height:1.5;margin-bottom:20px}
  .intro a{color:var(--blue);font-weight:600;text-decoration:none}
  .fields{display:flex;flex-wrap:wrap;gap:14px 26px;margin-bottom:24px}
  .field{flex:1 1 40%;min-width:220px}
  .flabel{display:block;font-size:8pt;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);margin-bottom:3px}
  .fline{display:block;border-bottom:1px solid var(--ink);height:16px}
  .q{break-inside:avoid;margin-bottom:15px}
  .qhead{display:flex;gap:10px;align-items:flex-start;margin-bottom:8px}
  .qnum{flex:0 0 auto;width:22px;height:22px;background:var(--blue);color:#fff;border-radius:50%;font-size:10pt;font-weight:700;display:flex;align-items:center;justify-content:center}
  .qtext{font-weight:600;font-size:10.5pt;line-height:1.4;padding-top:1px}
  .answer{padding-left:32px}
  .aline{border-bottom:1px solid var(--rule);height:22px}
`

function buildHtml(txt, ui) {
  const blocks = txt.trim().split(/\n\s*\n/)
  const rawTitle = unwrap(blocks[0]).replace(/^panopti\.ca\s*[—-]\s*/, '')
  const [h1, subtitle] = rawTitle.split(/\s*:\s+/, 2)
  const intro = unwrap(blocks[1]).replace(
    /contact@panopti\.ca/,
    '<a href="mailto:contact@panopti.ca">contact@panopti.ca</a>',
  )
  const fields = unwrap(blocks[2]).split(/\s+(?=[A-ZÀ-Ý][^:]*:)/) // split the "Label:" lines back apart
  const questions = blocks.slice(3).map(unwrap)

  const fieldHtml = fields
    .map((f) => `<div class="field"><span class="flabel">${esc(f.replace(/\s*:\s*$/, ''))}</span><span class="fline"></span></div>`)
    .join('')
  const qHtml = questions
    .map((q) => {
      const m = q.match(/^(\d+)\.\s*(.*)$/)
      const num = m ? m[1] : ''
      const text = esc(m ? m[2] : q)
      const lines = '<div class="aline"></div>'.repeat(3)
      return `<section class="q"><div class="qhead"><span class="qnum">${num}</span><span class="qtext">${text}</span></div><div class="answer">${lines}</div></section>`
    })
    .join('')

  return `<!doctype html><meta charset="utf-8"><style>${CSS}</style>
    <div class="header"><div class="wordmark">${wordmark}</div><div class="tagline">${ui.tagline}</div></div>
    <h1>${esc(h1)}</h1>${subtitle ? `<p class="subtitle">${esc(subtitle)}</p>` : ''}
    <div class="intro">${intro}</div>
    <div class="fields">${fieldHtml}</div>
    ${qHtml}`
}

const browser = await chromium.launch({ executablePath: '/home/auroras/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome' })
for (const lang of ['en', 'fr']) {
  const txt = readFileSync(new URL(`../public/questionnaire/panopti-alpr-questionnaire-${lang}.txt`, import.meta.url), 'utf8')
  const page = await browser.newPage()
  await page.setContent(buildHtml(txt, UI[lang]), { waitUntil: 'networkidle' })
  const footer = `<div style="font-size:8px;width:100%;padding:0 1.6cm;color:#6b7280;display:flex;justify-content:space-between;">
    <span>panopti.ca/candidates · contact@panopti.ca</span>
    <span>${UI[lang].pages('<span class="pageNumber"></span>', '<span class="totalPages"></span>')}</span></div>`
  const pdf = await page.pdf({
    format: 'Letter',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: footer,
    margin: { top: '1.4cm', bottom: '1.7cm', left: '1.6cm', right: '1.6cm' },
  })
  writeFileSync(new URL(`../public/questionnaire/panopti-alpr-questionnaire-${lang}.pdf`, import.meta.url), pdf)
  await page.close()
}
await browser.close()
console.log('PDFs written')
