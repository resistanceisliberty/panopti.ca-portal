import type { Lz } from './candidates'

// Local organizing chapters and affiliated groups. `municipality` links an entry to its
// /candidates/<id> page so that page can surface it prominently.
export interface Chapter {
  id: string
  name: Lz
  municipality: string
  url: string
  kind?: 'site' | 'chat' // how `url` links out; defaults to 'site'. 'chat' hosts (signal.group…) route through the chat-warning dialog.
  type?: 'chapter' | 'affiliate' // defaults to 'chapter'. 'affiliate' = an independent group, not a panopti.ca chapter.
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
  {
    id: 'toronto-rss',
    name: { en: 'Toronto Resisting Surveillance Systems', fr: 'Toronto Resisting Surveillance Systems' },
    municipality: 'toronto-on',
    url: 'https://www.torontorss.org/',
    type: 'affiliate',
    blurb: {
      en: 'An independent Toronto community group opposing police surveillance — automated licence plate readers, facial recognition and camera-mounted drones. Visit their site to connect and get involved.',
      fr: "Un groupe communautaire indépendant de Toronto qui s'oppose à la surveillance policière — lecteurs automatiques de plaques d'immatriculation, reconnaissance faciale et drones équipés de caméras. Visitez leur site pour vous impliquer.",
    },
  },
]

export const localChapters = chapters.filter((c) => c.type !== 'affiliate')
export const affiliates = chapters.filter((c) => c.type === 'affiliate')

export const chapterFor = (municipality: string): Chapter | undefined =>
  chapters.find((c) => c.municipality === municipality)
