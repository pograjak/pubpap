<template>
  <!-- Thread menu overview -->
  <v-list-item three-line @click.stop="openDiag" style="min-height:70px">
    <v-list-item-content class="pt-2">
      <v-list-item-title>{{ thread.title }}</v-list-item-title>
      <v-container class="pa-0 pt-1 ma-0">
        <v-row no-gutters>
          <User :date="thread.createdAt" :name="thread.userName" :rightAlign="false" />
        </v-row>
      </v-container>
    </v-list-item-content>

    <v-list-item-icon right class="pt-2 mt-0">
      <div
        class="ratingicon caption"
        v-bind:class="highlightingClasses"
      >{{ thread.votes }}</div>
    </v-list-item-icon>

    <!-- POPUP DIALOG -->
    <v-dialog v-model="dialog" fullscreen persistent transition="dialog-bottom-transition">
      <!-- Exit button - fixed -->
      <v-btn fab @click="dialog = false" right top fixed class="mt-3 mr-5 pr-0 primary">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-card>
        <v-container style="max-width: 900px">
          <v-row no-gutters justify="center" align="center">
            <!-- Main column -->
            <v-col no-gutters>
              <ThreadQuestion
                :threadId="thread.id"
                :title="thread.title"
                :text_html="render_markdown(thread.text)"
                :date="thread.createdAt"
                :name="thread.userName"
                :votes="thread.votes"
                :votingDisabled="user.id == ''"
              />

              <v-spacer />

              <p class="pa-3 ma-0 subtitle-1">Answers</p>

              <v-card v-if="showLoading">
                <LoadingSpinner />
              </v-card>

              <div v-else v-for="r in replies" :key="r.id">
                <ThreadComment :text="r.text" :date="r.createdAt" :name="r.userName" />
              </div>

              <ThreadTextarea
                class="mt-8"
                title="Add Comment"
                :user="user"
                :isDisabled="this.user.email == ''"
                @submit="textarea_sumbit"
                disabledPlaceholder="Log in to add comments."
                ref="threadTextarea"
              />
              <!-- @cancel="textarea_cancel" -->
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
import ThreadQuestion from "~/components/ThreadQuestion.vue";
import ThreadComment from "~/components/ThreadComment.vue";
import User from "~/components/User.vue";
import ThreadTextarea from "~/components/ThreadTextarea.vue";
import LoadingSpinner from "~/components/LoadingSpinner.vue";
import { mapGetters } from "vuex";
import { md } from "~/plugins/markdown_render.js";
import "highlight.js/styles/github-gist.css"; // Code highlight style

export default {
  props: {
    thread: Object
  },

  data() {
    return {
      dialog: false,
      showLoading: false
    };
  },
  components: {
    ThreadComment,
    ThreadQuestion,
    ThreadTextarea,
    LoadingSpinner,
    User
  },

  computed: {
    ...mapGetters({
      replies: "threads/replies"
    }),
    ...mapGetters(["user"]),
    highlightingClasses: function() {
      return {
        success: this.thread.votes > 5,
        "grey lighten-2":
          (this.thread.votes <= 5) & (this.thread.votes >= -1),
        error: this.thread.votes < -1,
        "white--text": (this.thread.votes < -1) | (this.thread.votes > 5)
      };
    }
  },

  methods: {
    openDiag() {
      this.dialog = true;
      this.showLoading = true;
      this.$store.dispatch("threads/bindReplies", this.thread.id).then(() => {
        this.showLoading = false;
      });
      // This makes the opening a little bit smoother
      // new Promise(r => setTimeout(r, 500)).then(() => {
      //   this.$store.dispatch("threads/bindReplies", this.thread.id).then(() => {
      //     this.showLoading = false;
      //   });
      // });
    },
    render_markdown(mkdwn) {
      return md.render(mkdwn);
    },
    textarea_sumbit(item) {
      if (item.text.length > 0) {
        this.$store.dispatch("threads/addComment", {
          threadId: this.thread.id,
          text: item.text,
          userName: this.user.email
        });

        this.$refs.threadTextarea.clear();
      }
    }
  }
};
</script>

<style scoped>
/* Override Vuetify formatting of code block, including children */
/* .code_override /deep/ code {
  display: inline;
  overflow: visible;
  box-shadow: none;
  font-weight: 100;
  border: 0;
  color: #24292e;
}
.code_override /deep/ code::before {
  content: none;
}
.code_override /deep/ code::after {
  content: none;
} */
/* Icons showing rating in the Threads menu */
div.ratingicon {
  width: 40px;
  height: 25px;
  line-height: 25px;
  text-align: center;
}
</style>
