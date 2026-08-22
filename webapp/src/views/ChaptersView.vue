<template>
  <DefaultLayout>
    <template #header>
      <Hero imageUrl="/door-knock.jpg" :title="t('chapters.title')" :description="t('chapters.subtitle')" />
    </template>
    <v-container>
      <v-row><v-col cols="12" md="10" lg="8" class="mx-auto">
        <p class="text-body-1 mb-6">{{ t('chapters.intro') }}</p>

        <v-card v-for="c in chapters" :key="c.id" class="pa-6 mb-4" rounded="lg" elevation="2" border>
          <div class="d-flex align-center mb-2">
            <v-icon color="primary" size="30" class="mr-3">mdi-account-group</v-icon>
            <h3 class="text-h5 font-weight-bold mb-0">{{ lz(c.name, locale) }}</h3>
          </div>
          <p v-if="c.blurb" class="text-body-1 mb-4">{{ lz(c.blurb, locale) }}</p>
          <v-btn :href="c.url" target="_blank" rel="noopener noreferrer" color="primary" variant="flat" prepend-icon="mdi-open-in-new" class="mr-2 mb-2">{{ t('chapters.visit_site') }}</v-btn>
          <v-btn :to="localePath(`/candidates/${c.municipality}`)" variant="outlined" prepend-icon="mdi-map-marker" class="mb-2">{{ t('chapters.view_municipality') }}</v-btn>
        </v-card>

        <p class="text-body-2 text-medium-emphasis mt-8">
          {{ t('chapters.start_one') }}
          <RouterLink :to="localePath('/contact')">{{ t('chapters.contact_us') }}</RouterLink>.
        </p>
      </v-col></v-row>
    </v-container>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Hero from '@/components/layout/Hero.vue'
import { useLocalePath } from '@/composables/useLocalePath'
import { lz } from '@/data/candidates'
import { chapters } from '@/data/chapters'
const { t, locale } = useI18n()
const { localePath } = useLocalePath()
</script>
