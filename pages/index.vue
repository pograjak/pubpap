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

// Filters
Vue.filter("format-timestamp", function(stamp) {
  const d = new Date(stamp);
  const dtf = new Intl.DateTimeFormat("en", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
  const [
    { value: mo },,
    { value: da },,
    { value: ye },,
    { value: hou },,
    { value: min },,
  ] = dtf.formatToParts(d);
  return `${mo} ${da}'${ye} at ${hou}:${min}`;
});

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
