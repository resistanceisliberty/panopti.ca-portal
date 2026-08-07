<template>
<DefaultLayout no-bottom-margin>
  <template #header>
    <div class="hero-background">
      <v-container class="text-center py-8">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <h1 class="hero-title px-4 mb-4">{{ t('home.hero_title') }}</h1>
            <h2 class="text-h5 px-4 mb-6">
              {{ t('home.hero_desc') }}
            </h2>

            <ALPRCounter class="my-6" />

            <v-btn size="large" color="rgb(18, 151, 195)" large href="https://maps.panopti.ca">
              {{ t('home.launch_map') }}
              <v-icon end>mdi-map</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>

  <!-- Dangers Section -->
  <v-container class="pb-10 text-center">
    <h2 class="mb-6">{{ t('home.what_are_alprs_heading') }}</h2>

    <i18n-t keypath="home.body1" tag="p" scope="global" class="text-left px-6">
      <template #vehicle><b>{{ t('home.body1_vehicle') }}</b></template>
      <template #details><b>{{ t('home.body1_details') }}</b></template>
      <template #features><b>{{ t('home.body1_features') }}</b></template>
      <template #datapoints><b>{{ t('home.body1_datapoints') }}</b></template>
    </i18n-t>
    <i18n-t keypath="home.body2" tag="p" scope="global" class="text-left px-6">
      <template #suspected><b>{{ t('home.body2_suspected') }}</b></template>
      <template #investigation><b>{{ t('home.body2_investigation') }}</b></template>
    </i18n-t>

    <div class="alpr-demo-container my-8">
      <v-img
        max-width="500"
        src="/lpr-demo.webp"
        class="mx-auto alpr-demo-image"
        style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
      />
      <p class="text-caption text-center mt-3 px-4" style="opacity: 0.8; font-style: italic;">
        {{ t('home.demo_caption') }}
      </p>
    </div>

    <v-divider class="my-8" />

    <h2 class="display-2 mb-4">{{ t('home.dangers_heading') }}</h2>

    <v-row class="align-center mt-4">
      <v-col cols="12" md="4" class="text-center">
        <v-card>
          <v-card-title class="headline">
            <v-icon x-large class="mr-2">mdi-shield-alert</v-icon>
            {{ t('home.privacy_title') }}
          </v-card-title>
          <v-card-text>
            <i18n-t keypath="home.privacy_body" tag="span" scope="global">
              <template #track><b>{{ t('home.privacy_track') }}</b></template>
              <template #store><b>{{ t('home.privacy_store') }}</b></template>
              <template #history><b>{{ t('home.privacy_history') }}</b></template>
            </i18n-t>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <v-card>
          <v-card-title class="headline">
            <v-icon x-large class="mr-2">mdi-robber</v-icon>
            {{ t('home.misuse_title') }}
          </v-card-title>
          <v-card-text>
            {{ t('home.misuse_body') }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="text-center">
        <v-card>
          <v-card-title class="headline">
            <v-icon x-large class="mr-2">mdi-handcuffs</v-icon>
            {{ t('home.benefits_title') }}
          </v-card-title>
          <v-card-text>
            <i18n-t keypath="home.benefits_body" tag="span" scope="global">
              <template #evidence><b>{{ t('home.benefits_evidence') }}</b></template>
            </i18n-t>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <i18n-t keypath="home.risk_body" tag="p" scope="global" class="px-6 mt-8">
      <template #warrant><b>{{ t('home.risk_warrant') }}</b></template>
      <template #confined><b>{{ t('home.risk_confined') }}</b></template>
      <template #crossborder><b>{{ t('home.risk_crossborder') }}</b></template>
    </i18n-t>

    <v-btn class="my-4" color="rgb(18, 151, 195)" large :to="localePath('/what-is-an-alpr')">
      <v-icon start>mdi-book-open-page-variant</v-icon>
      {{ t('home.learn_about_alprs_btn') }}
    </v-btn>

    <v-divider class="my-8" />

    <!-- Who makes these cameras -->
    <div class="flock-resources-section my-8">
      <h2 class="mb-4">{{ t('home.vendors_heading') }}</h2>
      <i18n-t keypath="home.vendors_body" tag="p" scope="global" class="px-6 text-left">
        <template #genetec><a target="_blank" rel="noopener noreferrer" href="https://www.genetec.com/">Genetec</a></template>
        <template #flock><a target="_blank" rel="noopener noreferrer" href="https://consumerrights.wiki/w/Flock_Safety">Flock Safety</a></template>
        <template #share><b>{{ t('home.vendors_share') }}</b></template>
      </i18n-t>

      <i18n-t keypath="home.vendors_other" tag="p" scope="global" class="text-left px-6">
        <template #notonly><b>{{ t('home.vendors_notonly') }}</b></template>
        <template #link><router-link :to="localePath('/identify')">{{ t('home.vendors_link_text') }}</router-link></template>
      </i18n-t>

      <v-btn class="mt-4" variant="outlined" color="rgb(18, 151, 195)" :to="localePath('/what-is-an-alpr') + '#similar'">
        {{ t('home.learn_more_btn') }}
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </v-container>

  <!-- Map Section -->
  <v-container fluid class="map-section py-10 text-center">
    <h2 class="display-2 mb-4">{{ t('home.explore_map_heading') }}</h2>
    <v-btn color="white" large href="https://maps.panopti.ca">
      {{ t('home.launch_map') }}
      <v-icon end>mdi-map</v-icon>
    </v-btn>
  </v-container>
</DefaultLayout>
</template>

<style>
.featured-image-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 16px;
}

.map-section {
  background: url('/map-gta-heatmap.webp') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 100px 0;
  position: relative;
}
.map-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.map-section > * {
  position: relative;
  z-index: 2;
}

.hero-background {
  background: url('/hero.webp') no-repeat right center / cover;
  position: relative;
  min-height: 400px;
  color: white;
}

.hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-background > * {
  position: relative;
  z-index: 2;
}

.hero-background h1,
.hero-background h2 {
  color: white;
}

.hero-title {
  font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(3rem, 9vw, 5rem);
  letter-spacing: -0.02em;
  line-height: 1.02;
}

.bigger {
  font-size: 1.1rem;
}

.alpr-demo-container {
  max-width: 600px;
  margin: 0 auto;
}

.alpr-demo-image {
  transition: transform 0.2s ease;
}

.alpr-demo-image:hover {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .alpr-demo-container .v-img {
    max-width: 100% !important;
    margin: 0 16px;
  }
}

.flock-resources-section {
  margin: 0 auto;
}
</style>


<script setup lang="ts">
import ALPRCounter from '@/components/ALPRCounter.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '@/composables/useLocalePath';

const { t } = useI18n();
const { localePath } = useLocalePath();
</script>
