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
      Automated Licence Plate Readers (ALPRs or LPRs) are AI-powered cameras that capture and analyze images of <b>all passing vehicles</b>, storing details like your car's <b>location, date, and time</b>. They also capture your car's <b>make, model, colour</b>, and <b>identifying features</b> such as dents, roof racks, and bumper stickers, often turning these into <b>searchable data points</b>.
    </p>
    <p>
      These cameras collect data on millions of vehicles <b>regardless of whether the driver is suspected of a crime</b>. They are marketed as indispensable tools to fight crime, but they record <b>everyone's movements</b> with little judicial oversight — building a database of law-abiding people's travels.
    </p>

    <p>For more on how ALPRs threaten privacy, see resources from Canadian groups like the <a href="https://ccla.org/" target="_blank">Canadian Civil Liberties Association</a> and <a href="https://openmedia.org/" target="_blank">OpenMedia</a>, along with the <a href="https://sls.eff.org/technologies/automated-license-plate-readers-alprs" target="_blank">EFF</a> and <a href="https://www.aclu.org/issues/privacy-technology/you-are-being-tracked" target="_blank">ACLU</a>.</p>

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
      ALPRs invade your privacy and violate your civil liberties. Here's how:
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
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Hero from '@/components/layout/Hero.vue';
import Dangers from '@/components/Dangers.vue';
import FAQ from '@/components/FAQ.vue';
import SimilarProjects from '@/components/SimilarProjects.vue';
</script>

<style scoped>
h1, h2 {
  text-align: center;
}

.scrim {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.image-close-btn {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  z-index: 100;
}

.scrim-text {
  text-transform: uppercase;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

iframe[src*=youtube] {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}
</style>
