<template>
  <div>
    <v-list>
      <v-list-item style="min-height:50px">
        <v-list-item-content>
          <v-list-item-title class="headline">Threads</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action class="ma-0">
          <!-- New Thread dialog -->
          <v-dialog v-model="dialog" max-width="800">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" v-on="on">New Thread</v-btn>
            </template>

            <ThreadTextarea
              showTitleField
              showCancelButton
              title="Add Thread"
              :isDisabled="!this.user.id"
              @submit="addThread"
              @cancel="dialog = false"
              :submitShowLoading="submitShowLoading"
              disabledPlaceholder="Log in to add new threads."
              ref="newthreadTextarea"
            />
          </v-dialog>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>

      <template v-if="showLoading">
        <v-list-item>
          <LoadingSpinner />
        </v-list-item>
        <v-divider />
      </template>

      <template v-if="showEmpty">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-center body-2 d-flex align-center justify-center">
              <v-icon>mdi-comment-question-outline</v-icon>
              <span>&nbsp;Be the first to ask!</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </template>

      <!-- List of threads -->
      <div v-for="thread in threads" :key="thread.id">
        <v-list-item three-line style="min-height:70px" :to="`/thread/${paperId}/${thread.id}`">
          <v-list-item-content class="pt-2">
            <v-list-item-title>{{ thread.title }}</v-list-item-title>
            <v-container class="pa-0 ma-0">
              <v-row no-gutters>
                <User :date="thread.createdAt" :name="thread.userName" />
              </v-row>
            </v-container>
          </v-list-item-content>

          <v-list-item-icon right class="pt-2 mt-0">
            <div class="ratingicon caption" v-bind:class="highlightingClasses(thread.votes)">{{ thread.votes }}</div>
          </v-list-item-icon>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ThreadTextarea from "~/components/ThreadTextarea.vue";
import User from "~/components/User.vue";
import LoadingSpinner from "~/components/LoadingSpinner.vue";

export default {
  data: function() {
    return {
      dialog: false,
      showLoading: true,
      submitShowLoading: false
    };
  },
  components: {
    User,
    ThreadTextarea,
    LoadingSpinner
  },

  created() {
    this.$store
      .dispatch("threadlist/bindThreads", { paperId: this.paperId })
      .then(() => {
        this.showLoading = false;
      })
      .catch(error => {
        this.showLoading = false;
        throw error;
      });
  },

  computed: {
    ...mapGetters({
      user: "user",
      threads: "threadlist/threads"
    }),
    showEmpty() {
      return this.threads.length == 0 && !this.showLoading;
    },
    paperId() {
      return this.$route.params.id;
    }
  },

  methods: {
    addThread(item) {
      if ((item.title.length > 0) & (item.text.length > 0)) {
        this.submitShowLoading = true;
        this.$store
          .dispatch("threadlist/addThread", {
            paperId: this.paperId,
            title: item.title,
            text: item.text,
            userId: this.user.id,
            userName: this.user.displayName
          })
          .then(() => {
            this.submitShowLoading = false;
            this.$refs.newthreadTextarea.clear();
            this.dialog = false;
          });
      }
    },
    highlightingClasses(votes) {
      return {
        success: votes > 5,
        "grey lighten-2": (votes <= 5) & (votes >= -1),
        error: votes < -1,
        "white--text": (votes < -1) | (votes > 5)
      };
    },
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
