<template>
<DefaultLayout>
  <template #header>
    <Hero
      imageUrl="/press.jpg"
      title="Media"
      description="We're grateful for the media's interest in panopti.ca. Below you'll find background on the project and how to get in touch."
    />
  </template>

  <v-container class="narrow-text">
    <h2>What is panopti.ca?</h2>
    <p>
      panopti.ca is a community-driven, open-source project that maps Automatic Licence Plate Readers (ALPRs) and other surveillance cameras across Canada. We help people understand where and how they're being watched, and hold governments and surveillance vendors accountable.
    </p>

    <h2>About the Project</h2>
    <p>
      ALPRs are spreading rapidly across Canada, sold by vendors such as <a target="_blank" href="https://en.wikipedia.org/wiki/Genetec">Genetec</a> (a Montréal-based company) and <a target="_blank" href="https://en.wikipedia.org/wiki/Flock_Safety">Flock Safety</a> (a U.S. vendor now expanding here). These cameras record the movements of everyone who passes, regardless of whether they're suspected of any wrongdoing.
    </p>
    <p>
      panopti.ca surfaces where these cameras are by mapping them on <a target="_blank" href="https://www.openstreetmap.org">OpenStreetMap</a>, so the data is public and anyone can verify or contribute to it. The project builds on <a target="_blank" href="https://deflock.org">DeFlock</a>, the open-source effort that pioneered crowdsourced ALPR mapping.
    </p>

    <h2>Embedding our Map</h2>
    <p>
      You are welcome to embed our map on your website. Just <a href="https://maps.panopti.ca" target="_blank">open the map</a>, use the share button, and copy the embed code.
    </p>

    <h2>Contact</h2>
    <p>
      For media enquiries and interview requests, email us at
      <a href="mailto:contact@panopti.ca">contact@panopti.ca</a>
      (or use our <router-link to="/contact">contact page</router-link>).
    </p>

  </v-container>
</DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Hero from '@/components/layout/Hero.vue';
</script>
