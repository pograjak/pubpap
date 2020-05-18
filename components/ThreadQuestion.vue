<template>
  <v-card color="yellow lighten-5">
    <!-- Question -->
    <v-container>
      <v-row no-gutters>
        <!-- Voting icons -->
        <v-col cols="1" class="text-center icons">
          <div v-if="votesShowLoading">
            <LoadingSpinner style="transform: rotate(90deg);" />
          </div>
          <div v-else>
            <v-btn
              :disabled="votingDisabled"
              depressed
              :class="{'disable-events': votingPause, 'upvotecol': voteUserState>0, 'anim': voteUserState>0, 'novotecol': voteUserState<=0}"
              icon
              @click="upvote"
            >
              <v-icon>mdi-arrow-up-thick</v-icon>
            </v-btn>
            <br />
            <p class="my-1">{{ votes_internal }}</p>
            <v-btn
              :disabled="votingDisabled"
              depressed
              :class="{'disable-events': votingPause, 'downvotecol': voteUserState<0, 'anim': voteUserState<0, 'novotecol': voteUserState>=0}"
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
  components: {
    User,
    LoadingSpinner
  },
  props: {
    threadId: String,
    title: String,
    text_html: String,
    date: Object,
    name: String,
    votes: Number,
    votingDisabled: Boolean,
    voteUserState: Number,
    votesShowLoading: Boolean
  },
  data() {
    return {
      votes_internal: 0,
      votingPause: false
    };
  },
  computed: {
    ...mapGetters(["user"])
  },

  created: function() {
    this.votes_internal = this.votes;
  },

  watch: {
    votes: function(val) {
      this.votes_internal = this.votes;
      this.votingPause = false;
    }
  },
  methods: {
    updateStoreVote(newState) {
      this.$store.dispatch("threads/vote", {
        paperId: this.$route.params.id,
        threadId: this.threadId,
        userId: this.user.id,
        state: newState
      });
    },
    upvote() {
      if (this.votingPause) {
        return;
      }
      this.votingPause = true;
      var newState = 1;

      if (this.voteUserState > 0) {
        newState = 0;
        this.votes_internal -= 1;
      } else if (this.voteUserState == 0) {
        this.votes_internal += 1;
      } else {
        this.votes_internal += 2;
      }

      this.updateStoreVote(newState);
    },
    downvote() {
      if (this.votingPause) {
        return;
      }
      this.votingPause = true;
      var newState = -1;

      if (this.voteUserState > 0) {
        this.votes_internal -= 2;
      } else if (this.voteUserState == 0) {
        this.votes_internal -= 1;
      } else {
        newState = 0;
        this.votes_internal += 1;
      }

      this.updateStoreVote(newState);
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
.disable-events {
  pointer-events: none;
}
</style>