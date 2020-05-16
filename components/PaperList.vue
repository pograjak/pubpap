<template>
  <v-card>
    <v-tabs v-model="tab">
      <v-tabs-slider></v-tabs-slider>

      <v-tab>
        <v-icon left>mdi-star</v-icon>Favorites
      </v-tab>

      <v-tab>
        <v-icon left>mdi-card-text-outline</v-icon>My Tickets
      </v-tab>

      <v-tab>
        <v-icon left>mdi-account</v-icon>My Papers
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

          <template v-for="(p, index) in sortPaps(favpapers)">
            <PaperListItem :paper="p" :key="index" />
          </template>
        </v-list>
      </v-tab-item>

      <v-tab-item>
        <v-list class="py-0">
          <!-- Loading spinner -->
          <v-list-item two-line v-if="showLoading.ticks">
            <v-list-item-content>
              <LoadingSpinner />
            </v-list-item-content>
          </v-list-item>
          <!-- Empty placeholder -->
          <v-list-item two-line v-if="showEmpty.ticks">
            <v-list-item-content>
              <v-list-item-title class="text-center">No tickets bought yet <v-icon>mdi-emoticon-frown-outline</v-icon></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <template v-for="(p, index) in sortPaps(subpapers)">
            <PaperListItem :paper="p" :key="index" />
          </template>
        </v-list>
      </v-tab-item>

      <v-tab-item>
        <v-list class="py-0">
          <!-- Loading spinner -->
          <v-list-item two-line v-if="showLoading.mypaps">
            <v-list-item-content>
              <LoadingSpinner />
            </v-list-item-content>
          </v-list-item>
          <!-- Empty placeholder -->
          <v-list-item two-line v-if="showEmpty.mypaps">
            <v-list-item-content>
              <v-list-item-title class="text-center">No papers added yet <v-icon>mdi-emoticon-sad-outline</v-icon></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <template v-for="(p, index) in sortPaps(mypapers)">
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
      tab: 1,
      showLoading: {
        favs: false,
        ticks: false,
        mypaps: false
      },
      showEmpty: {
        favs: false,
        ticks: false,
        mypaps: false
      }
    };
  },

  created() {
    this.showLoading.ticks = true;
    this.showLoading.mypaps = true;
    this.$store
      .dispatch("paperlist/loadMyPapers", this.$fireAuth.currentUser.uid)
      .then(() => {
        this.showLoading.mypaps = false;
        if(this.mypapers.length == 0){
          this.showEmpty.mypaps = true;
        }
      });
    this.$store
      .dispatch("paperlist/loadSubsPapers", this.$fireAuth.currentUser.uid)
      .then(() => {
        this.showLoading.ticks = false;
        if(this.subpapers.length == 0){
          this.showEmpty.ticks = true;
        }
      });
    this.$store
      .dispatch("paperlist/loadFavPapers", this.$fireAuth.currentUser.uid)
      .then(() => {
        this.showLoading.favs = false;
        if(this.favpapers.length == 0){
          this.showEmpty.favs = true;
        }
      });
  },

  computed: {
    ...mapGetters({
      mypapers: "paperlist/mypapers",
      subpapers: "paperlist/subpapers",
      favpapers: "paperlist/favpapers"
    })
  },

  methods: {
    sortPaps(paplist) {
      var newpaps = [...paplist];
      return newpaps.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    }
  }
};
</script>

<style scoped></style>
