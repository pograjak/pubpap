<template>
  <div class="d-flex justify-space-between">
    <div
      class="caption grey--text align-self-end px-1"
    >Page created by: {{ paper.authorName ? paper.authorName : "dev" }}</div>
    <div class="d-flex">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <div class="d-flex align-center">
            <span class="caption my-0 py-0">{{ paper.favs.length }}</span>
            <v-btn
              v-on="on"
              icon
              @click="starClick"
              :class="{'disable-events': (clickChangeRunning || !user.id )}"
            >
              <v-icon v-if="stared" color="#f1cf0c" class="yestar">mdi-star</v-icon>
              <v-icon v-else class="nostar">mdi-star-outline</v-icon>
            </v-btn>
          </div>
        </template>
        <span v-if="stared" class="caption">Remove from favorites</span>
        <span v-else-if="user.id" class="caption">Add to favorites</span>
        <span v-else class="caption">Log in to add to favorites</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            v-clipboard:copy="paperURL"
            :loading="copyLoading"
            @click="copyLoading = true"
            :class="{'copySuccess': copySuccess}"
            v-clipboard:success="copySuccessFcn"
          >
            <v-icon>mdi-link</v-icon>
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
  </div>
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import { mapGetters } from "vuex";

Vue.use(VueClipboard);

export default {
  data() {
    return {
      clickChangeRunning: false,
      copyLoading: false,
      copySuccess: false
    };
  },

  computed: {
    ...mapGetters({
      paper: "paper/paper",
      user: "user"
    }),
    paperURL() {
      // TODO: change this to correct address
      return `https://pubpap.com/paper/${this.$route.params.id}`;
    },
    stared() {
      if (this.user.id && Array.isArray(this.paper.favs)) {
        return this.paper.favs.includes(this.user.id);
      }
    }
  },

  methods: {
    copySuccessFcn() {
      this.copyLoading = false;
      this.copySuccess = true;
      new Promise(r => setTimeout(r, 1000)).then(() => {
        this.copySuccess = false;
      });
    },
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
        .dispatch("paper/editFavorites", this.$route.params.id)
        .then(() => {
          new Promise(r => setTimeout(r, 500)).then(() => {
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
  /* z-index: 50; */
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
  /* z-index: 1; */
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
.disable-events {
  pointer-events: none;
}

.copySuccess {
  color: #4caf50 !important;
  animation: pulseCopy 500ms ease-in-out;
}
@keyframes pulseCopy {
  0% {
    color: #777777;
    transform: scale(1);
  }
  50% {
    color: #4caf50;
    transform: scale(2);
  }
  100% {
    color: #4caf50;
    transform: scale(1);
  }
}
</style>