<template>
  <div>
    <v-list>
      <v-list-item style="min-height:80px">
        <v-list-item-content>
          <h1>Threads</h1>
        </v-list-item-content>

        <v-list-item-icon>
          <!-- New Thread dialog -->
          <v-dialog v-model="dialog" persistent max-width="800">
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" tile large v-on="on">
                <!-- <v-icon>mdi-plus</v-icon> -->
                New Thread
              </v-btn>
              <!-- <v-btn icon v-on="on" style="min-height: 60px"><v-icon>mdi-plus</v-icon></v-btn> -->
            </template>
            <v-card>
              <div v-if="this.user.email == ''">
                <v-card-title>Log in to create a new thread.</v-card-title>
              </div>
              <div v-if="this.user.email != ''">
                <v-card-title>Create New Thread</v-card-title>
                <v-card-subtitle>{{ get_deco_username() }}</v-card-subtitle>
                <v-container fluid>
                  <v-row no-gutters justify="center">
                    <v-col cols="11" align="right">
                      <v-text-field
                        :disabled="this.user.email == ''"
                        filled
                        label="Title"
                        v-model="newthread_title"
                      ></v-text-field>
                      <v-textarea
                        :disabled="this.user.email == ''"
                        filled
                        label="Decription"
                        v-model="newthread_question"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">Cancel</v-btn>
                <v-btn :hidden="this.user.email == ''" text @click="addThread()">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item-icon>
      </v-list-item>
      <v-divider></v-divider>

      <div v-for="(thread) in threads" :key="thread.id">
        <Thread :thread="thread" />
        <v-divider></v-divider>
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
      newthread_title: "",
      newthread_question: ""
    };
  },
  created() {
    this.$store.dispatch("threads/bindThreads");
  },
  computed: {
    ...mapGetters({
      threads: "threads/threads"
    }),
    ...mapGetters(["user"])
  },

  methods: {
    get_deco_username() {
      if (this.user.email == "") {
        return "Not logged in";
      } else {
        return `Logged in as ${this.user.email}`;
      }
    },
    btnClick() {
      this.text = "Hello second";
    },
    addThread() {
      console.log(this.user.id);
      this.$store.dispatch("threads/addThread", {
        title: this.newthread_title,
        text: this.newthread_question,
        userId: this.user.id,
        userName: this.user.email
      });
      this.dialog = false;
      this.newthread_title = "";
      this.newthread_question = "";
    }
  },

  components: {
    Thread,
    Comment
  }
};
</script>

<style scoped></style>
