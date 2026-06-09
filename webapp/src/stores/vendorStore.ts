import { defineStore } from 'pinia';
import { ref } from 'vue';
import { cmsService } from '@/services/cmsService';
import type { LprVendor, OtherSurveillanceDevice } from '@/types';

// Dahua isn't in the upstream DeFlock CMS; add it locally as a Canada-relevant
// ALPR vendor. logoUrl is the infobox header; urls are camera photos; osmTags
// merge on top of lprBaseTags (only the manufacturer keys are vendor-specific).
const DAHUA_VENDOR: LprVendor = {
  id: -2,
  shortName: 'Dahua Technology',
  fullName: 'Dahua Technology',
  logoUrl: 'https://mms.businesswire.com/media/20210510005414/en/837953/5/logo.jpg?download=1',
  urls: [{ url: 'https://dahuasecuritysolutions.co.uk/wp-content/uploads/2023/08/ITC413-Series_s.png' }],
  osmTags: {
    'manufacturer': 'Dahua Technology',
    'manufacturer:wikidata': 'Q18111506',
  },
};

export const useVendorStore = defineStore('vendorStore', () => {
  const lprVendors = ref<LprVendor[]>([]);
  const otherDevices = ref<OtherSurveillanceDevice[]>([]);

  async function loadAllVendors(): Promise<void> {
    if (lprVendors.value.length > 0) return;
    const cms = await cmsService.getLprVendors();
    const extras = cms.some((v) => v.fullName === DAHUA_VENDOR.fullName) ? [] : [DAHUA_VENDOR];
    lprVendors.value = [...cms, ...extras];
  }

  async function loadAllOtherDevices(): Promise<void> {
    if (otherDevices.value.length > 0) return;
    otherDevices.value = await cmsService.getOtherSurveillanceDevices();
  }

  async function getFirstImageForManufacturer(fullName: string): Promise<string | null> {
    const vendor = lprVendors.value.find(v => v.fullName === fullName);
    return vendor?.urls?.[0]?.url ?? null;
  }

  return { lprVendors, otherDevices, loadAllVendors, loadAllOtherDevices, getFirstImageForManufacturer };
});
