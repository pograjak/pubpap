<template>
  <v-card>
    <v-card-title primary-title>
      Register to pubpap
    </v-card-title>
    <v-form v-model="validForm" ref="form">
      <v-card-text>
        <v-btn
          color="primary"
          @click.prevent="loginWithGoogle"
          block
          large
          :disabled="loadingGoogle"
          :loading="loadingGoogle"
        >
          <v-icon left>mdi-google</v-icon>
          with Google
        </v-btn>
        <br />
        <v-divider></v-divider>

        <div align="center">or</div>

        <v-text-field
          v-model="email"
          label="Email"
          name="email"
          :rules="emailRules"
          prepend-icon="mdi-email"
          type="text"
        />

        <v-text-field
          v-model="password"
          id="password"
          label="Password"
          name="password"
          :rules="passwordRules"
          prepend-icon="mdi-lock"
          type="password"
        />
        <v-btn
          color="primary"
          @click.prevent="register"
          block
          :loading="loadingEmail"
          :disabled="loadingEmail"
        >
          Register
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <small>
          Already have an account?
          <nuxt-link
            :to="{ path: 'login', query: { nextPage: $route.query.nextPage } }"
          >
            Log In
          </nuxt-link>
        </small>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  head() {
    return {
      title: "Sign up"
    };
  },

  data() {
    return {
      validForm: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          (v && v.length > 7) || "Password has to be at least 8 charaters long"
      ],
      loadingEmail: false,
      loadingGoogle: false
    };
  },
  layout: "signup",

  methods: {
    async register() {
      this.loadingEmail = true;
      if (this.$refs.form.validate()) {
        try {
          const user = await this.$fireAuth.createUserWithEmailAndPassword(
            this.email,
            this.password
          );

          this.$store.dispatch("changeDisplayName", this.email.split("@")[0]);
          this.redirect();
        } catch (error) {
          console.log(error);

          this.loadingEmail = false;
        }
      } else this.loadingEmail = false;
    },

    async loginWithGoogle() {
      this.loadingGoogle = true;
      let provider = new this.$fireAuthObj.GoogleAuthProvider();
      try {
        const user = await this.$fireAuth.signInWithPopup(provider);
        this.redirect();
      } catch (error) {
        console.log(error);

        this.loadingGoogle = false;
      }
    },

    redirect() {
      if (this.$route.query.nextPage) {
        this.$router.push(this.$route.query.nextPage);
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped></style>
