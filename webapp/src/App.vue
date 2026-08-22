<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import { computed, ref, watch, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify';
import DiscordWarningDialog from '@/components/DiscordWarningDialog.vue';
import { useDiscordIntercept } from '@/composables/useDiscordIntercept';
import { useLocalePath } from '@/composables/useLocalePath';
import { SITE_ORIGIN } from '@/router';

const theme = useTheme();
const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();
const { localePath, switchLocalePath } = useLocalePath();
const isDark = computed(() => theme.name.value === 'dark');
const isInIframe = computed(() => typeof window !== 'undefined' && window.self !== window.top);
const { showDialog, discordUrl, interceptDiscordLinks } = useDiscordIntercept();

// Per-page SEO head — reactive to the current route's meta (metaKey/locale set in router)
// and to the active i18n locale, so title/description/hreflang track both.
const metaKey = computed(() => (route.meta.metaKey as string) || 'home');
const title = computed(() => t(`meta.${metaKey.value}.title`));
const description = computed(() => t(`meta.${metaKey.value}.description`));
// The current path with any /fr prefix stripped — the English/base path.
const basePath = computed(() => {
  const p = route.path;
  if (p === '/fr' || p === '/fr/') return '/';
  return p.startsWith('/fr/') ? p.slice(3) : p;
});
const enUrl = computed(() => SITE_ORIGIN + basePath.value);
const frUrl = computed(() => SITE_ORIGIN + (basePath.value === '/' ? '/fr' : `/fr${basePath.value}`));

useHead({
  htmlAttrs: { lang: () => (locale.value === 'fr' ? 'fr-CA' : 'en-CA') },
  title: () => title.value,
  meta: [
    { name: 'description', content: () => description.value },
    { property: 'og:title', content: () => title.value },
    { property: 'og:description', content: () => description.value },
    { property: 'og:url', content: () => SITE_ORIGIN + route.path },
    { property: 'og:locale', content: () => (locale.value === 'fr' ? 'fr_CA' : 'en_CA') },
  ],
  link: [
    { rel: 'canonical', href: () => SITE_ORIGIN + route.path },
    { rel: 'alternate', hreflang: 'en', href: () => enUrl.value },
    { rel: 'alternate', hreflang: 'fr', href: () => frUrl.value },
    { rel: 'alternate', hreflang: 'x-default', href: () => enUrl.value },
  ],
});

function toggleTheme() {
  const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark';
  theme.change(newTheme);
  localStorage.setItem('theme', newTheme);
}

function handleDiscordProceed(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.change(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme.change(prefersDark ? 'dark' : 'light');
    localStorage.setItem('theme', theme.global.name.value);
  }
  interceptDiscordLinks();
});

interface NavItem {
  titleKey: string
  icon: string
  to?: string
  href?: string
  target?: string
  customIcon?: string
  customIconDark?: string
  customIconGrey?: string
}

const items: NavItem[] = [
  { titleKey: 'nav.home', icon: 'mdi-home', to: '/' },
  { titleKey: 'nav.map', icon: 'mdi-map', href: 'https://maps.panopti.ca' },
  { titleKey: 'nav.learn', icon: 'mdi-school', to: '/what-is-an-alpr' },
]

const contributeItems: NavItem[] = [
  { titleKey: 'nav.submit', icon: 'mdi-map-marker-plus', to: '/report' },
  { titleKey: 'nav.records', icon: 'mdi-file-document', to: '/foi' },
  { titleKey: 'nav.council', icon: 'mdi-account-voice', to: '/council' },
]

const metaItems: NavItem[] = [
  { titleKey: 'nav.contact', icon: 'mdi-email-outline', to: '/contact' },
  { titleKey: 'chapters.title', icon: 'mdi-map-marker-multiple', to: '/chapters' },
];
const drawer = ref(false)

