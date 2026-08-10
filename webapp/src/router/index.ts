import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'
import Landing from '../views/Landing.vue'

export const SITE_ORIGIN = 'https://panopti.ca'

export const scrollBehavior: RouterScrollBehavior = (to) => {
  if (to.hash && !to.hash.startsWith('#map')) {
    return { el: to.hash, top: 64, behavior: 'smooth' }
  }
  return { top: 0 }
}

interface BaseRoute { path: string; name: string; component: RouteRecordRaw['component']; metaKey: string }

const base: BaseRoute[] = [
  { path: '/', name: 'home', component: Landing, metaKey: 'home' },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), metaKey: 'about' },
  { path: '/what-is-an-alpr', name: 'learn', component: () => import('../views/WhatIsAnALPRView.vue'), metaKey: 'learn' },
  { path: '/report/id', name: 'reportID', component: () => import('../views/ReportID.vue'), metaKey: 'report' },
  { path: '/council', name: 'council', component: () => import('../views/CouncilView.vue'), metaKey: 'council' },
  { path: '/candidates', name: 'candidates', component: () => import('../views/CandidatesView.vue'), metaKey: 'candidates' },
  { path: '/candidates/:municipality', name: 'candidates-municipality', component: () => import('../views/CandidateMunicipalityView.vue'), metaKey: 'candidatesMunicipality' },
  { path: '/candidates/:municipality/:person', name: 'candidates-person', component: () => import('../views/CandidatePersonView.vue'), metaKey: 'candidatesPerson' },
  { path: '/foi', name: 'foi', component: () => import('../views/FOIA.vue'), metaKey: 'foi' },
  { path: '/identify', name: 'identify', component: () => import('../views/Identify.vue'), metaKey: 'identify' },
  { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue'), metaKey: 'contact' },
  { path: '/privacy', name: 'privacy', component: () => import('../views/PrivacyPolicy.vue'), metaKey: 'privacy' },
  { path: '/terms', name: 'terms', component: () => import('../views/TermsOfService.vue'), metaKey: 'terms' },
  { path: '/qr', name: 'qr-landing', component: () => import('../views/Landing.vue'), metaKey: 'qr' },
]

function localeRecords(locale: 'en' | 'fr'): RouteRecordRaw[] {
  const prefix = locale === 'fr' ? '/fr' : ''
  return base.map((b) => ({
    path: b.path === '/' ? (prefix || '/') : `${prefix}${b.path}`,
    name: locale === 'fr' ? `${b.name}-fr` : b.name,
    component: b.component,
    meta: { metaKey: b.metaKey, locale },
  })) as RouteRecordRaw[]
}

export const routes: RouteRecordRaw[] = [
  ...localeRecords('en'),
  ...localeRecords('fr'),
  { path: '/report', redirect: '/report/id' },
  { path: '/foia', redirect: '/foi' },
  { path: '/fr/report', redirect: '/fr/report/id' },
  { path: '/fr/foia', redirect: '/fr/foi' },
  { path: '/fr/:pathMatch(.*)*', name: 'not-found-fr', component: () => import('../views/404.vue'), meta: { metaKey: 'notfound', locale: 'fr' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/404.vue'), meta: { metaKey: 'notfound', locale: 'en' } },
]
