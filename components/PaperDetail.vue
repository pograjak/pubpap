<template>
  <v-card class="mx-auto" min-width="500" max-width="1800" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-card-title>
          {{ paper.title }}
        </v-card-title>
        <v-card-subtitle>{{ paper.authors }}</v-card-subtitle>
        <v-card-text class="justify-center">
          {{ paper.summary }}
        </v-card-text>

        <v-card-actions>
          <v-btn color="white-black">arXiv</v-btn>
          <v-btn color="white-black">arXiv PDF</v-btn>
          <v-btn color="white-black">
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-card-actions>
      </v-list-item-content>

      <v-list-item-avatar tile size="300" color="grey">
        <v-img :src="images.paper"></v-img>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      images: {
        paper: require("~/assets/paper.png")
      }
    };
  },

  created() {
    if (this.$route.params.id) {
      this.$store.dispatch("paper/loadPaper", this.$route.params.id);
    }
  },

  computed: {
    ...mapGetters({
      paper: "paper/paper"
    })
  }
};
</script>

<style scoped></style>
