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

        <v-list three-line subheader>
          
          <h1>Repeatability issues</h1>
                <Comment />
        </v-list>
      </v-card>

    </v-dialog>
  </v-list-item>
</template>

<script>
import Comment from '~/components/Comment.vue'


  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }

components:{
    Comment
}
</script>

<style scoped></style>
