<template>
<DefaultLayout>
  <template #header>
    <Hero
      imageUrl="/id.webp"
      :title="t('report.hero_title')"
      :description="t('report.hero_desc')"
    />
  </template>

  <v-container>
    <h1 class="text-center">
      {{ t('report.heading') }}
    </h1>

    <p class="text-center text-medium-emphasis mb-5">
      {{ t('report.intro') }}
    </p>

    <v-alert variant="tonal" color="rgb(18, 151, 195)" class="mb-6" border="start">
      <div class="d-flex flex-column flex-sm-row align-center justify-space-between ga-3">
        <span>{{ t('report.guided_alert_text') }}</span>
        <v-btn href="https://maps.panopti.ca/?add=1" target="_blank" rel="noopener" color="rgb(18, 151, 195)" variant="flat">
          {{ t('report.guided_alert_btn') }}
        </v-btn>
      </div>
    </v-alert>

    <div class="d-flex justify-center mb-2">
      <v-btn-toggle v-model="deviceType" mandatory color="rgb(18, 151, 195)" variant="outlined" divided rounded>
        <v-btn value="alpr" prepend-icon="mdi-car"><span>{{ t('report.toggle_alpr') }}</span></v-btn>
        <v-btn value="cctv" prepend-icon="mdi-cctv"><span>{{ t('report.toggle_cctv') }}</span></v-btn>
      </v-btn-toggle>
    </div>

    <v-stepper-vertical color="rgb(18, 151, 195)" v-model="step" flat non-linear class="my-8" edit-icon="mdi-home">
      <template v-slot:default="{ step }: { step: any }">
        <v-stepper-vertical-item
          class="transparent"
          :complete="step > 1"
          :title="t('report.step1_title')"
          value="1"
          editable
        >
          <i18n-t keypath="report.step1_body" tag="p" scope="global">
            <template #signup><a href="https://www.openstreetmap.org/user/new" target="_blank" rel="noopener noreferrer">{{ t('report.step1_body_signup') }}</a></template>
          </i18n-t>
        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          class="transparent"
          :complete="step > 2"
          :title="t('report.step2_title')"
          value="2"
          editable
        >
          <i18n-t keypath="report.step2_body" tag="p" scope="global">
            <template #launch><a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer">{{ t('report.step2_body_launch') }}</a></template>
          </i18n-t>
        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          class="transparent"
          :complete="step > 3"
          :title="t('report.step3_title')"
          value="3"
          editable
        >
          <i18n-t keypath="report.step3_intro" tag="p" scope="global">
            <template #edit><strong>{{ t('report.step3_intro_edit') }}</strong></template>
          </i18n-t>
          <v-img max-width="450" src="/edit-map.png" class="my-8" />

          <v-alert
            variant="tonal"
            type="warning"
            class="mt-16 mb-6"
          >
            <i18n-t keypath="report.step3_warning" tag="p" scope="global">
              <template #standalone><strong>{{ t('report.step3_warning_standalone') }}</strong></template>
            </i18n-t>
          </v-alert>

          <i18n-t keypath="report.step3_add_point" tag="p" scope="global" class="mb-8">
            <template #point><strong>{{ t('report.step3_add_point_btn') }}</strong></template>
          </i18n-t>

          <!-- ALPR: pick a manufacturer for brand-specific tags -->
          <template v-if="deviceType === 'alpr'">
            <v-divider class="my-4"><span class="serif text-grey-darken-2">{{ t('report.choose_manufacturer') }}</span></v-divider>
            <OSMTagSelector />
          </template>

          <!-- Government CCTV: fixed government tag set -->
          <template v-else>
            <v-divider class="my-4"><span class="serif text-grey-darken-2">{{ t('report.cctv_tags_divider') }}</span></v-divider>
            <div class="mx-auto" style="max-width: 460px;">
              <h3 class="text-center serif mb-2">{{ t('report.tags_to_copy') }}</h3>
              <DFCode :osm-tags="cctvBaseTags" :highlight-values-for-keys="['surveillance:type', 'operator:type']" />

              <h5 class="text-center mt-4 serif">{{ t('report.name_operator') }}</h5>
              <DFCode :osm-tags="cctvOperatorTags" :highlight-values-for-keys="['operator']" :show-copy-button="false" />

              <v-alert variant="tonal" type="info" class="mt-6 text-body-2">
                <i18n-t keypath="report.operator_alert" tag="span" scope="global">
                  <template #tag1><code>operator:type=government</code></template>
                  <template #layer><strong>{{ t('report.toggle_cctv') }}</strong></template>
                  <template #operator><code>operator</code></template>
                  <template #zone><code>surveillance:zone=traffic</code></template>
                  <template #mount><code>camera:mount</code></template>
                  <template #direction><code>camera:direction</code></template>
                </i18n-t>
              </v-alert>
            </div>
          </template>

          <v-divider class="mb-4 mt-8" />

          <i18n-t keypath="report.step3_paste" tag="p" scope="global" class="mt-8">
            <template #tags><strong>{{ t('report.step3_paste_field') }}</strong></template>
          </i18n-t>
          <v-img max-width="450" class="my-8" src="/paste-tags.png" />
        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          class="transparent"
          :complete="step > 4"
          :title="t('report.step4_title')"
          value="4"
          editable
        >
          <v-img
            max-width="450"
            class="my-8"
            src="/adjust-angle.png"
          />
          <p>
            {{ t('report.step4_body1') }}
          </p>

          <v-img
            max-width="450"
            class="my-8"
            src="/multi-directional-marker.png"
          />
          <i18n-t keypath="report.step4_body2" tag="p" scope="global">
            <template #semicolon><code>;</code></template>
          </i18n-t>
        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          class="transparent"
          :complete="step > 5"
          :title="t('report.step5_title')"
          value="5"
          editable
        >
          <i18n-t keypath="report.step5_intro" tag="p" scope="global">
            <template #signup><a target="_blank" rel="noopener noreferrer" href="https://auth.wikimedia.org/commonswiki/wiki/Special:CreateAccount">{{ t('report.step5_intro_signup') }}</a></template>
          </i18n-t>

          <v-img
            max-width="450"
            class="my-8"
            src="/wikimedia-instructions/informational.png"
          />
          <i18n-t keypath="report.step5_wizard" tag="p" scope="global">
            <template #wizard><a target="_blank" rel="noopener noreferrer" href="https://commons.wikimedia.org/wiki/Special:UploadWizard">{{ t('report.step5_wizard_link') }}</a></template>
          </i18n-t>

          <v-img
            max-width="450"
            class="my-8"
            src="/wikimedia-instructions/upload_continue.png"
          />
          <i18n-t keypath="report.step5_upload" tag="p" scope="global">
            <template #continue><strong>{{ t('report.step5_upload_btn') }}</strong></template>
          </i18n-t>

          <v-img
            max-width="450"
            class="my-8"
            src="/wikimedia-instructions/license.png"
          />
          <i18n-t keypath="report.step5_license" tag="p" scope="global">
            <template #cc0><strong>{{ t('report.step5_license_cc0') }}</strong></template>
          </i18n-t>

          <v-img
            max-width="450"
            class="my-8"
            src="/wikimedia-instructions/title.png"
          />
          <p>
            <i18n-t keypath="report.step5_title_caption" tag="span" scope="global">
              <template #example><code>{{ t('report.step5_title_caption_example') }}</code></template>
            </i18n-t>
            <br><br>
            <i18n-t keypath="report.step5_publish" tag="span" scope="global">
              <template #publish><strong>{{ t('report.step5_publish_btn') }}</strong></template>
            </i18n-t>
          </p>

          <v-img
            max-width="500"
            class="my-8"
            src="/wikimedia-instructions/copy_paste_title.png"
          />
          <i18n-t keypath="report.step5_link_image" tag="p" scope="global">
            <template #file><code>File:</code></template>
            <template #jpg><code>.jpg</code></template>
            <template #tagname><code>wikimedia_commons</code></template>
          </i18n-t>

        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          class="transparent"
          :complete="step > 6"
          :title="t('report.step6_title')"
          value="6"
          editable
        >
          <i18n-t keypath="report.step6_body" tag="p" scope="global">
            <template #save><strong>{{ t('report.step6_body_save') }}</strong></template>
          </i18n-t>
          <v-alert
            variant="tonal"
            type="info"
            class="my-6"
            :title="t('report.time_alert_title')"
          >
            <i18n-t keypath="report.time_alert_body" tag="p" scope="global">
              <template #often><i>{{ t('report.time_alert_often') }}</i></template>
            </i18n-t>
          </v-alert>
        </v-stepper-vertical-item>
      </template>
    </v-stepper-vertical>
  </v-container>
</DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Hero from '@/components/layout/Hero.vue';
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import OSMTagSelector from '@/components/OSMTagSelector.vue';
import DFCode from '@/components/DFCode.vue';
import { VStepperVerticalItem, VStepperVertical } from 'vuetify/labs/components';
import { useVendorStore } from '@/stores/vendorStore';

const { t } = useI18n();

// Which device the instructions target: ALPR (default) or government CCTV.
const deviceType = ref<'alpr' | 'cctv'>('alpr');

// Government CCTV; operator:type=government puts it in the "Government CCTV" layer.
const cctvBaseTags: Record<string, string> = {
  'man_made': 'surveillance',
  'surveillance:type': 'camera',
  'operator:type': 'government',
};
const cctvOperatorTags: Record<string, string> = {
  'operator': '[City or agency, e.g. City of Toronto]',
};

const step = ref(parseInt((typeof localStorage !== 'undefined' && localStorage.getItem('currentStep')) || '1'));

onMounted(() => {
  step.value = parseInt(localStorage.getItem('currentStep') || '1');
  
  // Pre-warm the vendor cache for the tag selector (it also loads on its own).
  const vendorStore = useVendorStore();
  void vendorStore.loadAllVendors().catch(() => {});
});

watch(step, (newStep) => {
  localStorage.setItem('currentStep', newStep.toString());
});
</script>
