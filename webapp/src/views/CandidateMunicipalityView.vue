<template>
  <NotFound v-if="!muni" />
  <DefaultLayout v-else>
    <template #header>
      <Hero imageUrl="/council-chamber.jpg" :title="lz(muni.name, locale)" :description="statusLine" />
    </template>
    <v-container>
      <v-row><v-col cols="12" md="10" lg="8" class="mx-auto">

        <v-alert v-if="muni.election" type="info" variant="tonal" class="mb-6"
                 :text="t('candidates.muni_election_banner', { date: muni.election.date, body: lz(muni.election.body, locale) })" />
        <v-alert v-else type="info" variant="tonal" class="mb-6" :text="t('candidates.muni_no_election')" />

        <v-card class="pa-6 mb-8" elevation="3" rounded="lg">
          <h3 class="text-h5 font-weight-bold mb-2">{{ t('candidates.muni_status_heading') }}</h3>
          <p class="text-body-1">{{ lz(muni.statusNote, locale) }}</p>
          <EvidenceList v-if="muni.statusEvidence.length" :evidence="muni.statusEvidence" />
        </v-card>

        <v-card v-if="muni.statusPhotos?.length" class="pa-6 mb-8" elevation="3" rounded="lg">
          <h3 class="text-h6 font-weight-bold mb-1">{{ t('candidates.muni_photos_heading') }}</h3>
          <p class="text-caption text-medium-emphasis mb-4">{{ t('candidates.muni_photos_sub') }}</p>
          <v-row>
            <v-col v-for="(ph, i) in muni.statusPhotos" :key="i" cols="12" sm="6">
              <a :href="ph.src" target="_blank" rel="noopener noreferrer">
                <v-img :src="ph.src" :alt="ph.caption ? lz(ph.caption, locale) : ''" rounded="lg" class="mb-2" style="max-height: 440px;" />
              </a>
              <p v-if="ph.caption" class="text-caption text-medium-emphasis mb-0">{{ lz(ph.caption, locale) }}</p>
            </v-col>
          </v-row>
        </v-card>

        <v-card v-if="opposers.length" class="pa-5 mb-8" rounded="lg" variant="tonal" color="success" border>
          <div class="d-flex align-center mb-2">
            <v-icon class="mr-2">mdi-shield-account</v-icon>
            <h3 class="text-h6 font-weight-bold">{{ t('candidates.muni_opposes_heading') }}</h3>
          </div>
          <v-list class="bg-transparent">
            <v-list-item v-for="p in opposers" :key="p.id"
                         :to="localePath(`/candidates/${muni.id}/${p.id}`)" class="px-2" rounded="lg">
              <v-list-item-title class="font-weight-bold">{{ p.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ allOffices(p) }}</v-list-item-subtitle>
              <template #append><StanceChip :stance="p.stance" small /></template>
            </v-list-item>
          </v-list>
        </v-card>

        <template v-for="group in groups" :key="group.key">
          <h3 class="text-h5 font-weight-bold mb-4">{{ group.title }}</h3>
          <p v-if="!group.people.length" class="text-medium-emphasis mb-8">{{ t('candidates.muni_empty') }}</p>
          <v-list v-else class="mb-8 bg-transparent">
            <v-list-item v-for="p in group.people" :key="p.id"
                         :to="localePath(`/candidates/${muni.id}/${p.id}`)" class="px-2" rounded="lg">
              <v-list-item-title class="font-weight-bold">{{ p.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ officeFor(p, group.key) }}</v-list-item-subtitle>
              <template #append><StanceChip :stance="p.stance" small /></template>
            </v-list-item>
          </v-list>
        </template>

        <p class="text-caption text-medium-emphasis mb-6">{{ t('candidates.disclaimer') }}</p>

        <div class="text-center mb-4">
          <v-btn :href="mapUrl" color="primary" variant="flat" prepend-icon="mdi-map">{{ t('candidates.muni_see_cameras') }}</v-btn>
          <v-btn :to="localePath('/council')" variant="text" class="ml-2">{{ t('candidates.cta_council_button') }}</v-btn>
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
import { getMunicipality, peopleFor, wardOf, lz, type Person } from '@/data/candidates'

const route = useRoute()
const { t, locale } = useI18n()
const { localePath } = useLocalePath()
const muni = getMunicipality(String(route.params.municipality))
const people = muni ? peopleFor(muni.id) : []
// Ward order. Sort on the role actually shown in each section: someone can be a Ward 4
// incumbent running for Mayor, so a person-wide ward would misplace them in one list.
const byWard = (ward: (p: Person) => number) => (a: Person, b: Person) =>
  ward(a) - ward(b) || a.name.localeCompare(b.name)
const wardIn = (p: Person, type: 'incumbent' | 'candidate') => {
  const r = p.roles.find((x) => x.type === type)
  return r ? wardOf(r) : -1
}
const opposers = computed(() =>
  people.filter((p) => p.stance === 'opposes').sort(byWard((p) => Math.min(...p.roles.map(wardOf)))))
const allOffices = (p: Person) => p.roles.map((r) => lz(r.office, locale.value)).join(' · ')
const statusLine = computed(() => (muni ? t(`candidates.status.${muni.alprStatus}`) : ''))
const groups = computed(() => {
  if (!muni) return []
  const g: { key: 'incumbent' | 'candidate'; title: string; people: Person[] }[] =
    [{ key: 'incumbent', title: t('candidates.muni_sitting'), people: people.filter((p) => p.roles.some((r) => r.type === 'incumbent')).sort(byWard((p) => wardIn(p, 'incumbent'))) }]
  if (muni.election) g.push({ key: 'candidate' as const, title: t('candidates.muni_candidates', { date: muni.election.date }), people: people.filter((p) => p.roles.some((r) => r.type === 'candidate')).sort(byWard((p) => wardIn(p, 'candidate'))) })
  return g
})
function officeFor(p: Person, roleType: 'incumbent' | 'candidate') {
  const r = p.roles.find((x) => x.type === roleType)
  return r ? lz(r.office, locale.value) : ''
}
const mapUrl = computed(() => (muni ? `https://maps.panopti.ca/?lat=${muni.coords[1]}&lng=${muni.coords[0]}&zoom=12` : ''))
if (muni) useHead({ title: () => `${lz(muni.name, locale.value)} — ${t('candidates.muni_title_suffix')}` })
</script>
