<template>
  <div>
    <h1>Questions</h1>

    <v-list two-line>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            >Full cross-validation results available?</v-list-item-title
          >
          <v-list-item-subtitle>Tim Cook</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          491
          <v-icon color="indigo">mdi-account-alert</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Repeatability issues</v-list-item-title>
          <v-list-item-subtitle>Jiri Matas</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          18
          <v-icon color="indigo">mdi-account-outline</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    <div v-for="(comment, index) in comments" :key="index">
      {{ comment }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      text: "Hello first"
    };
  },
  created() {
    this.$store.dispatch("comments/bindComments");
  },
  computed: {
    ...mapGetters({
      comments: "comments/comments"
    })
  },

  methods: {
    btnClick() {
      this.text = "Hello second";
    }
  }
};
</script>

<style scoped></style>
