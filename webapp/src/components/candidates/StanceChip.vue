<template>
  <v-chip :color="color" :size="small ? 'small' : 'default'" variant="tonal" label>
    <v-icon start :size="small ? 16 : 18">{{ icon }}</v-icon>
    {{ t(`candidates.stance.${stance}`) }}
  </v-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const props = withDefaults(defineProps<{ stance: 'opposes' | 'supports' | 'concerns' | 'no_position'; small?: boolean }>(), { small: false })
const { t } = useI18n()
const color = computed(() => ({ opposes: 'green', supports: 'red', concerns: 'orange', no_position: 'grey' })[props.stance])
const icon = computed(() => ({ opposes: 'mdi-shield-check', supports: 'mdi-cctv', concerns: 'mdi-alert-outline', no_position: 'mdi-help-circle-outline' })[props.stance])
</script>
