<template>
  <v-expansion-panels multiple :model-value :readonly="showAll">
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('faq.necessary_q') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <i18n-t keypath="faq.necessary_a" tag="p" scope="global">
          <template #section8><b>{{ t('faq.necessary_a_section8') }}</b></template>
          <template #everyone><b>{{ t('faq.necessary_a_everyone') }}</b></template>
        </i18n-t>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('faq.nothingtohide_q') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <h3 class="mb-2">{{ t('faq.nothingtohide_h1') }}</h3>
        <p class="pl-6">
          {{ t('faq.nothingtohide_p1') }}
        </p>
        <i18n-t keypath="faq.nothingtohide_p2" tag="p" scope="global" class="pl-6">
          <template #until><b>{{ t('faq.nothingtohide_p2_until') }}</b></template>
        </i18n-t>

        <h3 class="mb-2 mt-8">{{ t('faq.nothingtohide_h2') }}</h3>
        <p class="pl-6">
          {{ t('faq.nothingtohide_p3') }}
        </p>
        <p class="pl-6">
          {{ t('faq.nothingtohide_p4') }}
        </p>

      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('faq.onlycrimes_q') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <i18n-t keypath="faq.onlycrimes_p1" tag="p" scope="global">
          <template #allvehicles><b>{{ t('faq.onlycrimes_p1_allvehicles') }}</b></template>
        </i18n-t>
        <p>
          {{ t('faq.onlycrimes_p2') }}
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('faq.warrant_q') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <i18n-t keypath="faq.warrant_p1" tag="p" scope="global">
          <template #everyone><b>{{ t('faq.warrant_p1_everyone') }}</b></template>
          <template #oversight><b>{{ t('faq.warrant_p1_oversight') }}</b></template>
          <template #section8><b>{{ t('faq.warrant_p1_section8') }}</b></template>
        </i18n-t>
        <i18n-t keypath="faq.warrant_p2" tag="p" scope="global">
          <template #crossborder><b>{{ t('faq.warrant_p2_crossborder') }}</b></template>
        </i18n-t>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('faq.oversight_q') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <i18n-t keypath="faq.oversight_p1" tag="p" scope="global">
          <template #lead><b>{{ t('faq.oversight_p1_lead') }}</b></template>
        </i18n-t>
        <i18n-t keypath="faq.oversight_p2" tag="p" scope="global">
          <template #portal><b>{{ t('faq.oversight_p2_portal') }}</b></template>
          <template #lackdata><b>{{ t('faq.oversight_p2_lackdata') }}</b></template>
        </i18n-t>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel id="faq-transparency">
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('faq.transparency_q') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <i18n-t keypath="faq.transparency_p1" tag="p" scope="global">
          <template #incomplete><i>{{ t('faq.transparency_p1_incomplete') }}</i></template>
          <template #misleading><i>{{ t('faq.transparency_p1_misleading') }}</i></template>
        </i18n-t>
        <i18n-t keypath="faq.transparency_p2" tag="p" scope="global">
          <template #portal><a href="https://transparency.flocksafety.com/boulder-co-pd" target="_blank" rel="noopener noreferrer">{{ t('faq.transparency_p2_portal') }}</a></template>
          <template #request><a href="https://www.muckrock.com/foi/boulder-172/boulder-alpr-audits-187797/" target="_blank" rel="noopener noreferrer">{{ t('faq.transparency_p2_request') }}</a></template>
          <template #count><b>{{ t('faq.transparency_p2_count') }}</b></template>
        </i18n-t>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('faq.trust_q') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <i18n-t keypath="faq.trust_p1" tag="p" scope="global">
          <template #link><a target="_blank" rel="noopener noreferrer" href="https://www.404media.co/flock-logins-exposed-in-malware-infections-senator-asks-ftc-to-investigate-the-company/">{{ t('faq.trust_p1_link') }}</a></template>
        </i18n-t>
        <i18n-t keypath="faq.trust_p2" tag="p" scope="global">
          <template #nocontracts><a href="https://youtu.be/aMfO7D-f7U0?si=23FNwA91zVTwxb02&t=898" target="_blank" rel="noopener noreferrer">{{ t('faq.trust_p2_nocontracts') }}</a></template>
          <template #found><a href="https://www.9news.com/article/news/local/flock-federal-immigration-agents-access-tracking-data/73-a8aee742-56d4-4a57-b5bb-0373286dfef8" target="_blank" rel="noopener noreferrer">{{ t('faq.trust_p2_found') }}</a></template>
        </i18n-t>
        <p>
          {{ t('faq.trust_p3') }}
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        {{ t('faq.remove_q') }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          {{ t('faq.remove_p1') }}
        </p>
        <i18n-t keypath="faq.remove_p2" tag="p" scope="global">
          <template #link><router-link :to="localePath('/council')">{{ t('faq.remove_p2_link') }}</router-link></template>
        </i18n-t>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '@/composables/useLocalePath';

const { t } = useI18n();
const { localePath } = useLocalePath();

const props = defineProps({
  showAll: {
    type: Boolean,
    default: false,
  }
});

// Map hash values to panel indices
const hashToPanelIndex: Record<string, number> = {
  '#faq-transparency': 5,
  // Add more mappings here if you add more panel hashes
};

const modelValue = ref(props.showAll ? [0,1,2,3,4,5,6,7] : []);

function updatePanelFromHash() {
  const hash = window.location.hash;
  if (props.showAll) {
    modelValue.value = [0,1,2,3,4,5,6,7];
    return;
  }
  if (hashToPanelIndex.hasOwnProperty(hash)) {
    modelValue.value = [hashToPanelIndex[hash]];
  } else {
    modelValue.value = [];
  }
}

onMounted(() => {
  updatePanelFromHash();
  window.addEventListener('hashchange', updatePanelFromHash);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', updatePanelFromHash);
});

watch(() => props.showAll, (val) => {
  if (val) {
    modelValue.value = [0,1,2,3,4,5,6,7];
  } else {
    updatePanelFromHash();
  }
});
</script>

<style scoped>
blockquote {
  border-left: 4px solid #616161;
  padding-left: 16px;
  font-style: italic;
  margin-top: 16px;
  margin-bottom: 8px;
}

p {
  margin-bottom: 16px;
}

ul {
  margin-left: 16px;
  margin-bottom: 16px;
}
</style>
