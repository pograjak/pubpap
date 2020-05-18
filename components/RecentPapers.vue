<template>
  <v-card>
    <v-tabs v-model="tab">
      <v-tabs-slider></v-tabs-slider>

      <v-tab>
        <v-icon left>mdi-star</v-icon>Favorites
      </v-tab>

    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-list class="py-0">
          <!-- Loading spinner -->
          <v-list-item two-line v-if="showLoading.favs">
            <v-list-item-content>
              <LoadingSpinner />
            </v-list-item-content>
          </v-list-item>
          <!-- Empty placeholder -->
          <v-list-item two-line v-if="showEmpty.favs">
            <v-list-item-content>
              <v-list-item-title class="text-center">No favorite papers <v-icon>mdi-star-off</v-icon></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <template v-for="(p, index) in recentpapers">
            <PaperListItem :paper="p" :key="index" />
          </template>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import PaperListItem from "~/components/PaperListItem.vue";
import LoadingSpinner from "~/components/LoadingSpinner.vue";

export default {
  components: {
    PaperListItem,
    LoadingSpinner
  },

  data() {
    return {
      showLoading: false,
      showEmpty: false,
      tab: 0
    };
  },

  created() {
    this.showLoading = true;
    this.$store
      .dispatch("paperlist/loadRecentPapers")
      .then(() => {
        this.showLoading = false;
        if(this.recentpapers.length == 0){
          this.showEmpty = true;
        }
      });
  },

  computed: {
    ...mapGetters({
      recentpapers: "paperlist/recentpapers"
    })
  },

  methods: {
  }
};
</script>

<style scoped></style>
