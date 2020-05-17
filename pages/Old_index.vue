<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <PaperDetail />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <RequestPresentation />
      </v-col>

      <v-col>
        <ThreadsMain />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaperDetail from "~/components/PaperDetail.vue";
import RequestPresentation from "~/components/RequestPresentation.vue";
import ThreadsMain from "~/components/ThreadsMain.vue";
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";

Vue.use(VueGoogleCharts);

export default {
  components: {
    PaperDetail,
    RequestPresentation,
    ThreadsMain
  },

  computed: {}
};
</script>

<style scoped></style>
