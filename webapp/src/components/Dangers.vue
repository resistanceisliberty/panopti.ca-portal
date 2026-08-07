<template>
  <v-expansion-panels multiple :model-value :readonly="showAll">
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('dangers.crime_title') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          {{ t('dangers.crime_p1') }}
        </p>

        <i18n-t keypath="dangers.crime_p2" tag="p" scope="global">
          <template #flockclaim><a href="https://www.flocksafety.com/articles/10-of-reported-crime-in-the-u-s-is-solved-using-flock-technology" target="_blank" rel="noopener noreferrer">{{ t('dangers.crime_p2_flockclaim') }}</a></template>
          <template #report404><a href="https://www.404media.co/researcher-who-oversaw-flock-surveillance-study-now-has-concerns-about-it/" target="_blank" rel="noopener noreferrer">{{ t('dangers.crime_p2_report404') }}</a></template>
        </i18n-t>

        <v-divider class="my-6" />

        <p>
          {{ t('dangers.crime_p3') }}
        </p>

        <quoted-source source-url="https://link.springer.com/article/10.1007/s11292-011-9133-9" :attribution-text="t('dangers.crime_quote1_attr')">
          {{ t('dangers.crime_quote1') }}
        </quoted-source>

        <quoted-source source-url="https://www.independent.org/publications/article.asp?id=13893" :attribution-text="t('dangers.crime_quote2_attr')">
          {{ t('dangers.crime_quote2') }}
        </quoted-source>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('dangers.security_title') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          {{ t('dangers.security_p1') }}
        </p>

        <ul>
          <i18n-t keypath="dangers.security_li1" tag="li" scope="global">
            <template #link><a target="_blank" rel="noopener noreferrer" href="https://www.404media.co/flock-logins-exposed-in-malware-infections-senator-asks-ftc-to-investigate-the-company/">{{ t('dangers.security_li1_link') }}</a></template>
          </i18n-t>
          <i18n-t keypath="dangers.security_li2" tag="li" scope="global">
            <template #link><a href="https://www.404media.co/researcher-turns-insecure-license-plate-cameras-into-open-source-surveillance-tool/" target="_blank" rel="noopener noreferrer">{{ t('dangers.security_li2_link') }}</a></template>
            <template #data><b>{{ t('dangers.security_li2_data') }}</b></template>
            <template #livefeed><b>{{ t('dangers.security_li2_livefeed') }}</b></template>
          </i18n-t>
          <i18n-t keypath="dangers.security_li3" tag="li" scope="global">
            <template #link><a target="_blank" rel="noopener noreferrer" href="https://nexanet.ai/blog/misconfigured-demo-exposed-flock-safetys-83000-camera-nationwide-tracking-system">{{ t('dangers.security_li3_link') }}</a></template>
          </i18n-t>
        </ul>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('dangers.dragnet_title') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p><i>
          <i18n-t keypath="dangers.dragnet_see" tag="span" scope="global">
            <template #link><a href="https://en.wikipedia.org/wiki/Dragnet_(policing)" target="_blank" rel="noopener noreferrer">{{ t('dangers.dragnet_see_link') }}</a></template>
          </i18n-t>
        </i></p>
        <i18n-t keypath="dangers.dragnet_p2" tag="p" scope="global">
          <template #percent><b>{{ t('dangers.dragnet_p2_percent') }}</b></template>
        </i18n-t>
        <p>
          {{ t('dangers.dragnet_p3') }}
        </p>

        <ul>
          <li>
            <a href="https://transparency.flocksafety.com/oak-park-il-pd" target="_blank" rel="noopener noreferrer">{{ t('dangers.dragnet_oakpark') }}</a>
          </li>
          <li>
            <a href="https://transparency.flocksafety.com/vallejo-ca-pd" target="_blank" rel="noopener noreferrer">{{ t('dangers.dragnet_vallejo') }}</a>
          </li>
        </ul>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('dangers.abuse_title') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          {{ t('dangers.abuse_p1') }}
        </p>
        <ul>
          <li>
            <a href="https://www.404media.co/a-texas-cop-searched-license-plate-cameras-nationwide-for-a-woman-who-got-an-abortion/" target="_blank" rel="noopener noreferrer">
              {{ t('dangers.abuse_li1') }}
            </a>
          </li>
          <li>
            <a href="https://www.kwch.com/2022/10/31/kechi-police-lieutenant-arrested-using-police-technology-stalk-wife/" target="_blank" rel="noopener noreferrer">{{ t('dangers.abuse_li2') }}</a>
          </li>
          <li>
            <a href="https://apnews.com/general-news-699236946e3140659fff8a2362e16f43" target="_blank" rel="noopener noreferrer">{{ t('dangers.abuse_li3') }}</a>
          </li>
          <li>
            <a href="https://apnews.com/general-news-699236946e3140659fff8a2362e16f43" target="_blank" rel="noopener noreferrer">{{ t('dangers.abuse_li4') }}</a>
          </li>
          <li>
            <a href="https://information.auditor.ca.gov/pdfs/reports/2019-118.pdf" target="_blank" rel="noopener noreferrer">{{ t('dangers.abuse_li5') }}</a>
          </li>
          <li>
            <a href="https://inewsource.org/2022/01/06/police-share-license-plate-data/" target="_blank" rel="noopener noreferrer">{{ t('dangers.abuse_li6') }}</a>
          </li>
        </ul>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('dangers.encounters_title') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          {{ t('dangers.encounters_p1') }}
        </p>
        <ul>
          <li>
            <a href="https://www.aclu.org/blog/privacy-technology/location-tracking/san-francisco-woman-pulled-out-car-gunpoint-because" target="_blank" rel="noopener noreferrer">{{ t('dangers.encounters_li1') }}</a>
          </li>
          <li>
            <a href="https://gizmodo.com/cops-terrorize-black-family-but-blame-license-plate-rea-1844602731" target="_blank" rel="noopener noreferrer">{{ t('dangers.encounters_li2') }}</a>
          </li>
          <li>
            <a href="https://www.techdirt.com/2019/02/20/deputies-sued-after-false-alpr-hit-leads-to-guns-out-traffic-stop-california-privacy-activist/" target="_blank" rel="noopener noreferrer">{{ t('dangers.encounters_li3') }}</a>
          </li>
          <li>
            <a href="https://www.ktvu.com/news/privacy-advocate-sues-coco-sheriffs-deputies-after-license-plate-readers-target-his-car-stolen" target="_blank" rel="noopener noreferrer">{{ t('dangers.encounters_li4') }}</a>
          </li>
          <i18n-t keypath="dangers.encounters_li5" tag="li" scope="global">
            <template #link><a target="_blank" rel="noopener noreferrer" href="https://denverite.com/2025/10/27/bow-mar-flock-cameras-accusation/">{{ t('dangers.encounters_li5_link') }}</a></template>
            <template #video><b>{{ t('dangers.encounters_li5_video') }}</b></template>
          </i18n-t>
        </ul>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('dangers.racist_title') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          {{ t('dangers.racist_p1') }}
        </p>
        <i18n-t keypath="dangers.racist_p2" tag="p" scope="global">
          <template #link><a href="https://www.eff.org/deeplinks/2015/01/what-we-learned-oakland-raw-alpr-data" target="_blank" rel="noopener noreferrer">{{ t('dangers.racist_p2_link') }}</a></template>
        </i18n-t>

        <i18n-t keypath="dangers.racist_p3" tag="p" scope="global" class="mt-4">
          <template #link><a href="https://www.ap.org/ap-in-the-news/2012/with-cameras-informants-nypd-eyed-mosques" target="_blank" rel="noopener noreferrer">{{ t('dangers.racist_p3_link') }}</a></template>
        </i18n-t>

        <p>{{ t('dangers.racist_p4') }}</p>
        <quoted-source source-url="https://www.freedomtothriveop.com/blog/zine-analyzes-flock-alpr-cameras-in-oak-park-il" :attribution-text="t('dangers.racist_quote_attr')">
          {{ t('dangers.racist_quote') }}
        </quoted-source>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('dangers.crossborder_title') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          {{ t('dangers.crossborder_p1') }}
        </p>
        <ul>
          <li>
            <a href="https://www.404media.co/ice-taps-into-nationwide-ai-enabled-camera-network-data-shows/" target="_blank" rel="noopener noreferrer">
              {{ t('dangers.crossborder_li1') }}
            </a>
          </li>
          <li>
            <a href="https://www.latimes.com/business/technology/story/2020-12-21/pasadena-long-beach-police-ice-automated-license-plate-reader-data" target="_blank" rel="noopener noreferrer">{{ t('dangers.crossborder_li2') }}</a>
          </li>
          <li>
            <a href="https://www.aclu-il.org/en/press-releases/ice-targeting-immigrants-based-automatic-license-plate-reader-alpr-data-supplied" target="_blank" rel="noopener noreferrer">{{ t('dangers.crossborder_li3') }}</a>
          </li>
          <li>
            <a href="https://www.nwpb.org/2022/12/22/new-report-finds-data-sharing-with-federal-immigration-agencies-might-violate-washington-law/" target="_blank" rel="noopener noreferrer">{{ t('dangers.crossborder_li4') }}</a>
          </li>

        </ul>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import QuotedSource from '@/components/QuotedSource.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  showAll: {
    type: Boolean,
    default: false,
  }
});

const modelValue = computed(() => props.showAll ? [0,1,2,3,4,5] : []);
</script>

<style scoped>
blockquote {
  border-left: 4px solid #616161;
  padding-left: 16px;
  font-style: italic;
  margin-top: 16px;
  margin-bottom: 8px;
}

p {
  margin-bottom: 16px;
}

ul {
  margin-left: 16px;
  margin-bottom: 16px;
}
</style>
