<template>
  <DefaultLayout>
    <div class="text-center">
      <h1>{{ t('notfound.title') }}</h1>

      <div class="mt-8 mb-16">
        <v-img height="300" src="/404.webp" :alt="t('notfound.image_alt')" />
        <p class="caption">{{ t('notfound.caption') }}</p>
      </div>

      <v-btn color="primary" :to="localePath('/')"><v-icon start>mdi-home</v-icon>{{ t('notfound.home_link') }}</v-btn>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '@/composables/useLocalePath';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const { t } = useI18n();
const { localePath } = useLocalePath();
</script>

<style scoped>
.caption {
  font-size: 1.2rem;
  color: var(--v-theme-on-surface);
}
</style>
