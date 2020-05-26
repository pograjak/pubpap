<template>
  <v-card>
    <v-tabs v-model="homeTab">
      <v-tabs-slider></v-tabs-slider>

      <v-tab>
        <v-icon left>mdi-party-popper</v-icon>New papers
      </v-tab>

      <v-tab :disabled="!user.id">
        <v-icon left>mdi-star</v-icon>Favorites
      </v-tab>

      <v-tab :disabled="!user.id">
        <v-icon left>mdi-card-text-outline</v-icon>My Tickets
      </v-tab>

      <v-tab :disabled="!user.id">
        <v-icon left>mdi-account</v-icon>My Papers
      </v-tab>
    </v-tabs>

    <v-tabs-items :value="homeTab">
      <v-tab-item>
        <PaperList
          storeDispatchFcn="paperlist/loadRecentPapers"
          storePapersGetter="paperlist/recentpapers"
          emptyPlaceholder="No new papers"
          emptyIcon="mdi-paper-roll-outline"
        />
      </v-tab-item>

      <template v-if="user.id">
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
            addPaperIcon
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

  watch: {
    userId: function(newuser) {
      // switch to tab=0 on logout
      // console.log("newuser_watch");
      // on logout
      if (!newuser.id) {
        this.$store.commit("changeHomeTab", 0);
      }
    }
  },

  computed: {
    userId() {
      // need to follow the id explicitly, user object does not change, just it's insides
      // console.log("newuserId");
      return this.$store.getters.user.id;
    },
    user() {
      // console.log("newuser");
      return this.$store.getters.user;
    },
    homeTab: {
      get: function() {
        return this.$store.getters.homeTab;
      },
      set: function(newVal) {
        this.$store.commit("changeHomeTab", newVal);
      }
    }
  },

  methods: {
    changeTab(tab) {
      console.log(tab);
    }
  }
};
</script>

<style scoped></style>
