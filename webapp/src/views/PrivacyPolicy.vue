<template>
<DefaultLayout>
  <v-container class="narrow-text">
    <h1>{{ t('privacy.heading') }}</h1>
    <i18n-t keypath="privacy.effective_date" tag="p" scope="global">
      <template #date><b>{{ t('privacy.effective_date_value') }}</b></template>
    </i18n-t>

    <p>
      {{ t('privacy.intro') }}
    </p>

    <h2>{{ t('privacy.collect_heading') }}</h2>
    <p>
      {{ t('privacy.collect_body') }}
    </p>

    <h2>{{ t('privacy.thirdparty_heading') }}</h2>
    <p>
      {{ t('privacy.thirdparty_body') }}
    </p>

    <h2>{{ t('privacy.choices_heading') }}</h2>
    <p>
      {{ t('privacy.choices_body') }}
    </p>

    <h2>{{ t('privacy.contact_heading') }}</h2>
    <p>
      {{ t('privacy.contact_intro') }}
    </p>
    <i18n-t keypath="privacy.contact_email" tag="p" scope="global">
      <template #email><a href="mailto:contact@panopti.ca">contact@panopti.ca</a></template>
    </i18n-t>

    <h2>{{ t('privacy.updates_heading') }}</h2>
    <p>
      {{ t('privacy.updates_body') }}
    </p>
  </v-container>
</DefaultLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const { t } = useI18n();
</script>