// mdi has no current X-logo glyph (only the outdated mdi-twitter bird); reuse
// the same inline SVG path as the footer's X link (Footer.vue) — duplicated
// per-component, matching this codebase's existing convention for small
// shared constants (see project()/MAP_VIEWBOX in candidates.ts).
const X_ICON_PATH = 'M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z';
const X_URL = 'https://x.com/panopticanada';
// Official Signal logo (simple-icons), currentColor fill — same inline-SVG
// convention as X above. SIGNAL_URL is the public group invite link.
const SIGNAL_ICON_PATH = 'M12 0q-.934 0-1.83.139l.17 1.111a11 11 0 0 1 3.32 0l.172-1.111A12 12 0 0 0 12 0M9.152.34A12 12 0 0 0 5.77 1.742l.584.961a10.8 10.8 0 0 1 3.066-1.27zm5.696 0-.268 1.094a10.8 10.8 0 0 1 3.066 1.27l.584-.962A12 12 0 0 0 14.848.34M12 2.25a9.75 9.75 0 0 0-8.539 14.459c.074.134.1.292.064.441l-1.013 4.338 4.338-1.013a.62.62 0 0 1 .441.064A9.7 9.7 0 0 0 12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m-7.092.068a12 12 0 0 0-2.59 2.59l.909.664a11 11 0 0 1 2.345-2.345zm14.184 0-.664.909a11 11 0 0 1 2.345 2.345l.909-.664a12 12 0 0 0-2.59-2.59M1.742 5.77A12 12 0 0 0 .34 9.152l1.094.268a10.8 10.8 0 0 1 1.269-3.066zm20.516 0-.961.584a10.8 10.8 0 0 1 1.27 3.066l1.093-.268a12 12 0 0 0-1.402-3.383M.138 10.168A12 12 0 0 0 0 12q0 .934.139 1.83l1.111-.17A11 11 0 0 1 1.125 12q0-.848.125-1.66zm23.723.002-1.111.17q.125.812.125 1.66c0 .848-.042 1.12-.125 1.66l1.111.172a12.1 12.1 0 0 0 0-3.662M1.434 14.58l-1.094.268a12 12 0 0 0 .96 2.591l-.265 1.14 1.096.255.36-1.539-.188-.365a10.8 10.8 0 0 1-.87-2.35m21.133 0a10.8 10.8 0 0 1-1.27 3.067l.962.584a12 12 0 0 0 1.402-3.383zm-1.793 3.848a11 11 0 0 1-2.345 2.345l.664.909a12 12 0 0 0 2.59-2.59zm-19.959 1.1L.357 21.48a1.8 1.8 0 0 0 2.162 2.161l1.954-.455-.256-1.095-1.953.455a.675.675 0 0 1-.81-.81l.454-1.954zm16.832 1.769a10.8 10.8 0 0 1-3.066 1.27l.268 1.093a12 12 0 0 0 3.382-1.402zm-10.94.213-1.54.36.256 1.095 1.139-.266c.814.415 1.683.74 2.591.961l.268-1.094a10.8 10.8 0 0 1-2.35-.869zm3.634 1.24-.172 1.111a12.1 12.1 0 0 0 3.662 0l-.17-1.111q-.812.125-1.66.125a11 11 0 0 1-1.66-.125';
const SIGNAL_URL = 'https://signal.group/#CjQKINKEjCutoejwUZB6Te4WuyFI1pfC8TxSjN1l7-lJ2clnEhDpDs8kXV0KHF4syMhl3R19';
// Bluesky butterfly (simple-icons), currentColor fill — same inline-SVG convention as above.
const BLUESKY_ICON_PATH = 'M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.479 0-.688-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z';
const BLUESKY_URL = 'https://bsky.app/profile/panopti.bsky.social';
// Discord logo (simple-icons), currentColor fill — same inline-SVG convention as above.
const DISCORD_ICON_PATH = 'M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z';
const DISCORD_URL = 'https://discord.gg/MR6uEmSe77';
// Matrix logo (simple-icons), currentColor fill. URL is the community Space invite.
const MATRIX_ICON_PATH = 'M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033c.309-.443.683-.784 1.117-1.024.433-.245.936-.365 1.5-.365.54 0 1.033.107 1.481.314.448.208.785.582 1.02 1.108.254-.374.6-.706 1.034-.992.434-.287.95-.43 1.546-.43.453 0 .872.056 1.26.167.388.11.716.286.993.53.276.245.489.559.646.951.152.392.23.863.23 1.417v5.728h-2.349V11.52c0-.286-.01-.559-.032-.812a1.755 1.755 0 0 0-.18-.66 1.106 1.106 0 0 0-.438-.448c-.194-.11-.457-.166-.785-.166-.332 0-.6.064-.803.189a1.38 1.38 0 0 0-.48.499 1.946 1.946 0 0 0-.231.696 5.56 5.56 0 0 0-.06.785v4.768h-2.35v-4.8c0-.254-.004-.503-.018-.752a2.074 2.074 0 0 0-.143-.688 1.052 1.052 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19-.111 0-.259.024-.439.074-.18.051-.36.143-.53.282-.171.138-.319.337-.439.595-.12.259-.18.6-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z';
const MATRIX_URL = 'https://matrix.to/#/#community:panopti.ca';
// Community (chat) nest: Matrix + Discord + Signal. Socials nest: X + Bluesky.
// communityItems (all, flat) drives the mobile drawer's Community section.
const chatItems = [
  { titleKey: 'footer.matrix_label', href: MATRIX_URL, svgPath: MATRIX_ICON_PATH },
  { titleKey: 'footer.discord_label', href: DISCORD_URL, svgPath: DISCORD_ICON_PATH },
  { titleKey: 'footer.signal_label', href: SIGNAL_URL, svgPath: SIGNAL_ICON_PATH },
];
const socialItems = [
  { titleKey: 'footer.x_label', href: X_URL, svgPath: X_ICON_PATH },
  { titleKey: 'footer.bluesky_label', href: BLUESKY_URL, svgPath: BLUESKY_ICON_PATH },
];
const communityItems = [...chatItems, ...socialItems];

