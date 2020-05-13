<template>
  <v-card>
    <v-card-title primary-title>
      Login to pubpap
    </v-card-title>
    <v-form>
      <v-card-text>
        <v-btn
          color="primary"
          @click.prevent="loginWithGoogle"
          block
          large
          :disabled="loading"
          :loading="loading"
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
        />
        <v-btn
          color="primary"
          @click.prevent="login"
          block
          :disabled="loading"
          :loading="loading"
        >
          Login
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <nuxt-link to="/register">
          <small> Don't have an account? </small>
        </nuxt-link>
        <v-spacer></v-spacer>
        <a>
          <small>
            Forgot password?
          </small>
        </a>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  layout: "signup",
  data() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },

  methods: {
    async login() {
      this.loading = true;
      const user = await this.$fireAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      if (user) this.$router.push("/");
      else this.loading = false;
    },

    async loginWithGoogle() {
      this.loading = true;
      let provider = new this.$fireAuthObj.GoogleAuthProvider();
      const user = await this.$fireAuth.signInWithPopup(provider);
      if (user) this.$router.push("/");
    }
  }
};
</script>

<style scoped></style>
