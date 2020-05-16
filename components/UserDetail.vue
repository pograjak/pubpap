<template>
  <v-card>
    <v-card-title>Tomas Novak @ CMP Prague</v-card-title>
    <v-card-subtitle>{{ user.email }}</v-card-subtitle>
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
            <v-btn color="primary" :disabled="!valid" :loading="diag.loading" @click="submitChange">Submit</v-btn>
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
  middleware: "auth",

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
    ...mapGetters(["user"]),
    displayName() {
      if (this.affil.length > 0) {
        return `${this.name} @ ${this.affil}`;
      } else {
        return this.name;
      }
    }
  },

  methods: {
    openDiag(){
      this.diag.active = true;
    },
    submitChange() {
      this.diag.active = false;
    }
  }
};
</script>

<style scoped></style>
