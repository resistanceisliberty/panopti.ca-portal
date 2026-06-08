import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'
import Landing from '../views/Landing.vue'

export const SITE_ORIGIN = 'https://panopti.ca'
export const DEFAULT_DESCRIPTION =
  'See where automatic licence plate readers (ALPRs) and Flock-style surveillance cameras are deployed across Canada. An open-source, crowdsourced map built on OpenStreetMap.'

export const scrollBehavior: RouterScrollBehavior = (to) => {
  if (to.hash && !to.hash.startsWith('#map')) {
    return { el: to.hash, top: 64, behavior: 'smooth' }
  }
  return { top: 0 }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Landing,
    meta: {
      title: 'panopti.ca — Map ALPR & Licence Plate Reader Cameras in Canada',
      description: DEFAULT_DESCRIPTION,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'About panopti.ca — Mapping ALPR Surveillance in Canada',
      description: 'panopti.ca is an open-source project mapping automatic licence plate readers (ALPRs) across Canada, built on OpenStreetMap and the work of DeFlock.',
    },
  },
  {
    path: '/what-is-an-alpr',
    name: 'what-is-an-alpr',
    component: () => import('../views/WhatIsAnALPRView.vue'),
    meta: {
      title: 'What Are ALPRs? Licence Plate Reader Surveillance in Canada | panopti.ca',
      description: 'Learn what automatic licence plate readers (ALPRs) are, how Flock and Genetec cameras track your movements, and why they threaten privacy in Canada.',
    },
  },
  {
    path: '/report',
    name: 'report',
    redirect: '/report/id',
  },
  {
    path: '/report/id',
    name: 'reportID',
    component: () => import('../views/ReportID.vue'),
    meta: {
      title: 'How to Add an ALPR Camera to the Map (OpenStreetMap) | panopti.ca',
      description: 'Spotted a licence plate reader? Step-by-step instructions for adding ALPR cameras to OpenStreetMap so they appear on the panopti.ca Canada map.',
    },
  },
  {
    path: '/council',
    name: 'council',
    component: () => import('../views/CouncilView.vue'),
    meta: {
      title: 'ALPRs, City Council & Police Boards in Canada | panopti.ca',
      description: 'How ALPR surveillance gets approved in Canadian municipalities and police services boards — and how residents can question or stop it.',
    },
  },
  {
    path: '/foia',
    name: 'foia',
    component: () => import('../views/FOIA.vue'),
    meta: {
      title: 'Request ALPR Records: Freedom of Information in Canada | panopti.ca',
      description: 'How to file freedom-of-information (ATIP / provincial FOI) requests for ALPR contracts, data-sharing policies, and records from Canadian police.',
    },
  },
  {
    path: '/identify',
    name: 'identify',
    component: () => import('../views/Identify.vue'),
    meta: {
      title: 'Identify ALPR Cameras: Flock, Genetec & Motorola | panopti.ca',
      description: 'A visual guide to identifying automatic licence plate readers and other surveillance devices from vendors like Flock Safety, Genetec, and Motorola.',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'Contact panopti.ca',
      description: 'Get in touch with panopti.ca — questions, corrections, or media enquiries about ALPR surveillance mapping in Canada.',
    },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyPolicy.vue'),
    meta: {
      title: 'Privacy Policy | panopti.ca',
      description: "panopti.ca's privacy policy. We don't collect personal information, use cookies, or track visitors.",
    },
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/TermsOfService.vue'),
    meta: {
      title: 'Terms of Service | panopti.ca',
      description: 'Terms of service for panopti.ca, the open-source Canadian ALPR surveillance map.',
    },
  },
  {
    path: '/qr',
    name: 'qr-landing',
    component: () => import('../views/Landing.vue'),
    meta: {
      title: 'You Found an ALPR — panopti.ca',
      description: 'You found an automatic licence plate reader. Learn what it is and add it to the panopti.ca map of ALPR surveillance in Canada.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/404.vue'),
    meta: {
      title: 'Page Not Found | panopti.ca',
      description: 'The page you are looking for could not be found.',
    },
  },
]
