<template>
  <v-card>
    <v-tabs v-model="tab">
      <v-tabs-slider></v-tabs-slider>

      <v-tab>
        <v-icon left>mdi-party-popper</v-icon>New papers
      </v-tab>

      <v-tab :disabled="!isLoggedIn">
        <v-icon left>mdi-star</v-icon>Favorites
      </v-tab>

      <v-tab :disabled="!isLoggedIn">
        <v-icon left>mdi-card-text-outline</v-icon>My Tickets
      </v-tab>

      <v-tab :disabled="!isLoggedIn">
        <v-icon left>mdi-account</v-icon>My Papers
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <PaperList
          storeDispatchFcn="paperlist/loadRecentPapers"
          storePapersGetter="paperlist/recentpapers"
          emptyPlaceholder="No new papers"
          emptyIcon="mdi-paper-roll-outline"
        />
      </v-tab-item>

      <template v-if="this.$fireAuth.currentUser">
        <v-tab-item>
          <PaperList
            storeDispatchFcn="paperlist/loadFavPapers"
            storePapersGetter="paperlist/favpapers"
            emptyPlaceholder="No favorite papers "
            emptyIcon="mdi-star-off"
          />
        </v-tab-item>

        <v-tab-item>
          <PaperList
            storeDispatchFcn="paperlist/loadSubsPapers"
            storePapersGetter="paperlist/subpapers"
            emptyPlaceholder="No tickets bought yet"
            emptyIcon="mdi-emoticon-frown-outline"
          />
        </v-tab-item>

        <v-tab-item>
          <PaperList
            showEditIcons
            storeDispatchFcn="paperlist/loadMyPapers"
            storePapersGetter="paperlist/mypapers"
            emptyPlaceholder="No papers added yet "
            emptyIcon="mdi-emoticon-sad-outline"
          />
        </v-tab-item>
      </template>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import PaperList from "~/components/PaperList.vue";

export default {
  components: {
    PaperList
  },

  data() {
    return {
      tab: 0
    };
  },

  computed: {
    isLoggedIn() {
      if(this.$fireAuth.currentUser){
        return true;
      }
      return false;
    }
  }

  // created() {
  //   this.showLoading.ticks = true;
  //   this.showLoading.mypaps = true;
  //   this.showLoading.favs = true;
  //   this.$store
  //     .dispatch("paperlist/loadMyPapers", this.$fireAuth.currentUser.uid)
  //     .then(() => {
  //       this.showLoading.mypaps = false;
  //       if (this.mypapers.length == 0) {
  //         this.showEmpty.mypaps = true;
  //       }
  //     });
  //   this.$store
  //     .dispatch("paperlist/loadSubsPapers", this.$fireAuth.currentUser.uid)
  //     .then(() => {
  //       this.showLoading.ticks = false;
  //       if (this.subpapers.length == 0) {
  //         this.showEmpty.ticks = true;
  //       }
  //     });
  //   this.$store
  //     .dispatch("paperlist/loadFavPapers", this.$fireAuth.currentUser.uid)
  //     .then(() => {
  //       this.showLoading.favs = false;
  //       if (this.favpapers.length == 0) {
  //         this.showEmpty.favs = true;
  //       }
  //     });
  // }
};
</script>

<style scoped></style>
