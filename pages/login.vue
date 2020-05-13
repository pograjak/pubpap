<template>
  <v-card>
    <v-card-title primary-title>
      Login to pubpap
    </v-card-title>
    <v-form>
      <v-card-text>
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
        <v-btn color="primary" @click.prevent="login" block>
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
      password: ""
    };
  },

  methods: {
    async login() {
      const user = await this.$fireAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      if (user) this.$router.push("/");
    }
  }
};
</script>

<style scoped></style>
