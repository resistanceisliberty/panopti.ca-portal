<template>
<DefaultLayout>
  <template #header>
    <Hero
      :title="t('identify.hero_title')"
      :description="t('identify.hero_desc')"
      gradient="linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%)"
    />
  </template>

  <v-container fluid>
    <v-container>
      <v-tabs
        v-model="activeTab"
        align-tabs="center"
        color="primary"
        class="mb-6"
      >
        <v-tab value="alprs">{{ t('identify.tab_alprs') }}</v-tab>
        <v-tab value="other">{{ t('identify.tab_other') }}</v-tab>
      </v-tabs>
    </v-container>

    <v-window v-model="activeTab">
      <!-- ALPR Tab -->
      <v-window-item value="alprs">
        <v-container>
          <v-expansion-panels>
            <v-expansion-panel elevation="2">
              <v-expansion-panel-title class="text-h5 font-weight-bold">
                {{ t('identify.common_features_title') }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list lines="two">
                  <v-list-item prepend-icon="mdi-eye">
                    <v-list-item-title class="text-h6">{{ t('identify.feature1_title') }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <i18n-t keypath="identify.feature1_body" tag="span" scope="global">
                        <template #rear><b>{{ t('identify.feature1_body_rear') }}</b></template>
                      </i18n-t>
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item prepend-icon="mdi-lightbulb-on">
                    <v-list-item-title class="text-h6">{{ t('identify.feature2_title') }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <i18n-t keypath="identify.feature2_body" tag="span" scope="global">
                        <template #glow><b>{{ t('identify.feature2_body_glow') }}</b></template>
                      </i18n-t>
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item prepend-icon="mdi-solar-panel">
                    <v-list-item-title class="text-h6">{{ t('identify.feature3_title') }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <i18n-t keypath="identify.feature3_body" tag="span" scope="global">
                        <template #solar><b>{{ t('identify.feature3_body_solar') }}</b></template>
                      </i18n-t>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>

        <v-container class="mb-12">
          <h2 class="text-h4 text-center mt-3">{{ t('identify.vendors_heading') }}</h2>
          <p class="text-center text-medium-emphasis mb-8">
            {{ t('identify.vendors_subheading') }}
          </p>

          <!-- Skeleton Loader -->
          <v-row v-if="loading">
            <v-col cols="12" md="6" v-for="n in 4" :key="`skeleton-${n}`" class="mb-4">
              <v-card class="vendor-card h-100" elevation="2">
                <v-card-title class="text-center" style="background-color: #f5f5f5;">
                  <v-skeleton-loader type="image" style="height:48px; width:150px; margin:0 auto;" />
                </v-card-title>
                <v-card-subtitle class="text-center pa-4">
                  <v-skeleton-loader type="text" width="80%" />
                </v-card-subtitle>
                <v-card-text class="pa-4">
                  <v-row>
                    <v-col cols="6" v-for="i in 4" :key="`skeleton-img-${i}`">
                      <v-skeleton-loader type="image" :height="120" />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col cols="12" md="6" v-for="vendor in vendorStore.lprVendors" :key="vendor.id" class="mb-4">
              <v-card class="vendor-card h-100 d-flex flex-column justify-space-between" elevation="2">
                <v-card-title class="text-center" style="background-color: #f5f5f5;">
                  <v-img v-if="vendor.logoUrl" contain :src="vendor.logoUrl" :alt="t('identify.vendor_logo_alt', { vendor: vendor.shortName })" style="height: 48px;" />
                  <div
                    style="height: 48px; display: flex; align-items: center; justify-content: center;"
                    class="font-weight-bold text-black"
                    v-else
                  >
                    {{ vendor.shortName }}
                  </div>
                </v-card-title>
                <v-card-subtitle class="text-center pa-4 text-h6" style="white-space: normal; word-break: break-word;">
                  {{ vendor.identificationHints }}
                </v-card-subtitle>
                <v-card-text class="pa-4 d-flex flex-column justify-space-between">
                  <v-row>
                    <v-col v-for="{ url: imageUrl } in vendor.urls" :key="imageUrl" cols="6">
                      <v-card class="image-card" elevation="1" @click="openImageInNewTab(imageUrl)">
                        <v-img
                          :src="imageUrl"
                          :alt="t('identify.vendor_photo_alt', { vendor: vendor.shortName })"
                          :aspect-ratio="4/3"
                          cover
                          class="cursor-pointer"
                        >
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-divider class="my-4" />

                  <div class="mt-4">
                    <h4 class="text-center mb-2">{{ t('identify.osm_tags_heading') }}</h4>
                    <DFCode
                      v-if="hasOsmTags(vendor.osmTags)"
                      :osm-tags="getMergedTags(vendor)"
                      :highlight-values-for-keys="getVendorTagKeys(vendor)"
                    />
                    <div v-else class="text-center pa-4 text-medium-emphasis">
                      {{ t('identify.coming_soon') }}
                    </div>
                    <div class="text-center mt-3">
                      <v-btn
                        color="var(--df-blue)"
                        class="text-white mt-3"
                        variant="elevated"
                        size="large"
                        :disabled="!hasOsmTags(vendor.osmTags)"
                        @click="onAddToApp(vendor.shortName, vendor.osmTags, true, true, null)"
                        prepend-icon="mdi-map-marker-plus"
                      >
                        {{ t('identify.report_to_osm_btn') }}
                      </v-btn>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>

      <!-- Other Surveillance Tab -->
      <v-window-item value="other">
        <v-container class="mb-12">
          <!-- Skeleton Loader -->
          <div v-if="loadingOther">
            <v-row>
              <v-col cols="12" md="6" v-for="n in 4" :key="`skeleton-other-${n}`" class="mb-4">
                <v-card class="vendor-card h-100" elevation="2">
                  <v-card-title class="text-center" style="background-color: #f5f5f5;">
                    <v-skeleton-loader type="text" style="height:48px; width:150px; margin:0 auto;" />
                  </v-card-title>
                  <v-card-text class="pa-4">
                    <v-row>
                      <v-col cols="6" v-for="i in 4" :key="`skeleton-other-img-${i}`">
                        <v-skeleton-loader type="image" :height="120" />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <div v-else>
            <div v-for="(devices, category) in devicesByCategory" :key="category" class="mb-8">
              <h2 class="text-h4 text-center mt-6 mb-6">{{ category }}</h2>
              
              <v-row>
                <v-col cols="12" md="6" v-for="device in devices" :key="device.id" class="mb-4">
                  <v-card class="vendor-card h-100 d-flex flex-column justify-space-between" elevation="2">
                    <v-card-title class="text-center" style="background-color: #f5f5f5;">
                      <div
                        style="height: 48px; display: flex; align-items: center; justify-content: center;"
                        class="font-weight-bold text-black"
                      >
                        {{ device.name }}
                      </div>
                    </v-card-title>
                    <v-card-subtitle v-if="device.capabilities" class="text-center pa-4 text-h6" style="white-space: normal; word-break: break-word;">
                      {{ device.capabilities }}
                    </v-card-subtitle>
                    <v-card-text class="pa-4 d-flex flex-column justify-space-between">
                      <v-row>
                        <v-col v-for="{ url: imageUrl } in device.urls" :key="imageUrl" cols="6">
                          <v-card class="image-card" elevation="1" @click="openImageInNewTab(imageUrl)">
                            <v-img
                              :src="imageUrl"
                              :alt="t('identify.other_device_photo_alt', { device: device.name })"
                              :aspect-ratio="4/3"
                              cover
                              class="cursor-pointer"
                            >
                            </v-img>
                          </v-card>
                        </v-col>
                      </v-row>

                      <v-divider class="my-4" />

                      <div class="mt-4">
                        <h4 class="text-center mb-2">{{ t('identify.osm_tags_heading') }}</h4>
                        <DFCode
                          v-if="hasOsmTags(device.osmTags)"
                          :osm-tags="device.osmTags"
                        />
                        <div v-else class="text-center pa-4 text-medium-emphasis">
                          {{ t('identify.coming_soon') }}
                        </div>
                        <div class="text-center mt-3">
                          <v-btn
                            color="var(--df-blue)"
                            class="text-white mt-3"
                            variant="elevated"
                            size="large"
                            :disabled="!hasOsmTags(device.osmTags)"
                            @click="onAddToApp(device.name, device.osmTags, false, device.requiresDirection, device.fov ?? null)"
                            prepend-icon="mdi-map-marker-plus"
                          >
                            {{ t('identify.report_to_osm_btn') }}
                          </v-btn>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            <div class="text-center text-body-1">
              {{ t('identify.no_device_note') }}
            </div>
          </div>
        </v-container>
      </v-window-item>
    </v-window>

    <!-- Action Section -->
    <v-container class="text-center mb-12">
      <v-card class="action-card pa-8" elevation="0" color="transparent">
        <v-card-title class="text-h4 mb-4">{{ t('identify.found_heading') }}</v-card-title>
        <v-card-text>
          <v-btn
            size="x-large"
            color="var(--df-blue)"
            :to="localePath('/report')"
            prepend-icon="mdi-map-marker-plus"
            variant="elevated"
            class="text-white"
          >
            {{ t('identify.add_to_map_btn') }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Hero from '@/components/layout/Hero.vue';
import DFCode from '@/components/DFCode.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '@/composables/useLocalePath';
import { useVendorStore } from '@/stores/vendorStore';
import { lprBaseTags } from '@/constants';
import type { LprVendor, OtherSurveillanceDevice } from '@/types';

const { t } = useI18n();
const { localePath } = useLocalePath();

function openImageInNewTab(url: string) {
  // Validate before opening: the URL comes from the remote CMS, and noopener
  // prevents the opened tab from reaching back via window.opener.
  if (!/^https:\/\//i.test(url)) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

const router = useRouter();
const route = useRoute();

const activeTab = computed({
  get: () => {
    const tab = route.query.tab as string;
    return tab === 'other' ? 'other' : 'alprs';
  },
  set: (tab: string) => {
    router.push({
      path: route.path,
      query: { ...route.query, tab: tab === 'alprs' ? undefined : tab }
    });
  }
});

const loading = ref(true);
const loadingOther = ref(true);
const vendorStore = useVendorStore();

function getMergedTags(vendor: LprVendor): Record<string, string> {
  return { ...lprBaseTags, ...vendor.osmTags };
}

function getVendorTagKeys(vendor: LprVendor): string[] {
  return Object.keys(vendor.osmTags ?? {});
}

function hasOsmTags(osmTags: Record<string, string> | undefined): boolean {
  return osmTags !== undefined && Object.keys(osmTags).length > 0;
}

// Group other surveillance devices by category, preserving CMS order
const devicesByCategory = computed(() => {
  const grouped: Record<string, OtherSurveillanceDevice[]> = {};
  
  for (const device of vendorStore.otherDevices) {
    if (!grouped[device.category]) {
      grouped[device.category] = [];
    }
    grouped[device.category].push(device);
  }
  
  return grouped;
});

onMounted(async () => {
  await Promise.all([
    vendorStore.loadAllVendors().then(() => { loading.value = false; }),
    vendorStore.loadAllOtherDevices().then(() => { loadingOther.value = false; })
  ]);
});

function onAddToApp(
  _name?: string,
  _osmTags?: Record<string, string>,
  _isAlpr?: boolean,
  _requiresDirection?: boolean,
  _fov?: number | null,
) {
  // No separate Canadian app yet — send users to the OSM report guide.
  router.push(localePath('/report'));
}
</script>

<style scoped>
.vendor-card {
  transition: transform 0.2s ease-in-out;
}

.image-card {
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

.image-card:hover {
  transform: scale(1.05);
}

.cursor-pointer {
  cursor: pointer;
}

h1, h2, h3 {
  color: rgb(var(--v-theme-on-surface));
}
</style>