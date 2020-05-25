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
              :disabled="!user.id"
              depressed
              :class="{'upvotecol': voteState>0, 'anim': voteState>0}"
              icon
              @click="upvote"
            >
              <v-icon>mdi-arrow-up-thick</v-icon>
            </v-btn>
            <br />
            <p class="my-1">{{ thread.votes }}</p>
            <v-btn
              :disabled="!user.id"
              depressed
              :class="{'downvotecol': voteState<0, 'anim': voteState<0}"
              icon
              @click="downvote"
            >
              <v-icon>mdi-arrow-down-thick</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col>
          <v-card-title class="pt-0 pb-2 title font-weight-bold">{{ thread.title }}</v-card-title>
          <v-card-text class="markdown-body" v-html="renderMarkdown(thread.text)"></v-card-text>
          <v-row no-gutters>
            <v-col></v-col>
            <User :date="thread.createdAt" :name="thread.uaserName" :rightAlign="true" />
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
import { md } from "~/plugins/markdown_render.js";
import debounce from "lodash/debounce";

export default {
  components: {
    User,
    LoadingSpinner
  },

  data() {
    return {
      votesShowLoading: false
    };
  },

  computed: {
    ...mapGetters({
      user: "user",
      thread: "thread/thread",
      voteState: "thread/voteState"
    }),
    paperId() {
      return this.$route.params.paperid;
    },
    threadId() {
      return this.$route.params.threadid;
    }
  },

  created: function() {
        // Load voting state
    if (this.$fireAuth.currentUser) {
      this.votesShowLoading = true;

      this.$store
        .dispatch("thread/bindVoteState", {
          paperId: this.paperId,
          threadId: this.threadId,
          userId: this.$fireAuth.currentUser.uid
        })
        .then(() => {
          this.votesShowLoading = false;
        });
    }
  },

  methods: {
    renderMarkdown(text){
      return md.render(text);
    },
    updateStoreVote(newState) {
      this.$store.dispatch("thread/vote", {
        paperId: this.paperId,
        threadId: this.threadId,
        userId: this.user.id,
        state: newState
      });
    },
    debounceUpdateStoreVote: debounce(
      function(newState) {
        console.log('Debounce fn');
        // console.log(`Search: ${this.textInput}`);
        this.updateStoreVote(newState);
      },
      500,
      {
        'leading': true,
        'trailing': false
      }
    ),
    upvote() {
      let newState = 1;
      if (this.voteState > 0) {
        newState = 0;
      }
      this.debounceUpdateStoreVote(newState);
    },
    downvote() {
      let newState = -1;
      if (this.voteState < 0) {
        newState = 0;
      }
      this.debounceUpdateStoreVote(newState);
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
</style>