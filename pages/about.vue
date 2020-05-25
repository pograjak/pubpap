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

    <v-btn 
      v-scroll="onScroll"
      v-show="showSignUpButton"
      large
      fixed
      class="mt-6 mr-6 title red lighten-2 text-center"
      dark
      top
      right
      style="z-index: 50"
      to="/register?nextPage=/">
      <v-icon large>mdi-file-account-outline</v-icon>&nbsp;Sign Up
    </v-btn>

    <section>
      <v-row no-gutters>
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
                  <div
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                    class="font-weight-light pt-6"
                  >where asking is gaining</div>
                </v-col>
                <v-btn
                  color="black"
                  class="align-self-end mt-8"
                  fab
                  outlined
                  @click="$vuetify.goTo('#about')"
                >
                  <v-icon>mdi-chevron-double-down</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-theme-provider>
        </div>
      </v-row>
    </section>

    <section id="about">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2
          class="font-weight-black mb-8"
          :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
        >present & discuss research papers</h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive class="mx-auto" max-width="900">
          <div :class="[$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1']" class="font-weight-bold mb-3">Present your publications</div>
          <div :class="[$vuetify.breakpoint.smAndDown ? 'title' : 'headline']" class="font-weight-light align-center mb-10">easily set-up online presentations to relevant audience</div>

          <div :class="[$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1']" class="font-weight-bold mb-3">Discuss with others</div>
          <div :class="[$vuetify.breakpoint.smAndDown ? 'title' : 'headline']" class="font-weight-light align-center mb-10">publicly share ideas, questions or additional results</div>
        </v-responsive>
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="how">
      <div class="py-12"></div>

      <v-container class="text-center py-0">
        <h2 
          class="font-weight-black mb-6"
          :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
        >How does it work?</h2>

        <v-responsive class="mx-auto" max-width="1300">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <div :class="[$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1']" class="font-weight-bold mb-6">As an author</div>
                <ol :class="[$vuetify.breakpoint.smAndDown ? 'title' : 'headline']" class="px-0  font-weight-bold" style="list-style-position: inside">
                  <li>
                    Add your paper
                    <p :class="[$vuetify.breakpoint.smAndDown ? 'subtitle-1 ' : 'title']"
                      class="mb-10"
                    >
                    Create a page for your paper on pubpap. Set the minimal size of the audience you'd like to present to. Add a moderate ticket price to prove they are interested.</p>
                  </li>
                  <li>
                    Present
                    <p :class="[$vuetify.breakpoint.smAndDown ? 'subtitle-1 ' : 'title']"
                      class="mb-10"
                    >Once all tickets are sold, you will get the chance to show your work to all researches tackling the same problem. Afterward, you get 90% of the collected money.</p>
                  </li>
                  <li>
                    Share
                    <p :class="[$vuetify.breakpoint.smAndDown ? 'subtitle-1 ' : 'title']"
                      class="mb-0"
                    >A recording will be made publicly available for free. You will thus get a chance to promote your research even more.</p>
                  </li>
                </ol>
              </v-col>
              <v-col cols="12" md="6">
                 <div :class="[$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1']" class="font-weight-bold mb-6">As a user</div>
                <ol :class="[$vuetify.breakpoint.smAndDown ? 'title' : 'headline']" class="px-0  font-weight-bold" style="list-style-position: inside">
                  <li>
                    Show interest
                    <p :class="[$vuetify.breakpoint.smAndDown ? 'subtitle-1 ' : 'title']" class="mb-10">
                      Show the author you are interested in their publication by purchasing a ticket for their live presentation.</p>
                  </li>
                  <li>
                    Join the presentation
                    <p :class="[$vuetify.breakpoint.smAndDown ? 'subtitle-1 ' : 'title']" class="mb-10">
                      You will get the chance to join the presentation and talk to the author once enough people gather*.
                    </p>
                  </li>
                </ol>
                
                <div class="text-center subtitle-2 mt-12">*Don't worry, if a paper does not get enough interest, your money will be refunded.</div>
              </v-col>
            </v-row>
          </v-container>
          <!-- <v-btn large class="mb-2 title red lighten-2" dark to="/register?nextPage=/"><v-icon large>mdi-file-account-outline</v-icon>&nbsp;Sign Up</v-btn> -->
          <!-- <div class="title mt-2">Every paper page has discussion threads.</div> -->
        </v-responsive>
      </v-container>

      <div class="py-12"></div>
    </section>


    <section id="why">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2
          class="font-weight-black mb-8"
          :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
        >Why?</h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive class="mx-auto" max-width="900">
          <div :class="[$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1']" class="font-weight-bold mb-3">Magnify impact</div>
          <div :class="[$vuetify.breakpoint.smAndDown ? 'title' : 'headline']" class="font-weight-light align-center mb-10">by presenting online for everyone</div>

          <div :class="[$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1']" class="font-weight-bold mb-3">Collaborate with the whole community</div>
          <div :class="[$vuetify.breakpoint.smAndDown ? 'title' : 'headline']" class="font-weight-light align-center mb-10">by sharing questions, comments or additional results</div>

          <div :class="[$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1']" class="font-weight-bold mb-3">Get relevant feedback</div>
          <div :class="[$vuetify.breakpoint.smAndDown ? 'title' : 'headline']" class="font-weight-light align-center mb-10">from across the academic community</div>
        </v-responsive>
        <!-- <v-btn large class="mb-2 mt-12 title red lighten-2" dark to="/register?nextPage=/"><v-icon large>mdi-file-account-outline</v-icon>&nbsp;Sign Up</v-btn> -->
      </v-container>
      
      <div class="py-12"></div>
    </section>

    <section id="team">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-6">Our team</h2>

        <v-responsive class="mx-auto title font-weight-light mb-8" max-width="720">
          <v-container>
            <v-row>
              <v-col>
                <a href="https://www.linkedin.com/in/tomas-novak/" target="_blank">
                  <v-avatar class="elevation-12 mb-6" size="128">
                    <v-img :src="tomas"></v-img>
                  </v-avatar>
                </a>
                <div class="headline font-weight-medium">Tomas Novak</div>
                <!-- <div class="caption">Co-founder</div> -->
              </v-col>

              <v-col>
                <a href="https://www.linkedin.com/in/jakub-pogran/" target="_blank">
                  <v-avatar class="elevation-12 mb-6" size="128">
                    <v-img :src="jakub"></v-img>
                  </v-avatar>
                </a>
                <div class="headline font-weight-medium">Jakub Pogran</div>
                <!-- <div class="caption">Co-founder</div> -->
              </v-col>
            </v-row>
          </v-container>
          <div class="display-1 mt-12">
            pubpap is
            <a
              class="black--text"
              href="https://github.com/pograjak/pubpap"
              target="_blank"
            >open-source</a>
          </div>
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
  head() {
    return {
      title: "About"
    };
  },

  data() {
    return {
      tomas: require("assets/tomas.jpg"),
      jakub: require("assets/jakub.jpg"),
      showGoUpButton: false,
      showSignUpButton: false
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.showGoUpButton = top > 20;

      var elmnt = document.getElementById("how");
      // var y = elmnt.scrollHeight;
      // console.log( elmnt.offsetHeight);
      let bot = top + window.innerHeight;
      this.showSignUpButton = bot > (elmnt.offsetTop + elmnt.offsetHeight);
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>