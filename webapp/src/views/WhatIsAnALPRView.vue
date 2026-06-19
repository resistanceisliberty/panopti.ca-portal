<template>
<DefaultLayout>
  <template #header>
    <Hero
      title="What are ALPRs?"
      image-url="/flock-camera.jpeg"
      :opacity="0.5"
    />
  </template>
  
  <v-container>
    <div class="video-responsive text-center">
      <iframe
        width="560"
        max-width="100%"
        height="315"
        src="https://www.youtube-nocookie.com/embed/vWj26RIlN_I?si=l4A3SK9oAYiJW5k3"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />

      <p class="text-caption text-center mt-3 px-4" style="opacity: 0.8; font-style: italic;">
        Video explanation of modern LPRs by Christophe
      </p>
    </div>

    <p>
      An automatic licence plate reader (ALPR, sometimes LPR) is an AI-driven camera that captures an image of <b>every vehicle that drives by</b> and stores what it sees — the plate number, the place, and the precise time. Many models also note a car's <b>make, model, and colour</b>, and even identifying marks such as dents, roof racks, or bumper stickers, converting each one into <b>searchable data</b>.
    </p>
    <p>
      These cameras log millions of vehicles <b>regardless of whether anyone is under suspicion</b>. Sold as indispensable tools against crime, they instead record the <b>everyday movements of law-abiding people</b>, with little judicial oversight over how the data is kept or searched.
    </p>

    <p>For more on how ALPRs threaten privacy, see resources from Canadian groups like the <a href="https://ccla.org/" target="_blank" rel="noopener noreferrer">Canadian Civil Liberties Association</a> and <a href="https://openmedia.org/" target="_blank" rel="noopener noreferrer">OpenMedia</a>, along with the <a href="https://sls.eff.org/technologies/automated-license-plate-readers-alprs" target="_blank" rel="noopener noreferrer">EFF</a> and <a href="https://www.aclu.org/issues/privacy-technology/you-are-being-tracked" target="_blank" rel="noopener noreferrer">ACLU</a>.</p>

    <v-divider class="my-12" />

    <h2 class="mb-8">
      <v-icon class="mr-2" color="primary">mdi-camera-outline</v-icon>
      What do they look like?
    </h2>
    <div class="mb-16 text-center">
      <v-btn size="large" color="primary" to="/identify">
        <v-icon left class="mr-2">mdi-image-search</v-icon>
        View ALPR Images
      </v-btn>
    </div>

    <v-divider class="my-12" />

    <h2>Why Should You Be Concerned</h2>
    <p class="mb-8 text-center">
      ALPRs erode privacy and chip away at civil liberties. Here's how:
    </p>
    <p class="mb-8 text-center text-medium-emphasis" style="font-style: italic;">
      Many of the documented cases below come from the United States, where ALPR
      surveillance is most entrenched — but the same vendors and systems (Flock,
      Genetec, Motorola) are now expanding across Canada.
    </p>

    <Dangers />

    <v-divider class="my-12" />

    <h2 class="mb-8">Frequently Asked Questions</h2>
    <FAQ />
    
    <v-divider class="my-12" />
    
    <SimilarProjects id="similar" />
  </v-container>
</DefaultLayout>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Hero from '@/components/layout/Hero.vue';
import Dangers from '@/components/Dangers.vue';
import FAQ from '@/components/FAQ.vue';
import SimilarProjects from '@/components/SimilarProjects.vue';

// FAQPage structured data — eligible for rich results in Google search.
// Mirrors the questions in components/FAQ.vue (answers summarized as plain text).
const faqs: { q: string; a: string }[] = [
  {
    q: 'Are ALPRs a necessary tool for police?',
    a: 'No. Police have long had ways to obtain location information about suspects, generally requiring reasonable grounds and judicial authorization. ALPRs instead collect location data on everyone, all the time, and that data is often searched with little or no oversight. In Canada, Section 8 of the Charter protects against unreasonable search and seizure.',
  },
  {
    q: 'Why should I care if I have nothing to hide?',
    a: "You don't get to decide what looks suspicious tomorrow. Licence plate cameras record your movements regardless of intent — a trip to a protest, place of worship, or union meeting can flag you. ALPRs are also not always accurate, and people have been pulled over at gunpoint or detained because a camera misread a plate.",
  },
  {
    q: 'Do these cameras only record vehicles involved in crimes?',
    a: 'No. ALPRs record all vehicles that pass, not just those involved in crimes. They capture licence plates, identifying features, locations, dates, and times of every vehicle, regardless of whether the driver is suspected of wrongdoing — and that data can be shared with other agencies and third parties.',
  },
  {
    q: 'Do police need a warrant to search these cameras?',
    a: 'This is a serious and unsettled question in Canada. ALPRs collect data on everyone, not just suspects, and that data can often be searched with little judicial oversight. Mass, suspicionless tracking of Canadians’ movements raises significant concerns under Section 8 of the Charter. Data is also frequently shared across agencies, and in some cases across the border with U.S. law enforcement.',
  },
  {
    q: 'What oversight is there for these systems?',
    a: 'Often little to none. Some police services have policies governing ALPR use, but these are frequently weak and poorly enforced, and many agencies have no policy at all. Vendors like Flock offer a "transparency portal," but they let customers choose what to include or exclude, and the portals often underreport how many agencies actually have access.',
  },
  {
    q: "Do Flock's transparency portals give a full picture of who has access to the data?",
    a: 'No. Flock now operates in Canada, but its U.S. record is telling: its transparency portals are notoriously incomplete. Boulder, Colorado’s portal listed around 90 agencies, but a public records request revealed over 6,000 agencies actually had access.',
  },
  {
    q: 'Can Flock be trusted to keep this data safe?',
    a: "Flock's record raises serious doubts. In November 2025 a researcher found Flock logins for sale on Russian hacking forums, as Flock didn't require multi-factor authentication. Flock has also misrepresented who can access its systems. The same company is now signing up Canadian agencies.",
  },
  {
    q: 'How can I get these cameras out of my city or town?',
    a: 'Communities can push back. Raise concerns publicly, build a group of advocates, and petition your municipal council or police services board not to approve or renew ALPR contracts. Public attention, deputations, and freedom-of-information requests have led agencies elsewhere to cancel or decline ALPR programs.',
  },
];

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }),
    },
  ],
});
</script>

<style scoped>
h1, h2 {
  text-align: center;
}

iframe[src*=youtube] {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}
</style>
