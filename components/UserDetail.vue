<template>
  <v-card>
    <v-card-title>{{ displayNameDb }}</v-card-title>
    <v-card-subtitle>{{this.$fireAuth.currentUser.email }}</v-card-subtitle>
    <v-card-actions class="px-4 pb-4">
      <v-btn @click="openDiag" color="primary">Change name</v-btn>
    </v-card-actions>

    <v-dialog v-model="diag.active" max-width="600px">
      <v-card>
        <v-card-title>Change name</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-text-field :rules="nameRules" label="Name" placeholder="Mary Smith" v-model="name"></v-text-field>
            <v-text-field
              :rules="affilRules"
              label="Affiliation"
              placeholder="CMP, Prague"
              v-model="affil"
            ></v-text-field>
            <p class="text-center subtitle-1">Name: {{ displayName }}</p>
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
      name: "",
      affil: "",
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
    ...mapGetters({
      name_get: "userinfo/name",
      affil_get: "userinfo/affil"
    }),
    displayName() {
      return this.makeDispName(this.name, this.affil);
    },
    displayNameDb() {
      return this.makeDispName(this.name_get, this.affil_get);
    }
  },

  created() {
    this.$store.dispatch(
      "userinfo/loadUserInfo",
      this.$fireAuth.currentUser.uid
    );
  },

  watch: {
    name_get: function(val) {
      this.name = val;
    },
    affil_get: function(val) {
      this.affil = val;
    }
  },

  methods: {
    openDiag() {
      this.diag.active = true;
    },
    submitChange() {
      if (!this.name) {
        return;
      }

      this.diag.loading = true;
      this.$store
        .dispatch("userinfo/setUserInfo", {
          userId: this.$fireAuth.currentUser.uid,
          name: this.name,
          affil: this.affil
        })
        .then(() => {
          this.diag.loading = false;
          this.diag.active = false;
        });
    },
    makeDispName(name, affil) {
      if (affil) {
        return `${name} @ ${affil}`;
      } else {
        return name;
      }
    }
  }
};
</script>

<style scoped></style>
