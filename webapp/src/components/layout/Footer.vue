<template>
  <v-footer>
    <v-container>
      <v-row align-items="center" justify="center">

        <v-col cols="12" class="mt-4">
          <v-img height="30" contain :src="isDark ? '/panoptica-dark.svg' : '/panoptica-light.svg'" />
        </v-col>
        
        <!-- Internal Links -->
        <v-col cols="7" sm="3">
          <v-list-subheader class="mx-4 font-weight-black text-subtitle-1" :class="isDark ? 'text-grey-lighten-5' : 'text-black'" id="footer-info-heading">{{ t('footer.info') }}</v-list-subheader>
          <v-list density="compact" aria-labelledby="footer-info-heading" role="list">
            <v-list-item role="listitem"
              v-for="link in internalLinks"
              :key="link.titleKey"
              link
              :to="link.to && localePath(link.to)"
              slim
              :aria-label="t(link.altKey)"
            >
                <v-list-item-title class="d-flex align-center">
                <v-icon class="custom-icon" start :icon="link.icon" :alt="t(link.altKey)" />
                {{ t(link.titleKey) }}
                </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- External Links -->
        <v-col cols="5" sm="3">
          <v-list-subheader class="mx-4 font-weight-black text-subtitle-1" :class="isDark ? 'text-grey-lighten-5' : 'text-black'" id="footer-involved-heading">{{ t('footer.involved') }}</v-list-subheader>
          <v-list density="compact" aria-labelledby="footer-involved-heading" role="list">
            <v-list-item
              v-for="link in externalLinks"
              :key="link.titleKey"
              link
              slim
              :href="link.href"
              :to="link.to && localePath(link.to)"
              :target="link.href ? '_blank' : undefined"
              role="listitem"
            >
              <v-list-item-title class="d-flex align-center justify-start">
                <v-icon start v-if="link.icon" class="custom-icon" :icon="link.icon"></v-icon>
                <img v-else-if="link.customIcon" class="mr-2 custom-icon" width="24" height="24" :src="isDark ? link.customIconDark : link.customIcon" :alt="t(link.altKey)" />
                {{ t(link.titleKey) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Copyright -->
        <v-col
          class="text-center d-flex align-center justify-center text-grey-darken-1"
          cols="12"
          sm="6"
        >
          <div class="copyright" :class="isDark ? 'text-grey-lighten-5' : 'text-black'">
            <p>&copy; {{ currentYear }} panopti.ca &middot; {{ t('footer.open_source') }} <a href="https://deflock.org" target="_blank" rel="noopener noreferrer" style="color: unset; font-weight: normal;">DeFlock</a></p>
            <p>{{ t('footer.map_data') }} &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" style="color: unset; font-weight: normal;">{{ t('footer.osm_contributors') }}</a></p>
            <p class="mt-4">v1.1.0</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '@/composables/useLocalePath';
const theme = useTheme();
const isDark = computed(() => theme.name.value === 'dark');
const currentYear = new Date().getFullYear();
const { t } = useI18n();
const { localePath } = useLocalePath();

interface FooterLink {
  titleKey: string
  icon: string
  altKey: string
  href?: string
  to?: string
  customIcon?: string
  customIconDark?: string
}

const internalLinks: FooterLink[] = [
  { titleKey: 'footer.about', to: '/about', icon: 'mdi-information', altKey: 'footer.about' },
  { titleKey: 'footer.privacy', to: '/privacy', icon: 'mdi-shield-lock', altKey: 'footer.privacy' },
  { titleKey: 'footer.terms', to: '/terms', icon: 'mdi-file-document', altKey: 'footer.terms' },
];

const externalLinks: FooterLink[] = [
  { titleKey: 'nav.github', href: 'https://github.com/resistanceisliberty/panopti.ca', icon: 'mdi-github', altKey: 'footer.github_alt' },
  { titleKey: 'nav.contact', to: '/contact', icon: 'mdi-email', altKey: 'nav.contact' },
]
</script>

<style scoped>
.custom-icon {
  opacity: var(--v-medium-emphasis-opacity);
}
.copyright p {
  font-size: 0.85rem;
  line-height: 0.5rem;
}
</style>
