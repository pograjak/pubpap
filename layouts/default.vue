<template>
  <v-app dark class="app">
    <v-toolbar flat app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        color="red lighten-2"
        dark
        v-show="userLoggedIn.email == ''"
        @click="$store.dispatch('login/openModal')"
      >
        Login
      </v-btn>

      <div class="text-center">
        <v-dialog v-model="modalState" width="50%">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Login
            </v-card-title>
            <v-form ref="form">
              <v-card-text>
                <v-text-field
                  v-model="email"
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="text"
                />
                <v-select
                  :items="position"
                  v-model="select"
                  prepend-icon="mdi-email"
                  label="Position"
                  name="position"
                ></v-select>

                <v-text-field
                  v-model="password"
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                />
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent="login">
                  Login
                </v-btn>
                <v-btn color="primary" text @click.prevent="register">
                  Register
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </div>

      <v-btn
        color="primary"
        v-show="userLoggedIn.email != ''"
        text
        @click="logout"
      >
        Logout
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-toolbar flat app>
      <span>
        pubpap: Made with <v-icon>mdi-coffee-outline</v-icon> at Unihack by
        <a class="rc" href="https://redcute.cz"> RedCute</a> &copy;
        {{ new Date().getFullYear() }}</span
      >
    </v-toolbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      position: ["master", "PhD", "postdoc", "prof", "other"],
      title: "pubpap: where asking is gaining",
      email: "",
      password: "",
      select: ""
    };
  },

  computed: {
    modalState: {
      get() {
        return this.$store.getters["login/modalState"];
      },
      set(value) {
        this.$store.commit("login/updateModalState", value);
      }
    },
    ...mapGetters({ userLoggedIn: "user" })
  },

  methods: {
    async login() {
      const user = await this.$fireAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      if (user) {
        this.$store.dispatch("login/closeModal");
      }
      console.log(this.userLoggedIn);
    },

    async register() {
      const user = await this.$fireAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      if (user) {
        this.$store.dispatch("login/setUserPosition", this.select);
        this.$store.dispatch("login/closeModal");
      }
    },

    async logout() {
      await this.$fireAuth.signOut();
      console.log(this.user);
    }
  }
};
</script>

<style scoped>
.app {
  font-family: "Inconsolata", monospace;
}

.rc {
  color: black;
  text-decoration-line: underline;
}
</style>
