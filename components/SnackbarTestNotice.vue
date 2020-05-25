<template>
  <v-snackbar :timeout="0" v-model="showTestNotice" class="text-center">
    <div>
      <strong>pubpap is in testing mode</strong>
      <br />Tickets are free, giving presentation after goal fulfillment is voluntary.
    </div>
    <v-btn color="pink" text @click="closeTestNotice">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      showTestNotice: false
    };
  },

  created() {
    if (!localStorage.testingNoticev1) {
      this.showTestNotice = true;
    }
  },

  methods: {
    closeTestNotice() {
      localStorage.setItem("testingNoticev1", true);
      this.showTestNotice = false;
    }
  }
};
</script>