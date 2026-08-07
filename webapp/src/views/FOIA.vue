<template>
<DefaultLayout>
  <template #header>
    <Hero
      image-url="/documents.jpg"
      title="How to Request Public Records"
      description="Use Canada's access-to-information laws to find out where ALPRs are and how they're used."
    />
  </template>

  <v-container class="narrow-text">
    <h2>Why File an Access Request?</h2>
    <p>
      ALPRs are being installed across Canada with very little public transparency. A 2023 national survey found that <b>57% of responding police services use ALPR</b>, and most had no written procedure governing it.<sup>[1]</sup> Access-to-information (FOI) requests let you find out where the cameras are, how long data is kept, who it's shared with, and what your local police agreed to when they signed up.
    </p>
    <p>
      Filing a request is something any resident can do, and the documents you get back help build a complete, public picture of these surveillance networks.
    </p>

    <v-divider class="my-8" />

    <h2>Which Law Applies?</h2>
    <p>
      It depends on <b>who runs the cameras</b>. Canada's access regime is layered:
    </p>
    <ul>
      <li class="mb-2"><b>Municipal police</b> (most ALPRs) — your province's <b>municipal/provincial FOI law</b>. In Ontario, the request goes to the <b>police services board</b> under MFIPPA (administered by the service's access &amp; privacy unit).</li>
      <li class="mb-2"><b>Provincial police</b> (e.g., the OPP, SQ) — the <b>provincial</b> FOI law (e.g., Ontario's FIPPA).</li>
      <li class="mb-2"><b>RCMP / federal bodies</b> — the federal <b>Access to Information Act</b> (ATIP): a <b>$5 fee</b>, filed via the ATIP Online portal, by email, or by mail, with a <b>30-day</b> standard to respond.<sup>[2]</sup></li>
    </ul>

    <h3>FOI laws &amp; commissioners by province</h3>
    <p>Each province and territory has its own access law and an independent privacy commissioner who handles appeals. The most common ones for ALPR records:</p>
    <ul>
      <li class="mb-2"><b>Ontario</b> — MFIPPA (municipal police) / FIPPA (OPP), overseen by the <a href="https://www.ipc.on.ca" target="_blank" rel="noopener noreferrer">Information and Privacy Commissioner of Ontario</a>.</li>
      <li class="mb-2"><b>British Columbia</b> — FIPPA, overseen by the <a href="https://www.oipc.bc.ca" target="_blank" rel="noopener noreferrer">OIPC BC</a> (public bodies have ~30 business days to respond).</li>
      <li class="mb-2"><b>Quebec</b> — the <i>Act respecting access to documents held by public bodies</i>, overseen by the <a href="https://www.cai.gouv.qc.ca/english" target="_blank" rel="noopener noreferrer">Commission d'accès à l'information</a>.</li>
      <li class="mb-2"><b>Every other province &amp; territory</b> (AB, SK, MB, NS, NB, NL, PE + territories) has its own FOI statute and commissioner — search "<i>[your province] freedom of information request</i>" to find the portal.</li>
    </ul>

    <v-divider class="my-8" />

    <h2>What to Request</h2>
    <p>
      Ontario's privacy commissioner says police using ALPR should make much of this public already,<sup>[3]</sup> so these records exist and can be requested:
    </p>
    <ul>
      <li>The <b>contract and procurement records</b> with the vendor (Flock Safety, Genetec, Motorola, etc.)</li>
      <li>The <b>Privacy Impact Assessment (PIA)</b> for the ALPR program</li>
      <li><b>Data retention periods</b> and any <b>data-sharing agreements</b> — including anything allowing <b>cross-border (U.S.) access</b></li>
      <li>The police service's <b>ALPR policy/procedure</b> and the <b>board's policy</b></li>
      <li>A <b>program description</b>: the number and type of camera vehicles and any <b>fixed camera locations</b></li>
      <li>Public-consultation records and the most recent <b>annual ALPR report to the police board</b></li>
    </ul>

    <v-alert class="mt-8" type="info" variant="tonal">
      <b>Tip:</b> Address municipal-police requests to the <b>police services board</b> (the legal "institution"), even though the police service's access &amp; privacy unit will process them. If you're unsure where records live, you can send the same request to more than one body.
    </v-alert>

    <v-divider class="my-8" />

    <h2>Access Request Basics</h2>

    <h3>Who can file?</h3>
    <p>
      In most provinces, <b>anyone</b> can file — you generally don't need to be a resident, a lawyer, or explain why you want the records.
    </p>

    <h3>What does it cost?</h3>
    <p>
      Federal ATIP requests have a <b>$5</b> application fee. Provincial/municipal fees vary (some have a small application fee, some none), and agencies may charge for search or copying time on large requests. You can ask for a fee estimate or a fee waiver.
    </p>

    <h3>What if my request is refused?</h3>
    <p>
      Agencies can withhold some records (e.g., for law-enforcement or third-party reasons), but you can <b>appeal or complain to your privacy commissioner</b>. Commissioners have sided with the public before: in 2012 the BC commissioner found that retaining and sharing <b>non-hit</b> ALPR data served no law-enforcement purpose and wasn't authorized under FIPPA.<sup>[4]</sup>
    </p>

    <h3>Found camera locations?</h3>
    <p>
      If your records reveal where cameras are, <router-link to="/report">add them to the map</router-link> so everyone benefits.
    </p>

    <v-divider class="my-8" />

    <footer class="serif text-grey-darken-2 mt-4">
      <small>
        <sup>[1]</sup> Pelletier, <i>Canadian Public Policy</i> (2024) — survey of Canadian police services.
        <sup>[2]</sup> <a href="https://rcmp.ca/en/corporate-information/access-information-and-privacy/making-request-under-access-information-act" target="_blank" rel="noopener noreferrer">RCMP — Making an ATIP request</a>.
        <sup>[3]</sup> <a href="https://www.ipc.on.ca/en/resources-and-decisions/guidance-use-automated-licence-plate-recognition-systems-police-services" target="_blank" rel="noopener noreferrer">IPC Ontario — Guidance on the use of ALPR by police (2024)</a>.
        <sup>[4]</sup> <a href="https://www.oipc.bc.ca/documents/investigation-reports/1410" target="_blank" rel="noopener noreferrer">OIPC BC — Investigation Report F12-04 (2012)</a>.
        This page is general information, not legal advice; details vary by province.
      </small>
    </footer>
  </v-container>
</DefaultLayout>
</template>

<script setup lang="ts">
import Hero from '@/components/layout/Hero.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
</script>
