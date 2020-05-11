<template>
  <v-card color="yellow lighten-5">
    <!-- Question -->
    <v-container>
      <v-row no-gutters>
        <!-- Voting icons -->
        <v-col cols="1" class="text-center icons">
          <div v-if="loadingVotes">
            <LoadingSpinner style="transform: rotate(90deg);" />
          </div>
          <div v-else>
            <v-btn
              :disabled="votingDisabled"
              depressed
              :class="{'upvotecol': state_upvote, 'anim': state_upvote, 'novotecol': !state_upvote}"
              icon
              @click="upvote"
            >
              <v-icon>mdi-arrow-up-thick</v-icon>
            </v-btn>
            <br />
            <p class="my-1">{{ upvotes }}</p>
            <v-btn
              :disabled="votingDisabled"
              depressed
              :class="{'downvotecol': state_downvote, 'anim': state_downvote, 'novotecol': !state_downvote}"
              icon
              @click="downvote"
            >
              <v-icon>mdi-arrow-down-thick</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col>
          <v-card-title class="pt-0 pb-2 title font-weight-bold">{{ title }}</v-card-title>
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
import LoadingSpinner from "~/components/LoadingSpinner.vue";
import "~/assets/own-github-markdown.css";
import { mapGetters } from "vuex";

export default {
  props: {
    threadId: String,
    title: String,
    text_html: String,
    date: Object,
    name: String,
    upvotes: Number,
    votingDisabled: Boolean
  },
  components: {
    User,
    LoadingSpinner
  },

  created: function() {
    // load state of voting
    this.loadingVotes = true;
    this.$fireStore // add a vote
      .collection("papers")
      .doc("bVypOMp1sZ9I4R0ib5hV")
      .collection("threads")
      .doc(this.threadId)
      .collection("user_votes")
      .doc(this.user.id)
      .get()
      .then(doc => {
        this.state_downvote = false;
        this.state_upvote = false;
        if (doc.exists) {
          if (doc.data().v > 0) {
            this.state_upvote = true;
          } else {
            this.state_downvote = true;
          }
        }
        this.loadingVotes = false;
      });
  },

  computed: {
    ...mapGetters(["user"])
  },
  data() {
    return {
      state_upvote: false,
      state_downvote: false,
      loadingVotes: true
    };
  },
  methods: {
    updateStoreVote() {
      var state = 0;
      if (this.state_downvote) {
        state = -1;
      }
      if (this.state_upvote) {
        state = 1;
      }

      this.$store.dispatch("threads/vote", {
        threadId: this.threadId,
        userId: this.user.id,
        state: state
      });
    },
    upvote() {
      this.state_upvote = !this.state_upvote;
      this.state_downvote = false;
      this.updateStoreVote();
    },
    downvote() {
      this.state_downvote = !this.state_downvote;
      this.state_upvote = false;
      this.updateStoreVote();
    }
  }
};
</script>

<style scoped>
.icons {
  max-width: 40px;
  text-align: center;
}
.anim {
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  filter: FlipH;
  -ms-filter: "FlipH";
}
.downvotecol {
  /* color: #3f51b5 !important; */
  color: #b71c1c !important;
}
.upvotecol {
  /* color: #3f51b5 !important; */
  color: #4caf50 !important;
}
.novotecol {
  color: #b4b4b4 !important;
}
</style>