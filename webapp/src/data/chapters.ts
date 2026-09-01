import type { Lz } from './candidates'

// Local organizing chapters. `municipality` links a chapter to its
// /candidates/<id> page so that page can surface the chapter prominently.
export interface Chapter {
  id: string
  name: Lz
  municipality: string
  url: string
  kind?: 'site' | 'chat' // how `url` links out; defaults to 'site'. 'chat' hosts (signal.group…) route through the chat-warning dialog.
  blurb?: Lz
}

export const chapters: Chapter[] = [
  {
    id: 'ottawa',
    name: { en: 'Panopti.ca Ottawa', fr: 'Panopti.ca Ottawa' },
    municipality: 'ottawa-on',
    url: 'https://sarcio.tech/',
    blurb: {
      en: 'A local chapter organizing against ALPR surveillance in Ottawa. Visit their site to connect and get involved.',
      fr: "Une section locale qui s'organise contre la surveillance par ALPR à Ottawa. Visitez leur site pour vous impliquer.",
    },
  },
  {
    id: 'hamilton',
    name: { en: 'Panopti.ca Hamilton', fr: 'Panopti.ca Hamilton' },
    municipality: 'hamilton-on',
    url: 'https://signal.group/#CjQKIAvioBPinJBX9fGKuR11gH2dTmeg3PTyeww1iEOIBubfEhDliS6ileuZRYTbFct-NdxM',
    kind: 'chat',
    blurb: {
      en: 'A recently started local chapter organizing against ALPR surveillance in Hamilton. Join the Signal group chat to connect and get involved.',
      fr: "Une section locale récemment lancée qui s'organise contre la surveillance par ALPR à Hamilton. Rejoignez le groupe Signal pour vous impliquer.",
    },
  },
]

export const chapterFor = (municipality: string): Chapter | undefined =>
  chapters.find((c) => c.municipality === municipality)
