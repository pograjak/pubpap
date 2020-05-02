<template>
  <v-list-item @click.stop="dialog = true">
    <v-list-item-content>
      <v-list-item-title>Repeatability issues</v-list-item-title>
      <v-list-item-subtitle>Jiri Matas</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-icon>
      491
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
              <Comment />
              <v-spacer />
              <v-card-title>Answers</v-card-title>
              <Comment />
              <Comment />
              <Comment />

              <v-card>
                
                <v-container fluid>
                  <v-row no-gutters justify="center">
                    <v-col cols="10" align='right'>
                      <v-card-title>Comment</v-card-title>
                      <v-textarea filled></v-textarea>
                      <v-btn class="white--text button_right" color="blue accent-4">Submit</v-btn>
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
  data() {
    return {
      dialog: false
    };
  },
  components: {
    Comment
  }
};
</script>

<style scoped>
</style>
