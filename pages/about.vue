<template>
  <v-content>
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

    <section
      id="about-me"
      :style="'min-height: calc(100vh - ' + $vuetify.application.top + 'px); min-width: 100%'"
    >
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">About pubpap</h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive class="mx-auto title font-weight-light mb-8" max-width="900">
          pubpap is a place to share ideas
          <br />Academic world missed an online platform to discuss research. Until now.
          <br />pubpap is a free open-source online research sharing platform.
        </v-responsive>

        <!-- <v-avatar class="elevation-12 mb-12" size="128">
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-avatar>

        <div></div>

        <v-btn color="grey" href="https://vuetifyjs.com" outlined large>
          <span class="grey--text text--darken-1 font-weight-bold">Vuetify Documentation</span>
        </v-btn>-->
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="team">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">The team</h2>

        <v-responsive class="mx-auto title font-weight-light mb-8" max-width="720">
          <br />
        </v-responsive>

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
      jakub: require("assets/jakub.jpg")
    };
  }
};
</script>