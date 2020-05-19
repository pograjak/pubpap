<template>
  <v-card>
    <v-card-title primary-title>
      Login to pubpap
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
          Log in with Google
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
          prepend-icon="mdi-lock"
          type="password"
          :error-messages="errorMsg"
          @keydown.enter="login"
        />
        <v-btn
          color="primary"
          @click.prevent="login"
          block
          :disabled="loadingEmail"
          :loading="loadingEmail"
        >
          Login
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <nuxt-link
          :to="{ path: 'register', query: { nextPage: $route.query.nextPage } }"
        >
          <small> Don't have an account? </small>
        </nuxt-link>
        <v-spacer></v-spacer>
        <nuxt-link to="/forgot">
          <small>
            Forgot password?
          </small>
        </nuxt-link>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  layout: "signup",
  data() {
    return {
      validForm: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      errorMsg: "",
      loadingGoogle: false,
      loadingEmail: false
    };
  },

  methods: {
    async login() {
      this.loadingEmail = true;
      if (this.$refs.form.validate()) {
        try {
          const user = await this.$fireAuth.signInWithEmailAndPassword(
            this.email,
            this.password
          );
          if (user) this.redirect();
          else this.loadingEmail = false;
        } catch (error) {
          console.log(error);
          this.errorMsg = "Invalid password or email";
          this.loadingEmail = false;
        }
      } else this.loadingEmail = false;
    },

    async loginWithGoogle() {
      this.loadingGoogle = true;
      let provider = new this.$fireAuthObj.GoogleAuthProvider();
      try {
        const user = await this.$fireAuth.signInWithPopup(provider);
        if (user) this.redirect();
      } catch (error) {
        console.log(error);
        this.loadingGoogle = false;
      }
    },

    redirect() {
      if (this.$route.query.nextPage && !this.$route.query.nextPage.includes("/login")) {
        this.$router.push(this.$route.query.nextPage);
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped></style>
