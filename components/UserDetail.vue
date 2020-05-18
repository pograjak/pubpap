<template>
  <v-card>
    <v-card-title>{{ user.displayName }}</v-card-title>
    <v-card-subtitle>{{ user.email }}</v-card-subtitle>
    <v-card-actions class="px-4 pb-4">
      <v-btn @click="openDiag" color="primary">Change name</v-btn>
    </v-card-actions>

    <v-dialog v-model="diag.active" max-width="600px">
      <v-card>
        <v-card-title>Change name</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-text-field
              :rules="nameRules"
              label="Name"
              placeholder="Mary Smith"
              v-model="name_diag"
            ></v-text-field>
            <v-text-field
              :rules="affilRules"
              label="Affiliation"
              placeholder="CMP, Prague"
              v-model="affil_diag"
            ></v-text-field>
            <p class="text-center subtitle-1">Name: {{ makeDispName(name_diag, affil_diag) }}</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="diag.active = false">Cancel</v-btn>
            <v-btn
              color="primary"
              :disabled="!valid"
              :loading="diag.loading"
              @click="submitChange"
            >Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- <v-card-text>
      <span class="heading-2">Edit</span>
      
    </v-card-text>-->
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // middleware: "auth",

  data() {
    return {
      diag: {
        active: false,
        loading: false
      },
      valid: false,
      name_diag: "",
      affil_diag: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 40) || "Name must be less than 40 characters"
      ],
      affilRules: [
        v => v.length <= 20 || "Affiliation must be less than 20 characters"
      ]
      // items: ["bc", "ing", "doc", "prof"], value: ""
    };
  },

  computed: {
    ...mapGetters(["user"]),
    ...mapGetters({
      name: "userinfo/name",
      affil: "userinfo/affil"
    })
  },

  created() {
    this.$store.dispatch("userinfo/loadUserInfo", this.user.id);
  },

  methods: {
    openDiag() {
      if (this.name) {
        this.name_diag = this.name;
        this.affil_diag = this.affil;
      }
      this.diag.active = true;
    },
    async submitChange() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.diag.loading = true;

      await this.$store.dispatch(
        "changeDisplayName",
        this.makeDispName(this.name_diag, this.affil_diag)
      );

      // await this.$fireAuth.currentUser.updateProfile({
      // displayName:
      // });

      await this.$store.dispatch("userinfo/setUserInfo", {
        userId: this.user.id,
        name: this.name_diag,
        affil: this.affil_diag
      });

      this.diag.loading = false;
      this.diag.active = false;
    },
    makeDispName(name, affil) {
      if (affil) {
        return `${name}@${affil}`;
      } else {
        return name;
      }
    }
  }
};
</script>

<style scoped></style>
