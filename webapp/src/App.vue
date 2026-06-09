<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import { computed, ref, watch, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useTheme } from 'vuetify';
import DiscordWarningDialog from '@/components/DiscordWarningDialog.vue';
import { useDiscordIntercept } from '@/composables/useDiscordIntercept';
import { SITE_ORIGIN, DEFAULT_DESCRIPTION } from '@/router';

const theme = useTheme();
const router = useRouter();
const route = useRoute();
const isDark = computed(() => theme.name.value === 'dark');
const isInIframe = computed(() => typeof window !== 'undefined' && window.self !== window.top);
const { showDialog, discordUrl, interceptDiscordLinks } = useDiscordIntercept();

// Per-page SEO head — reactive to the current route's meta (set in router).
useHead({
  title: () => (route.meta.title as string) || 'panopti.ca',
  meta: [
    { name: 'description', content: () => (route.meta.description as string) || DEFAULT_DESCRIPTION },
    { property: 'og:title', content: () => (route.meta.title as string) || 'panopti.ca' },
    { property: 'og:description', content: () => (route.meta.description as string) || DEFAULT_DESCRIPTION },
    { property: 'og:url', content: () => SITE_ORIGIN + route.path },
  ],
  link: [{ rel: 'canonical', href: () => SITE_ORIGIN + route.path }],
});

function toggleTheme() {
  const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark';
  theme.change(newTheme);
  localStorage.setItem('theme', newTheme);
}

function handleDiscordProceed(url: string) {
  window.open(url, '_blank');
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

const items = [
  { title: 'Home', icon: 'mdi-home', to: '/' },
  { title: 'Map', icon: 'mdi-map', href: 'https://maps.panopti.ca' },
  { title: 'Learn', icon: 'mdi-school', to: '/what-is-an-alpr' },
]

const contributeItems = [
  { title: 'Submit Cameras', icon: 'mdi-map-marker-plus', to: '/report' },
  { title: 'Public Records', icon: 'mdi-file-document', to: '/foi' },
  { title: 'City Council', icon: 'mdi-account-voice', to: '/council' },
]

const metaItems = [
  { title: 'Contact', icon: 'mdi-email-outline', to: '/contact' },
  { title: 'GitHub', icon: 'mdi-github', href: 'https://github.com/resistanceisliberty/panopti.ca'},
];
const drawer = ref(false)

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
      <v-system-bar class="deflock-credit-bar px-3 text-center" color="grey-darken-4">
        <span class="deflock-credit-text">
          Built on
          <a href="https://github.com/FoggedLens/deflock" target="_blank" rel="noopener noreferrer">DeFlock</a>, the original ALPR-mapping project — for United States ALPR data, visit
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
          aria-label="Toggle Navigation Drawer"
        ></v-app-bar-nav-icon>

        <!-- Logo -->
        <v-toolbar-title style="flex: unset;">
          <div style="display: flex; align-items: center; cursor: pointer;" @click="router.push('/')">
            <v-img height="34" width="148" alt="panopti.ca" :src="isDark ? '/panoptica-dark.svg' : '/panoptica-light.svg'" />
          </div>
        </v-toolbar-title>

        <!-- Desktop horizontal navigation -->
        <div class="d-none d-md-flex ml-8 flex-grow-1">
          <!-- Main navigation items -->
          <div class="d-flex align-center">
            <v-btn
              v-for="item in items.slice(1)"
              :key="item.title"
              :to="item.to"
              :href="item.href"
              :target="item.target"
              variant="text"
              class="mx-1"
              :prepend-icon="item.icon"
            >
              {{ item.title }}
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
                  Contribute
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="item in contributeItems"
                  :key="item.title"
                  :to="item.to"
                  link
                >
                  <template v-slot:prepend>
                    <v-icon>{{ item.icon }}</v-icon>
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
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
                  Get Involved
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="item in metaItems"
                  :key="item.title"
                  :to="item.to"
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
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>

        <v-spacer class="d-md-none" />

        <v-btn icon @click="toggleTheme" aria-label="Toggle Theme">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Mobile navigation drawer -->
      <v-navigation-drawer
        v-model="drawer"
        temporary
        class="d-md-none"
        aria-label="Navigation Drawer"
      >
        <v-list nav aria-label="Main Navigation">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
            :href="item.href"
            :target="item.target"
            role="option"
          >
            <v-icon start>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-list-item>
        </v-list>

        <v-divider class="my-2" aria-hidden="true" role="presentation" />

        <v-list-subheader class="px-4">Contribute</v-list-subheader>
        <v-list nav aria-label="Contribute Links">
          <v-list-item
            v-for="item in contributeItems"
            :key="item.title"
            link
            :to="item.to"
            role="option"
          >
            <v-icon v-if="item.icon" start>{{ item.icon }}</v-icon>
            <span style="vertical-align: middle;">{{ item.title }}</span>
          </v-list-item>
        </v-list>
          
        <v-divider class="my-2" aria-hidden="true" role="presentation" />
          
        <v-list-subheader class="px-4">Get Involved</v-list-subheader>
        <v-list nav aria-label="Meta Links">
          <v-list-item
            v-for="item in metaItems"
            :key="item.title"
            link
            :to="item.to"
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
            <span style="vertical-align: middle;">{{ item.title }}</span>
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

.deflock-credit-bar {
  height: auto !important;
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.deflock-credit-text {
  white-space: normal;
  line-height: 1.35;
  font-size: 0.78rem;
  padding: 5px 0;
  color: rgba(255, 255, 255, 0.82);
}
.deflock-credit-text a {
  color: #5bb8e0;
  font-weight: 700;
  text-decoration: underline;
}
</style>
