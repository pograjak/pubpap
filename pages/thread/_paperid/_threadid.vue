<template>
  <v-card flat>
    <v-btn top left depressed class="mb-4" id="scrollAnchor" :to="`/paper/${paperId}`">
      <v-icon>mdi-arrow-left</v-icon>&nbsp;Back to paper
    </v-btn>

    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          v-scroll="onScroll"
          v-show="showBackButton"
          fixed
          top
          left
          class="ml-3 mt-3"
          fab
          color="white"
          small
          :to="`/paper/${paperId}`"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <span class="body-1">Back to paper</span>
    </v-tooltip>

    <v-container class="pa-0">
      <v-row no-gutters justify="center" align="center">
        <!-- Main column -->
        <v-col no-gutters>
          <ThreadQuestion />

          <v-spacer />

          <p class="pa-3 ma-0 subtitle-1">Answers</p>

          <v-card v-if="repliesShowLoading">
            <LoadingSpinner />
          </v-card>

          <div v-else v-for="r in replies" :key="r.id">
            <ThreadComment :text="r.text" :date="r.createdAt" :name="r.userName" />
          </div>

          <ThreadTextarea
            class="mt-8"
            title="Add Comment"
            :isDisabled="!user.id"
            @submit="textarea_sumbit"
            disabledPlaceholder="Log in to add comments."
            ref="threadTextarea"
            :submitShowLoading="submitShowLoading"
          />
          <!-- @cancel="textarea_cancel" -->
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ThreadQuestion from "~/components/ThreadQuestion.vue";
import ThreadComment from "~/components/ThreadComment.vue";
import User from "~/components/User.vue";
import ThreadTextarea from "~/components/ThreadTextarea.vue";
import LoadingSpinner from "~/components/LoadingSpinner.vue";
import { mapGetters } from "vuex";
import "highlight.js/styles/github-gist.css"; // Code highlight style

export default {
  components: {
    ThreadComment,
    ThreadQuestion,
    ThreadTextarea,
    LoadingSpinner,
    User
  },

  validate({ params, store }) {
    return store.dispatch("thread/bindThread", {
      paperId: params.paperid,
      threadId: params.threadid
    });
  },

  head() {
    return {
      title: `Thread | ${this.thread.title}`
    };
  },

  data() {
    return {
      repliesShowLoading: false,
      submitShowLoading: false,
      showBackButton: false
    };
  },

  created() {
    // Load replies
    this.repliesShowLoading = true;

    this.$store
      .dispatch("thread/bindReplies", {
        paperId: this.paperId,
        threadId: this.threadId
      })
      .then(() => {
        this.repliesShowLoading = false;
      });
  },

  computed: {
    ...mapGetters({
      user: "user",
      thread: "thread/thread",
      replies: "thread/replies",
      store_vote_state: "thread/voteState"
    }),

    voteState() {
      if (this.store_vote_state == null) {
        return 0;
      }
      return this.store_vote_state.v;
    },

    paperId() {
      return this.$route.params.paperid;
    },
    threadId() {
      return this.$route.params.threadid;
    }
  },

  methods: {
    textarea_sumbit(item) {
      if (item.text.length > 0) {
        this.submitShowLoading = true;
        this.$store
          .dispatch("thread/addReply", {
            paperId: this.paperId,
            threadId: this.threadId,
            text: item.text,
            userName: this.user.displayName,
            userId: this.user.id
          })
          .then(() => {
            this.submitShowLoading = false;
            this.$refs.threadTextarea.clear();
          });
      }
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      var elmnt = document.getElementById("scrollAnchor");
      this.showBackButton = top > elmnt.offsetTop + 64;
    }
  }
};
</script>

<style scoped>
div.ratingicon {
  width: 40px;
  height: 25px;
  line-height: 25px;
  text-align: center;
}
</style>
