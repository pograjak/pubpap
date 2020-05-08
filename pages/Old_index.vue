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
        <ForumQuestions />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaperDetail from "~/components/PaperDetail.vue";
import RequestPresentation from "~/components/RequestPresentation.vue";
import ForumQuestions from "~/components/ForumQuestions.vue";
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";

Vue.use(VueGoogleCharts);

export default {
  components: {
    PaperDetail,
    RequestPresentation,
    ForumQuestions
  },

  computed: {}
};
</script>

<style scoped></style>
