<template>
  <v-dialog v-model="showDiag" max-width="570" persistent>
    <v-card>
       <v-card-title class="title font-weight-bold"
          >Thanks for purchase!</v-card-title
        >

        <v-card-text
          class="text-center green-text text--darken-4 green lighten-4 py-4"
        >
          <p class="body-1"><v-icon>mdi-check-circle-outline</v-icon>&nbsp;Ticket purchase successful.</p>
          <p class="mb-0">Once all tickets are sold, we will send you an email with a presentation date & link.</p>
          
        </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closeDiag">Continue</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      showDiag: false
    };
  },

  created() {
    if (this.$fireAuth.currentUser && this.$route.query.session_id) {
      this.showDiag = true;
    }
  },

  methods: {
    closeDiag() {
      let query = Object.assign({}, this.$route.query);
      delete query.session_id;
      this.$router.replace({ query });
      this.showDiag = false;
    }
  }
};
</script>