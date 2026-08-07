<template>
  <DefaultLayout>
    <v-container class="narrow-text">
      <h2>{{ t('about.heading1') }}</h2>
      <p>
        {{ t('about.p1') }}
      </p>

      <h2>{{ t('about.heading2') }}</h2>
      <i18n-t keypath="about.p2" tag="p" scope="global">
        <template #vehicle><b>{{ t('about.p2_vehicle') }}</b></template>
        <template #genetec><a href="https://www.genetec.com/" target="_blank" rel="noopener noreferrer">Genetec</a></template>
        <template #flock><a href="https://consumerrights.wiki/w/Flock_Safety" target="_blank" rel="noopener noreferrer">Flock Safety</a></template>
      </i18n-t>

      <h2>{{ t('about.heading3') }}</h2>
      <p>
        {{ t('about.p3') }}
      </p>

      <h2>{{ t('about.heading4') }}</h2>
      <i18n-t keypath="about.p4" tag="p" scope="global">
        <template #osm><a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer">OpenStreetMap</a></template>
        <template #deflock><a href="https://deflock.org" target="_blank" rel="noopener noreferrer">DeFlock</a></template>
      </i18n-t>

      <h2>{{ t('about.heading5') }}</h2>
      <i18n-t keypath="about.p5" tag="p" scope="global">
        <template #adding><router-link :to="localePath('/report')">{{ t('about.p5_adding') }}</router-link></template>
        <template #learn><router-link :to="localePath('/what-is-an-alpr')">{{ t('about.p5_learn') }}</router-link></template>
      </i18n-t>
    </v-container>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '@/composables/useLocalePath';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const { t } = useI18n();
const { localePath } = useLocalePath();
</script>
