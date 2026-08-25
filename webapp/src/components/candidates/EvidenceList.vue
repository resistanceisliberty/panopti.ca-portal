<template>
  <v-list density="compact" class="bg-transparent">
    <v-list-item v-for="(ev, i) in evidence" :key="i" class="px-0 mb-5">
      <template #prepend>
        <v-icon size="20" class="mr-2">{{ ICONS[ev.type] }}</v-icon>
      </template>
      <v-list-item-title class="text-body-2 text-wrap">
        <span class="font-weight-bold">
          <a v-if="ev.url" :href="ev.url" target="_blank" rel="noopener noreferrer">{{ lz(ev.title, locale) }}</a>
          <template v-else>{{ lz(ev.title, locale) }}</template>
        </span>
        <span class="text-medium-emphasis"> — {{ t(`candidates.evidence.${ev.type}`) }}, {{ ev.date }}</span>
      </v-list-item-title>
      <v-list-item-subtitle v-if="ev.note" class="note-full">{{ lz(ev.note, locale) }}</v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { lz, type Evidence } from '../../data/candidates'
defineProps<{ evidence: Evidence[] }>()
const { t, locale } = useI18n()
const ICONS = { citation: 'mdi-newspaper-variant-outline', questionnaire: 'mdi-clipboard-text-outline', outreach: 'mdi-phone-outline' }
</script>

<style scoped>
/* Full quote text — Vuetify clamps v-list-item-subtitle to one line by default. */
:deep(.note-full) {
  display: block;
  -webkit-line-clamp: unset;
  white-space: pre-line;
  overflow: visible;
  opacity: 0.9;
  margin-top: 4px;
  padding-left: 10px;
  border-left: 2px solid rgba(var(--v-theme-primary), 0.4);
}
</style>
