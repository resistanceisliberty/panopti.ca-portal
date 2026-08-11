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
  { titleKey: 'nav.candidates', icon: 'mdi-vote', to: '/candidates' },
]

const metaItems: NavItem[] = [
  { titleKey: 'nav.contact', icon: 'mdi-email-outline', to: '/contact' },
  { titleKey: 'nav.github', icon: 'mdi-github', href: 'https://github.com/resistanceisliberty/panopti.ca'},
];
const drawer = ref(false)

// mdi has no current X-logo glyph (only the outdated mdi-twitter bird); reuse
// the same inline SVG path as the footer's X link (Footer.vue) — duplicated
// per-component, matching this codebase's existing convention for small
// shared constants (see project()/MAP_VIEWBOX in candidates.ts).
const X_ICON_PATH = 'M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z';
const X_URL = 'https://x.com/panopticanada';

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
          </div>

          <v-spacer></v-spacer>

          <!-- Contribute section -->
          <div class="d-flex align-center">
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

        <v-btn variant="text" class="lang-toggle" :to="switchLocalePath()"
               :aria-label="locale === 'en' ? t('lang.switch_to_fr') : t('lang.switch_to_en')"
               @click="persistLangPreference">
          {{ locale === 'en' ? t('lang.fr') : t('lang.en') }}
        </v-btn>

        <v-btn icon :href="X_URL" target="_blank" rel="noopener noreferrer" :aria-label="t('footer.x_label')">
          <svg class="appbar-x-icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path :d="X_ICON_PATH" fill="currentColor" />
          </svg>
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

        <v-list-item :href="X_URL" target="_blank" rel="noopener noreferrer" link :aria-label="t('footer.x_label')" role="option">
          <template v-slot:prepend>
            <svg class="appbar-x-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path :d="X_ICON_PATH" fill="currentColor" />
            </svg>
          </template>
          <v-list-item-title>{{ t('footer.x_label') }}</v-list-item-title>
        </v-list-item>

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
