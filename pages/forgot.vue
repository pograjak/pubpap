<template>
  <v-card>
    <v-card-title primary-title>Reset your password</v-card-title>
    <v-form ref="form">
      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          name="email"
          :rules="emailRules"
          prepend-icon="mdi-email"
          type="text"
        />
        <v-btn
          :loading="btnLoad"
          :class="{ success: btnSuccess, error: btnError }"
          color="primary"
          @click.prevent="resetPassword"
          block
        >
          <v-icon v-if="btnSuccess">mdi-check-circle</v-icon>
          <v-icon v-if="btnError">mdi-alert-circle-outline</v-icon>
          &nbsp;{{ btnText }}
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <nuxt-link to="/login">
          <small>Back to Login page</small>
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
      email: "",
      btnText: "Send reset link",
      btnLoad: false,
      btnError: false,
      btnSuccess: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },

  methods: {
    async resetPassword() {
      if (!this.btnSuccess && !this.btnError && this.$refs.form.validate()) {
        this.btnLoad = true;
        let sentEmail = await this.$fireAuth
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.btnLoad = false;
            this.btnSuccess = true;
            this.btnText = "Success!";
          })
          .catch(err => {
            console.log(err);
            this.btnLoad = false;
            this.btnError = true;
            if (err.code == "auth/user-not-found") {
              this.btnText = "Email not found";
              new Promise(r => setTimeout(r, 5000)).then(() => {
                this.btnError = false;
                this.btnText = "Send reset link";
              });
            } else {
              this.btnText = "Error sending link";
            }
          });
      }
    }
  }
};
</script>

<style scoped></style>
