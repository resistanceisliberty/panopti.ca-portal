<template>
  <NotFound v-if="!muni || !person" />
  <DefaultLayout v-else>
    <template #header>
      <Hero imageUrl="/city-council.jpg" :title="lz(muni.name, locale)" :description="statusLine" />
    </template>
    <v-container>
      <v-row><v-col cols="12" md="10" lg="8" class="mx-auto">

        <div class="text-center mb-8">
          <h2 class="text-h4 font-weight-bold mb-1">{{ person.name }}</h2>
          <p class="text-subtitle-1 text-medium-emphasis mb-2">{{ officesLine }}</p>
          <p v-if="person.links?.website" class="mb-3">
            <a :href="person.links.website" target="_blank" rel="noopener noreferrer" class="text-primary font-weight-medium" style="text-decoration: none;">
              <v-icon size="16" class="mr-1">mdi-open-in-new</v-icon>{{ t('candidates.person_website') }}
            </a>
          </p>
          <StanceChip :stance="person.stance" />
        </div>

        <p class="serif text-body-1 mb-8">{{ lz(person.summary, locale) }}</p>

        <v-card class="pa-6 mb-8" elevation="3" rounded="lg">
          <h3 class="text-h5 font-weight-bold mb-2">{{ t('candidates.person_evidence_heading') }}</h3>
          <EvidenceList v-if="person.evidence.length" :evidence="person.evidence" />
          <p v-else class="text-body-1">{{ t('candidates.person_no_evidence') }}</p>
        </v-card>

        <div v-if="person.links?.contact" class="text-center mb-8">
          <v-btn :href="person.links.contact" target="_blank" rel="noopener noreferrer" variant="outlined">{{ t('candidates.person_contact') }}</v-btn>
        </div>

        <v-card class="pa-6 mb-8" elevation="3" rounded="lg" color="primary" variant="tonal">
          <i18n-t keypath="candidates.person_correction" tag="p" scope="global" class="text-body-1 mb-2">
            <template #email><a href="mailto:contact@panopti.ca">contact@panopti.ca</a></template>
          </i18n-t>
          <p class="text-caption mb-0">{{ t('candidates.disclaimer') }}</p>
        </v-card>

        <div class="text-center mb-4">
          <v-btn :to="localePath('/candidates/' + muni.id)" variant="text" prepend-icon="mdi-arrow-left">{{ t('candidates.person_back', { name: lz(muni.name, locale) }) }}</v-btn>
        </div>
      </v-col></v-row>
    </v-container>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Hero from '@/components/layout/Hero.vue'
import NotFound from './404.vue'
import StanceChip from '@/components/candidates/StanceChip.vue'
import EvidenceList from '@/components/candidates/EvidenceList.vue'
import { useLocalePath } from '@/composables/useLocalePath'
import { getMunicipality, peopleFor, lz } from '@/data/candidates'

const route = useRoute()
const { t, locale } = useI18n()
const { localePath } = useLocalePath()
const muni = getMunicipality(String(route.params.municipality))
const person = muni ? peopleFor(muni.id).find((p) => p.id === route.params.person) : undefined
const statusLine = computed(() => (muni ? t(`candidates.status.${muni.alprStatus}`) : ''))
const officesLine = computed(() => (person ? person.roles.map((r) => lz(r.office, locale.value)).join(' · ') : ''))
if (muni && person) useHead({ title: () => `${person.name} — ${t('candidates.person_title_suffix')}` })
</script>
