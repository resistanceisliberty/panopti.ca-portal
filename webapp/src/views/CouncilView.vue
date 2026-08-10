<template>
<DefaultLayout>
  <template #header>
    <Hero
      imageUrl="/city-council.jpg"
      :title="t('council.hero_title')"
      :description="t('council.hero_desc')"
    />
  </template>

  <v-container>
    <!-- Introduction -->
    <v-row>
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <div class="text-center mb-8">
          <v-icon size="64" color="var(--df-blue)" class="mb-4">mdi-account-voice</v-icon>
          <h2 class="text-h4 mb-4 font-weight-bold">{{ t('council.intro_heading') }}</h2>
          <p class="text-h6 text-medium-emphasis serif">
            {{ t('council.intro_body') }}
          </p>
        </div>
      </v-col>
    </v-row>

    <!-- Who decides (Canada-specific) -->
    <v-row class="mb-12">
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <div class="d-flex align-center mb-4">
            <v-avatar size="48" color="primary" class="mr-4">
              <v-icon size="24" color="white">mdi-gavel</v-icon>
            </v-avatar>
            <div>
              <h3 class="text-h5 font-weight-bold mb-1">{{ t('council.who_heading') }}</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">{{ t('council.who_subtitle') }}</p>
            </div>
          </div>

          <i18n-t keypath="council.who_p1" tag="p" scope="global" class="text-body-1 mb-4">
            <template #psb><b>{{ t('council.who_p1_psb') }}</b></template>
            <template #boardword><b>{{ t('council.who_p1_boardword') }}</b></template>
            <template #piggyback><b>{{ t('council.who_p1_piggyback') }}</b></template>
            <template #footnote><sup>[1]</sup></template>
          </i18n-t>
          <i18n-t keypath="council.who_p2" tag="p" scope="global" class="text-body-1 mb-0">
            <template #twoplaces><b>{{ t('council.who_p2_twoplaces') }}</b></template>
            <template #citycouncil><b>{{ t('council.who_p2_citycouncil') }}</b></template>
            <template #psb><b>{{ t('council.who_p2_psb') }}</b></template>
          </i18n-t>
        </v-card>
      </v-col>
    </v-row>

    <!-- Talking Points -->
    <v-row class="mb-12">
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-card
          class="pa-4"
          elevation="2"
          rounded="lg"
          hover
          href="https://consumerrights.wiki/w/Common_Questions,_Arguments,_%26_Responses_when_discussing_Flock_Surveillance"
          target="_blank" rel="noopener noreferrer"
        >
          <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <v-icon color="primary" class="mr-3 align-self-center">mdi-comment-alert</v-icon>
              <div>
                <h4 class="text-h6 font-weight-bold mb-1">{{ t('council.talking_heading') }}</h4>
                <p class="text-body-2 mb-0">{{ t('council.talking_body') }}</p>
              </div>
            </div>
            <v-icon color="primary" class="align-self-center">mdi-open-in-new</v-icon>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Step 1: Private meetings -->
    <v-row class="mb-12">
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <div class="d-flex align-center mb-4">
            <v-avatar size="48" color="primary" class="mr-4">
              <span class="text-h5 font-weight-bold white--text">1</span>
            </v-avatar>
            <div>
              <h3 class="text-h5 font-weight-bold mb-1">{{ t('council.step1_heading') }}</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">{{ t('council.step1_subtitle') }}</p>
            </div>
          </div>

          <i18n-t keypath="council.step1_body" tag="p" scope="global" class="text-body-1 mb-4">
            <template #councillors><b>{{ t('council.step1_body_councillors') }}</b></template>
            <template #psbmembers><b>{{ t('council.step1_body_psbmembers') }}</b></template>
          </i18n-t>

          <v-row>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-3 d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-calendar-plus</v-icon>
                {{ t('council.step1_schedule_heading') }}
              </h4>
              <v-list density="compact">
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step1_schedule_li1') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step1_schedule_li2') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step1_schedule_li3') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step1_schedule_li4') }}</v-list-item-title></v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-3 d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-lightbulb-on</v-icon>
                {{ t('council.step1_tips_heading') }}
              </h4>
              <v-list density="compact">
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step1_tips_li1') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step1_tips_li2') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step1_tips_li3') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step1_tips_li4') }}</v-list-item-title></v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <div>
            <h4 class="text-h6 font-weight-bold mb-2">{{ t('council.step1_email_heading') }}</h4>
            <v-card class="pa-4" variant="tonal">
              <p class="mb-0">
                {{ t('council.step1_email_body') }}
              </p>
            </v-card>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Step 2: Delegations -->
    <v-row class="mb-12">
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <div class="d-flex align-center mb-4">
            <v-avatar size="48" color="primary" class="mr-4">
              <span class="text-h5 font-weight-bold white--text">2</span>
            </v-avatar>
            <div>
              <h3 class="text-h5 font-weight-bold mb-1">{{ t('council.step2_heading') }}</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">{{ t('council.step2_subtitle') }}</p>
            </div>
          </div>

          <i18n-t keypath="council.step2_body" tag="p" scope="global" class="text-body-1 mb-4">
            <template #delegation><b>{{ t('council.step2_body_delegation') }}</b></template>
          </i18n-t>

          <v-row>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-3 d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-clock</v-icon>
                {{ t('council.step2_before_heading') }}
              </h4>
              <v-list density="compact">
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step2_before_li1') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step2_before_li2') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step2_before_li3') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step2_before_li4') }}</v-list-item-title></v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-3 d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-presentation</v-icon>
                {{ t('council.step2_during_heading') }}
              </h4>
              <v-list density="compact">
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step2_during_li1') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step2_during_li2') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step2_during_li3') }}</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>{{ t('council.step2_during_li4') }}</v-list-item-title></v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-alert type="info" variant="tonal" class="mt-4 mb-0">
            <i18n-t keypath="council.step2_tip" tag="span" scope="global">
              <template #protip><strong>{{ t('council.step2_tip_protip') }}</strong></template>
              <template #your><em>{{ t('council.step2_tip_your') }}</em></template>
            </i18n-t>
          </v-alert>
        </v-card>
      </v-col>
    </v-row>

    <!-- Step 3: FOI -->
    <v-row class="mb-12">
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <div class="d-flex align-center mb-4">
            <v-avatar size="48" color="primary" class="mr-4">
              <span class="text-h5 font-weight-bold white--text">3</span>
            </v-avatar>
            <div>
              <h3 class="text-h5 font-weight-bold mb-1">{{ t('council.step3_heading') }}</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">{{ t('council.step3_subtitle') }}</p>
            </div>
          </div>

          <i18n-t keypath="council.step3_body" tag="p" scope="global" class="text-body-1 mb-4">
            <template #vendorcontract><b>{{ t('council.step3_body_vendorcontract') }}</b></template>
            <template #pia><b>{{ t('council.step3_body_pia') }}</b></template>
            <template #retention><b>{{ t('council.step3_body_retention') }}</b></template>
            <template #crossborder><b>{{ t('council.step3_body_crossborder') }}</b></template>
          </i18n-t>

          <v-btn color="primary" variant="elevated" :to="localePath('/foi')" prepend-icon="mdi-file-document">
            {{ t('council.step3_btn') }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Closing CTA -->
    <v-row>
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <v-card class="pa-6" elevation="3" rounded="lg" color="primary" variant="tonal">
          <div class="text-center">
            <v-icon size="64" color="primary" class="mb-4">mdi-comment-question</v-icon>
            <h3 class="text-h4 font-weight-bold mb-4">{{ t('council.cta_heading') }}</h3>
            <p class="text-h6 mb-6 serif">
              {{ t('council.cta_body') }}
            </p>
            <v-btn :to="localePath('/contact')" size="large" color="primary" class="mr-4 mb-4" prepend-icon="mdi-email">
              {{ t('council.cta_contact_btn') }}
            </v-btn>
            <v-btn :to="localePath('/report')" size="large" variant="outlined" color="primary" class="mr-4 mb-4" prepend-icon="mdi-map-marker-plus">
              {{ t('council.cta_report_btn') }}
            </v-btn>
            <v-btn :to="localePath('/candidates')" size="large" variant="outlined" color="primary" class="mb-4" prepend-icon="mdi-vote">
              {{ t('council.cta_candidates') }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <footer class="serif text-grey-darken-2 mt-2">
          <small>
            <sup>[1]</sup>
            <i18n-t keypath="council.footnote1" tag="span" scope="global">
              <template #ottawa><a href="https://pub-ottawa.escribemeetings.com/filestream.ashx?DocumentId=113544" target="_blank" rel="noopener noreferrer">{{ t('council.footnote1_ottawa') }}</a></template>
              <template #ipc><a href="https://www.ipc.on.ca/en/resources-and-decisions/guidance-use-automated-licence-plate-recognition-systems-police-services" target="_blank" rel="noopener noreferrer">{{ t('council.footnote1_ipc') }}</a></template>
            </i18n-t>
          </small>
        </footer>
      </v-col>
    </v-row>
  </v-container>
</DefaultLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '@/composables/useLocalePath';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Hero from '@/components/layout/Hero.vue';

const { t } = useI18n();
const { localePath } = useLocalePath();
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.2s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.v-avatar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.v-list-item-title {
  white-space: normal !important;
  line-height: 1.4 !important;
  overflow-wrap: break-word !important;
}

.v-list-item {
  min-height: auto !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}
</style>
