<template>
  <v-content>
    <v-btn
      v-scroll="onScroll"
      v-show="showGoUpButton"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>

    <section id="hero">
      <v-row no-gutters>
        <!-- <v-img
            :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
            src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
        >-->
        <div
          :style="'min-height: calc(100vh - ' + $vuetify.application.top + 'px); min-width: 100%'"
        >
          <v-theme-provider dark>
            <v-container fill-height>
              <v-row align="center" class="mx-auto" justify="center">
                <v-col class="text-center" cols="12" tag="h1">
                  <div
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                    class="font-weight-black"
                  >pubpap</div>
                  <!-- <br /> -->
                  <div
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                    class="font-weight-light pt-6"
                  >where asking is gaining</div>
                </v-col>

                <v-btn
                  color="black"
                  class="align-self-end"
                  fab
                  outlined
                  @click="$vuetify.goTo('#about-me')"
                >
                  <v-icon>mdi-chevron-double-down</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-theme-provider>
        </div>
        <!-- </v-img> -->
      </v-row>
    </section>

    <!-- <section
      id="about-me"
      :style="'min-height: calc(100vh - ' + $vuetify.application.top + 'px); min-width: 100%'"
    >-->
    <section id="about-me">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">pubpap</h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive class="mx-auto" max-width="900">
          <div class="headline mb-6">free online platform for presenting & discussing research</div>

          <div class="title font-weight-black mb-0">Magnify impact</div>
          <div class="subtitle-1 align-center mb-4">by presenting online for everyone</div>

          <div class="title font-weight-black mb-0">Collaborate</div>
          <div
            class="subtitle-1 align-center mb-4"
          >by sharing questions, comments or additional results</div>

          <div class="title font-weight-black mb-0">Get feedback</div>
          <div class="subtitle-1 align-center">to your research</div>
        </v-responsive>
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="howto">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">What do I do?</h2>

        <v-responsive class="mx-auto" max-width="900">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <div class="display-1 font-weight-black mb-6">As an author</div>
                <ol class="headline px-0" style="list-style-position: inside">
                  <li>
                    Add your paper
                    <p class="subtitle-1 mb-5">Create a page for your paper.</p>
                  </li>
                  <li>
                    Set goal
                    <p
                      class="subtitle-1 mb-5"
                    >Set the minimal number of participants and the ticket price. The reason for ticket purchase is to show real interest.</p>
                  </li>
                  <li>
                    Present
                    <p
                      class="subtitle-1 mb-5"
                    >When enough people are gathered, an online presentation takes place. Afterwards, you get 90% of the collected money. Recording will be publicly available for free.</p>
                  </li>
                </ol>
              </v-col>
              <v-col cols="12" md="6">
                <div class="display-1 font-weight-black mb-6">As a user</div>
                <ol class="headline px-0" style="list-style-position: inside">
                  <li>
                    Show interest
                    <p
                      class="subtitle-1 mb-5"
                    >Show the author you are interested in their research by purchasing a presentation ticket.</p>
                  </li>
                  <li>
                    Join the presentation
                    <p
                      class="subtitle-1 mb-5"
                    >The author will present their work online once enough people gather. You will get the chance to join and talk with them. Should a paper not get enough interest, your money will be refunded.</p>
                  </li>
                </ol>
              </v-col>
            </v-row>
          </v-container>
          <div class="display-1 mt-2">plus everyone: discuss!</div>
          <div class="title mt-2">Join the discussions on papers.</div>
        </v-responsive>
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="team">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">Our team</h2>

        <v-responsive class="mx-auto title font-weight-light mb-8" max-width="720">
          <v-container>
            <v-row>
              <v-col>
                <v-avatar class="elevation-12 mb-6" size="128">
                  <v-img :src="tomas"></v-img>
                </v-avatar>
                <div class="headline font-weight-medium">Tomas Novak</div>
                <div class="caption">Co-founder</div>
              </v-col>
              <v-col>
                <v-avatar class="elevation-12 mb-6" size="128">
                  <v-img :src="jakub"></v-img>
                </v-avatar>
                <div class="headline font-weight-medium">Jakub Pogran</div>
                <div class="caption">Co-founder</div>
              </v-col>
            </v-row>
          </v-container>
          <div class="headline mt-8">pubpap is <a class="black--text" href="https://github.com/pograjak/pubpap" target="_blank">open-source</a></div>
        </v-responsive>

        <!-- <div></div>

        <v-btn color="grey" href="https://vuetifyjs.com" outlined large>
          <span class="grey--text text--darken-1 font-weight-bold">Vuetify Documentation</span>
        </v-btn>-->
      </v-container>

      <div class="py-12"></div>
    </section>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      tomas: require("assets/tomas.jpg"),
      jakub: require("assets/jakub.jpg"),
      showGoUpButton: false
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.showGoUpButton = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>