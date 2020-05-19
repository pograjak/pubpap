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
            <v-list-item-title class="text-center caption d-flex align-center justify-center">
              <v-icon>mdi-head-question-outline</v-icon>
              <span>&nbsp;Be the first to ask!</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </template>

      <div v-for="thread in threads" :key="thread.id">
        <Thread :thread="thread" />
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Thread from "~/components/Thread.vue";
import ThreadTextarea from "~/components/ThreadTextarea.vue";
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
    Thread,
    ThreadTextarea,
    LoadingSpinner
  },

  created() {
    this.$store
      .dispatch("threads/bindThreads", { paperId: this.$route.params.id })
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
      threads: "threads/threads"
    }),
    showEmpty() {
      return this.threads.length == 0 && !this.showLoading;
    }
  },

  methods: {
    addThread(item) {
      if ((item.title.length > 0) & (item.text.length > 0)) {
        this.submitShowLoading = true;
        this.$store
          .dispatch("threads/addThread", {
            paperId: this.$route.params.id,
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
    }
  }
};
</script>

<style scoped></style>
