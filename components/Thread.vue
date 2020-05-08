<template>
  <v-list-item three-line @click.stop="openDiag" style="min-height:70px">
    <v-list-item-content class="pt-2">
      <v-list-item-title>{{ thread.title }}</v-list-item-title>
      <v-container class="pa-0 pt-1 ma-0">
        <v-row no-gutters>
          <User :date="thread.createdAt" :name="thread.userName" :rightAlign="false" />
        </v-row>
      </v-container>
      <!-- <v-list-item-subtitle class="font-weight-bold mb-0">{{ thread.userName }}</v-list-item-subtitle> -->
      <!-- <v-list-item-subtitle class="caption ma-0">Created {{ thread.createdAt | format-timestamp }}</v-list-item-subtitle> -->
    </v-list-item-content>

    <v-list-item-icon right class="pt-2 mt-0">
      <div class="ratingicon caption" v-bind:class="highlightingClasses">{{ thread.upvotes }}</div>
    </v-list-item-icon>

    <v-dialog v-model="dialog" fullscreen persistent transition="dialog-bottom-transition">
      <!-- Exit button - fixed -->
      <v-btn fab @click="dialog = false" right top fixed class="mt-3 mr-5 pr-0">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-card>
        <v-container style="max-width: 725px">
          <v-row no-gutters justify="center" align="center">
            <!-- Main column -->
            <v-col no-gutters>
              <v-card color="yellow lighten-5">
                <!-- Question -->
                <v-container>
                  <v-row no-gutters>
                    <v-col cols="1" class="text-center icons">
                      <v-btn icon @click="upvote">
                        <v-icon>mdi-arrow-up-thick</v-icon>
                      </v-btn>
                      {{ thread.upvotes }}
                      <v-btn icon @click="downvote">
                        <v-icon>mdi-arrow-down-thick</v-icon>
                      </v-btn>
                    </v-col>

                    <v-col>
                      <v-card-title class="pt-0 pb-2">{{ thread.title }}</v-card-title>
                      <v-card-text>{{ thread.text }}</v-card-text>
                      <v-row no-gutters>
                        <v-col></v-col>
                        <User :date="thread.createdAt" :name="thread.userName" :rightAlign="true" />
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>

              <v-spacer />
              <v-card-title class="pa-3">Answers</v-card-title>

              <div v-for="r in replies" :key="r.id">
                <Comment :text="r.text" :date="r.createdAt" :name="r.userName" />
              </div>

              <v-card>
                <v-container fluid>
                  <v-row no-gutters justify="center">
                    <v-col cols="10" align="right">
                      <div>
                        <v-row no-gutters>
                          <v-col align="left">
                            <v-card-title>Comment</v-card-title>
                          </v-col>
                          <v-col align="end" justify="end">
                            <v-card-subtitle>
                              {{
                              get_deco_username()
                              }}
                            </v-card-subtitle>
                          </v-col>
                        </v-row>
                        <v-textarea :disabled="this.user.email == ''" filled v-model="reply"></v-textarea>
                        <v-btn
                          :disabled="this.user.email == ''"
                          class="white--text button_right"
                          color="blue accent-4"
                          @click="addComment"
                        >Submit</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
import Comment from "~/components/Comment.vue";
import User from "~/components/User.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    thread: Object
  },

  data() {
    return {
      dialog: false,
      reply: ""
    };
  },
  components: {
    Comment,
    User
  },

  computed: {
    ...mapGetters({
      replies: "threads/replies"
    }),
    ...mapGetters(["user"]),
    highlightingClasses: function() {
      return {
        success: this.thread.upvotes > 5,
        'grey lighten-2': (this.thread.upvotes <= 5) & (this.thread.upvotes >= -1),
        error: this.thread.upvotes < -1,
        "white--text": (this.thread.upvotes < -1) | (this.thread.upvotes > 5)
      };
    }
  },

  methods: {
    get_deco_username() {
      if (this.user.email == "") {
        return "Not logged in";
      } else {
        return `Logged in as ${this.user.email}`;
      }
    },

    upvote() {
      this.$store.dispatch("threads/upvote", this.thread.id);
    },

    downvote() {
      this.$store.dispatch("threads/downvote", this.thread.id);
    },

    addComment() {
      this.$store.dispatch("threads/addComment", {
        threadId: this.thread.id,
        text: this.reply,
        userName: this.user.email
      });
      this.reply = "";
    },

    openDiag() {
      this.dialog = true;
      this.$store.dispatch("threads/bindReplies", this.thread.id);
    }
  }
};
</script>

<style scoped>
.icons {
  max-width: 45px;
  text-align: center;
}
.date {
  font-size: 10pt;
}
div.ratingicon {
  width: 40px;
  height: 25px;
  line-height: 25px;
  text-align: center;
}
</style>
