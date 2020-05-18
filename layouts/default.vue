<template>
  <v-app dark class="app">
    <v-toolbar flat>
      <nuxt-link class="header-link" to="/">
        <v-toolbar-title v-text="title" />
      </nuxt-link>
      <v-spacer />

      <!-- <UserLoginForm /> -->

      <!-- Home button -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text to="/" color="primary">
            <v-icon>mdi-home</v-icon>
            <!-- &nbsp;Home -->
          </v-btn>
        </template>
        <span class="caption">Home page</span>
      </v-tooltip>

      <!-- User Logged in  -->
      <template v-if="user.id">
        <!-- Profile button -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text to="/profile" color="primary">
              <!-- <div class="d-inline-flex align-right text-center mx-2"> -->
              <v-icon>mdi-account</v-icon>&nbsp;
              <div>
                <div
                  class="body-2"
                  style="line-height: 100%; text-transform: none"
                >{{ user.displayName }}</div>
                <!-- <div class="caption" style="line-height: 100%; text-transform: none">{{ $fireAuth.currentUser.email }}</div> -->
              </div>
              <!-- </div> -->
            </v-btn>
          </template>
          <span class="caption">Profile page</span>
        </v-tooltip>

        <!-- Logout button -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text @click="$fireAuth.signOut()" color="primary">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span class="caption">Logout</span>
        </v-tooltip>
      </template>
      <!--No login -->
      <template v-else>
        <v-btn color="primary" text :to="`/login?nextPage=${$route.fullPath}`">
          <v-icon>mdi-account</v-icon>&nbsp;Login
        </v-btn>
        <v-btn color="red lighten-2" dark :to="`/register?nextPage=${$route.fullPath}`">
          <v-icon>mdi-file-account-outline</v-icon>&nbsp;Sign Up
        </v-btn>
      </template>

      <!-- <v-btn color="primary" v-if="userLoggedIn.email != ''" text>Logout</v-btn> -->
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-toolbar flat class="rcf">
      <span>
        pubpap: Made with
        <v-icon>mdi-coffee-outline</v-icon>at
        <a href="https://www.unihack.cz/" class="rc">Unihack</a>
        by
        <a class="rc underline" href="https://redcute.cz">RedCute</a>
        &copy;
        {{ new Date().getFullYear() }}
      </span>
    </v-toolbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
// import UserLoginForm from "@/components/UserLoginForm.vue";

export default {
  components: {
    // UserLoginForm
  },

  data() {
    return {
      position: ["master", "PhD", "postdoc", "prof", "other"],
      title: "pubpap: where asking is gaining"
    };
  },

  computed: {
    ...mapGetters(["user"])
  },

  methods: {}
};
</script>

<style scoped>
/* .app {
  font-family: "Nunito", sans-serif;
} */

a.rc {
  color: grey;
  text-decoration: none;
}

.underline {
  border-bottom: 2px solid grey;
}

.rcf {
  font-size: 14px;
  color: grey;
}

.header-link {
  text-decoration: none;
  color: black;
}

.activeNav {
  color: #5666be;
}
</style>
