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


export default {
  async validate({ params, store }) {
    try {
      let resp = await store.dispatch("paper/loadPaper", params.id);
    } catch (error) {
      return false;
    }
    return true;
  },

  components: {
    PaperDetail,
    RequestPresentation,
    ForumQuestions
  }
};
</script>

<style scoped></style>
