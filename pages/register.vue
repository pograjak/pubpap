<template>
  <v-card>
    <v-card-title primary-title>
      Register to pubpap
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
          Register
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <small>
          Already have an account?
          <nuxt-link to="/login">Log In</nuxt-link>
        </small>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  layout: "signup"
};
</script>

<style scoped></style>
