<template>
  <div class="dashboard-bg rounded-xl pa-6 pa-sm-4 mx-4 mx-sm-2 text-white">
    <div class="d-flex flex-column flex-sm-row align-center justify-center text-center">
      <!-- ALPRs -->
      <div class="counter-cell d-flex flex-column align-center">
        <v-icon :size="isMobile ? 24 : 32" color="white" class="mb-2">mdi-camera-outline</v-icon>
        <div ref="alprEl" class="font-weight-bold mb-2" :class="isMobile ? 'text-h3' : 'text-h2'">0</div>
        <div class="text-body-1">ALPRs mapped in Canada</div>
      </div>

      <v-divider
        :vertical="!isMobile"
        color="white"
        class="counter-divider border-opacity-25 mx-sm-4 my-3 my-sm-0"
      />

      <!-- Government CCTV -->
      <div class="counter-cell d-flex flex-column align-center">
        <v-icon :size="isMobile ? 24 : 32" color="white" class="mb-2">mdi-cctv</v-icon>
        <div ref="cctvEl" class="font-weight-bold mb-2" :class="isMobile ? 'text-h3' : 'text-h2'">0</div>
        <div class="text-body-1">Government CCTVs mapped in Canada</div>
      </div>
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

// Live counts pulled from the map's own dataset (refreshed several times a day). Government
// CCTV is tagged with brand "Government CCTVs"; everything else is an ALPR.
const COUNT_URL = 'https://maps.panopti.ca/cameras-ca.json';
const CCTV_BRAND = 'Government CCTVs';
const FALLBACK_ALPR = 340;
const FALLBACK_CCTV = 797;

const alprEl: Ref<HTMLElement|null> = ref(null);
const cctvEl: Ref<HTMLElement|null> = ref(null);
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
  let alpr = FALLBACK_ALPR;
  let cctv = FALLBACK_CCTV;
  try {
    const res = await fetch(COUNT_URL, { cache: 'default' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        cctv = data.filter((c) => c && c.brand === CCTV_BRAND).length;
        alpr = data.length - cctv;
      }
    }
  } catch {
    // keep fallbacks
  }
  startCountUp(alprEl.value, alpr);
  startCountUp(cctvEl.value, cctv);
});

function startCountUp(el: HTMLElement | null, value: number) {
  if (!el) return;
  const counter = new CountUp(el, value, countupOptions);
  const elapsed = timeOfMount ? new Date().getTime() - timeOfMount : props.delayMs;
  const wait = Math.max(0, props.delayMs - elapsed);
  setTimeout(() => counter.start(), wait);
}
</script>

<style scoped>
.dashboard-bg {
  background: rgba(0, 0, 0, 0.6);
}
.counter-cell {
  flex: 1 1 0;
  min-width: 0;
}
.counter-divider {
  align-self: stretch;
}
</style>
