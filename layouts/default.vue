<template>
  <v-app dark class="app">
    <v-toolbar flat>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        color="red lighten-2"
        dark
        v-show="userLoggedIn.email == ''"
        @click="$store.dispatch('login/openModal')"
      >
        Sign Up
      </v-btn>

      <UserLoginForm />

      <v-btn
        color="primary"
        v-show="userLoggedIn.email != ''"
        text
        @click="$fireAuth.signOut()"
      >
        Logout
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-toolbar flat class="rcf">
      <span>
        pubpap: Made with <v-icon>mdi-coffee-outline</v-icon> at
        <a href="https://www.unihack.cz/" class="rc">Unihack</a>

        by
        <a class="rc underline" href="https://redcute.cz"> RedCute</a> &copy;
        {{ new Date().getFullYear() }}</span
      >
    </v-toolbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import UserLoginForm from "@/components/UserLoginForm.vue";

export default {
  components: {
    UserLoginForm
  },

  data() {
    return {
      position: ["master", "PhD", "postdoc", "prof", "other"],
      title: "pubpap: where asking is gaining"
    };
  },

  computed: {
    ...mapGetters({ userLoggedIn: "user" })
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
</style>
