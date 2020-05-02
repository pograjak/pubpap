<template>
  <v-list-item @click.stop="dialog = true">
    <v-list-item-content>
      <v-list-item-title>{{ thread.title }}</v-list-item-title>
      <v-list-item-subtitle>Jiri Matas</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-icon>
      {{ thread.upvotes }}
      <v-icon color="indigo">mdi-account-alert</v-icon>
    </v-list-item-icon>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Discuss</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-container fluid>
          <v-row no-gutters justify="center" align="center">
            <v-col cols="8" no-gutters>

              <v-card-title>Question</v-card-title>
              <v-card class="question">
                <v-container fluid>
                  <v-row dense>
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
                      <v-card-title>{{ thread.title }}</v-card-title>
                      <v-card-text>{{ thread.text }}</v-card-text>
                      <v-row no-gutters>
                        <v-col></v-col>
                        <v-col cols="auto">
                          <v-row dense>
                            <v-col cols="1">
                              <v-icon>mdi-account</v-icon>
                            </v-col>
                            <v-col>
                              <p class="name">
                                prof. Jiri Matas
                                <br />
                                <small>Prof</small>
                              </p>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>


              <v-spacer />
              <v-card-title>Answers</v-card-title>

              <Comment />
              <Comment />
              <Comment />

              <v-card>
                <v-container fluid>
                  <v-row no-gutters justify="center">
                    <v-col cols="10" align="right">
                      <v-card-title>Comment</v-card-title>
                      <v-textarea filled v-model="reply"></v-textarea>
                      <v-btn class="white--text button_right" color="blue accent-4" @click="addComment">Submit</v-btn>
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

export default {
  props: {
    thread: Object
  },

  data() {
    return {
      dialog: false,
      reply: ''
    };
  },
  components: {
    Comment
  },

  methods: {
    upvote(){
      this.$store.dispatch('threads/upvote', this.thread.id)    
    },
    downvote(){
      this.$store.dispatch('threads/downvote', this.thread.id)    
    },
    addComment(){
      this.$store.dispatch('threads/addComment', 
        {
          threadId: this.thread.id,
          text: this.reply
        }
      )
    }
  },
};
</script>

<style scoped>
.question {
  background-color: lightyellow;
}
.icons {
  max-width: 45px;
  text-align: center;
}
.name {
  font-size: 10pt;
  max-height: 20px;
  text-align: right;
  padding-right: 10px;
  line-height: 100%;
  margin: 0;
  margin-bottom: 3px;
}
</style>
