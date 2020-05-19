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
      <template v-if="isPresentation">
        <v-col cols="12" md="6">
          <RequestPresentation />
        </v-col>

        <v-col cols="12" md="6">
          <ThreadsMain />
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12">
          <ThreadsMain />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import PaperTopBar from "~/components/PaperTopBar.vue";
import PaperDetail from "~/components/PaperDetail.vue";
import RequestPresentation from "~/components/RequestPresentation.vue";
import ThreadsMain from "~/components/ThreadsMain.vue";
import Vue from "vue";
import { mapGetters } from "vuex";

export default {
  validate({ params, store }) {
    return store.dispatch("paper/loadPaper", params.id);
  },

  computed: {
    ...mapGetters({
      isPresentation: "paper/isPresentation"
    })
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
