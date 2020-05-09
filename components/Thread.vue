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
      <v-btn fab @click="dialog = false" right top fixed class="mt-3 mr-5 pr-0 primary">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-card>
        <v-container style="max-width: 900px">
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

              <AddComment :threadId="thread.id" :user="user" />
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
import AddComment from "~/components/AddComment.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    thread: Object
  },

  data() {
    return {
      dialog: false
    };
  },
  components: {
    Comment,
    User,
    AddComment
  },

  computed: {
    ...mapGetters({
      replies: "threads/replies"
    }),
    ...mapGetters(["user"]),
    highlightingClasses: function() {
      return {
        success: this.thread.upvotes > 5,
        "grey lighten-2":
          (this.thread.upvotes <= 5) & (this.thread.upvotes >= -1),
        error: this.thread.upvotes < -1,
        "white--text": (this.thread.upvotes < -1) | (this.thread.upvotes > 5)
      };
    }
  },

  methods: {
    upvote() {
      this.$store.dispatch("threads/upvote", this.thread.id);
    },

    downvote() {
      this.$store.dispatch("threads/downvote", this.thread.id);
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
