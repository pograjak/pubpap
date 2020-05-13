<template>
  <div>
    <v-list>
      <v-list-item style="min-height:80px">
        <v-list-item-content>
          <v-list-item-title class="display-1">Threads</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <!-- New Thread dialog -->
          <v-dialog v-model="dialog" max-width="800">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" large v-on="on">New Thread</v-btn>
            </template>

            <ThreadTextarea
              showTitleField
              showCancelButton
              title="Add Thread"
              :user="user"
              :isDisabled="this.user.email == ''"
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
    this.$store.dispatch("threads/bindThreads", { paperId: this.$route.params.id }).then(() => {
      this.showLoading = false;
    }).catch((error) => {
      this.showLoading = false;
      throw(error);
    });
  },

  computed: {
    ...mapGetters({
      threads: "threads/threads"
    }),

    ...mapGetters(["user"])
  },

  methods: {
    addThread(item) {
      if ((item.title.length > 0) & (item.text.length > 0)) {
        this.submitShowLoading = true;
        this.$store.dispatch("threads/addThread", {
          paperId: this.$route.params.id,
          title: item.title,
          text: item.text,
          userId: this.user.id,
          userName: this.user.email
        }).then(() => {
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
