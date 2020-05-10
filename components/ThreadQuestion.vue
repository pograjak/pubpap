<template>
  <v-card color="yellow lighten-5">
    <!-- Question -->
    <v-container>
      <v-row no-gutters>
        <!-- Voting icons -->
        <v-col cols="1" class="text-center icons">
          <v-btn icon @click="upvote">
            <v-icon>mdi-arrow-up-thick</v-icon>
          </v-btn>
          <br>
          {{ upvotes }}
          <br>
          <v-btn icon @click="downvote">
            <v-icon>mdi-arrow-down-thick</v-icon>
          </v-btn>
        </v-col>

        <v-col>
          <v-card-title class="pt-0 pb-2 subtitle-1">{{ title }}</v-card-title>
          <v-card-text class="markdown-body" v-html="text_html"></v-card-text>
          <v-row no-gutters>
            <v-col></v-col>
            <User :date="date" :name="name" :rightAlign="true" />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>


<script>
import User from "~/components/User.vue";
import "~/assets/own-github-markdown.css";

export default {
  props: {
    threadId: String,
    title: String,
    text_html: String,
    date: Number,
    name: String,
    upvotes: Number
  },
  components: {
    User
  },
  data() {
    return {};
  },
  methods: {
    upvote() {
      this.$store.dispatch("threads/upvote", this.threadId);
    },

    downvote() {
      this.$store.dispatch("threads/downvote", this.threadId);
    }
  }
};
</script>

<style scoped>
.icons {
  max-width: 40px;
  text-align: center;
}
</style>