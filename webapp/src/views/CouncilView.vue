<template>
<DefaultLayout>
  <template #header>
    <Hero
      imageUrl="/city-council.jpg"
      title="Council & Police Boards"
      description="Push back on ALPRs through the bodies that actually decide in Canada — your municipal council and your police services board."
    />
  </template>

  <v-container>
    <!-- Introduction -->
    <v-row>
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <div class="text-center mb-8">
          <v-icon size="64" color="var(--df-blue)" class="mb-4">mdi-account-voice</v-icon>
          <h2 class="text-h4 mb-4 font-weight-bold">Your Voice Matters Locally</h2>
          <p class="text-h6 text-medium-emphasis serif">
            Local officials rely on hearing from residents. Here's how to push back on mass
            surveillance with the people who actually make these decisions.
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
              <h3 class="text-h5 font-weight-bold mb-1">Who Actually Decides in Canada</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">It's often the police services board, not just council</p>
            </div>
          </div>

          <p class="text-body-1 mb-4">
            In most Canadian cities, a municipal police service is overseen by a civilian
            <b>police services board</b> (in Ontario, recently renamed a "police service board").
            ALPR programs are frequently approved at the <b>board</b> level — and forces often acquire
            the technology by <b>"piggybacking" on an existing provincial contract</b> rather than running
            a public tender, which can mean very little public debate.<sup>[1]</sup>
          </p>
          <p class="text-body-1 mb-0">
            That gives you <b>two places to be heard</b>: your <b>city council</b> (which approves budgets
            and responds to public pressure) and your <b>police services board</b> (which sets policy and
            oversees procurement). Find out which body is considering ALPRs in your community, and target both.
          </p>
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
                <h4 class="text-h6 font-weight-bold mb-1">Talking Points</h4>
                <p class="text-body-2 mb-0">Common questions, arguments &amp; responses for discussing surveillance</p>
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
              <h3 class="text-h5 font-weight-bold mb-1">Meet Members Privately</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">Personal conversations are often the most effective approach</p>
            </div>
          </div>

          <p class="text-body-1 mb-4">
            Reach out to your <b>councillors</b> and <b>police services board members</b> directly. A short,
            personal conversation helps them understand the human impact of surveillance before a vote.
          </p>

          <v-row>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-3 d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-calendar-plus</v-icon>
                How to Schedule
              </h4>
              <v-list density="compact">
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Contact their office by phone or email</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Suggest a coffee, a call, or their office</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Ask for just 15–20 minutes</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Mention you're a constituent concerned about ALPRs</v-list-item-title></v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-3 d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-lightbulb-on</v-icon>
                Meeting Tips
              </h4>
              <v-list density="compact">
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Bring a brief printed summary of key points</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Share local concerns about privacy and community impact</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Ask their position and listen to their concerns</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Follow up with answers to anything they raise</v-list-item-title></v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <div>
            <h4 class="text-h6 font-weight-bold mb-2">Sample Email Template</h4>
            <v-card class="pa-4" variant="tonal">
              <p class="mb-0">
                Hello [Councillor / Board Member], I'm a [city] resident concerned about a proposed
                automatic licence plate reader (ALPR) program. Would you have 15 minutes to discuss it?
                I'd like to share some community concerns and hear your thoughts before it comes to a vote.
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
              <h3 class="text-h5 font-weight-bold mb-1">Speak at a Meeting</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">Register as a delegation to create an official record</p>
            </div>
          </div>

          <p class="text-body-1 mb-4">
            Most councils and police boards let residents speak as a <b>delegation</b> (sometimes called a
            deputation) for a few minutes. It puts your opposition on the public record and shows officials
            that people are watching the vote.
          </p>

          <v-row>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-3 d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-clock</v-icon>
                Before the Meeting
              </h4>
              <v-list density="compact">
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Check the council/board agenda online</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Register as a delegation in advance (often required)</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Prepare a tight 2–3 minute statement</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Bring printed copies for the clerk</v-list-item-title></v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-3 d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-presentation</v-icon>
                During the Meeting
              </h4>
              <v-list density="compact">
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Arrive early</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>State your name and connection to the community</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Lead with a clear local point</v-list-item-title></v-list-item>
                <v-list-item prepend-icon="mdi-check"><v-list-item-title>Stay respectful and thank them for their time</v-list-item-title></v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-alert type="info" variant="tonal" class="mt-4 mb-0">
            <strong>Pro Tip:</strong> Focus on how ALPRs affect <em>your</em> community specifically — retention,
            data-sharing across the border, and the lack of oversight. Local, concrete points land harder than abstract arguments.
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
              <h3 class="text-h5 font-weight-bold mb-1">Arm Yourself with the Records</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">Freedom-of-information requests reveal what's really being approved</p>
            </div>
          </div>

          <p class="text-body-1 mb-4">
            Before a vote, file an access-to-information request for the <b>vendor contract</b>, the
            <b>Privacy Impact Assessment</b>, and the <b>data retention and sharing policies</b> — including
            anything allowing <b>cross-border (U.S.) access</b>. These documents often make the strongest case.
          </p>

          <v-btn color="primary" variant="elevated" to="/foi" prepend-icon="mdi-file-document">
            How to Request Public Records
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
            <h3 class="text-h4 font-weight-bold mb-4">Questions or Want to Help?</h3>
            <p class="text-h6 mb-6 serif">
              Get in touch, and if you spot an ALPR, add it to the map so your community can see it.
            </p>
            <v-btn to="/contact" size="large" color="primary" class="mr-4 mb-4" prepend-icon="mdi-email">
              Contact Us
            </v-btn>
            <v-btn to="/report" size="large" variant="outlined" color="primary" class="mb-4" prepend-icon="mdi-map-marker-plus">
              Report a Camera
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="10" lg="8" class="mx-auto">
        <footer class="serif text-grey-darken-2 mt-2">
          <small>
            <sup>[1]</sup> Police-board governance and piggyback procurement of ALPR are documented in Canadian
            municipal records (e.g.,
            <a href="https://pub-ottawa.escribemeetings.com/filestream.ashx?DocumentId=113544" target="_blank" rel="noopener noreferrer">Ottawa</a>);
            see also
            <a href="https://www.ipc.on.ca/en/resources-and-decisions/guidance-use-automated-licence-plate-recognition-systems-police-services" target="_blank" rel="noopener noreferrer">IPC Ontario's ALPR guidance</a>.
            Processes vary by province and municipality.
          </small>
        </footer>
      </v-col>
    </v-row>
  </v-container>
</DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Hero from '@/components/layout/Hero.vue';
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
