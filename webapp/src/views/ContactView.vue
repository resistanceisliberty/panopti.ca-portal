<template>
  <DefaultLayout>
    <v-container>
      <v-row justify="center" class="mb-6">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="text-h3 font-weight-bold mb-4">Contact Us</h1>
          <p class="text-h6 text-medium-emphasis">
            We'd love to hear from you.
          </p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card variant="tonal" class="pa-6 text-center" rounded="lg">
            <v-icon size="40" color="primary" class="mb-3">mdi-email-outline</v-icon>
            <h2 class="text-h6 font-weight-bold mb-2">Email us</h2>
            <p class="text-body-1 mb-4">
              Questions, corrections, media enquiries, or want to help out? Reach us at:
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
            Spotted a camera? You don't need to email us — you can
            <router-link to="/report">add it to the map yourself</router-link>
            directly through OpenStreetMap.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
</script>
