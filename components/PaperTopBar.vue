<template>
  <div class="d-flex justify-end">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon @click="starClick">
          51
          <v-icon v-if="stared" class="yestar">mdi-star</v-icon>
          <v-icon v-else>mdi-star-outline</v-icon>
        </v-btn>
      </template>
      <span v-if="stared" class="caption">Add to favorites</span>
      <span v-else class="caption">Remove from favorites</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon v-clipboard:copy="paperURL">
          <v-icon>mdi-clipboard-text-outline</v-icon>
        </v-btn>
      </template>
      <span class="caption">Copy URL to clipboard</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="#1da1f2" icon @click="twitterClick">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
      </template>
      <span class="caption">Share page on Twitter</span>
    </v-tooltip>
  </div>
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);

export default {
  data() {
    return {
      stared: true
    };
  },

  computed: {
    paperURL() {
      // TODO: change this to correct address
      return `https://pubpap.com/paper/${this.$route.params.id}`;
    }
  },

  methods: {
    sharePopUp(url) {
      window.open(url, "newwindow", "width=600, height=600");
      return false;
    },
    twitterClick() {
      this.sharePopUp("https://twitter.com/share?url=" + this.paperURL);
    },
    starClick() {
      this.stared = !this.stared;
    }
  }
};
</script>

<style scoped>
.yestar {
  color: #3f51b5 !important;
}
</style>