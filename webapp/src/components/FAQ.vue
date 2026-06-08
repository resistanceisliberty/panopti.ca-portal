<template>
  <v-expansion-panels multiple :model-value :readonly="showAll">
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        Are ALPRs a necessary tool for police?
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          No. Police have long had ways to obtain location information about suspects. Those methods generally require reasonable grounds and judicial authorization, which provide oversight and accountability. In Canada, <b>Section 8 of the Charter of Rights and Freedoms</b> protects against unreasonable search and seizure. ALPRs flip this around: they collect location data on <b>all of us</b>, all the time, and that data is often searched with little or no oversight.
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        Why should I care if I have nothing to hide?
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <h3 class="mb-2">1. You don't get to decide what looks suspicious tomorrow.</h3>
        <p class="pl-6">
          Just because you're not doing anything wrong today doesn't mean you won't be watched tomorrow. Licence plate cameras like Flock don't know your intentions—only your movements. A trip to a protest, a place of worship, a union meeting, a friend's house in a “high-crime” area, or even a misread plate can flag you as “suspicious.”
        </p>
        <p class="pl-6">
          History shows that when governments or third parties gain unchecked surveillance powers, those powers are eventually turned on people who weren't doing anything wrong—<b>until someone decided they were</b>. Tools built for one purpose are routinely repurposed for another.
        </p>

        <h3 class="mb-2 mt-8">2. Mistakes happen, and you're the one who pays for them.</h3>
        <p class="pl-6">
          Automated Licence Plate Readers (ALPRs) are not always accurate. People have been pulled over at gunpoint, arrested, or detained because a camera misread a plate or flagged the wrong car.
        </p>
        <p class="pl-6">
          If you “have nothing to hide,” you also have nothing to correct the record with when a machine error points the finger at you.
        </p>

      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        Do these cameras only record vehicles involved in crimes?
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          <b>No, ALPRs record all vehicles that pass by</b>, not just those involved in crimes. They capture licence plates, unique identifying features, locations, dates, and times of every vehicle, regardless of whether the driver is suspected of wrongdoing. This means that even if you're not doing anything wrong, your movements are still being tracked and stored, often for long periods of time.
        </p>
        <p>
          The data collected by ALPRs can also be shared with other agencies and third parties, further extending the reach of this surveillance. Most people have no idea their movements are being monitored and recorded.
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        Do police need a warrant to search these cameras?
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          This is a serious and unsettled question in Canada. ALPRs collect data on <b>everyone</b>—not just suspects—and that data can often be searched with <b>little to no judicial oversight</b>. Mass, suspicionless tracking of Canadians' movements raises significant concerns under <b>Section 8 of the Charter</b>, which protects against unreasonable search and seizure.
        </p>
        <p>
          Data is also frequently shared across agencies—and, in some cases, <b>across the border with U.S. law enforcement</b>—extending the reach of this surveillance far beyond the community where the cameras were installed.
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        What oversight is there for these systems?
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          <b>There is often little to no meaningful oversight.</b> Some police services have policies governing ALPR use, but these are frequently weak and poorly enforced, and many agencies have no policy at all. There is rarely any requirement for transparency or accountability in how these systems are used.
        </p>
        <p>
          Vendors like Flock offer a <b>transparency portal</b> for their law-enforcement customers, but they let customers choose what to include or exclude, and the portals often <b>lack meaningful data</b>—for example, underreporting how many agencies actually have access.
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel id="faq-transparency">
      <v-expansion-panel-title class="font-weight-bold">
        Do Flock's transparency portals give a full picture of who has access to the data?
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          Flock now operates in Canada, but its track record in the United States—where it has operated longest—is telling. Flock's transparency portals are <i>notoriously incomplete</i> and often <i>misleading</i>. They let law-enforcement agencies cherry-pick what is included or excluded, leading to significant underreporting of who actually has access to the data.
        </p>
        <p>
          Take Boulder, Colorado for example. Their <a href="https://transparency.flocksafety.com/boulder-co-pd" target="_blank">transparency portal</a> listed around 90 agencies with access to their ALPR data. However, <a href="https://www.muckrock.com/foi/boulder-172/boulder-alpr-audits-187797/" target="_blank">a public records request</a> revealed that <b>over 6,000 agencies</b> actually had access. This discrepancy highlights the lack of transparency and accountability in Flock's reporting.
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        Can Flock be trusted to keep our data safe?
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          Flock's record raises serious doubts. In November 2025, <a target="_blank" href="https://www.404media.co/flock-logins-exposed-in-malware-infections-senator-asks-ftc-to-investigate-the-company/">a security researcher found Flock logins for sale on Russian hacking forums</a>, since Flock negligently didn't require multi-factor authentication.
        </p>
        <p>
          Flock has also been caught misrepresenting the facts. Its CEO told Denver's 9News that Flock had <a href="https://youtu.be/aMfO7D-f7U0?si=23FNwA91zVTwxb02&t=898" target="_blank">no federal contracts</a>—yet weeks later, <a href="https://www.9news.com/article/news/local/flock-federal-immigration-agents-access-tracking-data/73-a8aee742-56d4-4a57-b5bb-0373286dfef8" target="_blank">9News found</a> that U.S. Border Patrol did have access to search Flock's systems. Records requests later showed "U.S. Border Patrol" searching thousands of agencies' data across the national network.
        </p>
        <p>
          The same company is now signing up Canadian agencies—so these questions matter here too.
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-bold">
        How can I get these cameras out of my city or town?
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <p>
          Communities can push back. Raise concerns publicly, build a group of advocates, and petition your municipal council not to approve or renew ALPR contracts. Public attention, deputations, and records requests have led agencies elsewhere to cancel or decline ALPR programs.
        </p>
        <p>
          For more, see our <router-link to="/council">city council page</router-link>.
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  showAll: {
    type: Boolean,
    default: false,
  }
});

// Map hash values to panel indices
const hashToPanelIndex: Record<string, number> = {
  '#faq-transparency': 5,
  // Add more mappings here if you add more panel hashes
};

const modelValue = ref(props.showAll ? [0,1,2,3,4,5,6,7] : []);

function updatePanelFromHash() {
  const hash = window.location.hash;
  if (props.showAll) {
    modelValue.value = [0,1,2,3,4,5,6,7];
    return;
  }
  if (hashToPanelIndex.hasOwnProperty(hash)) {
    modelValue.value = [hashToPanelIndex[hash]];
  } else {
    modelValue.value = [];
  }
}

onMounted(() => {
  updatePanelFromHash();
  window.addEventListener('hashchange', updatePanelFromHash);
});

watch(() => props.showAll, (val) => {
  if (val) {
    modelValue.value = [0,1,2,3,4,5,6,7];
  } else {
    updatePanelFromHash();
  }
});
</script>

<style scoped>
blockquote {
  border-left: 4px solid #616161;
  padding-left: 16px;
  font-style: italic;
  margin-top: 16px;
  margin-bottom: 8px;
}

p {
  margin-bottom: 16px;
}

ul {
  margin-left: 16px;
  margin-bottom: 16px;
}
</style>
