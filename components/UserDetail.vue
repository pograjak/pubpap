<template>
  <div>
    <v-avatar color="indigo">
      <span v-if="!user.photoUrl">
        <v-icon dark>mdi-account-circle</v-icon>
      </span>
    </v-avatar>
    {{ user.email }}
    <div>
      Position:
      <v-select
        :items="items"
        v-model="value"
        label="select your position"
      ></v-select>
    </div>

    Image <br />
    Papers - list etc
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: "auth",

  data() {
    return { items: ["bc", "ing", "doc", "prof"], value: "" };
  },

  computed: {
    ...mapGetters(["user"])
  },

  methods: {
    setPosition() {}
  }
};
</script>

<style scoped></style>
