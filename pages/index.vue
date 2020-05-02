<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <PaperDetail />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <PresentationRequest />
      </v-col>

      <v-col>
        <ForumQuestions />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaperDetail from "~/components/PaperDetail.vue";
import PresentationRequest from "~/components/PresentationRequest.vue";
import ForumQuestions from "~/components/ForumQuestions.vue";
import Vue from "vue";
import VueGoogleCharts from "vue-google-charts";

Vue.use(VueGoogleCharts);

export default {
  components: {
    PaperDetail,
    PresentationRequest,
    ForumQuestions
  }
};
</script>

<style scoped></style>
