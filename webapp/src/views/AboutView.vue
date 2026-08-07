<template>
  <DefaultLayout>
    <v-container class="narrow-text">
      <h2>About panopti.ca</h2>
      <p>
        panopti.ca is an open-source project that maps the spread of automatic licence plate readers (ALPRs) across Canada. Its purpose is to make a quiet form of mass surveillance visible — to show where these cameras stand, who runs them, and just how widely they have been deployed.
      </p>

      <h2>What an ALPR does</h2>
      <p>
        An ALPR is an AI-powered camera that photographs and logs <b>every passing vehicle</b> — its plate, its location, and the moment it drove by — whether or not the driver is suspected of anything. Sold by vendors such as <a href="https://www.genetec.com/" target="_blank" rel="noopener noreferrer">Genetec</a> and <a href="https://consumerrights.wiki/w/Flock_Safety" target="_blank" rel="noopener noreferrer">Flock Safety</a>, these cameras are spreading rapidly through Canadian cities and towns, often with little public debate or oversight.
      </p>

      <h2>Why mapping them matters</h2>
      <p>
        Surveillance that nobody can see is hard to question. Plotting each known camera on a public map turns scattered, easily-overlooked deployments into something concrete — something residents, journalists, and elected officials can examine, discuss, and challenge. A map also makes the scale of the problem legible in a way that a single camera on a pole never could.
      </p>

      <h2>Built on open data</h2>
      <p>
        Every camera location lives on <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>, the same open dataset that powers maps around the world. Nothing sits in a private database: the information is public, verifiable, and free for anyone to inspect, correct, or reuse. The project builds on the open-source work of <a href="https://deflock.org" target="_blank" rel="noopener noreferrer">DeFlock</a>, which pioneered crowdsourced ALPR mapping in the United States.
      </p>

      <h2>How to contribute</h2>
      <p>
        The map grows through the people who use it. Spotting a camera and <router-link to="/report">adding it to OpenStreetMap</router-link> puts it on the map for everyone, and sharing the site helps more people understand how ALPR surveillance works and where it is taking hold. Guidance on <router-link to="/what-is-an-alpr">how these cameras work</router-link> and how to identify and report them is available throughout the site — no special expertise required.
      </p>
    </v-container>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
</script>
