<template>
  <v-footer>
    <v-container>
      <v-row align-items="center" justify="center">

        <v-col cols="12" class="mt-4">
          <v-img height="30" contain :src="isDark ? '/panoptica-dark.svg' : '/panoptica-light.svg'" />
        </v-col>
        
        <!-- Link groups: Info · Get Involved · Community · Social Media -->
        <v-col v-for="group in groups" :key="group.id" cols="6" sm="3">
          <v-list-subheader class="mx-4 font-weight-black text-subtitle-1" :class="isDark ? 'text-grey-lighten-5' : 'text-black'" :id="`footer-${group.id}-heading`">{{ t(group.headingKey) }}</v-list-subheader>
          <v-list density="compact" :aria-labelledby="`footer-${group.id}-heading`" role="list">
            <v-list-item
              v-for="link in group.links"
              :key="link.titleKey"
              link
              slim
              :lines="link.titleParams ? 'two' : undefined"
              :href="link.href"
              :to="link.to && localePath(link.to)"
              :target="link.href ? '_blank' : undefined"
              :rel="link.href ? 'noopener noreferrer' : undefined"
              :aria-label="link.altKey ? t(link.altKey) : undefined"
              role="listitem"
            >
              <v-list-item-title class="d-flex align-center justify-start" :class="{ 'wrap-desc': link.titleParams }">
                <v-icon start v-if="link.icon" class="custom-icon" :icon="link.icon"></v-icon>
                <img v-else-if="link.customIcon" class="mr-2 custom-icon" width="24" height="24" :src="isDark ? link.customIconDark : link.customIcon" :alt="t(link.altKey ?? '')" />
                <svg v-else-if="link.svgPath" class="mr-2 custom-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="link.svgPath" fill="currentColor" />
                </svg>
                {{ t(link.titleKey, link.titleParams ?? {}) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Copyright -->
        <v-col
          class="text-center d-flex align-center justify-center text-grey-darken-1 mt-4"
          cols="12"
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
  icon?: string
  altKey?: string
  href?: string
  to?: string
  customIcon?: string
  customIconDark?: string
  svgPath?: string
  titleParams?: Record<string, string>
}

const internalLinks: FooterLink[] = [
  { titleKey: 'footer.about', to: '/about', icon: 'mdi-information', altKey: 'footer.about' },
  { titleKey: 'nav.candidates', to: '/candidates', icon: 'mdi-vote', altKey: 'nav.candidates' },
  { titleKey: 'chapters.title', to: '/chapters', icon: 'mdi-map-marker-multiple', altKey: 'chapters.title' },
  { titleKey: 'footer.privacy', to: '/privacy', icon: 'mdi-shield-lock', altKey: 'footer.privacy' },
  { titleKey: 'footer.terms', to: '/terms', icon: 'mdi-file-document', altKey: 'footer.terms' },
];

// mdi's only X/Twitter glyph (mdi-twitter) is the outdated bird; the official
// X logo path below (currentColor fill) matches how deflock.org's own footer
// renders its social icons — see origin/master's OfficialSocials.vue.
const X_ICON_PATH = 'M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z';
// Official Signal logo (simple-icons); href is the public group invite link.
const SIGNAL_ICON_PATH = 'M12 0q-.934 0-1.83.139l.17 1.111a11 11 0 0 1 3.32 0l.172-1.111A12 12 0 0 0 12 0M9.152.34A12 12 0 0 0 5.77 1.742l.584.961a10.8 10.8 0 0 1 3.066-1.27zm5.696 0-.268 1.094a10.8 10.8 0 0 1 3.066 1.27l.584-.962A12 12 0 0 0 14.848.34M12 2.25a9.75 9.75 0 0 0-8.539 14.459c.074.134.1.292.064.441l-1.013 4.338 4.338-1.013a.62.62 0 0 1 .441.064A9.7 9.7 0 0 0 12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m-7.092.068a12 12 0 0 0-2.59 2.59l.909.664a11 11 0 0 1 2.345-2.345zm14.184 0-.664.909a11 11 0 0 1 2.345 2.345l.909-.664a12 12 0 0 0-2.59-2.59M1.742 5.77A12 12 0 0 0 .34 9.152l1.094.268a10.8 10.8 0 0 1 1.269-3.066zm20.516 0-.961.584a10.8 10.8 0 0 1 1.27 3.066l1.093-.268a12 12 0 0 0-1.402-3.383M.138 10.168A12 12 0 0 0 0 12q0 .934.139 1.83l1.111-.17A11 11 0 0 1 1.125 12q0-.848.125-1.66zm23.723.002-1.111.17q.125.812.125 1.66c0 .848-.042 1.12-.125 1.66l1.111.172a12.1 12.1 0 0 0 0-3.662M1.434 14.58l-1.094.268a12 12 0 0 0 .96 2.591l-.265 1.14 1.096.255.36-1.539-.188-.365a10.8 10.8 0 0 1-.87-2.35m21.133 0a10.8 10.8 0 0 1-1.27 3.067l.962.584a12 12 0 0 0 1.402-3.383zm-1.793 3.848a11 11 0 0 1-2.345 2.345l.664.909a12 12 0 0 0 2.59-2.59zm-19.959 1.1L.357 21.48a1.8 1.8 0 0 0 2.162 2.161l1.954-.455-.256-1.095-1.953.455a.675.675 0 0 1-.81-.81l.454-1.954zm16.832 1.769a10.8 10.8 0 0 1-3.066 1.27l.268 1.093a12 12 0 0 0 3.382-1.402zm-10.94.213-1.54.36.256 1.095 1.139-.266c.814.415 1.683.74 2.591.961l.268-1.094a10.8 10.8 0 0 1-2.35-.869zm3.634 1.24-.172 1.111a12.1 12.1 0 0 0 3.662 0l-.17-1.111q-.812.125-1.66.125a11 11 0 0 1-1.66-.125';

// Discord logo (simple-icons), currentColor fill — same inline-SVG convention as above.
const DISCORD_ICON_PATH = 'M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z';

// Bluesky butterfly (simple-icons), currentColor fill.
const BLUESKY_ICON_PATH = 'M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.479 0-.688-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z';

const involvedLinks: FooterLink[] = [
  { titleKey: 'nav.github', href: 'https://github.com/resistanceisliberty/panopti.ca', icon: 'mdi-github' },
  { titleKey: 'nav.contact', to: '/contact', icon: 'mdi-email', altKey: 'nav.contact' },
];
// Matrix logo (simple-icons), currentColor fill.
const MATRIX_ICON_PATH = 'M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033c.309-.443.683-.784 1.117-1.024.433-.245.936-.365 1.5-.365.54 0 1.033.107 1.481.314.448.208.785.582 1.02 1.108.254-.374.6-.706 1.034-.992.434-.287.95-.43 1.546-.43.453 0 .872.056 1.26.167.388.11.716.286.993.53.276.245.489.559.646.951.152.392.23.863.23 1.417v5.728h-2.349V11.52c0-.286-.01-.559-.032-.812a1.755 1.755 0 0 0-.18-.66 1.106 1.106 0 0 0-.438-.448c-.194-.11-.457-.166-.785-.166-.332 0-.6.064-.803.189a1.38 1.38 0 0 0-.48.499 1.946 1.946 0 0 0-.231.696 5.56 5.56 0 0 0-.06.785v4.768h-2.35v-4.8c0-.254-.004-.503-.018-.752a2.074 2.074 0 0 0-.143-.688 1.052 1.052 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19-.111 0-.259.024-.439.074-.18.051-.36.143-.53.282-.171.138-.319.337-.439.595-.12.259-.18.6-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z';

const communityLinks: FooterLink[] = [
  { titleKey: 'footer.matrix_desc', href: 'https://matrix.to/#/#community:panopti.ca', svgPath: MATRIX_ICON_PATH, altKey: 'footer.matrix_label' },
  { titleKey: 'footer.discord_desc', href: 'https://discord.gg/MR6uEmSe77', svgPath: DISCORD_ICON_PATH, altKey: 'footer.discord_label' },
  { titleKey: 'footer.signal_desc', href: 'https://signal.group/#CjQKINKEjCutoejwUZB6Te4WuyFI1pfC8TxSjN1l7-lJ2clnEhDpDs8kXV0KHF4syMhl3R19', svgPath: SIGNAL_ICON_PATH, altKey: 'footer.signal_label' },
];
const socialLinks: FooterLink[] = [
  { titleKey: 'footer.x_desc', href: 'https://x.com/panopticanada', svgPath: X_ICON_PATH, altKey: 'footer.x_label', titleParams: { handle: '@panopticanada' } },
  { titleKey: 'footer.bluesky_desc', href: 'https://bsky.app/profile/panopti.bsky.social', svgPath: BLUESKY_ICON_PATH, altKey: 'footer.bluesky_label' },
];

// Footer link columns, in order. Community (chat) and Socials (follow) are
// deliberately separate groups. Headings reuse the nav keys for consistency.
const groups = [
  { id: 'info', headingKey: 'footer.info', links: internalLinks },
  { id: 'involved', headingKey: 'footer.involved', links: involvedLinks },
  { id: 'community', headingKey: 'nav.community', links: communityLinks },
  { id: 'socials', headingKey: 'nav.socials', links: socialLinks },
]
</script>

<style scoped>
.custom-icon {
  opacity: var(--v-medium-emphasis-opacity);
  flex-shrink: 0;
}
.wrap-desc {
  white-space: normal;
  text-overflow: clip;
}
.copyright p {
  font-size: 0.85rem;
  line-height: 0.5rem;
}
</style>
