<template>
  <div class="dashboard-bg rounded-xl pa-6 pa-sm-4 mx-4 mx-sm-2 text-white">
    <div class="d-flex flex-column align-center text-center">
      <v-icon :size="isMobile ? 24 : 32" color="white" class="mb-2">mdi-camera-outline</v-icon>
      <div ref="counterEl" class="font-weight-bold mb-2" :class="isMobile ? 'text-h3' : 'text-h2'">0</div>
      <div class="text-body-1">ALPRs mapped in Canada</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useDisplay } from 'vuetify'
import { CountUp } from 'countup.js';

const props = defineProps({
  delayMs: {
    type: Number,
    default: 200,
  }
});

// Live count of Canadian ALPRs, pulled from the map's own dataset (refreshed
// nightly). Falls back to a sane default if the fetch fails.
const COUNT_URL = 'https://maps.panopti.ca/cameras-ca.json';
const FALLBACK_COUNT = 156;

const counterEl: Ref<HTMLElement|null> = ref(null);
const countupOptions = {
  useEasing: true,
  useGrouping: true,
  separator: ',',
  decimal: '.',
};
const { xs: isMobile } = useDisplay();
let timeOfMount: number | undefined = undefined;

onMounted(async () => {
  timeOfMount = new Date().getTime();
  let count = FALLBACK_COUNT;
  try {
    const res = await fetch(COUNT_URL, { cache: 'default' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) count = data.length;
    }
  } catch {
    // keep fallback
  }
  startCountUp(count);
});

function startCountUp(value: number) {
  if (!counterEl.value) return;
  const counter = new CountUp(counterEl.value, value, countupOptions);
  const elapsed = timeOfMount ? new Date().getTime() - timeOfMount : props.delayMs;
  const wait = Math.max(0, props.delayMs - elapsed);
  setTimeout(() => counter.start(), wait);
}
</script>

<style scoped>
.dashboard-bg {
  background: rgba(0, 0, 0, 0.6);
}
</style>
