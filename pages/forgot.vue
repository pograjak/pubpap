<template>
  <v-card>
    <v-card-title primary-title>
      Reset your password
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
        <v-btn color="primary" @click.prevent="resetPassword" block>
          Send Instructions
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <nuxt-link to="/login">
          <small> Back to Login page </small>
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
      email: ""
    };
  },

  methods: {
    async resetPassword() {
      let sentEmail = await this.$fireAuth.sendPasswordResetEmail(this.email);
    }
  }
};
</script>

<style scoped></style>
