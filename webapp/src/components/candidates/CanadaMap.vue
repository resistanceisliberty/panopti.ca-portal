<template>
  <svg :viewBox="MAP_VIEWBOX" role="group" :aria-label="t('candidates.map_aria')" class="canada-map">
    <path :d="canadaPath" fill="#e8eef1" stroke="#b9c6cc" stroke-width="1" />
    <a v-for="m in municipalities" :key="m.id" :href="localePath(`/candidates/${m.id}`)">
      <circle :cx="project(m.coords[0], m.coords[1])[0]" :cy="project(m.coords[0], m.coords[1])[1]"
              r="9" :fill="m.alprStatus === 'installed' ? '#c62828' : 'var(--df-blue)'"
              stroke="#fff" stroke-width="2" class="muni-dot" />
      <title>{{ lz(m.name, locale) }} — {{ t(`candidates.status.${m.alprStatus}`) }}</title>
    </a>
  </svg>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '../../composables/useLocalePath'
import { getMunicipalities, project, lz, MAP_VIEWBOX } from '../../data/candidates'
import canadaPath from './canada-path.txt?raw'
const { t, locale } = useI18n()
const { localePath } = useLocalePath()
const municipalities = getMunicipalities()
</script>

<style scoped>
.canada-map { width: 100%; height: auto; display: block; }
.muni-dot { transition: r 0.15s; cursor: pointer; }
a:hover .muni-dot, a:focus .muni-dot { r: 13; }
a:focus { outline: 2px solid var(--df-blue); outline-offset: 2px; }
</style>
