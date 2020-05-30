<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="paper in papers" :key="paper.paperId" cols="12" sm="4" lg="3">
        <BrowsePaperCard :paper="paper" />
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";
import BrowsePaperCard from "~/components/BrowsePaperCard.vue"

export default {
  components: {
    BrowsePaperCard
  },
  created() {
    this.$store.dispatch("paperlist/loadRecentPapers", {}).then(() => {
      // this.showLoading = false;
      // if (this.papers.length == 0) {
      //   this.showEmpty = true;
      // }
    });
  },

  computed: {
    ...mapGetters({ user: "user", papers: "paperlist/recentpapers" })
  }
};
</script>
