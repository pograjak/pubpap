<template>
  <v-card>
    <v-card-title primary-title>
      Login
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
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.prevent="login">
          Login
        </v-btn>
        <v-btn text color="primary" to="/register">
          Register
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  layout: "signup"
};
</script>

<style scoped></style>
