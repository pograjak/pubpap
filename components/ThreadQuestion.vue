<template>
  <v-card color="yellow lighten-5">
    <!-- Question -->
    <v-container>
      <v-row no-gutters>
        <!-- Voting icons -->
        <v-col cols="1" class="text-center icons">
          <div v-if="loadingVotes < 1">
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
    date: Number,
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
    var mainref = this.$fireStore
      .collection("votes")
      .doc("bVypOMp1sZ9I4R0ib5hV")
      .collection("threads")
      .doc(this.threadId);

    mainref
      .collection("upvotes")
      .doc(this.user.id)
      .get()
      .then(doc => {
        this.state_upvote = doc.exists;
        this.loadingVotes += 1;
      });

    mainref
      .collection("downvotes")
      .doc(this.user.id)
      .get()
      .then(doc => {
        this.state_downvote = doc.exists;
        this.loadingVotes += 1;
      });
  },

  computed: {
    ...mapGetters(["user"])
  },
  data() {
    return {
      state_upvote: false,
      state_downvote: false,
      loadingVotes: 0
    };
  },
  methods: {
    updateStoreUpvote() {
      this.$store.dispatch("threads/vote", {
        threadId: this.threadId,
        userId: this.user.id,
        state: this.state_upvote,
        voteType: "upvotes"
      });
    },
    updateStoreDownvote() {
      this.$store.dispatch("threads/vote", {
        threadId: this.threadId,
        userId: this.user.id,
        state: this.state_downvote,
        voteType: "downvotes"
      });
    },
    upvote() {
      this.state_upvote = !this.state_upvote;
      this.updateStoreUpvote();
      if (this.state_downvote) {
        this.state_downvote = false;
        this.updateStoreDownvote();
      }
    },
    downvote() {
      this.state_downvote = !this.state_downvote;
      this.updateStoreDownvote();
      if (this.state_upvote) {
        this.state_upvote = false;
        this.updateStoreUpvote();
      }
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