<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col>
        <PaperTopBar />
      </v-col>
    </v-row>

    <v-row no-gutters>
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
import PaperTopBar from "~/components/PaperTopBar.vue";
import PaperDetail from "~/components/PaperDetail.vue";
import RequestPresentation from "~/components/RequestPresentation.vue";
import ThreadsMain from "~/components/ThreadsMain.vue";
import Vue from "vue";

export default {
  validate({ params, store }) {
    return store.dispatch("paper/loadPaper", params.id);
  },

  components: {
    PaperTopBar,
    PaperDetail,
    RequestPresentation,
    ThreadsMain
  }
};
</script>

<style scoped></style>