// ponytail: localStorage 'lang' is stored for forward-compat/parity with the map app;
// the portal's source of truth is the URL, so it is not read back for redirects.
function persistLangPreference() {
  localStorage.setItem('lang', switchLocalePath().startsWith('/fr') ? 'fr' : 'en');
}

watch(() => theme.global.name.value, (newTheme) => {
  const root = document.documentElement;
  if (newTheme === 'dark') {
    root.style.setProperty('--df-background-color', 'rgb(33, 33, 33)');
    root.style.setProperty('--df-text-color', '#ccc');
  } else {
    root.style.setProperty('--df-background-color', 'white');
    root.style.setProperty('--df-text-color', 'black');
  }
});
</script>

<template>
  <v-app>
    <template v-if="!isInIframe">
      <v-system-bar class="credit-bar px-3 text-center" color="grey-darken-4">
        <span class="credit-text">
          {{ t('credit.built_on') }}
          <a href="https://github.com/FoggedLens/deflock" target="_blank" rel="noopener noreferrer">{{ t('credit.deflock') }}</a>{{ t('credit.tail') }}
          <a href="https://deflock.org/" target="_blank" rel="noopener noreferrer">deflock.org</a>.
        </span>
      </v-system-bar>
      <v-app-bar
        flat
        prominent
      >
        <!-- Mobile hamburger menu -->
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
          class="d-md-none"
          :aria-label="t('a11y.toggle_drawer')"
        ></v-app-bar-nav-icon>

        <!-- Logo -->
        <v-toolbar-title style="flex: unset;">
          <div style="display: flex; align-items: center; cursor: pointer;" @click="router.push(localePath('/'))">
            <v-img height="34" width="148" alt="panopti.ca" :src="isDark ? '/panoptica-dark.svg' : '/panoptica-light.svg'" />
          </div>
        </v-toolbar-title>

        <!-- Desktop horizontal navigation -->
        <div class="d-none d-md-flex ml-8 flex-grow-1">
          <!-- Main navigation items -->
          <div class="d-flex align-center">
            <v-btn
              v-for="item in items.slice(1)"
              :key="item.titleKey"
              :to="item.to && localePath(item.to)"
              :href="item.href"
              :target="item.target"
              variant="text"
              class="mx-1"
              :prepend-icon="item.icon"
            >
              {{ t(item.titleKey) }}
            </v-btn>
            <v-btn :to="localePath('/candidates')" color="primary" variant="flat" class="mx-2" prepend-icon="mdi-vote" rounded>
              {{ t('nav.candidates') }}
            </v-btn>
          </div>

          <v-spacer></v-spacer>

          <!-- Contribute section -->
          <div class="d-flex align-center">
            <!-- Community nest: Discord + Signal -->
            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="text"
                  v-bind="props"
                  prepend-icon="mdi-chat"
                  append-icon="mdi-chevron-down"
                  class="mx-1"
                >
                  {{ t('nav.community') }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="item in chatItems"
                  :key="item.titleKey"
                  :href="item.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  link
                >
                  <template v-slot:prepend>
                    <svg class="appbar-x-icon mr-2" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path :d="item.svgPath" fill="currentColor" />
                    </svg>
                  </template>
                  <v-list-item-title>{{ t(item.titleKey) }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- Socials nest: X + Bluesky -->
            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="text"
                  v-bind="props"
                  prepend-icon="mdi-share-variant"
                  append-icon="mdi-chevron-down"
                  class="mx-1"
                >
                  {{ t('nav.socials') }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="item in socialItems"
                  :key="item.titleKey"
                  :href="item.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  link
                >
                  <template v-slot:prepend>
                    <svg class="appbar-x-icon mr-2" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path :d="item.svgPath" fill="currentColor" />
                    </svg>
                  </template>
                  <v-list-item-title>{{ t(item.titleKey) }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="text"
                  v-bind="props"
                  append-icon="mdi-chevron-down"
                  class="mx-1"
                >
                  {{ t('nav.contribute') }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="item in contributeItems"
                  :key="item.titleKey"
                  :to="item.to && localePath(item.to)"
                  link
                >
                  <template v-slot:prepend>
                    <v-icon>{{ item.icon }}</v-icon>
                  </template>
                  <v-list-item-title>{{ t(item.titleKey) }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- Get Involved section -->
            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="text"
                  v-bind="props"
                  prepend-icon="mdi-account-group"
                  append-icon="mdi-chevron-down"
                  class="mx-1"
                >
                  {{ t('nav.involved') }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="item in metaItems"
                  :key="item.titleKey"
                  :to="item.to && localePath(item.to)"
                  :href="item.href"
                  :target="item.href ? '_blank' : undefined"
                  link
                >
                  <template v-slot:prepend>
                    <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                    <v-img
                      v-else-if="item.customIcon"
                      class="mr-8"
                      contain
                      width="24"
                      height="24"
                      :src="isDark ? item.customIconDark : item.customIconGrey"
                    />
                  </template>
                  <v-list-item-title>{{ t(item.titleKey) }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>

        <v-spacer class="d-md-none" />

        <v-btn icon href="https://github.com/resistanceisliberty/panopti.ca" target="_blank" rel="noopener noreferrer"
               :aria-label="t('nav.github')" :title="t('nav.github')">
          <v-icon>mdi-github</v-icon>
        </v-btn>

        <v-btn variant="text" class="lang-toggle" :to="switchLocalePath()"
               :aria-label="locale === 'en' ? t('lang.switch_to_fr') : t('lang.switch_to_en')"
               @click="persistLangPreference">
          {{ locale === 'en' ? t('lang.fr') : t('lang.en') }}
        </v-btn>

        <v-btn icon @click="toggleTheme" :aria-label="t('a11y.toggle_theme')">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Mobile navigation drawer -->
      <v-navigation-drawer
        v-model="drawer"
        temporary
        class="d-md-none"
        :aria-label="t('a11y.drawer')"
      >
        <div class="px-4 py-2">
          <v-btn variant="text" class="lang-toggle" :to="switchLocalePath()"
                 :aria-label="locale === 'en' ? t('lang.switch_to_fr') : t('lang.switch_to_en')"
                 @click="persistLangPreference">
            {{ locale === 'en' ? t('lang.fr') : t('lang.en') }}
          </v-btn>
        </div>

        <div class="px-4 pb-2">
          <v-btn :to="localePath('/candidates')" color="primary" variant="flat" block prepend-icon="mdi-vote">{{ t('nav.candidates') }}</v-btn>
        </div>

        <v-list-subheader class="px-4">{{ t('nav.community') }}</v-list-subheader>
        <v-list nav :aria-label="t('nav.community')">
          <v-list-item
            v-for="item in communityItems"
            :key="item.titleKey"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            link
            :aria-label="t(item.titleKey)"
            role="option"
          >
            <template v-slot:prepend>
              <svg class="appbar-x-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path :d="item.svgPath" fill="currentColor" />
              </svg>
            </template>
            <v-list-item-title>{{ t(item.titleKey) }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider class="my-2" aria-hidden="true" role="presentation" />

        <v-list nav :aria-label="t('a11y.main_nav')">
          <v-list-item
            v-for="item in items"
            :key="item.titleKey"
            link
            :to="item.to && localePath(item.to)"
            :href="item.href"
            :target="item.target"
            role="option"
          >
            <v-icon start>{{ item.icon }}</v-icon>
            {{ t(item.titleKey) }}
          </v-list-item>
        </v-list>

        <v-divider class="my-2" aria-hidden="true" role="presentation" />

        <v-list-subheader class="px-4">{{ t('nav.contribute') }}</v-list-subheader>
        <v-list nav :aria-label="t('a11y.contribute_links')">
          <v-list-item
            v-for="item in contributeItems"
            :key="item.titleKey"
            link
            :to="item.to && localePath(item.to)"
            role="option"
          >
            <v-icon v-if="item.icon" start>{{ item.icon }}</v-icon>
            <span style="vertical-align: middle;">{{ t(item.titleKey) }}</span>
          </v-list-item>
        </v-list>

        <v-divider class="my-2" aria-hidden="true" role="presentation" />

        <v-list-subheader class="px-4">{{ t('nav.involved') }}</v-list-subheader>
        <v-list nav :aria-label="t('a11y.meta_links')">
          <v-list-item
            v-for="item in metaItems"
            :key="item.titleKey"
            link
            :to="item.to && localePath(item.to)"
            :href="item.href"
            :target="item.href ? '_blank' : undefined"
            role="option"
          >
            <v-icon v-if="item.icon" start>{{ item.icon }}</v-icon>
            <v-img
              v-else-if="item.customIcon"
              class="mr-2 custom-icon"
              contain
              width="24"
              height="24"
              :src="isDark ? item.customIconDark : item.customIcon"
              style="vertical-align: middle;"
            />
            <span style="vertical-align: middle;">{{ t(item.titleKey) }}</span>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </template>

    <v-main>
      <RouterView />
    </v-main>

    <DiscordWarningDialog
      v-model="showDialog"
      :discordUrl="discordUrl"
      @proceed="handleDiscordProceed"
    />
  </v-app>
</template>

<style lang="css" scoped>
.custom-icon {
  display: inline-block;
  margin-right: 5px;
}

.appbar-x-icon {
  flex-shrink: 0;
}

.credit-bar {
  height: auto !important;
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.credit-text {
  white-space: normal;
  line-height: 1.35;
  font-size: 0.78rem;
  padding: 5px 0;
  color: rgba(255, 255, 255, 0.82);
}
.credit-text a {
  color: #5bb8e0;
  font-weight: 700;
  text-decoration: underline;
}
</style>
