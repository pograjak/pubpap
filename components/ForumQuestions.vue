<template>
  <div>
    <h1>Questions</h1>
    <v-btn @click="addThread()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-list two-line>
      <div v-for="(thread, index) in threads" :key="index">
        <Thread 
         :title="thread.title"
         :text="thread.text"
        />  
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
      </v-list-item> -->
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Thread from '~/components/Thread.vue'
import Comment from '~/components/Comment.vue'

export default {
  data: function() {
    return {
      text: "Hello first"
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
    addThread(){
      this.$store.dispatch('threads/addThread',
      {
        text: 'Ahoj',
        title: 'Titulek 1'
      }
      )
    }
  },

  components:{
    Thread,
    Comment
}
};
</script>

<style scoped></style>
