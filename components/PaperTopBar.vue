<template>
  <div class="d-flex justify-end">
    <v-tooltip bottom v-if="loggedin">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon @click="starClick">
          <v-icon v-if="stared" color="#f1cf0c" class="yestar">mdi-star</v-icon>
          <v-icon v-else class="nostar">mdi-star-outline</v-icon>
        </v-btn>
      </template>
      <span v-if="stared" class="caption">Remove from favorites</span>
      <span v-else class="caption">Add to favorites</span>
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
      stared: true,
      clickChangeRunning: false
    };
  },

  computed: {
    paperURL() {
      // TODO: change this to correct address
      return `https://pubpap.com/paper/${this.$route.params.id}`;
    },
    loggedin() {
      return this.$fireAuth.currentUser != null;
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
      if (this.clickChangeRunning) {
        return;
      }
      this.clickChangeRunning = true;
      this.$store
        .dispatch("paper/editFavorites", {
          paperId: this.$route.params.id,
          userId: this.$fireAuth.currentUser.uid,
          add: !this.stared
        })
        .then(() => {
          this.stared = !this.stared;
          new Promise(r => setTimeout(r, 1000)).then(() => {
            // alow changes after a delay
            this.clickChangeRunning = false;
          });
        });
    }
  }
};
</script>

<style scoped>
.yestar {
  animation: pulseStar 500ms ease-in-out;
  z-index: 50;
}
@keyframes pulseStar {
  0% {
    color: #777777;
    transform: scale(1);
  }
  50% {
    color: #f1cf0c;
    transform: scale(2);
  }
  100% {
    color: #f1cf0c;
    transform: scale(1);
  }
}

.nostar {
  animation: pulseUnstar 500ms ease-in-out 50ms;
  z-index: 50;
}

@keyframes pulseUnstar {
  0% {
    color: #f1cf0c;
    transform: scale(1);
  }

  50% {
    color: #777777;
    transform: scale(0.8);
  }

  100% {
    color: #777777;
    transform: scale(1);
  }
}
</style>