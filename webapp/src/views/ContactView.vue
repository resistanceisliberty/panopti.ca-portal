<template>
  <DefaultLayout>
    <v-container>
      <v-row justify="center" class="mb-6">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="text-h3 font-weight-bold mb-4">{{ t('contact.heading') }}</h1>
          <p class="text-h6 text-medium-emphasis">
            {{ t('contact.subheading') }}
          </p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card variant="tonal" class="pa-6 text-center" rounded="lg">
            <v-icon size="40" color="primary" class="mb-3">mdi-email-outline</v-icon>
            <h2 class="text-h6 font-weight-bold mb-2">{{ t('contact.email_heading') }}</h2>
            <p class="text-body-1 mb-4">
              {{ t('contact.email_intro') }}
            </p>
            <v-btn
              color="primary"
              size="large"
              href="mailto:contact@panopti.ca"
              prepend-icon="mdi-email"
            >
              contact@panopti.ca
            </v-btn>
          </v-card>

          <v-alert type="info" variant="tonal" class="mt-6" icon="mdi-camera">
            <i18n-t keypath="contact.alert" tag="span" scope="global">
              <template #link><router-link :to="localePath('/report')">{{ t('contact.alert_link') }}</router-link></template>
            </i18n-t>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '@/composables/useLocalePath';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const { t } = useI18n();
const { localePath } = useLocalePath();
</script>
