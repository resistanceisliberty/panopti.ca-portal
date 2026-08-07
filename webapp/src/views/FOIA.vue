<template>
<DefaultLayout>
  <template #header>
    <Hero
      image-url="/documents.jpg"
      :title="t('foi.hero_title')"
      :description="t('foi.hero_description')"
    />
  </template>

  <v-container class="narrow-text">
    <h2>{{ t('foi.why_heading') }}</h2>
    <i18n-t keypath="foi.why_p1" tag="p" scope="global">
      <template #stat><b>{{ t('foi.why_p1_stat') }}</b></template>
      <template #ref><sup>[1]</sup></template>
    </i18n-t>
    <p>{{ t('foi.why_p2') }}</p>

    <v-divider class="my-8" />

    <h2>{{ t('foi.law_heading') }}</h2>
    <i18n-t keypath="foi.law_intro" tag="p" scope="global">
      <template #who><b>{{ t('foi.law_intro_who') }}</b></template>
    </i18n-t>
    <ul>
      <i18n-t keypath="foi.law_municipal" tag="li" scope="global" class="mb-2">
        <template #label><b>{{ t('foi.law_municipal_label') }}</b></template>
        <template #foilaw><b>{{ t('foi.law_municipal_foilaw') }}</b></template>
        <template #board><b>{{ t('foi.law_municipal_board') }}</b></template>
      </i18n-t>
      <i18n-t keypath="foi.law_provincial" tag="li" scope="global" class="mb-2">
        <template #label><b>{{ t('foi.law_provincial_label') }}</b></template>
        <template #prov><b>{{ t('foi.law_provincial_prov') }}</b></template>
      </i18n-t>
      <i18n-t keypath="foi.law_federal" tag="li" scope="global" class="mb-2">
        <template #label><b>{{ t('foi.law_federal_label') }}</b></template>
        <template #act><b>{{ t('foi.law_federal_act') }}</b></template>
        <template #fee><b>{{ t('foi.law_federal_fee') }}</b></template>
        <template #timeline><b>{{ t('foi.law_federal_timeline') }}</b></template>
        <template #ref><sup>[2]</sup></template>
      </i18n-t>
    </ul>

    <h3>{{ t('foi.commissioners_heading') }}</h3>
    <p>{{ t('foi.commissioners_intro') }}</p>
    <ul>
      <i18n-t keypath="foi.commissioners_on" tag="li" scope="global" class="mb-2">
        <template #label><b>{{ t('foi.commissioners_on_label') }}</b></template>
        <template #link><a href="https://www.ipc.on.ca" target="_blank" rel="noopener noreferrer">{{ t('foi.commissioners_on_link') }}</a></template>
      </i18n-t>
      <i18n-t keypath="foi.commissioners_bc" tag="li" scope="global" class="mb-2">
        <template #label><b>{{ t('foi.commissioners_bc_label') }}</b></template>
        <template #link><a href="https://www.oipc.bc.ca" target="_blank" rel="noopener noreferrer">{{ t('foi.commissioners_bc_link') }}</a></template>
      </i18n-t>
      <i18n-t keypath="foi.commissioners_qc" tag="li" scope="global" class="mb-2">
        <template #label><b>{{ t('foi.commissioners_qc_label') }}</b></template>
        <template #act><i>{{ t('foi.commissioners_qc_act') }}</i></template>
        <template #link><a href="https://www.cai.gouv.qc.ca/english" target="_blank" rel="noopener noreferrer">{{ t('foi.commissioners_qc_link') }}</a></template>
      </i18n-t>
      <i18n-t keypath="foi.commissioners_other" tag="li" scope="global" class="mb-2">
        <template #label><b>{{ t('foi.commissioners_other_label') }}</b></template>
        <template #search><i>{{ t('foi.commissioners_other_search') }}</i></template>
      </i18n-t>
    </ul>

    <v-divider class="my-8" />

    <h2>{{ t('foi.request_heading') }}</h2>
    <i18n-t keypath="foi.request_intro" tag="p" scope="global">
      <template #ref><sup>[3]</sup></template>
    </i18n-t>
    <ul>
      <i18n-t keypath="foi.request_li1" tag="li" scope="global">
        <template #records><b>{{ t('foi.request_li1_records') }}</b></template>
      </i18n-t>
      <i18n-t keypath="foi.request_li2" tag="li" scope="global">
        <template #pia><b>{{ t('foi.request_li2_pia') }}</b></template>
      </i18n-t>
      <i18n-t keypath="foi.request_li3" tag="li" scope="global">
        <template #retention><b>{{ t('foi.request_li3_retention') }}</b></template>
        <template #sharing><b>{{ t('foi.request_li3_sharing') }}</b></template>
        <template #crossborder><b>{{ t('foi.request_li3_crossborder') }}</b></template>
      </i18n-t>
      <i18n-t keypath="foi.request_li4" tag="li" scope="global">
        <template #policy><b>{{ t('foi.request_li4_policy') }}</b></template>
        <template #boardpolicy><b>{{ t('foi.request_li4_boardpolicy') }}</b></template>
      </i18n-t>
      <i18n-t keypath="foi.request_li5" tag="li" scope="global">
        <template #desc><b>{{ t('foi.request_li5_desc') }}</b></template>
        <template #fixed><b>{{ t('foi.request_li5_fixed') }}</b></template>
      </i18n-t>
      <i18n-t keypath="foi.request_li6" tag="li" scope="global">
        <template #report><b>{{ t('foi.request_li6_report') }}</b></template>
      </i18n-t>
    </ul>

    <v-alert class="mt-8" type="info" variant="tonal">
      <i18n-t keypath="foi.tip" tag="span" scope="global">
        <template #tiplabel><b>{{ t('foi.tip_label') }}</b></template>
        <template #board><b>{{ t('foi.tip_board') }}</b></template>
      </i18n-t>
    </v-alert>

    <v-divider class="my-8" />

    <h2>{{ t('foi.basics_heading') }}</h2>

    <h3>{{ t('foi.who_heading') }}</h3>
    <i18n-t keypath="foi.who_p" tag="p" scope="global">
      <template #anyone><b>{{ t('foi.who_anyone') }}</b></template>
    </i18n-t>

    <h3>{{ t('foi.cost_heading') }}</h3>
    <i18n-t keypath="foi.cost_p" tag="p" scope="global">
      <template #fee><b>{{ t('foi.cost_fee') }}</b></template>
    </i18n-t>

    <h3>{{ t('foi.refused_heading') }}</h3>
    <i18n-t keypath="foi.refused_p" tag="p" scope="global">
      <template #appeal><b>{{ t('foi.refused_appeal') }}</b></template>
      <template #nonhit><b>{{ t('foi.refused_nonhit') }}</b></template>
      <template #ref><sup>[4]</sup></template>
    </i18n-t>

    <h3>{{ t('foi.found_heading') }}</h3>
    <i18n-t keypath="foi.found_p" tag="p" scope="global">
      <template #link><router-link :to="localePath('/report')">{{ t('foi.found_link') }}</router-link></template>
    </i18n-t>

    <v-divider class="my-8" />

    <footer class="serif text-grey-darken-2 mt-4">
      <small>
        <sup>[1]</sup>
        <i18n-t keypath="foi.fn1" tag="span" scope="global">
          <template #journal><i>{{ t('foi.fn1_journal') }}</i></template>
        </i18n-t>
        <sup>[2]</sup>
        <i18n-t keypath="foi.fn2" tag="span" scope="global">
          <template #link><a href="https://rcmp.ca/en/corporate-information/access-information-and-privacy/making-request-under-access-information-act" target="_blank" rel="noopener noreferrer">{{ t('foi.fn2_link') }}</a></template>
        </i18n-t>
        <sup>[3]</sup>
        <i18n-t keypath="foi.fn3" tag="span" scope="global">
          <template #link><a href="https://www.ipc.on.ca/en/resources-and-decisions/guidance-use-automated-licence-plate-recognition-systems-police-services" target="_blank" rel="noopener noreferrer">{{ t('foi.fn3_link') }}</a></template>
        </i18n-t>
        <sup>[4]</sup>
        <i18n-t keypath="foi.fn4" tag="span" scope="global">
          <template #link><a href="https://www.oipc.bc.ca/documents/investigation-reports/1410" target="_blank" rel="noopener noreferrer">{{ t('foi.fn4_link') }}</a></template>
        </i18n-t>
        {{ t('foi.disclaimer') }}
      </small>
    </footer>
  </v-container>
</DefaultLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '@/composables/useLocalePath';
import Hero from '@/components/layout/Hero.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const { t } = useI18n();
const { localePath } = useLocalePath();
</script>
