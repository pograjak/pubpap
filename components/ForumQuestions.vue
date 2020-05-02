<template>
  <div>
    <div class="headline">Questions</div>

    <!-- Adding questions dialog -->
    <v-dialog v-model="dialog" persistent max-width="800">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title>Create New Thread</v-card-title>
        <v-container fluid>
          <v-row no-gutters justify="center">
            <v-col cols="11" align="right">
              <v-text-field filled label="Title" v-model="newthread_title"></v-text-field>
              <v-textarea filled label="Decription" v-model="newthread_question"></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="addThread()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-list two-line>
      <div v-for="(thread) in threads" :key="thread.id">
        <Thread :thread="thread" />
      </div>

      <!-- <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Repeatability issues</v-list-item-title>
          <v-list-item-subtitle>Jiri Matas</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          18
          <v-icon color="indigo">mdi-account-outline</v-icon>
        </v-list-item-icon>
      </v-list-item>-->
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Thread from "~/components/Thread.vue";
import Comment from "~/components/Comment.vue";

export default {
  data: function() {
    return {
      text: "Hello first",
      dialog: false,
      newthread_title: '',
      newthread_question: ''
    };
  },
  created() {
    this.$store.dispatch("threads/bindThreads");
  },
  computed: {
    ...mapGetters({
      threads: "threads/threads"
    })
  },

  methods: {
    btnClick() {
      this.text = "Hello second";
    },
    addThread() {
      this.$store.dispatch("threads/addThread", {
        title: this.newthread_title,
        text: this.newthread_question
      });
      this.dialog = false;
    }
  },

  components: {
    Thread,
    Comment
  }
};
</script>

<style scoped></style>
