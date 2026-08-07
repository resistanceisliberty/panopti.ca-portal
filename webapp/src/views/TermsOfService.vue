<template>
<DefaultLayout>
  <v-container class="narrow-text">
    <h1>{{ t('terms.heading') }}</h1>
    <i18n-t keypath="terms.effective_date" tag="p" scope="global">
      <template #date><b>{{ t('terms.effective_date_value') }}</b></template>
    </i18n-t>

    <p>
      {{ t('terms.intro') }}
    </p>

    <h2>
      {{ t('terms.about_heading') }}
    </h2>
    <p>
      {{ t('terms.about_body') }}
    </p>

    <h2>
      {{ t('terms.responsibilities_heading') }}
    </h2>
    <h3>
      {{ t('terms.tagging_heading') }}
    </h3>
    <p>
      {{ t('terms.tagging_body') }}
    </p>

    <h3>
      {{ t('terms.prohibited_heading') }}
    </h3>
    <p>
      {{ t('terms.prohibited_intro') }}
    </p>

    <ul class="serif">
      <li>{{ t('terms.prohibited_li1') }}</li>
      <li>{{ t('terms.prohibited_li2') }}</li>
      <li>{{ t('terms.prohibited_li3') }}</li>
      <li>{{ t('terms.prohibited_li4') }}</li>
      <li>{{ t('terms.prohibited_li5') }}</li>
      <li>{{ t('terms.prohibited_li6') }}</li>
    </ul>

    <p>
      {{ t('terms.prohibited_outro') }}
    </p>

    <h2>
      {{ t('terms.thirdparty_heading') }}
    </h2>
    <p>
      {{ t('terms.thirdparty_body') }}
    </p>

    <h2>{{ t('terms.disclaimer_heading') }}</h2>
    <p>
      {{ t('terms.disclaimer_intro') }}
    </p>

    <ul class="serif">
      <li>{{ t('terms.disclaimer_li1') }}</li>
      <li>{{ t('terms.disclaimer_li2') }}</li>
      <li>{{ t('terms.disclaimer_li3') }}</li>
    </ul>

    <h2>{{ t('terms.ip_heading') }}</h2>
    <p>
      {{ t('terms.ip_body1') }}
    </p>
    <i18n-t keypath="terms.ip_body2" tag="p" scope="global">
      <template #link><a target="_blank" rel="noopener noreferrer" href="https://github.com/resistanceisliberty/panopti.ca">{{ t('terms.ip_body2_link') }}</a></template>
    </i18n-t>

    <h2>{{ t('terms.termination_heading') }}</h2>
    <p>
      {{ t('terms.termination_body') }}
    </p>

    <h2>{{ t('terms.changes_heading') }}</h2>
    <p>
      {{ t('terms.changes_body') }}
    </p>

    <h2>{{ t('terms.contact_heading') }}</h2>
    <p>
      {{ t('terms.contact_intro') }}
    </p>
    <i18n-t keypath="terms.contact_email" tag="p" scope="global">
      <template #email><a href="mailto:contact@panopti.ca">contact@panopti.ca</a></template>
    </i18n-t>
  </v-container>
</DefaultLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const { t } = useI18n();
</script>
