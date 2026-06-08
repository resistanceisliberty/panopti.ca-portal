import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import { useHead } from '@unhead/vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash && !to.hash.startsWith('#map')) {
      return {
        el: to.hash,
        top: 64,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing,
      meta: {
        title: 'Find Nearby ALPRs in Canada | panopti.ca'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About | panopti.ca'
      }
    },
    {
      path: '/what-is-an-alpr',
      name: 'what-is-an-alpr',
      component: () => import('../views/WhatIsAnALPRView.vue'),
      meta: {
        title: 'Learn | panopti.ca'
      }
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
        title: 'Submit Cameras | panopti.ca'
      }
    },
    {
      path: '/council',
      name: 'council',
      component: () => import('../views/CouncilView.vue'),
      meta: {
        title: 'City Council | panopti.ca'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        title: 'Contact | panopti.ca'
      }
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/TermsOfService.vue'),
      meta: {
        title: 'Terms of Service | panopti.ca'
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyPolicy.vue'),
      meta: {
        title: 'Privacy Policy | panopti.ca'
      }
    },
    {
      path: '/qr',
      name: 'qr-landing',
      component: () => import('../views/Landing.vue'),
      meta: {
        title: 'You Found an ALPR | panopti.ca'
      }
    },
    {
      path: '/foia',
      name: 'foia',
      component: () => import('../views/FOIA.vue'),
      meta: {
        title: 'How to Request Public Records | panopti.ca'
      }
    },
    {
      path: '/identify',
      name: 'identify',
      component: () => import('../views/Identify.vue'),
      meta: {
        title: 'Identify ALPRs | panopti.ca'
      }
    },
    {
      path: '/press',
      name: 'press',
      component: () => import('../views/Press.vue'),
      meta: {
        title: 'Press | panopti.ca'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/404.vue'),
      meta: {
        title: 'Not Found | panopti.ca'
      }
    }
  ]
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    useHead({
      title: to.meta.title
    })
  }
  next()
})

export default router
