<template>
<DefaultLayout>
  <template #header>
    <Hero
      imageUrl="/council-chamber.jpg"
      :title="t('candidates.hero_title')"
      :description="t('candidates.hero_desc')"
    />
  </template>

  <v-container>
    <!-- Introduction -->
    <v-row>
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <div class="text-center mb-8">
          <v-icon size="64" color="var(--df-blue)" class="mb-4">mdi-vote</v-icon>
          <p class="text-h6 text-medium-emphasis serif">{{ t('candidates.intro_body') }}</p>
          <p class="text-body-2 text-medium-emphasis mt-4 mb-0">{{ t('candidates.last_updated', { date: lastUpdated }) }}</p>
        </div>
      </v-col>
    </v-row>

    <!-- Map -->
    <v-row class="mb-12">
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <CanadaMap />
          <div class="d-flex flex-wrap justify-center mt-4">
            <div v-for="s in ALPR_STATUSES" :key="s" class="d-flex align-center mr-6 mb-2">
              <span class="legend-dot mr-2" :style="{ background: STATUS_COLORS[s] }" />
              <span class="text-body-2">{{ t(`candidates.status.${s}`) }}</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Municipality cards -->
    <v-row class="mb-12">
      <v-col cols="12" md="10" class="mx-auto">
        <v-row>
          <v-col v-for="m in municipalities" :key="m.id" cols="12" sm="6" md="4">
            <v-card :to="localePath('/candidates/' + m.id)" class="pa-4 h-100" elevation="2" rounded="lg" hover>
              <div class="d-flex justify-space-between align-start mb-2">
                <div>
                  <h3 class="text-h6 font-weight-bold mb-0">{{ lz(m.name, locale) }}</h3>
                  <p class="text-body-2 text-medium-emphasis mb-0">{{ m.province }}</p>
                </div>
                <v-chip :color="STATUS_COLORS[m.alprStatus]" size="small" variant="tonal">
                  {{ t(`candidates.status.${m.alprStatus}`) }}
                </v-chip>
              </div>
              <p class="text-body-2 mb-2">
                {{ m.election ? t('candidates.election_on', { date: m.election.date }) : t('candidates.no_election') }}
              </p>
              <p class="text-body-2 text-medium-emphasis mb-0">
                {{ t('candidates.tally', { o: stanceTally(m.id).opposes, s: stanceTally(m.id).supports, c: stanceTally(m.id).concerns, n: stanceTally(m.id).no_position }) }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Methodology -->
    <v-row class="mb-12">
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <div class="d-flex align-center mb-4">
            <v-avatar size="48" color="primary" class="mr-4">
              <v-icon size="24" color="white">mdi-clipboard-check-outline</v-icon>
            </v-avatar>
            <h3 class="text-h5 font-weight-bold mb-0">{{ t('candidates.method_heading') }}</h3>
          </div>

          <p class="text-body-1 mb-4">{{ t('candidates.method_body') }}</p>

          <v-row class="mb-2">
            <v-col cols="12" md="3">
              <StanceChip stance="opposes" class="mb-2" />
              <p class="text-body-2 mb-0">{{ t('candidates.method_opposes') }}</p>
            </v-col>
            <v-col cols="12" md="3">
              <StanceChip stance="supports" class="mb-2" />
              <p class="text-body-2 mb-0">{{ t('candidates.method_supports') }}</p>
            </v-col>
            <v-col cols="12" md="3">
              <StanceChip stance="concerns" class="mb-2" />
              <p class="text-body-2 mb-0">{{ t('candidates.method_concerns') }}</p>
            </v-col>
            <v-col cols="12" md="3">
              <StanceChip stance="no_position" class="mb-2" />
              <p class="text-body-2 mb-0">{{ t('candidates.method_no_position') }}</p>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <p class="text-body-1 mb-2">{{ t('candidates.method_evidence_intro') }}</p>
          <v-list density="compact" class="mb-4">
            <v-list-item prepend-icon="mdi-newspaper-variant-outline">
              <v-list-item-title>{{ t('candidates.evidence.citation') }}</v-list-item-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-clipboard-text-outline">
              <v-list-item-title>{{ t('candidates.evidence.questionnaire') }}</v-list-item-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-phone-outline">
              <v-list-item-title>{{ t('candidates.evidence.outreach') }}</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-divider class="my-4"></v-divider>

          <i18n-t keypath="candidates.method_dispute" tag="p" scope="global" class="text-body-2 mb-4">
            <template #email><a href="mailto:contact@panopti.ca">contact@panopti.ca</a></template>
          </i18n-t>

          <v-alert type="info" variant="tonal" density="compact" class="mb-0">
            {{ t('candidates.disclaimer') }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>

    <!-- For candidates -->
    <v-row class="mb-12">
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <div class="d-flex align-center mb-4">
            <v-avatar size="48" color="primary" class="mr-4">
              <v-icon size="24" color="white">mdi-file-download-outline</v-icon>
            </v-avatar>
            <h3 class="text-h5 font-weight-bold mb-0">{{ t('candidates.forcand_heading') }}</h3>
          </div>

          <i18n-t keypath="candidates.forcand_body" tag="p" scope="global" class="text-body-1 mb-6">
            <template #email><a href="mailto:contact@panopti.ca">contact@panopti.ca</a></template>
          </i18n-t>

          <div class="d-flex flex-wrap ga-2">
            <v-btn href="/questionnaire/panopti-alpr-questionnaire-en.pdf" download prepend-icon="mdi-file-pdf-box" variant="tonal">
              {{ t('candidates.forcand_pdf') }} (EN)
            </v-btn>
            <v-btn href="/questionnaire/panopti-alpr-questionnaire-en.txt" download prepend-icon="mdi-file-document-outline" variant="tonal">
              {{ t('candidates.forcand_txt') }} (EN)
            </v-btn>
            <v-btn href="/questionnaire/panopti-alpr-questionnaire-fr.pdf" download prepend-icon="mdi-file-pdf-box" variant="tonal">
              {{ t('candidates.forcand_pdf') }} (FR)
            </v-btn>
            <v-btn href="/questionnaire/panopti-alpr-questionnaire-fr.txt" download prepend-icon="mdi-file-document-outline" variant="tonal">
              {{ t('candidates.forcand_txt') }} (FR)
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Closing CTA -->
    <v-row>
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-card class="pa-6" elevation="3" rounded="lg" color="primary" variant="tonal">
          <div class="text-center">
            <v-icon size="64" color="primary" class="mb-4">mdi-account-voice</v-icon>
            <p class="text-h6 mb-6 serif">{{ t('candidates.cta_council') }}</p>
            <v-btn :to="localePath('/council')" size="large" color="primary" prepend-icon="mdi-gavel">
              {{ t('candidates.cta_council_button') }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</DefaultLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '@/composables/useLocalePath';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Hero from '@/components/layout/Hero.vue';
import CanadaMap from '@/components/candidates/CanadaMap.vue';
import StanceChip from '@/components/candidates/StanceChip.vue';
import { getMunicipalities, stanceTally, lz, lastUpdated } from '@/data/candidates';

const { t, locale } = useI18n();
const { localePath } = useLocalePath();
const municipalities = getMunicipalities();
const ALPR_STATUSES = ['installed', 'considering', 'mobile_only', 'none', 'deployed'] as const;
const STATUS_COLORS: Record<string, string> = {
  installed: '#c62828',
  considering: '#1297C3',
  mobile_only: '#ef6c00',
  none: '#2e7d32',
  deployed: '#d84315',
};
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.2s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.v-avatar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.legend-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
</style>
